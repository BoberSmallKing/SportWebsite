function Input({ label, error, textarea = false, ...props }) {
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
          className={`form-input ${error ? "error" : ""}`}
          {...props}
        />
      )}

      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Input;
