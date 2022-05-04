import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useNavigation, CommonActions } from '@react-navigation/native';

export type IAuthenticationService<S = any> = (params: S) => Promise<string | null | undefined>

export function useAuthentication<S = any>(
  _defaultValue: S,
  schema: any,
  service: IAuthenticationService<S>
) {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const { errors, values, handleChange, handleSubmit, setValues, resetForm } = useFormik<S>({
    initialValues: _defaultValue,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: schema,
    onSubmit: (a) => {
      service(a).then((token) => {
        if (token) {
          resetForm()
          navigation.dispatch(CommonActions.navigate('WebBox', { token }))
        }
      })
    }
  })

  const isInitial = useCallback(() => Object.entries(values).some((v) => (_defaultValue as any)[v[0]] != v[1]), [values])

  const canSubmit = useMemo(() => {
    return !Object.keys(errors).length &&
      isInitial()
  }, [errors, values])

  const showPass = (status: boolean) => {
    setShowPassword(status)
  }

  const cancel = (_key: keyof S) => {
    setValues(Object.entries(values).reduce((a: any, b: any) => {
      const [key, value] = b
      if (key !== _key) { a[key] = value }
      return a;
    }, {}))
  }

  return {
    errors,
    values,
    canSubmit,
    cancel,
    showPassword,
    showPass,
    handleChange,
    handleSubmit
  }
}
