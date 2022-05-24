import { BridgeEvent, MessageEvent } from "@samurai/bridge";
import { Platform } from "react-native";

export function http(token?: string) {
  return `
    (function(open){
      XMLHttpRequest.prototype.open = function () {
        console.log(this, this.setRequestHeader)
        this.setRequestHeader('authorization', 'Basic ${token}');
        this.setRequestHeader('client', 'app')
        open.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype.open);
  `
}

export function invoking() {
  return `
    (function () {
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
    })()
  `;
}

export function extend() {
  return `
    (function (){
      if(${JSON.stringify(Platform.OS)} === 'ios') {
        // 拦截震动
        window.addEventListener('click', function(events) {
          if(['BUTTON'].includes(events.target.nodeName)) {
            const time = new Date().getTime();
            const event = "${BridgeEvent.SHAKE}"+ "_" + time;
            window.ReactNativeWebView.postMessage(JSON.stringify({ event, method:"${BridgeEvent.SHAKE}", type: "${MessageEvent.response}", payload: events.target.nodeName }));
          }
        }, false)
      }
    })()
  `
}
