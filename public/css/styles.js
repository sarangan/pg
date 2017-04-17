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
        "marginLeft": 30,
        "width": "75%"
    },
    "control-wrapper-flex-2": {
        "WebkitFlex": 2,
        "MsFlex": 2,
        "flex": 2,
        "width": "25%"
    },
    "roomlist-right-div": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "maxHeight": 700,
        "overflow": "auto"
    },
    "roomlist-right-wrapper": {
        "height": "auto",
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10
    },
    "roomlist-right-wrapper-snd": {
        "height": "auto"
    },
    "template-opt": {
        "minWidth": 280
    },
    "room-list": {
        "height": "auto"
    },
    "roomlist-container": {
        "maxHeight": 800,
        "overflow": "auto",
        "marginLeft": 0,
        "marginTop": 10,
        "maxWidth": 275
    },
    "gen-condition-title": {
        "float": "left"
    },
    "gen-condition-title::after": {
        "content": "''",
        "display": "table",
        "clear": "both"
    },
    "float-left": {
        "float": "left"
    },
    "float-left::after": {
        "content": "''",
        "display": "table",
        "clear": "both"
    },
    "clear-float": {
        "content": "''",
        "display": "table",
        "clear": "both"
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
    },
    "gen-list": {
        "position": "relative"
    },
    "vertbtn": {
        "position": "absolute !important",
        "right": 0,
        "top": 0
    },
    "addButtonWrapper": {
        "float": "right"
    },
    "addButtonWrapper::after": {
        "content": "''",
        "display": "table",
        "clear": "both"
    },
    "photo-items": {
        "position": "relative",
        "overflow": "hidden",
        "minWidth": "100%",
        "color": "rgb(0, 188, 212)",
        "marginRight": 20,
        "maxHeight": 150
    },
    "close": {
        "color": "white",
        "position": "absolute",
        "top": 10,
        "right": 25,
        "fontSize": 35,
        "fontWeight": "bold"
    },
    "close:hover": {
        "color": "#999",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "close:focus": {
        "color": "#999",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "modal": {
        "display": "none",
        "position": "fixed",
        "zIndex": 1500,
        "paddingTop": 100,
        "left": 0,
        "top": 0,
        "width": "100%",
        "height": "100%",
        "overflow": "auto",
        "backgroundColor": "rgba(0, 0, 0, 0.83)",
        "textAlign": "center"
    },
    "SortableList": {
        "position": "relative",
        "zIndex": 0,
        "backgroundColor": "#F3F3F3",
        "border": "1px solid #E0E0E0",
        "borderRadius": 3,
        "outline": "none",
        "width": "80%",
        "overflow": "auto",
        "WebkitOverflowScrolling": "touch",
        "listStyle": "none",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "SortableItem": {
        "display": "flex",
        "WebkitBoxAlign": "center",
        "WebkitAlignItems": "center",
        "MsFlexAlign": "center",
        "alignItems": "center",
        "width": "100%",
        "height": 60,
        "paddingTop": 0,
        "paddingRight": 20,
        "paddingBottom": 0,
        "paddingLeft": 20,
        "backgroundColor": "#FFF",
        "borderBottom": "1px solid #EFEFEF",
        "boxSizing": "border-box",
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "color": "#333",
        "fontWeight": "500"
    },
    "dropzoneItem": {
        "borderRadius": "10px 10px 10px 10px",
        "MozBorderRadius": "10px 10px 10px 10px",
        "WebkitBorderRadius": "10px 10px 10px 10px",
        "border": "2px dashed #544d54"
    },
    "lisort": {
        "marginRight": 10,
        "position": "'relative'",
        "marginTop": 5,
        "cursor": "pointer"
    },
    "filepicker": {
        "fontFamily": "sans-serif"
    },
    "divfilepicker": {
        "textAlign": "center",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "backgroundColor": "#E1E1E1",
        "borderRadius": 5,
        "minHeight": 60,
        "border": "2px dashed #C7C7C7"
    },
    "filepicker-file-icon": {
        "position": "relative",
        "display": "inline-block",
        "marginTop": 1.5,
        "marginRight": 0,
        "marginBottom": 2.5,
        "marginLeft": 0,
        "paddingLeft": 45,
        "color": "black"
    },
    "filepicker-file-icon::before": {
        "position": "absolute",
        "top": -7,
        "left": 0,
        "width": 29,
        "height": 34,
        "content": "''",
        "border": "solid 2px #7F7F7F",
        "borderRadius": 2
    },
    "filepicker-file-icon::after": {
        "fontSize": 11,
        "lineHeight": 1.3,
        "position": "absolute",
        "top": 9,
        "left": -4,
        "paddingTop": 0,
        "paddingRight": 2,
        "paddingBottom": 0,
        "paddingLeft": 2,
        "content": "attr(data-filetype)",
        "textAlign": "right",
        "letterSpacing": 1,
        "textTransform": "uppercase",
        "color": "#fff",
        "backgroundColor": "#000"
    },
    "filepicker-file-icon fileCorner": {
        "position": "absolute",
        "top": -7,
        "left": 22,
        "width": 0,
        "height": 0,
        "borderWidth": "11px 0 0 11px",
        "borderStyle": "solid",
        "borderColor": "white transparent transparent #920035"
    }
});