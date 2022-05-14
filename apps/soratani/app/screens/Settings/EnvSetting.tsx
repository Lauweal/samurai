import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen, Button, Input, Switch, Icons } from 'apps/soratani/app/components'
import { NavigatorParamList } from "apps/soratani/app/navigators";
import { observer } from "mobx-react-lite";
import { translate } from 'apps/soratani/app/i18n';
import { StyleSheet, View } from 'react-native'
import * as Yup from 'yup';
import { FC } from "react";
import { fonts, palette, sizes } from "@samurai/design";
import { useStores, ISetting } from "apps/soratani/app/models";
import { useEnvSetting } from 'apps/soratani/app/hooks'


const styles = StyleSheet.create({
  container: {
    padding: sizes.spacing_24
  },
  button: {
    height: 55,
    alignItems: 'center',
    marginTop: sizes.spacing_24,
    borderRadius: sizes.spacing_12,
  },
})

const schema = Yup.object().shape({
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

export const EnvSetting: FC<NativeStackScreenProps<NavigatorParamList, 'env'>> =
  observer(function EnvSetting({ navigation }) {
    const { values, handleChange, handleSubmit } = useEnvSetting(schema);
    return (
      <Screen preset="fixed" unsafe>
        <View style={styles.container}>
          <Input
            type="default"
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            label={translate('setting.env.serverprotocol.label') as string}
            onChange={handleChange('server_protocol')}
            placeholder={translate('setting.env.serverprotocol.placeholder') as string}
            value={values.server_protocol}
          />
          <Input
            type="default"
            containerStyle={{ marginTop: sizes.spacing_16 }}
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            onChange={handleChange('server_host')}
            label={translate('setting.env.serverhost.label') as string}
            placeholder={translate('setting.env.serverhost.placeholder') as string}
            value={values.server_host}
          />
          <Input
            type="default"
            containerStyle={{ marginTop: sizes.spacing_16 }}
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            onChange={handleChange('server_port')}
            label={translate('setting.env.serverport.label') as string}
            placeholder={translate('setting.env.serverport.placeholder') as string}
            value={values.server_port}
          />
          <Input
            type="default"
            containerStyle={{ marginTop: sizes.spacing_16 }}
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            onChange={handleChange('web_protocol')}
            label={translate('setting.env.webprotocol.label') as string}
            placeholder={translate('setting.env.webprotocol.placeholder') as string}
            value={values.web_protocol}
          />
          <Input
            type="default"
            containerStyle={{ marginTop: sizes.spacing_16 }}
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            onChange={handleChange('web_host')}
            label={translate('setting.env.webhost.label') as string}
            placeholder={translate('setting.env.webhost.placeholder') as string}
            value={values.web_host}
          />
          <Input
            type="default"
            containerStyle={{ marginTop: sizes.spacing_16 }}
            inputContainerStyle={{ paddingHorizontal: sizes.spacing_12, height: 44 }}
            errorMsg={''}
            onChange={handleChange('web_port')}
            label={translate('setting.env.webport.label') as string}
            placeholder={translate('setting.env.webport.placeholder') as string}
            value={values.web_port}
          />
          <Button
            label={"保存"}
            labelStyle={fonts.body2}
            buttonContainerStyle={{ ...styles.button, backgroundColor: palette.primary }}
            onPress={handleSubmit as any}
          />
        </View>
      </Screen>
    );
  })
