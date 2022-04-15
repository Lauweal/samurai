import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/samurai/src/navigators';
import { translate } from 'apps/samurai/src/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button, Input } from 'apps/samurai/src/components';
import { AuthLayout } from './Layout';

export const Sigin: FC<NativeStackScreenProps<NavigatorParamList, 'Sigin'>> =
  observer(function Sigin({ navigation }) {
    const back = () => {
      navigation.push('OnBoarding');
    };

    return (
      <AuthLayout
        title={translate('auth.sigin.title') as string}
        subtitle={translate('auth.sigin.description') as string}
      >
        <Input placeholder={translate('auth.sigin.account') as string} />
        <Button label='ces' onPress={() => navigation.push('WebBox', { uri: 'http://www.baidu.com' })} />
      </AuthLayout>
    );
  });
