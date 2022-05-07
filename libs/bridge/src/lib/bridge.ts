export enum BridgeEvent {
  BACK = 'BACK',
  OPEN_MODAL = 'OPEN_MODAL',
  SHAKE = 'SHAKE'
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

const callbacks: Record<string, (data: any) => void | null> = {}
const subscriptionEvents: Record<string, (data: Message) => void | null> = {}

export function createBridge(client: any) {
  return function send(method: BridgeEventType, payload?: any) {
    const time = new Date().getTime();
    const event = `${method}_${time}`;
    if (!client) return Promise.resolve(null)
    client.postMessage(JSON.stringify({
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
}

export function subscription(method: BridgeEventType, callback: (data: Message) => void | null) {
  if (window && (window as any).subscriptionEvents) {
    return (window as any).subscriptionEvents[method] = callback
  }
  return subscriptionEvents[method] = callback
}

export function publish(data: Message) {
  if (window && (window as any).subscriptionEvents) {
    (window as any).subscriptionEvents[data.method](data)
  }
  if (subscriptionEvents[data.method]) {
    subscriptionEvents[data.method](data)
  }
}

export function getStatusBarHeight(): number {
  return (window as any).StatusBar || 0
}
