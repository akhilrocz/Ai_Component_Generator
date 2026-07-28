import React, { useEffect, useRef } from 'react'

const Preview = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const code = localStorage.getItem("previewCode")

        if (iframeRef.current && code) {
            iframeRef.current.srcDoc = code;
        }
    }, [])
    return (
        <iframe ref={iframeRef} title='preview' style={{ width: "100vw", height: "100vh", border: "none" }} />
    )
}

export default Preview