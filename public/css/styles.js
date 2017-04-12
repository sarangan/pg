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
        "marginRight": 20
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
    },
    "dropzone": {
        "boxSizing": "border-box",
        "minHeight": 150,
        "border": "2px solid rgba(0, 0, 0, 0.3)",
        "background": "white",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20
    },
    "dropzone *": {
        "boxSizing": "border-box"
    },
    "dropzonedz-clickable": {
        "cursor": "pointer"
    },
    "dropzonedz-clickable *": {
        "cursor": "default"
    },
    "dropzonedz-clickable dz-message": {
        "cursor": "pointer"
    },
    "dropzonedz-clickable dz-message *": {
        "cursor": "pointer"
    },
    "dropzonedz-started dz-message": {
        "display": "none"
    },
    "dropzonedz-drag-hover": {
        "borderStyle": "solid"
    },
    "dropzonedz-drag-hover dz-message": {
        "opacity": 0.5
    },
    "dropzone dz-message": {
        "textAlign": "center",
        "marginTop": 2,
        "marginRight": 0,
        "marginBottom": 2,
        "marginLeft": 0
    },
    "dropzone dz-preview": {
        "position": "relative",
        "display": "inline-block",
        "verticalAlign": "top",
        "marginTop": 16,
        "marginRight": 16,
        "marginBottom": 16,
        "marginLeft": 16,
        "minHeight": 100
    },
    "dropzone dz-preview:hover": {
        "zIndex": 1000
    },
    "dropzone dz-preview:hover dz-details": {
        "opacity": 1
    },
    "dropzone dz-previewdz-file-preview dz-image": {
        "borderRadius": 20,
        "background": "linear-gradient(to bottom, #eee, #ddd)"
    },
    "dropzone dz-previewdz-file-preview dz-details": {
        "opacity": 1
    },
    "dropzone dz-previewdz-image-preview": {
        "background": "white"
    },
    "dropzone dz-previewdz-image-preview dz-details": {
        "WebkitTransition": "opacity 0.2s linear",
        "MozTransition": "opacity 0.2s linear",
        "MsTransition": "opacity 0.2s linear",
        "OTransition": "opacity 0.2s linear",
        "transition": "opacity 0.2s linear"
    },
    "dropzone dz-preview dz-remove": {
        "fontSize": 14,
        "textAlign": "center",
        "display": "block",
        "cursor": "pointer",
        "border": "none"
    },
    "dropzone dz-preview dz-remove:hover": {
        "textDecoration": "underline"
    },
    "dropzone dz-preview dz-details": {
        "zIndex": 20,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "opacity": 0,
        "fontSize": 13,
        "minWidth": "100%",
        "maxWidth": "100%",
        "paddingTop": 2,
        "paddingRight": 1,
        "paddingBottom": 2,
        "paddingLeft": 1,
        "textAlign": "center",
        "color": "rgba(0, 0, 0, 0.9)",
        "lineHeight": "150%"
    },
    "dropzone dz-preview dz-details dz-size": {
        "marginBottom": 1,
        "fontSize": 16
    },
    "dropzone dz-preview dz-details dz-filename": {
        "whiteSpace": "nowrap"
    },
    "dropzone dz-preview dz-details dz-filename:hover span": {
        "border": "1px solid rgba(200, 200, 200, 0.8)",
        "backgroundColor": "rgba(255, 255, 255, 0.8)"
    },
    "dropzone dz-preview dz-details dz-filename:not(:hover)": {
        "overflow": "hidden",
        "textOverflow": "ellipsis"
    },
    "dropzone dz-preview dz-details dz-filename:not(:hover) span": {
        "border": "1px solid transparent"
    },
    "dropzone dz-preview dz-details dz-filename span": {
        "backgroundColor": "rgba(255, 255, 255, 0.4)",
        "paddingTop": 0,
        "paddingRight": 0.4,
        "paddingBottom": 0,
        "paddingLeft": 0.4,
        "borderRadius": 3
    },
    "dropzone dz-preview dz-details dz-size span": {
        "backgroundColor": "rgba(255, 255, 255, 0.4)",
        "paddingTop": 0,
        "paddingRight": 0.4,
        "paddingBottom": 0,
        "paddingLeft": 0.4,
        "borderRadius": 3
    },
    "dropzone dz-preview:hover dz-image img": {
        "WebkitTransform": "scale(1.05, 1.05)",
        "MozTransform": "scale(1.05, 1.05)",
        "MsTransform": "scale(1.05, 1.05)",
        "OTransform": "scale(1.05, 1.05)",
        "transform": "scale(1.05, 1.05)",
        "WebkitFilter": "blur(8px)",
        "filter": "blur(8px)"
    },
    "dropzone dz-preview dz-image": {
        "borderRadius": 20,
        "overflow": "hidden",
        "width": 120,
        "height": 120,
        "position": "relative",
        "display": "block",
        "zIndex": 10
    },
    "dropzone dz-preview dz-image img": {
        "display": "block"
    },
    "dropzone dz-previewdz-success dz-success-mark": {
        "WebkitAnimation": "passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "MozAnimation": "passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "MsAnimation": "passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "OAnimation": "passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "animation": "passing-through 3s cubic-bezier(0.77, 0, 0.175, 1)"
    },
    "dropzone dz-previewdz-error dz-error-mark": {
        "opacity": 1,
        "WebkitAnimation": "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "MozAnimation": "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "MsAnimation": "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "OAnimation": "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)",
        "animation": "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)"
    },
    "dropzone dz-preview dz-success-mark": {
        "pointerEvents": "none",
        "opacity": 0,
        "zIndex": 500,
        "position": "absolute",
        "display": "block",
        "top": "50%",
        "left": "50%",
        "marginLeft": -27,
        "marginTop": -27
    },
    "dropzone dz-preview dz-error-mark": {
        "pointerEvents": "none",
        "opacity": 0,
        "zIndex": 500,
        "position": "absolute",
        "display": "block",
        "top": "50%",
        "left": "50%",
        "marginLeft": -27,
        "marginTop": -27
    },
    "dropzone dz-preview dz-success-mark svg": {
        "display": "block",
        "width": 54,
        "height": 54
    },
    "dropzone dz-preview dz-error-mark svg": {
        "display": "block",
        "width": 54,
        "height": 54
    },
    "dropzone dz-previewdz-processing dz-progress": {
        "opacity": 1,
        "WebkitTransition": "all 0.2s linear",
        "MozTransition": "all 0.2s linear",
        "MsTransition": "all 0.2s linear",
        "OTransition": "all 0.2s linear",
        "transition": "all 0.2s linear"
    },
    "dropzone dz-previewdz-complete dz-progress": {
        "opacity": 0,
        "WebkitTransition": "opacity 0.4s ease-in",
        "MozTransition": "opacity 0.4s ease-in",
        "MsTransition": "opacity 0.4s ease-in",
        "OTransition": "opacity 0.4s ease-in",
        "transition": "opacity 0.4s ease-in"
    },
    "dropzone dz-preview:not(dz-processing) dz-progress": {
        "WebkitAnimation": "pulse 6s ease infinite",
        "MozAnimation": "pulse 6s ease infinite",
        "MsAnimation": "pulse 6s ease infinite",
        "OAnimation": "pulse 6s ease infinite",
        "animation": "pulse 6s ease infinite"
    },
    "dropzone dz-preview dz-progress": {
        "opacity": 1,
        "zIndex": 1000,
        "pointerEvents": "none",
        "position": "absolute",
        "height": 16,
        "left": "50%",
        "top": "50%",
        "marginTop": -8,
        "width": 80,
        "marginLeft": -40,
        "background": "rgba(255, 255, 255, 0.9)",
        "WebkitTransform": "scale(1)",
        "borderRadius": 8,
        "overflow": "hidden"
    },
    "dropzone dz-preview dz-progress dz-upload": {
        "background": "linear-gradient(to bottom, #666, #444)",
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "width": 0,
        "WebkitTransition": "width 300ms ease-in-out",
        "MozTransition": "width 300ms ease-in-out",
        "MsTransition": "width 300ms ease-in-out",
        "OTransition": "width 300ms ease-in-out",
        "transition": "width 300ms ease-in-out"
    },
    "dropzone dz-previewdz-error dz-error-message": {
        "display": "block"
    },
    "dropzone dz-previewdz-error:hover dz-error-message": {
        "opacity": 1,
        "pointerEvents": "auto"
    },
    "dropzone dz-preview dz-error-message": {
        "pointerEvents": "none",
        "zIndex": 1000,
        "position": "absolute",
        "display": "none",
        "opacity": 0,
        "WebkitTransition": "opacity 0.3s ease",
        "MozTransition": "opacity 0.3s ease",
        "MsTransition": "opacity 0.3s ease",
        "OTransition": "opacity 0.3s ease",
        "transition": "opacity 0.3s ease",
        "borderRadius": 8,
        "fontSize": 13,
        "top": 130,
        "left": -10,
        "width": 140,
        "background": "linear-gradient(to bottom, #be2626, #a92222)",
        "paddingTop": 0.5,
        "paddingRight": 1.2,
        "paddingBottom": 0.5,
        "paddingLeft": 1.2,
        "color": "white"
    },
    "dropzone dz-preview dz-error-message:after": {
        "content": "''",
        "position": "absolute",
        "top": -6,
        "left": 64,
        "width": 0,
        "height": 0,
        "borderLeft": "6px solid transparent",
        "borderRight": "6px solid transparent",
        "borderBottom": "6px solid #be2626"
    }
});