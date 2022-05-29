// core
import React from "react";
import ReactDOM from "react-dom/client";
import WbModal from "rpcm-winbox-react";

import "./app.css";

var App = () => {
    var mem = React.useRef({isMounted: false, mainContainer: null});
    var [isModalVisible, setIsModalVisible] = React.useState(false);
    var [timestamp, setTimestamp] = React.useState(null);
    var [isExtended, setIsExtended] = React.useState(false);
    var [textAreasData, setTextAreasData] = React.useState({ta1: "", ta2: ""});

    var handlerRender = () => {
        setTimestamp(new Date().getTime());
    }
    var handleShowModal = () => {
        console.log("Showing Modal");
        setIsModalVisible(true);
        handlerRender();
    };
    var handleHideModal = () => {
        console.log("Closing Modal");
        setIsModalVisible(false);
        handlerRender();
    };


    var handleReplaceVisibility = (el) => {
        setIsExtended(el.checked);
        handlerRender();
    };
    var handleProcess = () => {
        mem.current.mainContainer.render(
            <div className="processed-display">
                Text Area 1:
                <div dangerouslySetInnerHTML={{__html:(textAreasData.ta1 || "textarea is empty!").replace(/\n/g, "<br>")}}></div>
                {
                    isExtended ?
                    <>
                    Text Area 2: 
                    <div dangerouslySetInnerHTML={{__html:(textAreasData.ta2 || "textarea is empty!").replace(/\n/g, "<br>")}}></div>
                    </> : <></>
                }
            </div>
        );
    };
    var handleTextAreasData = (el, boxNumber) => {
        setTextAreasData({...textAreasData, ["ta" + boxNumber]: el.value || ""});
        handlerRender();
    }

    React.useEffect(() => {
        if(mem.current.isMounted) {} else {
            mem.current.isMounted = true;
            mem.current.mainContainer = ReactDOM.createRoot(document.getElementsByClassName("container")[0]);
        }
        return () => {};
    }, []);

    return (
        <>
            <WbModal
                timestamp={timestamp}
                onClose={() => handleHideModal()}
                theme="white"
                modalCssClass=""
                modalHeaderCssClass=""
                modalTitleCssClass=""
                modalBodyCssClass="extra-body-styles"
                noMin={true}
                noMax={true}
                noFull={true}
                noClose={false}
                isVisible={isModalVisible}
                noResize={true}
                winboxCloseButtonId="btnCloseWinbox"
                isSingleton={false}
                styles={{modal: {"border-radius": "12px 12px 0 0"}, body: {"font-family": "none"}, title: {"color": "white"}}}
                title="Modal Custom Title"
                recenterOnRerender={false}
                headerBackgroundColor="linear-gradient(rgb(20, 127, 193), rgb(34, 148, 218))"
                modal={false}>
                <div className="wbModal-body-container">
                    <div>First TextArea</div>
                    <div>
                        <textarea rows="10" value={textAreasData.ta1} 
                            onChange={(event) => handleTextAreasData(event.target, 1)}>
                        </textarea>
                    </div>
                    <div>
                        <input type="checkbox"
                            onChange={(event) => handleReplaceVisibility(event.target)} checked={isExtended}/>
                        Add additional HTML for auto height adjustment example
                    </div>
                    {
                    isExtended ?
                    <>
                        <div>Second TextArea</div>
                        <div>
                            <textarea rows="10" value={textAreasData.ta2} 
                                onChange={(event) => handleTextAreasData(event.target, 2)}>
                            </textarea>
                        </div>
                    </> : <></>
                    }
                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                        <button id="btnCloseWinbox" type="button">
                            Close
                        </button>
                        <button type="button" onClick={() => handleProcess()}>
                            {isExtended?"Process TextBoxes":"Process TextBox"}
                        </button>
                    </div>
                </div>
            </WbModal>
            <button onClick={() => handleShowModal()}>
                Open Winbox
            </button>
        </>
    )
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);