const RetroButton = ({ children, variant = "primary", ...props }) => (
  <button className={`retro-btn-${variant}`} {...props}>
    {children}
  </button>
);

export default RetroButton;
