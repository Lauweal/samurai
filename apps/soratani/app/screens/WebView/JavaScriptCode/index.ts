import { extend, http, invoking } from "./extend";
import { historyGo } from "./navigation";

export function injectedJavaScriptCode(inset: any, token?: string) {
  return `
    window.StatusBar = ${inset.top >= 30 ? inset.top - 15 : inset.top};
    ${http(token)}
    ${invoking()}
    ${extend()}
    ${historyGo()}
  `;
}
