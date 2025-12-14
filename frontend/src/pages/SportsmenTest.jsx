import { useEffect, useState } from "react";
import api from "../api/api";

export default function SportsmenTest() {
  const [sportsmen, setSportsmen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/sportsmen/")
      .then((res) => {
        setSportsmen(res.data.results ?? res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить спортсменов");
      })
      .finally(() => setLoading(false));
      
      
  }, []);
  console.log(sportsmen);
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Тестовая страница спортсменов</h2>

      {sportsmen.length === 0 && <p>Спортсменов нет</p>}

      <ul>
        {sportsmen.map((s) => (
          <li key={s.id} style={{ marginBottom: 12 }}>
            <strong>{s.full_name}</strong>
            <div>Рейтинг: {s.rating}</div>
            <div>Номер: {s.number || "—"}</div>
            <div>
              Достижения:
              <ul>
                {(s.achievements_list || []).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
