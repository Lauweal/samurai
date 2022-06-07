import { createContext } from "react";

export type INotificationType = 'error' | 'success' | 'warning';
export interface INotificationPayload {
  type: INotificationType,
  title?: string,
  message?: string,
}


export interface INotificationContext {
  dispatch: (payload: INotificationPayload) => void
}

export const NotificationContext = createContext<INotificationContext>({
  dispatch: (payload: INotificationPayload) => {
  }
})
