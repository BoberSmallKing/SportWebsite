import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

function HelpBid() {
  const navigate = useNavigate();
  return (
    
      <div className="auth-wrapper">
        <div className="card">
          <h2 className="auth-title">Ваша заявка находится на рассмотрении</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>
            Администратор проверяет вашу заявку. После одобрения вы сможете войти в систему.
          </p>
          <Button
            className="btn-gradient"
            onClick={() => navigate("/")}
          >
            Вернуться на главную
          </Button>
        </div>
      </div>

  );
}

export default HelpBid;
