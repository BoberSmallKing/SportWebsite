function Input({ label, error, textarea = false, type, fileName, ...props }) {
  if (type === "file") {
    return (
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <div className="file-upload-wrapper">
          <input
            type="file"
            id="file-upload"
            className="file-input-hidden"
            {...props}
          />
          <label 
            htmlFor="file-upload" 
            className={`file-upload-label ${fileName ? 'file-selected' : ''}`}
          >
            <div className="file-upload-text">
              {fileName ? (
                <>
                  <strong className="status-title">Файл выбран</strong>
                  <span className="file-name-display">{fileName}</span>
                </>
              ) : (
                <>
                  <strong className="status-title">Выберите фотографию</strong>
                  <span className="upload-hint">Нажмите сюда, чтобы загрузить файл</span>
                </>
              )}
            </div>
          </label>
        </div>
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  }

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      {textarea ? (
        <textarea
          className={`form-input form-textarea ${error ? "error" : ""}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`form-input ${error ? "error" : ""}`}
          {...props}
        />
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Input