
import React, { createContext, useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { fonts, palette, sizes } from '@samurai/design';
import { useStores } from '../../models';
import { Icons, IconType } from '../icons';


const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    paddingTop: sizes.spacing_24,
    paddingBottom: sizes.spacing_24,
    paddingLeft: sizes.spacing_32,
    paddingRight: sizes.spacing_32,
    borderRadius: sizes.radius_12,
    backgroundColor: palette.bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginTop: sizes.spacing_12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: palette.text_1
  },
  message: {
    color: palette.text_2
  },
  close: {
    position: 'absolute', top: -6, right: -6
  }
})

export type INotificationType = 'error'
export interface INotificationPayload {
  type: INotificationType,
  title?: string,
  message?: string,
}

/* eslint-disable-next-line */
export interface NotificationProps {
  children?: JSX.Element
}

export interface INotificationContext {
  dispatch: (payload: INotificationPayload) => void
}

export const NotificationContext = createContext<INotificationContext>({
  dispatch: (payload: INotificationPayload) => {
  }
})

export function Notification(props: NotificationProps) {
  const [message, setMessage] = useState<INotificationPayload | undefined>()
  const { environment } = useStores()
  const dispatch = (payload: INotificationPayload) => {
    setMessage(payload);
  }

  const close = () => {
    setMessage(undefined)
  }

  useEffect(() => {
    environment.api.use({
      request: (config) => {
        return config
      },
      response: (res) => {
        if (Number(res.status) > 300) {
          setMessage({
            type: 'error',
            title: (res.data as any).message
          })
        }
        return res
      }
    })
  }, [])

  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <Modal
        visible={!!message}
        transparent
        animationType='fade'
      >
        <BlurView
          style={styles.blur}
          intensity={10} tint='dark'
        >
          <View style={styles.container}>
            <Icons width={70} color={message?.type === 'error' ? palette.danger : palette.transparent} icon={message?.type as any} />
            <Icons width={40} color={palette.fill_2} style={styles.close} icon="error" onPress={close} />
            {
              message?.title || message?.message ? (
                <View style={styles.content}>
                  {message.title && <Text style={[styles.title, fonts.h2]}> {message?.title}</Text>}
                  {message.message && <Text style={[styles.message, fonts.h4]}>{message?.message}</Text>}
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
