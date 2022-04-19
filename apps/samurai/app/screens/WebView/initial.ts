import { Platform } from "react-native";

export function initialJsCode(inset: any) {
  return `
        (function(){
      window.isRN = true;
      window.StatusBar = ${inset.top >= 30 ? inset.top - 15 : inset.top};
      window.bridge = function(method, payload) {
        const time = new Date().getTime();
        return new Promise((res) => {
          window[method + '_' + time] = function(data) {
            res(data)
            window[method + '_' + time] = null
          }
          window.ReactNativeWebView.postMessage(JSON.stringify(
            {
              event: method + '_' + time,
              method,
              payload
            }
          ))
        });
      };

      window.subscriptionEvents = {}

      if(${JSON.stringify(Platform.OS)} === 'ios') {
        window.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(event)) {
                window.subscriptionEvents[e]({ event:e, method:event,  payload })
                if (e.includes('onec') && e.includes(event)) {
                  delete window.subscriptionEvents[e]
                }
              }
            })
          }
        })
      } else {
        document.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(event)) {
                window.subscriptionEvents[e]({ event:e,method:event, payload })
                if (e.includes('onec') && e.includes(event)) {
                  delete window.subscriptionEvents[e]
                }
              }
            })
          }
        })
      }
      const go = window.history.go
      window.history.go = (a) => {
        if (!window.history.state || !window.history.state.key) {
          window.bridge('BACK')
        } else {
          go.call(window.history,a)
        }
      }

    })();
  `;
}
