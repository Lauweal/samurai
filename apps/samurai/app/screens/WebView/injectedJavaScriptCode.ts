import { BridgeEvent, MessageEvent } from "@samurai/bridge";
import { Platform } from "react-native";

export function injectedJavaScriptCode(inset: any, token?: string) {
  return `
  (function(){
      window.token = "${token}";
      window.isRN = true;
      window.StatusBar = ${inset.top >= 30 ? inset.top - 15 : inset.top};

      window.subscriptionEvents = {};

      if(${JSON.stringify(Platform.OS)} === 'ios') {
        window.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, method, type,  payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(method)) {
                window.subscriptionEvents[e]({event, method, type,  payload});
              }
            });
          }
        });
      } else {
        document.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, method, type,  payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(method)) {
                window.subscriptionEvents[e]({event, method, type,  payload});
              }
            });
          }
        });
      }
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
      }
  })();
  `;
}
