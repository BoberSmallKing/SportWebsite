function FormError({ message }) {
    if (!message) return null;
    return <div className="alert-error">{message}</div>;
  }
  
  export default FormError;
  