import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "fontFamily": "'Roboto', 'Helvetica', sans-serif",
        "fontSize": 14
    },
    "body": {
        "fontFamily": "'Roboto', 'Helvetica', sans-serif",
        "fontSize": 14
    },
    "demo-avatar": {
        "width": 48,
        "height": 48,
        "borderRadius": 24
    },
    "demo-layout mdl-layout__header mdl-layout__drawer-button": {
        "color": "rgba(0, 0, 0, 0.54)"
    },
    "mdl-layout__drawer avatar": {
        "marginBottom": 16
    },
    "demo-drawer": {
        "border": "none"
    },
    "demo-drawer mdl-menu__container": {
        "zIndex": 1
    },
    "demo-drawer demo-navigation": {
        "zIndex": -2
    },
    "demo-drawer mdl-menu mdl-menu__item": {
        "display": "flex",
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center"
    },
    "demo-drawer-header": {
        "boxSizing": "border-box",
        "display": "flex",
        "WebkitFlexDirection": "column",
        "MsFlexDirection": "column",
        "flexDirection": "column",
        "WebkitJustifyContent": "flex-end",
        "MsFlexPack": "end",
        "justifyContent": "flex-end",
        "paddingTop": 16,
        "paddingRight": 16,
        "paddingBottom": 16,
        "paddingLeft": 16,
        "height": 151
    },
    "demo-avatar-dropdown": {
        "display": "flex",
        "position": "relative",
        "WebkitFlexDirection": "row",
        "MsFlexDirection": "row",
        "flexDirection": "row",
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center",
        "width": "100%"
    },
    "demo-navigation": {
        "WebkitFlexGrow": 1,
        "MsFlexPositive": 1,
        "flexGrow": 1
    },
    "demo-layout demo-navigation mdl-navigation__link": {
        "display": "flex !important",
        "WebkitFlexDirection": "row",
        "MsFlexDirection": "row",
        "flexDirection": "row",
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center",
        "color": "rgba(255, 255, 255, 0.56)",
        "fontWeight": "500"
    },
    "demo-layout demo-navigation mdl-navigation__link:hover": {
        "backgroundColor": "#00BCD4",
        "color": "#37474F"
    },
    "demo-navigation mdl-navigation__link material-icons": {
        "fontSize": 24,
        "color": "rgba(255, 255, 255, 0.56)",
        "marginRight": 32
    },
    "demo-content": {
        "maxWidth": 1080
    },
    "demo-charts": {
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center"
    },
    "demo-chart:nth-child(1)": {
        "color": "#ACEC00"
    },
    "demo-chart:nth-child(2)": {
        "color": "#00BBD6"
    },
    "demo-chart:nth-child(3)": {
        "color": "#BA65C9"
    },
    "demo-chart:nth-child(4)": {
        "color": "#EF3C79"
    },
    "demo-graphs": {
        "paddingTop": 16,
        "paddingRight": 32,
        "paddingBottom": 16,
        "paddingLeft": 32,
        "display": "flex",
        "WebkitFlexDirection": "column",
        "MsFlexDirection": "column",
        "flexDirection": "column",
        "WebkitAlignItems": "stretch",
        "MsFlexAlign": "stretch",
        "alignItems": "stretch"
    },
    "_:-ms-input-placeholder": {
        "minHeight": 664,
        "maxHeight": 300
    },
    ":root demo-graphs": {
        "minHeight": 664
    },
    ":root demo-graph": {
        "maxHeight": 300
    },
    "demo-graph:nth-child(1)": {
        "color": "#00b9d8"
    },
    "demo-graph:nth-child(2)": {
        "color": "#d9006e"
    },
    "demo-cards": {
        "WebkitAlignItems": "flex-start",
        "MsFlexAlign": "start",
        "alignItems": "flex-start",
        "WebkitAlignContent": "flex-start",
        "MsFlexLinePack": "start",
        "alignContent": "flex-start"
    },
    "demo-cards demo-separator": {
        "height": 32
    },
    "demo-cards mdl-card__titlemdl-card__title": {
        "color": "white",
        "fontSize": 24,
        "fontWeight": "400"
    },
    "demo-cards ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "demo-cards h3": {
        "fontSize": 1
    },
    "demo-updates mdl-card__title": {
        "minHeight": 200,
        "backgroundImage": "url('images/dog.png')",
        "backgroundPosition": "90% 100%",
        "backgroundRepeat": "no-repeat"
    },
    "demo-cards mdl-card__actions a": {
        "color": "#00BCD4",
        "textDecoration": "none"
    },
    "demo-options h3": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "demo-options mdl-checkbox__box-outline": {
        "borderColor": "rgba(255, 255, 255, 0.89)"
    },
    "demo-options ul": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "listStyleType": "none"
    },
    "demo-options li": {
        "marginTop": 4,
        "marginRight": 0,
        "marginBottom": 4,
        "marginLeft": 0
    },
    "demo-options material-icons": {
        "color": "rgba(255, 255, 255, 0.89)"
    },
    "demo-options mdl-card__actions": {
        "height": 64,
        "display": "flex",
        "boxSizing": "border-box",
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center"
    }
});
