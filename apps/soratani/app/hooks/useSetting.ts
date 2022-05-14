import { useFormik } from "formik"
import { useStores, ISetting } from "apps/soratani/app/models"
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native"
import { NavigatorParamList } from "../navigators"

export const defaultEnv: ISetting = {
  server_host: '1.13.190.96',
  server_port: '3333',
  server_protocol: 'http',
  web_host: '192.168.2.2',
  web_protocol: 'http',
  web_port: '4200'
}

export function useEnvSetting(
  schema: any,
) {
  const { settings, uploadApi } = useStores()
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const rout = useRoute()
  const { errors, values, handleChange, handleSubmit, setValues, resetForm } = useFormik<ISetting>({
    initialValues: {
      server_host: settings.server_host || defaultEnv.server_host,
      server_port: settings.server_port || defaultEnv.server_port,
      server_protocol: settings.server_protocol || defaultEnv.server_protocol,
      web_host: settings.web_host || defaultEnv.web_host,
      web_protocol: settings.web_protocol || defaultEnv.web_protocol,
      web_port: settings.web_port || defaultEnv.web_port,
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (a) => {
      settings.save(a);
      uploadApi();
      navigation.reset({
        index: 1,
        routes: [{
          name: 'OnBoarding',
        }]
      })
    }
  })

  return {
    errors,
    values,
    handleChange,
    handleSubmit
  }
}
