import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from 'apps/samurai/app/navigators';
import { translate } from 'apps/samurai/app/i18n';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button, Input } from 'apps/samurai/app/components';
import { AuthLayout } from './Layout';
import { Image } from 'react-native';

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
        <Input prefix={<Image style={{ width: 40, height: 40 }} source={require('../../../../assets/radix-icons/envelope-closed.svg')} />} placeholder={translate('auth.sigin.account') as string} />
        <Input placeholder={translate('auth.sigin.account') as string} />
        <Button label='ces' onPress={() => navigation.push('WebBox', { uri: 'http://www.baidu.com' })} />
      </AuthLayout>
    );
  });
