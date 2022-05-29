import React from "react";
import ReactDOM from 'react-dom/client';
import WinBox from "winbox/src/js/winbox";
import 'winbox/dist/css/winbox.min.css'
import 'winbox/dist/css/themes/modern.min.css'
import 'winbox/dist/css/themes/white.min.css'

var wbr = (props) => {
    var mem = React.useRef({ isMounted: false, winboX: null});

    var buildModalInstance = (id) => {
        var winboxOptions = {
            border: props.border,
            background: props.headerBackgroundColor,
            x: props.x,
            y: props.y,
            width: props.width || props.minWidth,
            height: props.height,
            top: props.top,
            left: props.left,
            right: props.right,
            bottom: props.bottom,
            modal: props.modal,
            class: props.theme
        }
        winboxOptions.id = id || ("winbox-" + new Date().getTime());
        var t = new WinBox(props.title, winboxOptions);

        props.noAnimation ? t.addClass("no-animation") : null;
        props.noClose ? t.addClass("no-close") : t.removeClass("no-close");
        props.noFull ? t.addClass("no-full") : t.removeClass("no-full");
        props.noMin ? t.addClass("no-min") : t.removeClass("no-min");
        props.noMax ? t.addClass("no-max") : t.removeClass("no-max");
        props.noMove ? t.addClass("no-move") : t.removeClass("no-move");
        props.noHeader ? t.addClass("no-header") : t.removeClass("no-header");
        props.noResize ? t.addClass("no-resize") : t.removeClass("no-resize");
        props.noShadow ? t.addClass("no-shadow") : t.removeClass("no-shadow");
        props.modal ? t.addClass("no-modal") : t.removeClass("no-modal");
        props.hide ? t.addClass("no-hide") : t.removeClass("no-hide");

        t.onfocus = () => { props.onfocus && props.onfocus(); };
        t.onblur = () => { props.onblur && props.onblur(); };
        t.onresize = (width, height) => { props.onresize && props.onresize(width, height); };
        t.onmove = (x, y) => { props.onresize && props.onresize(x, y); };
        t.onclose = () => {
            props.onClose && props.onClose();
            // if its closed from the inbuilt "Title close button", we recreate a new instance with current ID
            buildModalInstance(mem.current.winboX.id);
        };
        if(props.styles) {
            Object.keys(props.styles).forEach(el => {
                switch (el) {
                    case "modal":
                        Object.keys(props.styles[el]).forEach(key => {
                            t.dom.style.setProperty(key, props.styles[el][key]);
                            t.dom["_s_" + key] = props.styles[el][key];
                        });
                        break;
                    case "header":
                        var wbHeader = t.dom.getElementsByClassName("wb-header")[0];
                        Object.keys(props.styles[el]).forEach(key => {
                            wbHeader.style.setProperty(key, props.styles[el][key]);
                            wbHeader["_s_" + key] = props.styles[el][key];
                        });
                        break;
                    case "title":
                        var wbTitle = t.dom.getElementsByClassName("wb-title")[0];
                        Object.keys(props.styles[el]).forEach(key => {
                            wbTitle.style.setProperty(key, props.styles[el][key]);
                            wbTitle["_s_" + key] = props.styles[el][key];
                        });
                        break;
                    case "body":
                        var wbBody = t.dom.getElementsByClassName("wb-body")[0];
                        Object.keys(props.styles[el]).forEach(key => {
                            wbBody.style.setProperty(key, props.styles[el][key]);
                            wbBody["_s_" + key] = props.styles[el][key];
                        });
                        break;
                    default:
                        break;
                }
            });
        }
        if(props.modalCssClass) { t.dom.className = t.dom.className + " " + props.modalCssClass; }
        if(props.modalHeaderCssClass) {
            var wbHeader = t.dom.getElementsByClassName("wb-header")[0];
            wbHeader.className = wbHeader.className + " " + props.modalHeaderCssClass;
        }
        if(props.modalTitleCssClass) {
            var wbTitle = t.dom.getElementsByClassName("wb-title")[0];
            wbTitle.className = wbTitle.className + " " + props.modalTitleCssClass;
        }
        if(props.modalBodyCssClass) {
            var wbBody = t.dom.getElementsByClassName("wb-body")[0];
            wbBody.className = wbBody.className + " " + props.modalBodyCssClass;
        }
        mem.current.winboX = t;
        mem.current.winboxRoot = ReactDOM.createRoot(t.body);
        renderContent();
    };   
    var handleClose = () => {
        mem.current.winboX.close();
    };
    var mapRecursive = (children) => {
        return React.Children.map(children, child => {
            if(!child) return;
            var childProps = {};
            if (React.isValidElement(child)) {
                if(child.props.id === props.winboxCloseButtonId) {
                    if(props.isSingleton) {
                        childProps = {onClick: () => {props.onClose()}};
                    } else {
                        childProps = {onClick: () => {handleClose()}};
                    }                    
                }
            }
            if (child.props) {
                childProps.children = mapRecursive(child.props.children);
                return React.cloneElement(child, childProps);
            }
            return child;
        })
    };
    var renderContent = () => {
        if (props.children) {
            var clonedChildren = mapRecursive(props.children);
            if (Array.isArray(props.children)) {
                mem.current.winboxRoot.render(clonedChildren ?? []);
            } else {
                mem.current.winboxRoot.render(clonedChildren);
            }
        }              
    };
    React.useEffect(() => {
        if (mem.current.isMounted) {
            if(props.isVisible) {
                if(!mem.current.winboX) buildModalInstance();
                renderContent(); 
            }            
        } else {
            mem.current.isMounted = true;
            buildModalInstance();
        }
        if(props.isVisible) {
            mem.current.winboX?.show?.();  
        } else {
            mem.current.winboX?.hide?.();
        }
        return () => {   
            setTimeout(() => {   
                if(!mem.current.winboX) return;
                var wbBody = mem.current.winboX.dom.getElementsByClassName("wb-body"), 
                    wbHeader = mem.current.winboX.dom.getElementsByClassName("wb-header"), 
                    height = mem.current.winboX.height;
                if(wbBody.length && wbBody[0].children.length) {
                    var bodyContainer = wbBody[0].children[0];
                    var headerHeight = (wbHeader[0].clientHeight || 0);
                    var childrenHeigth = bodyContainer.clientHeight;
                    var childrenMargin = (parseInt((window.getComputedStyle(bodyContainer).marginTop || "").replace("px", "")) || 0) + 
                                        (parseInt((window.getComputedStyle(bodyContainer).marginBottom || "").replace("px", "")) || 0);
                    height = headerHeight+childrenHeigth+childrenMargin;
                }
                var width = (props.width || 0) < props.minWidth ? props.minWidth : props.width;
                mem.current.winboX.resize(width || mem.current.winboX.width, props.height || height);
                mem.current.winboX.move(props.recenterOnRerender ? props.x || mem.current.winboX.x : mem.current.winboX.x, 
                    props.recenterOnRerender ? props.y || mem.current.winboX.y : mem.current.winboX.y);     
            }, 0);     
        };
    }, [props.timestamp]);
    return (null)
};

wbr.defaultProps = {
    title: "Modal",
    border: 0,
    headerBackgroundColor: "linear-gradient(90deg, #ff00f0, #0050ff)",
    x: "center",
    y: "center",
    modal: false,
    minWidth: 500,
    theme: "modern",
    isSingleton: true
};

export default wbr;