declare global {
  interface Window {
    ReactNativeWebView: any;
    bridge: (event: string, payload?: any) => any;
  }
}
