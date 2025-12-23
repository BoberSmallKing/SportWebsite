import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SportsmenAPI } from "../../services/sportsmenService";
import Button from "../../components/ui/Button";

function AthleteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SportsmenAPI.retrieve(id)
      .then((res) => setAthlete(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="dashboard-content">Загрузка...</div>;
  if (!athlete) return <div className="dashboard-content">Спортсмен не найден</div>;

  // Преобразуем строку достижений в массив для красивого вывода
  const achievements = athlete.achievement 
    ? athlete.achievement.split('\n').filter(a => a.trim() !== '') 
    : [];

  return (
    <div className="dashboard-content">
      <div className="page-header">

        <div className="action-buttons">
           <Button onClick={() => window.open(`https://telegra.ph/`, '_blank')}>
             Открыть в Telegraph
           </Button>
        </div>
        <button onClick={() => navigate(-1)} className="btn-outline" style={{border:'none', cursor:'pointer'}}>
          ← Назад
        </button>
      </div>

      <div className="athlete-detail-container">
        <div className="detail-grid">
          <div className="detail-photo-side">
            <div className={`detail-photo-frame ${athlete.division}`}>
              <img src={athlete.photo} alt={athlete.full_name} />
              <div className={`detail-rating-tag ${athlete.division}`}>
                Ранг: {athlete.division.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Правая колонка - Инфо */}
          <div className="detail-info-side">
            <h1 className="detail-name">{athlete.full_name}</h1>
            
            <section className="detail-section">
              <h3>Биография</h3>
              <p className="detail-description">{athlete.description || "Описание отсутствует"}</p>
            </section>

            <section className="detail-section">
              <h3>Спортивные достижения</h3>
              {achievements.length > 0 ? (
                <ul className="achievements-list">
                  {achievements.map((item, index) => (
                    <li key={index}>
                      <span className="bullet">🏆</span> {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">Достижения пока не указаны</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AthleteDetailPage;