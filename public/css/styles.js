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
    },
    "warning-cls": {
        "color": "red",
        "fontWeight": "400",
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10,
        "letterSpacing": -0.2,
        "fontSize": 0.8
    },
    "saving-cls": {
        "color": "green",
        "fontWeight": "400",
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10,
        "letterSpacing": -0.2,
        "fontSize": 0.8
    },
    "control-wrapper-container": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "justifyContent": "flex-start",
        "alignItems": "flex-start",
        "alignContent": "flex-start",
        "width": "100%"
    },
    "control-wrapper": {
        "WebkitFlex": 1,
        "MsFlex": 1,
        "flex": 1,
        "marginLeft": 30
    },
    "template-opt": {
        "minWidth": 280
    }
});