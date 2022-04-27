
import React, { createContext, useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { palette, sizes } from '@samurai/design';


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
    width: 100,
    height: 100,
    borderRadius: sizes.radius_12,
    backgroundColor: palette.bg,
  }
})

export interface INotificationPayload {
  type: any,
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
  const [visible, setVisible] = useState(false)
  const dispatch = (payload: INotificationPayload) => {
    setVisible(true);
  }

  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <Modal
        visible={visible}
        transparent
        animationType='fade'
      >
        <BlurView
          style={styles.blur}
          intensity={5} tint='dark'
        >
          <View style={styles.container}><Text>1</Text></View>
        </BlurView>
      </Modal>
      {props.children}
    </NotificationContext.Provider>
  );
};


export default Notification;
