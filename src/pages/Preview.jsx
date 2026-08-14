import React, { useEffect, useState } from 'react'

const Preview = () => {

    const [code,setCode]=useState("");

    useEffect(() => {
        const previewCode = localStorage.getItem("previewCode")

        if (previewCode) {
            setCode(previewCode)
        }
    }, [])
    return (
        <iframe srcDoc={code} title='preview' style={{ width: "100vw", height: "100vh", border: "none" }} />
    )
}

export default Preview