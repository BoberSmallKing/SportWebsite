import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AthleteCard from "../../components/ui/dashboard/AthleteCard";
import { SportsmenAPI } from "../../services/sportsmenService";

function TeamPage() {
  const [athletes, setAthletes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SportsmenAPI.list()
      .then(res => {
        setAthletes(res.data.results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredAthletes = athletes.filter(a =>
    a.full_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <div className="page-header">
        <h1>Команда</h1>
        <Link to="/dashboard/create-athlete"className="btn-primary">Создать спортсмена</Link>
      </div>

      <div className="team-toolbar">
        <input
          className="search"
          placeholder="Поиск по имени..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="stats">
          Найдено: <b>{filteredAthletes.length}</b> из{" "}
          <b>{athletes.length}</b>
        </div>
      </div>

      <div className="card-grid">
        {filteredAthletes.map(a => (
          <AthleteCard key={a.id} athlete={a} />
        ))}
      </div>
    </>
  );
}

export default TeamPage;
