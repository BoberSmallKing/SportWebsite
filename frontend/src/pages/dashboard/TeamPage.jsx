import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AthleteCard from "../../components/ui/dashboard/AthleteCard";
import { SportsmenAPI } from "../../services/sportsmenService";
import RetroButton from "../../components/ui/dashboard/RetroButton";
import "../../styles/dashboard/TeamPage.css";

function TeamPage() {
  const navigate = useNavigate();
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [fightPair, setFightPair] = useState([]);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  useEffect(() => {
    SportsmenAPI.list()
      .then((res) => {
        const data = res.data.results || res.data;
        setAthletes(data);
        if (data.length > 0) setSelectedAthlete(data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Блокировка скролла при открытом поп-апе на мобилках
  useEffect(() => {
    if (showMobileDetails && window.innerWidth <= 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showMobileDetails]);

  const handleSlotClick = (athlete) => {
    if (!selectionMode) {
      setSelectedAthlete(athlete);
      setShowMobileDetails(true);
      return;
    }

    if (fightPair.includes(athlete.id)) {
      setFightPair(fightPair.filter((id) => id !== athlete.id));
    } else {
      if (fightPair.length < 2) {
        setFightPair([...fightPair, athlete.id]);
      }
    }
  };

  const handleStartFight = () => {
    if (fightPair.length === 2) {
      navigate(
        `/dashboard/fights/create?blue=${fightPair[0]}&red=${fightPair[1]}`
      );
    }
  };

  if (loading) return <div className="retro-loader">LOADING_DATABASE...</div>;

  return (
    <div className={`roster-layout ${selectionMode ? "selection-active" : ""}`}>
      {/* Затемнение фона при открытых деталях на мобилке */}
      {showMobileDetails && (
        <div
          className="mobile-overlay"
          onClick={() => setShowMobileDetails(false)}
        ></div>
      )}

      <div className="roster-grid-section">
        <div className="roster-header-actions">
          <button
            className="retro-exit-btn"
            onClick={() => navigate("/dashboard")}
            type="button"
          >
            ←
          </button>
          <h2 className="select-title">
            {selectionMode ? "ВЫБОР ПАРЫ" : "ВЫБЕРИ БОЙЦА"}
          </h2>
          <div className="mode-controls">
            <button
              className={`mode-btn ${selectionMode ? "active" : ""}`}
              onClick={() => {
                setSelectionMode(!selectionMode);
                setFightPair([]);
              }}
            >
              {selectionMode ? "[X]" : "[БОЙ]"}
            </button>
          </div>
        </div>

        <div className="roster-grid">
          {athletes.map((a) => (
            <div
              key={a.id}
              className={`roster-slot 
                ${selectedAthlete?.id === a.id ? "active" : ""} 
                ${fightPair.includes(a.id) ? "picked" : ""}
                ${selectionMode ? "in-selection" : ""}
              `}
              onMouseEnter={() =>
                !selectionMode &&
                window.innerWidth > 1024 &&
                setSelectedAthlete(a)
              }
              onClick={() => handleSlotClick(a)}
            >
              <AthleteCard athlete={a} />
              {fightPair.includes(a.id) && (
                <div className="pick-badge">
                  {fightPair.indexOf(a.id) === 0 ? "BLUE" : "RED"}
                </div>
              )}
            </div>
          ))}

          {!selectionMode && (
            <Link
              to="/dashboard/create-athlete"
              className="roster-slot add-slot"
            >
              <div className="add-icon">+</div>
              <div className="add-text">НОВЫЙ</div>
            </Link>
          )}
        </div>

        {selectionMode && (
          <div className="selection-footer">
            <div className="selection-counter">
              ГОТОВЫ: <span className="count">{fightPair.length}/2</span>
            </div>
            <RetroButton
              disabled={fightPair.length !== 2}
              onClick={handleStartFight}
            >
              В БОЙ
            </RetroButton>
          </div>
        )}
      </div>

      <aside
        className={`athlete-detail-panel ${
          showMobileDetails ? "mobile-active" : ""
        }`}
      >
        {selectedAthlete && (
          <div className="retro-detail-content">
            <button
              className="close-mobile-details"
              onClick={() => setShowMobileDetails(false)}
            >
              [ ЗАКРЫТЬ ]
            </button>

            <div className="detail-header">
              <h1 className="detail-name">{selectedAthlete.full_name}</h1>
              <div className={`detail-rank-bar ${selectedAthlete.division}`}>
                {selectedAthlete.division?.toUpperCase()} RANK
              </div>
            </div>

            <div className="detail-body">
              <div className="pixel-stat-box">
                <span className="stat-label">РЕЙТИНГ:</span>
                <span className="stat-value">{selectedAthlete.rating}</span>
              </div>

              <section className="detail-bio">
                <h3>БИО</h3>
                <p>{selectedAthlete.description || "CLASSIFIED"}</p>
              </section>

              <section className="detail-achievements">
                <h3>ДОСТИЖЕНИЯ</h3>
                <ul className="pixel-list">
                  {(selectedAthlete.achievement?.split("\n") || []).map(
                    (item, i) => (
                      <li key={i}>▶ {item}</li>
                    )
                  )}
                </ul>
              </section>
            </div>

            <div className="detail-actions">
              <button
                className="retro-btn"
                onClick={() => window.open("https://telegra.ph/", "_blank")}
              >
                ПРОФИЛЬ
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default TeamPage;
