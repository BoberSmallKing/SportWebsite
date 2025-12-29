import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FightsAPI } from "../../services/fightsService";
import "../../styles/dashboard/fightPage.css";

const RatingCounter = ({ value, diff }) => (
  <div className="rating-counter-wrapper">
    <div className="base-rating">{value}</div>
    <AnimatePresence>
      {diff && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0 }}
          className={`rating-diff ${diff > 0 ? "plus" : "minus"}`}
        >
          {diff > 0 ? `+${diff}` : diff}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

function FightPage() {
  const [fights, setFights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatingId, setAnimatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFights();
  }, []);

  const fetchFights = async () => {
    try {
      const response = await FightsAPI.list();
      setFights(response.data.results || response.data);
    } catch (err) {
      console.error("LOG_ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetWinner = async (fightId, winnerId) => {
    try {
      const response = await FightsAPI.update(fightId, { winner: winnerId });

      setAnimatingId({
        id: fightId,
        diffs: response.data.rating_changes,
      });
      setTimeout(() => {
        fetchFights();
        setAnimatingId(null);
      }, 3000);
    } catch (err) {
      alert("ERROR UPDATING RESULT");
    }
  };

  if (loading) return <div className="retro-loader">ЗАГРУЖАЕМ ИСТОРИЮ...</div>;

  return (
    <div className="retro-fights-layout">
      <header className="fights-navigation-header">
        <button
          className="retro-exit-btn"
          onClick={() => navigate("/dashboard/")}
        >
          ← НАЗАД
        </button>

        <h1 className="tournament-title">БИТВЫ</h1>
        <div className="header-spacer"></div>
      </header>

      <div className="tournament-divider"></div>

      <div className="fights-list-scroll">
        {fights.map((fight) => {
          const isAnimating = animatingId?.id === fight.id;

          return (
            <motion.div
              layout
              key={fight.id}
              className={`retro-match-card ${
                fight.is_finished ? "finished-card" : ""
              }`}
            >
              <div className="match-category">
                <span>{fight.discipline_display?.toUpperCase()}</span>
                <span className="match-date">
                  {new Date(fight.date).toLocaleDateString()}
                </span>
              </div>

              <div className="match-main">
                {/* BLUE CORNER */}
                <div
                  className={`match-fighter blue-corner ${
                    fight.winner === fight.first_sportsmen ? "victor" : ""
                  }`}
                >
                  <RatingCounter
                    value={fight.first_sportsmen_rating}
                    diff={
                      isAnimating
                        ? animatingId.diffs?.[fight.first_sportsmen]
                        : null
                    }
                  />
                  <div className="fighter-name-tag">
                    {fight.first_sportsmen_name}
                  </div>
                  {!fight.is_finished && !isAnimating && (
                    <button
                      className="win-btn blue"
                      onClick={() =>
                        handleSetWinner(fight.id, fight.first_sportsmen)
                      }
                    >
                      DECLARE WINNER
                    </button>
                  )}
                </div>

                <div className="match-vs-block">
                  <div className="vs-icon">VS</div>
                  <div className="match-rounds">{fight.count_rounds} РД</div>
                </div>

                {/* RED CORNER */}
                <div
                  className={`match-fighter red-corner ${
                    fight.winner === fight.second_sportsmen ? "victor" : ""
                  }`}
                >
                  <RatingCounter
                    value={fight.second_sportsmen_rating}
                    diff={
                      isAnimating
                        ? animatingId.diffs?.[fight.second_sportsmen]
                        : null
                    }
                  />
                  <div className="fighter-name-tag">
                    {fight.second_sportsmen_name}
                  </div>
                  {!fight.is_finished && !isAnimating && (
                    <button
                      className="win-btn red"
                      onClick={() =>
                        handleSetWinner(fight.id, fight.second_sportsmen)
                      }
                    >
                      ВЫБИРИ ПОБИДИТЕЛЯ
                    </button>
                  )}
                </div>
              </div>

              <div className="match-footer">
                <div className="match-type-flag">
                  {fight.is_rating ? "RANKED" : "FREE"}
                </div>
                {isAnimating && (
                  <div className="anim-status">СЧИТАЕМ РЕЙТИНГ..</div>
                )}
                {fight.is_finished && (
                  <span className="match-closed">ЗАВЕРШЕН</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default FightPage;
