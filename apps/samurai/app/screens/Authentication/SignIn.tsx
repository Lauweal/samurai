import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/samurai/app/navigators';
import { translate } from 'apps/samurai/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useMemo } from 'react';
import { useFormik } from 'formik'
import { Button, Input, Switch } from 'apps/samurai/app/components';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { fonts, palette, sizes, iconsAssets } from '@samurai/design';
import * as Yup from 'yup';
import { IAccount } from '@samurai/interfaces';
import { AuthLayout } from './Layout';
import { useStores } from 'apps/samurai/app/models';

interface IAccountParams extends Pick<IAccount, 'account' | 'password'> {
  save: boolean
}


const styles = StyleSheet.create({
  saveBox: {
    flexDirection: 'row',
    marginTop: sizes.spacing_24,
    justifyContent: 'space-between'
  },
  saveButton: {
    flexDirection: 'row', alignItems: 'center'
  },
  forgotLabel: {
    color: palette.secondary,
    ...fonts.body4
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: sizes.spacing_12,
    justifyContent: 'center'
  },
  loginText: {
    color: palette.text_2, ...fonts.body3
  },
  loginButton: {
    color: palette.primary,
    ...fonts.h3
  },
  button: {
    height: 55,
    alignItems: 'center',
    marginTop: sizes.spacing_24,
    borderRadius: sizes.spacing_12,
  },
});

const SignupSchema = Yup.object().shape({
  account: Yup.string()
    .email(translate('auth.sign-in.verification.account') as string)
    .required(translate('auth.sign-in.required-verification.account') as string),
  password: Yup.string().required(translate('auth.sign-in.required-verification.password') as string),
  affirmPassword: Yup.string().required(translate('auth.sign-in.required-verification.password') as string)
})

export const SignIn: FC<NativeStackScreenProps<NavigatorParamList, 'SignIn'>> =
  observer(function SignIn({ navigation }) {

    const { account } = useStores()
    const { errors, values, handleChange, handleSubmit } = useFormik<IAccountParams>({
      initialValues: {
        account: '',
        password: '',
        save: true
      },
      validateOnBlur: false,
      validateOnChange: true,
      validationSchema: SignupSchema,
      onSubmit: (a) => {
        account.login(a).then((token) => {
          navigation.push('WebBox', { token })
        })
      }
    })

    const isEnableSignIn = useMemo(() =>
      !!values.account &&
      !!values.password &&
      !errors.account &&
      !errors.password
      , [values, errors])

    useEffect(() => {
      console.log(errors)
    }, [errors])

    const goLoginPage = () => {
      navigation.replace('SignUp')
    }

    return (
      <AuthLayout
        title={translate('auth.sign-in.title') as string}
        subtitle={translate('auth.sign-in.description') as string}
      >
        <Input
          type="email-address"
          errorMsg={errors.account}
          label={translate('auth.sign-in.accountLabel') as string}
          placeholder={translate('auth.sign-in.account') as string}
          value={values.account}
          onChange={handleChange('account') as any}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type='password'
          label={translate('auth.sign-in.passwordLabel') as string}
          placeholder={translate('auth.sign-in.password') as string}
          value={values.password}
          onChange={handleChange('password') as any}
          suffix={
            <TouchableOpacity style={{
              width: 40,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              <Image source={iconsAssets.eye} style={{
                height: 20,
                width: 20,
                tintColor: palette.text_3
              }} />
            </TouchableOpacity>
          }
        />
        <View style={styles.saveBox}>
          <View style={styles.saveButton}>
            <Switch label={translate('auth.sign-in.saveMe') as string} value={values.save} onChange={handleChange('save') as any} />
          </View>
          <Button
            label={translate('auth.sign-in.forgot') as string}
            buttonContainerStyle={{
              backgroundColor: palette.transparent
            }}
            labelStyle={styles.forgotLabel}
          />
        </View>
        <Button buttonContainerStyle={{ ...styles.button, backgroundColor: isEnableSignIn ? palette.primary : palette.primary_disabled }} label={translate('auth.sign-in.submit') as string} onPress={handleSubmit as any} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>{translate('auth.sign-in.loginLabel')}</Text>
          <Button label={translate('auth.sign-in.loginTitle') as string} buttonContainerStyle={{ backgroundColor: palette.transparent }} labelStyle={styles.loginButton} onPress={goLoginPage} />
        </View>
      </AuthLayout>
    );
  });
