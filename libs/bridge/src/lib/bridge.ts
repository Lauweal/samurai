export enum BridgeEvent {
  BACK = 'BACK',
  OPEN_MODAL = 'OPEN_MODAL'
}
export enum Subscription {
  RN = 'RN'
}

export type BridgeEventType = keyof typeof BridgeEvent
export type SubscriptionType = keyof typeof Subscription



export function call(event: BridgeEventType, payload?: any): Promise<any> {
  if ((window as any).bridge) {
    return (window as any).bridge(event, payload)
  }
  return Promise.resolve(null)
}

export function subscription(event: SubscriptionType, callback: any, onec?: boolean) {
  if ((window as any).subscriptionEvents) {
    const name = onec ? Date.now() + '_' + event + 'onec' : Date.now() + '_' + event;
    (window as any).subscriptionEvents[name] = callback
  }
}

export function getStatusBarHeight(): number {
  return (window as any).StatusBar || 0
}
