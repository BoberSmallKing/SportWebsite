import React, { useState } from "react";

const RetroInput = ({ label, textarea, type, ...props }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
    if (props.onChange) props.onChange(e);
  };

  const isFile = type === "file";

  return (
    <div className={`retro-form-group ${isFile ? "file-group" : ""}`}>
      {label && <label className="retro-label">{label}</label>}

      <div className="input-wrapper">
        {textarea ? (
          <textarea className="retro-input retro-textarea" {...props} />
        ) : isFile ? (
          <>
            <input
              type="file"
              id={props.id || "retro-file"}
              className="hidden-file-input"
              {...props}
              onChange={handleFileChange}
            />
            <label
              htmlFor={props.id || "retro-file"}
              className="retro-file-button"
            >
              <span className="file-status-text">
                {fileName ? `ЗАГРУЖЕН: ${fileName}` : "SELECT_IMAGE_ARCHIVE..."}
              </span>
              <span className="file-browse-btn">ВЫБРАТЬ</span>
            </label>
          </>
        ) : (
          <input className="retro-input" type={type} {...props} />
        )}

        <div className="input-scanline"></div>
      </div>
    </div>
  );
};

export default RetroInput;
