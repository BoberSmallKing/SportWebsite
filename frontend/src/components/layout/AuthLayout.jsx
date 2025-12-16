import Card from "../ui/Card";

function AuthLayout({ title, children }) {
  return (
    <div className="auth-wrapper">
      <Card>
        <h1 className="auth-title">{title}</h1>
        {children}
      </Card>
    </div>
  );
}

export default AuthLayout;
