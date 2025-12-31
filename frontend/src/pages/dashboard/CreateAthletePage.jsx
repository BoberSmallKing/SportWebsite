import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SportsmenAPI } from "../../services/sportsmenService";
import RetroInput from "../../components/ui/dashboard/RetroInput";
import RetroButton from "../../components/ui/dashboard/RetroButton";
import "../../styles/dashboard/createAthlete.css";

function CreateAthletePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [achievementsList, setAchievementsList] = useState([""]);
  const [formData, setFormData] = useState({
    full_name: "",
    division: "red",
    description: "",
    photo: null,
    previewUrl: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: files[0],
        previewUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAchievementChange = (index, value) => {
    const newList = [...achievementsList];
    newList[index] = value;
    setAchievementsList(newList);
  };

  const removeAchievement = (index) => {
    setAchievementsList(achievementsList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("division", formData.division);
    data.append("description", formData.description);
    data.append(
      "achievement",
      achievementsList.filter((a) => a.trim()).join("\n")
    );
    if (formData.photo) data.append("photo", formData.photo);

    try {
      await SportsmenAPI.create(data);
      navigate("/dashboard/team");
    } catch (err) {
      console.error("ОШИБКА ДОСТУПА К БАЗЕ:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-create-layout">
      <aside className="preview-display">
        <div className="display-scanline"></div>
        <h3 className="preview-header">ПРЕДПРОСМОТР_КАРТОЧКИ</h3>

        <div className="preview-container">
          <div
            className={`preview-card-wrapper ${
              formData.full_name ? "card-active" : ""
            }`}
          >
            <div className="athlete-card-retro">
              <div className="photo-container">
                {formData.previewUrl ? (
                  <img
                    src={formData.previewUrl}
                    className="athlete-pixel-photo"
                    alt="preview"
                  />
                ) : (
                  <div className="empty-photo">НЕТ_ФОТО</div>
                )}
                <div className={`division-badge ${formData.division}`}>
                  {formData.division[0].toUpperCase()}
                </div>
              </div>
              <div className="name-plate">
                {formData.full_name || "ИМЯ_БОЙЦА"}
              </div>
            </div>
          </div>
        </div>
        <p className="system-msg hide-mobile">СОБЕРИ СВОЕГО БОЙЦА</p>
      </aside>

      {/* ТЕРМИНАЛ ФОРМЫ */}
      <main className="creation-terminal">
        <div className="terminal-header">
          <div className="status-indicator">
            <span className="blink-dot"></span>
            <span className="status-text">РЕГИСТРАЦИЯ_НОВОГО_ОБЪЕКТА</span>
          </div>
          <h2 className="terminal-title">ЛИЧНОЕ_ДЕЛО_БОЙЦА</h2>
        </div>

        <form onSubmit={handleSubmit} className="retro-form-scroll">
          <div className="form-grid">
            <RetroInput
              label="ФИО СПОРТСМЕНА"
              name="full_name"
              placeholder="ВВЕДИТЕ ИМЯ..."
              value={formData.full_name}
              onChange={handleChange}
              required
            />

            <div className="retro-input-group">
              <label className="retro-label">КАТЕГОРИЯ</label>
              <select
                name="division"
                className="retro-select-field"
                onChange={handleChange}
                value={formData.division}
              >
                <option value="gold">GOLD (ЭЛИТА)</option>
                <option value="diamond">DIAMOND (МАСТЕР)</option>
                <option value="green">GREEN (ПРЕТЕНДЕНТ)</option>
                <option value="red">RED (НОВИЧОК)</option>
              </select>
            </div>
          </div>

          <div className="input-block">
            <RetroInput
              label="ФОТОГРАФИЯ"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <RetroInput
            textarea
            label="БИОГРАФИЯ / ХАРАКТЕРИСТИКА"
            name="description"
            placeholder="ОПИСАНИЕ СТИЛЯ БОЯ..."
            value={formData.description}
            onChange={handleChange}
          />

          <div className="achievements-box">
            <label className="retro-label">ЖУРНАЛ ДОСТИЖЕНИЙ</label>
            {achievementsList.map((ach, index) => (
              <div key={index} className="log-entry-row">
                <div className="log-input-wrapper">
                  <RetroInput
                    placeholder={`ЗАПИСЬ #${index + 1}`}
                    value={ach}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="retro-delete-row"
                  onClick={() => removeAchievement(index)}
                >
                  DEL
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-log-btn"
              onClick={() => setAchievementsList([...achievementsList, ""])}
            >
              [+] ДОБАВИТЬ СТРОКУ
            </button>
          </div>

          <div className="form-actions">
            <RetroButton type="submit" disabled={loading}>
              {loading ? "СИНХРОНИЗАЦИЯ..." : "СОЗДАТЬ БОЙЦА"}
            </RetroButton>
            <button
              type="button"
              className="terminal-cancel"
              onClick={() => navigate(-1)}
            >
              ОТМЕНА
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateAthletePage;
