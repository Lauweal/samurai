
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, Modal } from 'react-native';
import { fonts, palette } from '@samurai/design';
import { Icons } from '../icons';
import { INotificationPayload, NotificationContext } from './interface';
import { notificationStyles } from './styles/notification';



/* eslint-disable-next-line */
export interface NotificationProps {
  children?: JSX.Element
}

export function Notification(props: NotificationProps) {
  const [message, setMessage] = useState<INotificationPayload | undefined>()
  const dispatch = (payload: INotificationPayload) => {
    setMessage(payload);
  }

  const close = () => {
    setMessage(undefined)
  }

  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <Modal
        visible={!!message}
        transparent
        animationType='fade'
      >
        <BlurView
          style={notificationStyles.blur}
          intensity={10} tint='dark'
        >
          <View style={notificationStyles.container}>
            <Icons width={70} color={message?.type === 'error' ? palette.danger : palette.transparent} icon={message?.type as any} />
            <Icons width={40} color={palette.fill_2} style={notificationStyles.close} icon="error" onPress={close} />
            {
              message?.title || message?.message ? (
                <View style={notificationStyles.content}>
                  {message.title && <Text style={[notificationStyles.title, fonts.h2]}> {message?.title}</Text>}
                  {message.message && <Text style={[notificationStyles.message, fonts.h4]}>{message?.message}</Text>}
                </View>
              ) : null
            }
          </View>
        </BlurView>
      </Modal>
      {props.children}
    </NotificationContext.Provider >
  );
};


export default Notification;
