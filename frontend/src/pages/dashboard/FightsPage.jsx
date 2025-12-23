import { useState, useEffect } from "react";
import { SportsmenAPI } from "../../services/sportsmenService";
import { FightsAPI } from "../../services/fightsService";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function FightsPage() {
  const [athletes, setAthletes] = useState([]);
  const [fights, setFights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newFight, setNewFight] = useState({
    first_sportsmen: "",
    second_sportsmen: "",
    date: "",
    is_rating: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [athletesRes, fightsRes] = await Promise.all([
        SportsmenAPI.list(),
        FightsAPI.list()
      ]);
      // Сохраняем атлетов и бои. Учитываем формат DRF (results)
      setAthletes(athletesRes.data.results || athletesRes.data);
      setFights(fightsRes.data.results || fightsRes.data);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    } finally {
      setLoading(false);
    }
  };

  // ФУНКЦИЯ-ПОМОЩНИК: Находит данные бойца по его ID в общем списке атлетов
  const getFighterData = (id) => {
    return athletes.find(a => a.id === parseInt(id)) || {};
  };

  const handleCreateFight = async (e) => {
    e.preventDefault();
    if (!newFight.first_sportsmen || !newFight.second_sportsmen || !newFight.date) {
      return alert("Заполните все поля");
    }

    try {
      const res = await FightsAPI.create(newFight);
      // Добавляем новый бой в список
      setFights([res.data, ...fights]);
      // Очистка формы
      setNewFight({ first_sportsmen: "", second_sportsmen: "", date: "", is_rating: true });
    } catch (err) {
      alert("Ошибка при создании боя");
    }
  };

  const handleSetWinner = async (fightId, winnerId) => {
    try {
      const res = await FightsAPI.update(fightId, { 
        winner: winnerId,
        is_finished: true 
      });
      // Обновляем список боев полученными данными от сервера
      setFights(fights.map(f => f.id === fightId ? res.data : f));
    } catch (err) {
      alert("Не удалось сохранить результат");
    }
  };

  if (loading) return <div className="loader">Загрузка данных...</div>;

  return (
    <div className="fights-container">
      <header className="page-header">
        <h1>Управление боями</h1>
      </header>

      {/* ПАНЕЛЬ СОЗДАНИЯ */}
      <section className="fight-creator-card">
        <h3>Запланировать поединок</h3>
        <form className="fight-form" onSubmit={handleCreateFight}>
          <div className="selectors-row">
            <div className="form-group">
              <label className="form-label">Синий угол</label>
              <select 
                className="form-input"
                value={newFight.first_sportsmen}
                onChange={(e) => setNewFight({...newFight, first_sportsmen: e.target.value})}
              >
                <option value="">Выбрать бойца</option>
                {athletes.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
              </select>
            </div>

            <div className="vs-label">VS</div>

            <div className="form-group">
              <label className="form-label">Красный угол</label>
              <select 
                className="form-input"
                value={newFight.second_sportsmen}
                onChange={(e) => setNewFight({...newFight, second_sportsmen: e.target.value})}
              >
                <option value="">Выбрать бойца</option>
                {athletes.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
              </select>
            </div>
          </div>

          <div className="settings-row">
            <Input 
              type="date" 
              label="Дата проведения" 
              value={newFight.date}
              onChange={(e) => setNewFight({...newFight, date: e.target.value})}
            />
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="is_rating"
                checked={newFight.is_rating}
                onChange={(e) => setNewFight({...newFight, is_rating: e.target.checked})}
              />
              <label htmlFor="is_rating">Рейтинговый бой</label>
            </div>
            <Button type="submit">Создать событие</Button>
          </div>
        </form>
      </section>

      {/* СПИСОК БОЕВ */}
      <div className="fights-grid">
        {fights.length === 0 && <p>Боев пока нет</p>}
        {fights.map((fight) => {
          // Получаем данные обоих бойцов для этой карточки
          const f1 = getFighterData(fight.first_sportsmen);
          const f2 = getFighterData(fight.second_sportsmen);

          return (
            <div key={fight.id} className={`fight-item ${fight.is_finished ? 'finished' : ''}`}>
              <div className="fight-status">
                <span>{fight.is_rating ? "🏆 Рейтинговый" : "🤝 Товарищеский"}</span>
                {fight.is_finished && <span className="status-badge">Завершен</span>}
              </div>
              
              <div className="fighters-matchup">
                {/* Синий боец */}
                <div className={`fighter-side blue ${fight.winner === f1.id ? 'is-winner' : ''}`}>
                  <img src={f1.photo || "/placeholder.jpg"} alt={f1.full_name} className="fighter-avatar" />
                  <p className="fighter-name">{f1.full_name || "Загрузка..."}</p>
                  {!fight.is_finished && (
                    <button className="win-btn blue-btn" onClick={() => handleSetWinner(fight.id, f1.id)}>
                      Победа Синего
                    </button>
                  )}
                </div>

                <div className="match-info">
                  <span className="vs-text">VS</span>
                  <span className="match-date">{fight.date}</span>
                </div>

                {/* Красный боец */}
                <div className={`fighter-side red ${fight.winner === f2.id ? 'is-winner' : ''}`}>
                  <img src={f2.photo || "/placeholder.jpg"} alt={f2.full_name} className="fighter-avatar" />
                  <p className="fighter-name">{f2.full_name || "Загрузка..."}</p>
                  {!fight.is_finished && (
                    <button className="win-btn red-btn" onClick={() => handleSetWinner(fight.id, f2.id)}>
                      Победа Красного
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FightsPage;