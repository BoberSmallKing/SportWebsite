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
  const [sections, setSections] = useState([]);
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
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blueId && redId) fetchData();
  }, [blueId, redId]);

  const formatName = (fullName) => {
    if (!fullName) return "UNKNOWN";
    return fullName.split(" ").slice(0, 2).join(" ");
  };

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
      alert("ВЫБЕРИТЕ СЕКЦИЮ");
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
      alert("ОШИБКА СОХРАНЕНИЯ ДАННЫХ");
    }
  };

  if (loading)
    return <div className="loading-overlay">СКАНИРОВАНИЕ_БОЙЦОВ...</div>;

  return (
    <div className="versus-layout">
      <div className="versus-grid-bg"></div>

      <header className="versus-top-bar">
        <button
          className="retro-exit-btn"
          onClick={() => navigate("/dashboard/team")}
        >
          ← <span className="hide-mobile">ОТМЕНА</span>
        </button>
        <div className="vs-header-title">MATCH_PREPARATION</div>
      </header>

      <div className="versus-content">
        {/* BLUE CORNER */}
        <div className="fighter-column blue-side">
          <div className="fighter-card-wrapper blue-glow">
            <div className="corner-tag">BLUE_CORNER</div>
            <div className="fighter-photo-frame">
              {fighters.blue?.photo ? (
                <img src={fighters.blue.photo} alt="Blue" />
              ) : (
                <div className="photo-placeholder">NO_DATA</div>
              )}
            </div>
            <div className="fighter-name-display">
              {formatName(fighters.blue?.full_name)}
            </div>
          </div>
        </div>

        {/* SETTINGS PANEL */}
        <div className="vs-center-column">
          <div className="vs-badge">VS</div>
          <div className="vs-settings-box">
            <div className="box-header">КОНФИГУРАЦИЯ</div>
            <form onSubmit={handleSubmit} className="vs-settings-form">
              <RetroInput
                type="date"
                label="ДАТА"
                required
                value={setup.date}
                onChange={(e) => setSetup({ ...setup, date: e.target.value })}
              />

              <div className="retro-select-group">
                <label>СПОРТ</label>
                <select
                  className="retro-select"
                  value={selectedSportId}
                  onChange={(e) => {
                    setSelectedSportId(e.target.value);
                    setSetup({ ...setup, section: "" });
                  }}
                  required
                >
                  <option value="">ВЫБРАТЬ...</option>
                  {uniqueSports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="retro-select-group">
                <label>СЕКЦИЯ</label>
                <select
                  className="retro-select"
                  value={setup.section}
                  onChange={(e) =>
                    setSetup({ ...setup, section: e.target.value })
                  }
                  disabled={!selectedSportId}
                  required
                >
                  <option value="">ВЫБРАТЬ...</option>
                  {filteredSections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounds-row">
                <RetroInput
                  type="number"
                  label="РАУНДЫ"
                  min="1"
                  max="20"
                  value={setup.count_rounds}
                  onChange={(e) =>
                    setSetup({ ...setup, count_rounds: e.target.value })
                  }
                />
              </div>

              <div className="retro-checkbox-container">
                <input
                  type="checkbox"
                  id="rank-check"
                  checked={setup.is_rating}
                  onChange={(e) =>
                    setSetup({ ...setup, is_rating: e.target.checked })
                  }
                />
                <label htmlFor="rank-check">РАНГОВЫЙ БОЙ</label>
              </div>

              <div className="btn-submit-wrapper">
                <RetroButton type="submit">START MATCH</RetroButton>
              </div>
            </form>
          </div>
        </div>

        {/* RED CORNER */}
        <div className="fighter-column red-side">
          <div className="fighter-card-wrapper red-glow">
            <div className="corner-tag">RED_CORNER</div>
            <div className="fighter-photo-frame">
              {fighters.red?.photo ? (
                <img src={fighters.red.photo} alt="Red" />
              ) : (
                <div className="photo-placeholder">NO_DATA</div>
              )}
            </div>
            <div className="fighter-name-display">
              {formatName(fighters.red?.full_name)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFightPage;
