import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/samurai/app/navigators';
import { translate } from 'apps/samurai/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { useFormik } from 'formik'
import { Button, Input, NotificationContext } from 'apps/samurai/app/components';
import { StyleSheet, View } from 'react-native';
import { sizes } from '@samurai/design';
import * as Yup from 'yup';
import { IAccount } from '@samurai/interfaces';
import { AuthLayout } from './Layout';
import { useStores } from 'apps/samurai/app/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: sizes.spacing_32,
    alignItems: 'center'
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: sizes.radius_full,
  },
});

const SignupSchema = Yup.object().shape({
  account: Yup.string().email('请输入正确的邮箱地址').required(),
  password: Yup.string().required('请输入密码')
})

export const Sigin: FC<NativeStackScreenProps<NavigatorParamList, 'Sigin'>> =
  observer(function Sigin({ navigation }) {
    const notification = useContext(NotificationContext)
    const { account } = useStores()
    const { errors, values, handleChange, handleSubmit } = useFormik<IAccount>({
      initialValues: {
        account: '',
        password: ''
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: SignupSchema,
      onSubmit: (a) => {
        account.login(a).then((token) => {
          navigation.push('WebBox', { token })
        }).catch((e) => {
          notification.dispatch({ type: '1' })
        })
        // notification.dispatch({ type: '1' })
      }
    })

    useEffect(() => {
      console.log(errors)
    }, [errors])

    return (
      <AuthLayout
        title={translate('auth.sigin.title') as string}
        subtitle={translate('auth.sigin.description') as string}
      >
        <Input placeholder={translate('auth.sigin.account') as string} value={values.account} onChange={handleChange('account')} />
        <Input type='password' placeholder={translate('auth.sigin.account') as string} value={values.password} onChange={handleChange('password')} />
        <View style={styles.container}>
          <Button buttonContainerStyle={styles.button} label={translate('auth.sigin.submit') as string} onPress={handleSubmit as any} />
        </View>
      </AuthLayout>
    );
  });
