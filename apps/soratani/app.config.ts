import 'dotenv/config'

export default {
  "expo": {
    "name": "soratani",
    "slug": "soratani",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "platforms": ["ios", "android"],
    "plugins": [
      "sentry-expo"
    ],
    "hooks": {
      "postExport": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": process.env.SENTRY_ORG,
            "project": process.env.SENTRY_APP_PROJECT,
            "authToken": process.env.SENTRY_APP_AUTH_TOKEN
          }
        }
      ],
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": process.env.SENTRY_ORG,
            "project": process.env.SENTRY_APP_PROJECT,
            "authToken": process.env.SENTRY_APP_AUTH_TOKEN
          }
        }
      ]
    },
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "enabled": true,
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.fred.soratani"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
