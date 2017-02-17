import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "menu-item": {
        "textDecoration": "none"
    },
    "page-title": {
        "color": "#0D47A1"
    },
    "page-title::first-letter": {
        "textDecoration": "underline"
    }
});