import React, { useEffect, useRef, useState } from "react";
import "./../CSS/InputFile.css";

const InputFile = (props) => {
  const contentBar = useRef(null);
  const closeBtn = useRef(null);
  const bar = useRef(null);
  const input = useRef(null);
  const inputContainer = useRef(null);
  const downloadBtn = useRef(null);
  const updateBtn = useRef(null);
  const barBtn = useRef(null);

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleClick = () => {
    if(props.isDownloadable ){
      downloadBtn.current.style.display = "none"
      
    }
    contentBar.current.style.display = "none";
    closeBtn.current.style.display = "none";
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
    if(props.isDownloadable ){
      downloadBtn.current.style.display = "block"
      
    }
    contentBar.current.style.display = "block";
    closeBtn.current.style.display = "block";

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

  const handleUpdate = () => {
    inputContainer.current.style.display = "flex";
    inputContainer.current.style.width = "40%";
    updateBtn.current.style.display = "none";
    barBtn.current.style.width = "50%"
    
  }

  return (
    <div>
      {props.isDownloadable ? (
        <div className="container">
          <span className="span-input">{props.title}</span>

          <div className="input-container" ref={inputContainer}>
            <input
              id="input"
              type="file"
              accept="application/pdf"
              onChange={handleChange}
              ref={input}
            />

            <div className="bar-buttons" ref={barBtn}>
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
          </div>

          <div className="btn-container">
            <button
              className="btn-file"
              onClick={handleUpdate}
              ref={updateBtn}
            >
              Actualizar Archivo
            </button>

            <button
              className="btn-file"
              onClick={handleDownload}
              ref={downloadBtn}
            >
              Descargar Archivo
            </button>
          </div>
        </div>
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default InputFile;
