import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SportsmenAPI } from "../../services/sportsmenService";
import { FightsAPI } from "../../services/fightsService";
import RetroButton from "../../components/ui/dashboard/RetroButton";
import RetroInput from "../../components/ui/dashboard/RetroInput";
import "../../styles/dashboard/fightCreatePage.css";

function CreateFightPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const blueId = searchParams.get("blue");
  const redId = searchParams.get("red");

  const [fighters, setFighters] = useState({ blue: null, red: null });
  const [sections, setSections] = useState([]); // Всегда инициализируем массивом
  const [selectedSportId, setSelectedSportId] = useState("");
  const [loading, setLoading] = useState(true);

  const [setup, setSetup] = useState({
    date: "",
    section: "",
    is_rating: true,
    count_rounds: 3,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [b, r, s] = await Promise.all([
          SportsmenAPI.retrieve(blueId),
          SportsmenAPI.retrieve(redId),
          FightsAPI.listSections(),
        ]);

        setFighters({ blue: b.data, red: r.data });

        const sectionsData = s.data.results ? s.data.results : s.data;
        setSections(Array.isArray(sectionsData) ? sectionsData : []);
      } catch (err) {
        console.error("Ошибка инициализации данных:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blueId && redId) {
      fetchData();
    }
  }, [blueId, redId]);

  const uniqueSports = Array.from(
    new Map(
      sections
        .filter((sec) => sec.sport)
        .map((sec) => [sec.sport.id, sec.sport])
    ).values()
  );

  const filteredSections = sections.filter(
    (sec) => sec.sport.id === parseInt(selectedSportId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!setup.section) {
      alert("Пожалуйста, выберите спортивную секцию");
      return;
    }

    try {
      await FightsAPI.create({
        first_sportsmen: blueId,
        second_sportsmen: redId,
        section: setup.section,
        date: setup.date,
        is_rating: setup.is_rating,
        count_rounds: parseInt(setup.count_rounds),
      });
      navigate("/dashboard/fights");
    } catch (err) {
      console.error("Ошибка при создании боя:", err);
      alert(
        "Не удалось сохранить бой. Проверьте правильность заполнения полей."
      );
    }
  };

  if (loading)
    return <div className="loading-overlay">ЗАГРУЗКА_СИСТЕМЫ...</div>;

  return (
    <div className="versus-layout">
      <div className="versus-grid-bg"></div>

      <div className="versus-top-bar">
        <button
          className="retro-exit-btn"
          onClick={() => navigate("/dashboard/team")}
          type="button"
        >
          ← НАЗАД
        </button>
      </div>

      <div className="versus-overlay">
        {/* СИНИЙ УГОЛ */}
        <div className="fighter-preview-container">
          <div className="fighter-card-wrapper blue-glow">
            <div className="fighter-card-header">СИНИЙ УГОЛ</div>
            <div className="fighter-photo-frame">
              {fighters.blue?.photo ? (
                <img src={fighters.blue.photo} alt="Blue" />
              ) : (
                <div className="photo-placeholder">НЕТ ФОТО</div>
              )}
            </div>
            <div className="fighter-info-footer">
              <div className="fighter-name-display">
                {fighters.blue?.full_name || "Неизвестный"}
              </div>
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ НАСТРОЕК */}
        <div className="vs-center-container">
          <div className="vs-logo-large">VS</div>

          <div className="vs-settings-box">
            <div className="box-header">КОНФИГУРАЦИЯ МАТЧА</div>
            <form onSubmit={handleSubmit} className="vs-settings-form">
              <RetroInput
                type="date"
                label="ДАТА СОБЫТИЯ"
                required
                value={setup.date}
                onChange={(e) => setSetup({ ...setup, date: e.target.value })}
              />

              {/* Выбор вида спорта */}
              <div className="retro-input-group">
                <label className="retro-label">ВИД СПОРТА</label>
                <select
                  className="retro-select-field"
                  value={selectedSportId}
                  onChange={(e) => {
                    setSelectedSportId(e.target.value);
                    setSetup({ ...setup, section: "" }); // Сброс секции при смене спорта
                  }}
                  required
                >
                  <option value="">-- ВЫБЕРИТЕ СПОРТ --</option>
                  {uniqueSports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Выбор секции (зависит от спорта) */}
              <div className="retro-input-group">
                <label className="retro-label">СЕКЦИЯ</label>
                <select
                  className="retro-select-field"
                  value={setup.section}
                  onChange={(e) =>
                    setSetup({ ...setup, section: e.target.value })
                  }
                  disabled={!selectedSportId}
                  required
                >
                  <option value="">-- ВЫБЕРИТЕ СЕКЦИЮ --</option>
                  {filteredSections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="retro-input-group">
                <label className="retro-label">РАУНДЫ</label>
                <RetroInput
                  type=""
                  min="1"
                  max="20"
                  value={setup.count_rounds}
                  onChange={(e) =>
                    setSetup({ ...setup, count_rounds: e.target.value })
                  }
                />
              </div>

              <div className="retro-checkbox-row">
                <input
                  type="checkbox"
                  id="rank-check"
                  checked={setup.is_rating}
                  onChange={(e) =>
                    setSetup({ ...setup, is_rating: e.target.checked })
                  }
                />
                <label htmlFor="rank-check">РАНГОВЫЙ ПОЕДИНОК</label>
              </div>

              <RetroButton type="submit">ЗАРЕГИСТРИРОВАТЬ БОЙ</RetroButton>
            </form>
          </div>
        </div>

        {/* КРАСНЫЙ УГОЛ */}
        <div className="fighter-preview-container">
          <div className="fighter-card-wrapper red-glow">
            <div className="fighter-card-header">КРАСНЫЙ УГОЛ</div>
            <div className="fighter-photo-frame">
              {fighters.red?.photo ? (
                <img src={fighters.red.photo} alt="Red" />
              ) : (
                <div className="photo-placeholder">НЕТ ФОТО</div>
              )}
            </div>
            <div className="fighter-info-footer">
              <div className="fighter-name-display">
                {fighters.red?.full_name || "Неизвестный"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFightPage;
