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
    "control-wrapper-flex-2": {
        "WebkitFlex": 2,
        "MsFlex": 2,
        "flex": 2
    },
    "template-opt": {
        "minWidth": 280
    },
    "room-list": {
        "height": "auto"
    },
    "roomlist-container": {
        "maxHeight": 600,
        "overflow": "auto",
        "marginLeft": 0,
        "marginTop": 30
    },
    "scroll-style::-webkit-scrollbar-track": {
        "WebkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        "backgroundColor": "#F5F5F5"
    },
    "scroll-style::-webkit-scrollbar": {
        "width": 7,
        "backgroundColor": "#F5F5F5"
    },
    "scroll-style::-webkit-scrollbar-thumb": {
        "backgroundColor": "rgb(33, 150, 243)",
        "border": "1px solid rgb(33, 150, 243)"
    }
});