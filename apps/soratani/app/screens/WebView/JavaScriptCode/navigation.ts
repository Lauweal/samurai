import { BridgeEvent, MessageEvent } from "@samurai/bridge";

export function historyGo() {
  return `
      const go = window.history.go;
      // 对浏览器的go 方法兼容，在h5内使用无感知
      window.history.go = (a) => {
        if (!window.history.state || !window.history.state.key) {
          const time = new Date().getTime();
          const event = "${BridgeEvent.BACK}"+ "_" + time;
          window.ReactNativeWebView.postMessage(JSON.stringify({ event, method:"${BridgeEvent.BACK}", type: "${MessageEvent.response}" }));
          window["${BridgeEvent.BACK}" + '_' + time] = function call(data) {
            window["${BridgeEvent.BACK}" + '_' + time] = null;
          }
        } else {
          go.call(window.history,a)
        }
      };
  `;
}
