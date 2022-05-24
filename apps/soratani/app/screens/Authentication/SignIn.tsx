import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/soratani/app/navigators';
import { translate } from 'apps/soratani/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button, Input, Switch, Icons } from 'apps/soratani/app/components';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, palette, sizes, iconsAssets } from '@samurai/design';
import * as Yup from 'yup';
import { IAccount } from '@samurai/interfaces';
import { AuthLayout } from './Layout';
import { useStores } from 'apps/soratani/app/models';
import { useAuthentication } from 'apps/soratani/app/hooks';

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
  password: Yup.string()
    .required(translate('auth.sign-in.required-verification.password') as string)
    .matches(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/, translate('auth.sign-in.verification.password-len') as string),
})

export const SignIn: FC<NativeStackScreenProps<NavigatorParamList, 'SignIn'>> =
  observer(function SignIn({ navigation }) {
    const { account } = useStores()
    const { errors, values, showPassword, canSubmit, showPass, cancel, handleChange, handleSubmit } = useAuthentication<IAccountParams>({
      account: '',
      password: '',
      save: false
    }, SignupSchema, account.login)

    const goSignUpPage = () => {
      navigation.replace('SignUp')
    }

    return (
      <AuthLayout
        title={translate('auth.sign-in.title') as string}
        subtitle={translate('auth.sign-in.description') as string}
      >
        <Input
          type="default"
          errorMsg={errors.account}
          label={translate('auth.sign-in.accountLabel') as string}
          placeholder={translate('auth.sign-in.account') as string}
          value={values.account}
          onChange={handleChange('account') as any}
          suffix={<Icons color={!!values.account ? palette.success : palette.transparent} icon={!!errors.account ? 'cancel' : 'correct'} onPress={() => cancel('account')} />}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type={!showPassword ? 'password' : 'default'}
          errorMsg={errors.password}
          label={translate('auth.sign-in.passwordLabel') as string}
          placeholder={translate('auth.sign-in.password') as string}
          value={values.password}
          onChange={handleChange('password') as any}
          suffix={<Icons icon={!!errors.password ? 'cancel' : !showPassword ? 'eye' : 'eye_close'} onPress={() => showPass(!showPassword)} />}
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
        <Button
          buttonContainerStyle={{ ...styles.button, backgroundColor: canSubmit ? palette.primary : palette.primary_disabled }}
          label={translate('auth.sign-in.submit') as string}
          onPress={handleSubmit as any}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText} onPress={() => navigation.navigate('Protocol', { uri: 'https://www.baidu.com' })}>{translate('auth.sign-in.loginLabel')}</Text>
          <Button label={translate('auth.sign-in.loginTitle') as string} buttonContainerStyle={{ backgroundColor: palette.transparent }} labelStyle={styles.loginButton} onPress={goSignUpPage} />
        </View>
      </AuthLayout>
    );
  });
