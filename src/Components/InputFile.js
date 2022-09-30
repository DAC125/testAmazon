import React, { useRef, useState } from "react";
import "./../CSS/InputFile.css";

const InputFile = (props) => {
  const contentBar = useRef(null);
  const closeBtn = useRef(null);
  const bar = useRef(null);
  const input = useRef(null);
  const downloadBtn = useRef(null);

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleClick = () => {
    contentBar.current.style.display = "none";
    closeBtn.current.style.display = "none";
    downloadBtn.current.style.display = "none";
    bar.current.style.width = "0%";
    input.current.value = null;
    props.uploadFile("");
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleChange = async (e) => {
    contentBar.current.style.display = "block";
    closeBtn.current.style.display = "block";
    downloadBtn.current.style.display = "block";

    await timeout(50);

    bar.current.style.width = "100%";

    getBase64(e.target.files[0], (result) => {
      props.uploadFile(result);
      console.log(result);
    });
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    const fileName = props.title + ".pdf";

    downloadLink.href = props.file;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div className="container">
      <span className="span-input">{props.title}</span>
      <input
        id="input"
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        ref={input}
      />

      <div className="bar-buttons">
        <div
          id="content-bar"
          className="progressbar-container"
          ref={contentBar}
        >
          <div id="bar" className="progressbar" ref={bar}></div>
        </div>

        <button
          id="close-btn"
          className="button-cancel"
          type="button"
          onClick={handleClick}
          ref={closeBtn}
        >
          x
        </button>
      </div>
      {props.isDownloadable ? <button className="download-btn" onClick={handleDownload} ref={downloadBtn}>Descargar Archivo</button> : null}
    </div>
  );
};

export default InputFile;
