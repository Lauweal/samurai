import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/samurai/app/navigators';
import { translate } from 'apps/samurai/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useMemo } from 'react';
import { useFormik } from 'formik'
import { Button, Input, Switch } from 'apps/samurai/app/components';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, palette, sizes } from '@samurai/design';
import * as Yup from 'yup';
import { IAccount } from '@samurai/interfaces';
import { AuthLayout } from './Layout';
import { useStores } from 'apps/samurai/app/models';

interface IAccountParams extends Pick<IAccount, 'account' | 'password'> {
  affirmPassword: string
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
    .email(translate('auth.sign-up.verification.account') as string)
    .required(translate('auth.sign-up.required-verification.account') as string),
  password: Yup.string().required(translate('auth.sign-up.required-verification.password') as string),
  affirmPassword: Yup.string().required(translate('auth.sign-up.required-verification.password') as string)
})

export const SignUp: FC<NativeStackScreenProps<NavigatorParamList, 'SignUp'>> =
  observer(function SignUp({ navigation }) {

    const { account } = useStores()
    const { errors, values, handleChange, handleSubmit } = useFormik<IAccountParams>({
      initialValues: {
        account: '',
        password: '',
        affirmPassword: '',
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
      !!values.affirmPassword &&
      !errors.account &&
      !errors.password &&
      !errors.affirmPassword
      , [values, errors])

    useEffect(() => {
      console.log(errors)
    }, [errors])

    const goLoginPage = () => {
      navigation.replace('SignIn')
    }

    return (
      <AuthLayout
        title={translate('auth.sign-up.title') as string}
        subtitle={translate('auth.sign-up.description') as string}
      >
        <Input
          type="email-address"
          errorMsg={errors.account}
          label={translate('auth.sign-up.accountLabel') as string}
          placeholder={translate('auth.sign-up.account') as string}
          value={values.account}
          onChange={handleChange('account') as any}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type='password'
          label={translate('auth.sign-up.passwordLabel') as string}
          placeholder={translate('auth.sign-up.password') as string}
          value={values.password}
          onChange={handleChange('password') as any}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type='password'
          label={translate('auth.sign-up.affirm-passwordLabel') as string}
          placeholder={translate('auth.sign-up.affirm-password') as string}
          value={values.affirmPassword}
          onChange={handleChange('affirmPassword') as any}
        />
        <View style={styles.saveBox}>
          <View style={styles.saveButton}>
            <Switch label={translate('auth.sign-up.saveMe') as string} value={values.save} onChange={handleChange('save') as any} />
          </View>
          <Button
            label={translate('auth.sign-up.forgot') as string}
            buttonContainerStyle={{
              backgroundColor: palette.transparent
            }}
            labelStyle={styles.forgotLabel}
          />
        </View>
        <Button buttonContainerStyle={{ ...styles.button, backgroundColor: isEnableSignIn ? palette.primary : palette.primary_disabled }} label={translate('auth.sign-up.submit') as string} onPress={handleSubmit as any} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>{translate('auth.sign-up.loginLabel')}</Text>
          <Button label={translate('auth.sign-up.loginTitle') as string} buttonContainerStyle={{ backgroundColor: palette.transparent }} labelStyle={styles.loginButton} onPress={goLoginPage} />
        </View>
      </AuthLayout>
    );
  });
