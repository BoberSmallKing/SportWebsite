function Button({ children, ...props }) {
  return (
    <button className="btn-gradient" {...props}>
      {children}
    </button>
  );
}

export default Button;
