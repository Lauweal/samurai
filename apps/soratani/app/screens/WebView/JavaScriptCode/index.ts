import { ColorSchemeName } from "react-native";
import { extend, http, invoking } from "./extend";
import { historyGo } from "./navigation";

export function injectedJavaScriptCode(inset: any, token?: string, theme?: ColorSchemeName) {
  return `
    (function () {
      window.StatusBar = ${inset.top >= 30 ? inset.top - 15 : inset.top};
      window.theme = '${theme}';
      ${http(token)}
      ${invoking()}
      ${extend()}
      ${historyGo()}
    })()
  `;
}
