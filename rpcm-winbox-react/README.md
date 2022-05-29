# rpcm-winbox-react
> Winbox.js react module

## Install

```bash
npm install --save react
npm install --save react-dom
npm install --save winbox
npm install --save rpcm-winbox-react
```

## Usage in functional components

```jsx
import React from "react";
import WbModal from "rpcm-winbox-react";

var SimpleExample = () => {
    return <WbModal />
}
```

```jsx
import React from "react";
import WbModal from "rpcm-winbox-react";

var ComplexExample = () => {
    var handleAction = () => {
        console.log("action");
    }
    var handleClose = () => {
        console.log("close");
    }
    return (
        <WbModal
            timestamp={timestamp}                                   // forces re-render
            onClose={() => handleClose()}                           // modal close handler
            theme="white" 
            modalBodyCssClass="extra-body-styles"
            noMin={true} 
            noMax={true} 
            noFull={true} 
            noClose={true} 
            isVisible={isModalVisible}
            noResize={true} 
            winboxCloseButtonId="btnCloseWinbox"                    // specify a modal close button
            isSingleton={false}
            styles={{
                modal: {"border-radius": "12px 12px 0 0"}, 
                body: {"font-family": "none"}, 
                title: {"color": "white"},
                header: {}
            }} 
            title="Mega Modal"
            recenterOnRerender={false}
            headerBackgroundColor="linear-gradient(rgb(20, 127, 193), rgb(34, 148, 218))"
            modal={false}>
            <div className="wbmodal-main-content">
                <div>
                    <textarea rows="10" style="width:90%"></textarea>
                </div>
                <div style={{ textAlign: "right" }}>
                    <button id="btnCloseWinbox" type="button" className="btn btn-default pointer">Close</button>
                    <button type="button" className="btn btn-default pointer" onClick={() => handleAction()}>Process</button>
                </div>
            </div>
        </WbModal>
    )
}
```

### Props

```jsx
var options = {
    /****
     *
     * default 
     * 
     */
    title: string,                                          // default "Modal"
    border: number,                                         // default 0
    headerBackgroundColor: string,                          // background style for the modal header
                                                            // default linear-gradient(90deg, #ff00f0, #0050ff)

    x: string | number | 'center',                          // default center
    y: string | number | 'center',                          // default center
    modal: boolean,                                         // default false
    minWidth: number,                                       // default 500
    theme: string,                                          // take from the Winbox themes, check Winbox docs for more info 
                                                            // default modern

    isSingleton: boolean,                                   // true keeps a Winbox instance inmemory/DOM. 
                                                            // false kills instance and removes from DOM
                                                            // default true

    /****
     *
     * additional 
     * 
     */
    noAnimation: boolean,                                   // handles modal animations
    noShadow: boolean,                                      // handles modal shadow
    noHeader: boolean,                                      // handles header visibility
    noMin: boolean,                                         // handles minimize button
    noMax: boolean,                                         // handles maximize button
    noFull: boolean,                                        // handles fullscreen button
    noClose: boolean,                                       // handles close button
    noResize: boolean,                                      // handles modal resizing
    noMove: boolean,                                        // handles modal draggability


    hide: boolean,                                          // handles modal visibility on modal creation
    isVisible: boolean,                                     // handles modal visibility on modal render
    border: number,                                         // Set the border width of the window (supports all css units, like px, %, em, rem, vh, vmax)

    timestamp: number,                                      // provides re-rendering when value changes, usefull when modal content changes
    
    top: string | number,                                   // Define the available area (relative to the document) in which the window can move or could be resized (supports units "px" and "%").
    bottom: string | number,                                // Define the available area (relative to the document) in which the window can move or could be resized (supports units "px" and "%").
    left: string | number,                                  // Define the available area (relative to the document) in which the window can move or could be resized (supports units "px" and "%").
    right: string | number,                                 // Define the available area (relative to the document) in which the window can move or could be resized (supports units "px" and "%").
    height: string | number,                                // Supports "right" for x-axis, "bottom" for y-axis, "center" for both, units "px" and "%" also for both.
    width: string | number,                                 // Supports "right" for x-axis, "bottom" for y-axis, "center" for both, units "px" and "%" also for both.

    onclose: function(),
    onmove: function(),
    onresize: function(),
    onblur: function(),
    onfocus: function(),

    modalCssClass: string,                                  // add extra CSS classes to the respective DOM elements
    modalHeaderCssClass: string,                            // add extra CSS classes to the respective DOM elements
    modalTitleCssClass: string,                             // add extra CSS classes to the respective DOM elements
    modalBodyCssClas: string,                               // add extra CSS classes to the respective DOM elements

    winboxCloseButtonId: string,                            // specify a DOM element ID which handles the modal close method.
    recenterOnRerender: boolean,                            // sets to center/center (x,y) uppon rerendering when true
    
    styles: Object                                          // adds additional inline styles directly to the specified elements
}
```