import { useState } from "react";

const Preview = () => {
  const [code] = useState(() => {
    try {
      return localStorage.getItem("previewCode") || "";
    } catch (error) {
      console.error("Error retrieving preview code:", error);
      return "";
    }
  });

  return (
    <iframe
      srcDoc={code}
      title="preview"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default Preview;
