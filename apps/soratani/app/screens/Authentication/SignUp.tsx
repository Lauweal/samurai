import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/soratani/app/navigators';
import { translate } from 'apps/soratani/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button, Input, Switch, Icons } from 'apps/soratani/app/components';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, palette, sizes } from '@samurai/design';
import * as FileSystem from "expo-file-system";
import * as Yup from 'yup';
// import archive from 'react-native-zip-archive'
import { IAccount } from '@samurai/interfaces';
import { AuthLayout } from './Layout';
import { useStores } from 'apps/soratani/app/models';
import { useAuthentication } from './hooks';

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
  password: Yup.string()
    .required(translate('auth.sign-up.required-verification.password') as string)
    .matches(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/, translate('auth.sign-up.verification.password-len') as string),
  affirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], translate('auth.sign-up.verification.equation-affirmPassword') as string)
    .required(translate('auth.sign-up.required-verification.password') as string)
    .matches(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/, translate('auth.sign-up.verification.password-len') as string),
})

export const SignUp: FC<NativeStackScreenProps<NavigatorParamList, 'SignUp'>> =
  observer(function SignUp({ navigation }) {
    FileSystem.downloadAsync('https://samu-1253579870.cos.ap-nanjing.myqcloud.com/packages/h5/h5.zip', `${FileSystem.cacheDirectory}/v1/h5.zip`).then((res) => {
      console.log('file ====> ', res)
    })

    // console.log(archive)
    const { account } = useStores()
    const { errors, values, showPassword, canSubmit, showPass, cancel, handleChange, handleSubmit } = useAuthentication<IAccountParams>({
      account: '',
      password: '',
      affirmPassword: '',
      save: false
    }, SignupSchema, account.sigin)

    const goLoginPage = () => {
      // unzip(`${FileSystem.cacheDirectory}h5.zip`, `${FileSystem.cacheDirectory}h5`).then((res) => {
      //   console.log(res)
      // })
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
          suffix={<Icons color={!!values.account ? palette.success : palette.transparent} icon={!!errors.account ? 'cancel' : 'correct'} onPress={() => cancel('account')} />}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type={!showPassword ? 'password' : 'default'}
          errorMsg={errors.password}
          label={translate('auth.sign-up.passwordLabel') as string}
          placeholder={translate('auth.sign-up.password') as string}
          value={values.password}
          onChange={handleChange('password') as any}
          suffix={<Icons icon={!!errors.password ? 'cancel' : !showPassword ? 'eye' : 'eye_close'} onPress={() => showPass(!showPassword)} />}
        />
        <Input
          containerStyle={{ marginTop: sizes.spacing_16 }}
          type={!showPassword ? 'password' : 'default'}
          errorMsg={errors.affirmPassword}
          label={translate('auth.sign-up.affirm-passwordLabel') as string}
          placeholder={translate('auth.sign-up.affirm-password') as string}
          value={values.affirmPassword}
          onChange={handleChange('affirmPassword') as any}
          suffix={<Icons icon={!!errors.affirmPassword ? 'cancel' : !showPassword ? 'eye' : 'eye_close'} onPress={() => showPass(!showPassword)} />}
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
        <Button buttonContainerStyle={{ ...styles.button, backgroundColor: canSubmit ? palette.primary : palette.primary_disabled }} label={translate('auth.sign-up.submit') as string} onPress={handleSubmit as any} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>{translate('auth.sign-up.loginLabel')}</Text>
          <Button label={translate('auth.sign-up.loginTitle') as string} buttonContainerStyle={{ backgroundColor: palette.transparent }} labelStyle={styles.loginButton} onPress={goLoginPage} />
        </View>
      </AuthLayout>
    );
  });
