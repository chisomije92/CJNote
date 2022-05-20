import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}
const html = `
  <html>
  <head>
  <style>html{background:white}</style></head>
  <body>
  <div id='root'></div>
  <script>
  const handleError = (e) => {
  const root = document.querySelector('#root');
  root.innerHTML = '<div style="color: red"> <h4>Runtime Error</h4>' + e + '</div>';
  console.log(e);
  };

  window.addEventListener('error', (event) =>{
    event.preventDefault()
    handleError(event.error)
  });
  window.addEventListener('message', (event) => {
    try{
      eval(event.data);
    }catch(e){
  handleError(e);
   }
  }, false)</script></body>
  </html>`;
const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        iframe.current!.contentWindow?.postMessage(code, "*");
      }, 50);
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        srcDoc={html}
        title="preview"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
