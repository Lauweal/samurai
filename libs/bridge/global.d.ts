declare global {
  interface Window {
    bridge: (event: string, payload?: any) => any
  }
}
