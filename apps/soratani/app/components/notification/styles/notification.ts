import { palette, sizes } from "@samurai/design";
import { StyleSheet } from "react-native";

export const notificationStyles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    paddingTop: sizes.spacing_24,
    paddingBottom: sizes.spacing_24,
    paddingLeft: sizes.spacing_32,
    paddingRight: sizes.spacing_32,
    borderRadius: sizes.radius_12,
    backgroundColor: palette.bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginTop: sizes.spacing_12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: palette.text_1
  },
  message: {
    color: palette.text_2
  },
  close: {
    position: 'absolute', top: -6, right: -6
  }
})
