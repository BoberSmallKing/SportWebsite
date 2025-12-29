const RetroInput = ({ label, textarea, ...props }) => (
  <div className="retro-form-group">
    {label && <label className="retro-label">{label}</label>}
    {textarea ? (
      <textarea className="retro-input retro-textarea" {...props} />
    ) : (
      <input className="retro-input" {...props} />
    )}
    <div className="input-scanline"></div>
  </div>
);

export default RetroInput;
