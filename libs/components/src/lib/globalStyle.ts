import { webFontsAssets } from "@samurai/design"
import { createGlobalStyle } from "styled-components"

function initFonts() {
  return Object.entries(webFontsAssets).reduce((a, b) => {
    const [key, value] = b
    return a + `@font-face { font-family: ${key}; src:url("${value}"); font-display: swap; }`
  }, '')
}

function disabledCopy() {
  return `
      *{
    -webkit-touch-callout:none; /*系统默认菜单被禁用*/

    user-select:none; /*webkit浏览器*/

    -khtml-user-select:none; /*早期浏览器*/

    -moz-user-select:none;/*火狐*/

    -ms-user-select:none; /*IE10*/

    user-select:none;
  }
  input {
    user-select:auto; /*webkit浏览器*/
  }
  `
}

export const GlobalStyle = createGlobalStyle`
  html,body{
    margin: 0px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  #root {
    min-height: 100vh;
  }
  ${disabledCopy()}
  ${initFonts()}
`
