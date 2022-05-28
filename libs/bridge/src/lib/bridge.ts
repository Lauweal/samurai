export enum BridgeEvent {
  BACK = 'BACK',
  OPEN_MODAL = 'OPEN_MODAL',
  SHAKE = 'SHAKE',
  THEME = 'THEME'
}


export enum MessageEvent {
  request = 'request',
  response = 'response',
}

export type MessageEventType = keyof typeof MessageEvent
export type BridgeEventType = keyof typeof BridgeEvent
export type Message = {
  type: MessageEventType,
  method: string;
  event: string;
  payload: any
}

export interface IBridge {
  subscription: (method: BridgeEventType, callback: (data: Message) => void | null) => (data: Message) => void | null
  send: (method: BridgeEventType, payload?: any) => Promise<unknown>
  publish: (data: Message) => void
}

const callbacks: Record<string, (data: any) => void | null> = {}
const subscriptionEvents: Record<string, (data: Message) => void | null> = {}

export function createBridge(client: any): IBridge {
  function subscription(method: BridgeEventType, callback: (data: Message) => void | null) {
    if (window && (window as any).subscriptionEvents) {
      return (window as any).subscriptionEvents[method] = callback
    }
    return subscriptionEvents[method] = callback
  }

  function publish(data: Message) {
    if (window && (window as any).subscriptionEvents) {
      (window as any).subscriptionEvents[data.method](data)
    }
    if (subscriptionEvents[data.method]) {
      subscriptionEvents[data.method](data)
    }
  }
  function send(method: BridgeEventType, payload?: any) {
    const time = new Date().getTime();
    const event = `${method}_${time}`;
    const postMessage = client.ReactNativeWebView ? client.ReactNativeWebView.postMessage : client.postMessage;
    if (!client) return Promise.resolve(null)
    postMessage(JSON.stringify({
      method, event, type: MessageEvent.request, payload
    }));
    if (window) {
      return new Promise((res) => {
        (window as any)[event as any] = function (data: any) {
          res(data);
          (window as any)[event as any] = null;
        }
      })
    }
    return new Promise((res) => {
      callbacks[event as any] = function (data: any) {
        res(data);
        (callbacks[event as any] as any) = null
      }
    })
  }
  return { send, publish, subscription }
}

export function getStatusBarHeight(number?: number): number {
  const top = number || 0;
  return ((window as any).StatusBar + top) || 0
}

export function getTheme(): 'light' | 'dark' {
  return ((window as any).theme) || 'light';
}
