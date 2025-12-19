import { useEffect, useState } from "react";
import AthleteCard from "../components/ui/dashboard/AthleteCard";
import { SportsmenAPI } from "../services/sportsmenService";

function TeamPage() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SportsmenAPI.list()
      .then(res => {
        // ВАЖНО
        setAthletes(res.data.results);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <div className="page-header">
        <h1>Команда</h1>
        <button className="btn-primary">Создать спортсмена</button>
      </div>

      <input className="search" placeholder="Поиск спортсмена..." />

      <div className="stats">
        Всего учеников: <b>{athletes.length}</b>
      </div>

      <div className="card-grid">
        {athletes.map(a => (
          <AthleteCard key={a.id} athlete={a} />
        ))}
      </div>
    </>
  );
}

export default TeamPage;
