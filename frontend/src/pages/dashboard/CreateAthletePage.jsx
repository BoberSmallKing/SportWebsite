import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SportsmenAPI } from "../../services/sportsmenService";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";

function CreateAthletePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const [achievementsList, setAchievementsList] = useState([""]);

  const [formData, setFormData] = useState({
    full_name: "",
    division: "red",
    description: "",
    photo: null
  });

  // --- ЛОГИКА ДЛЯ СПИСКА ДОСТИЖЕНИЙ ---
  
  // Изменение конкретного поля достижения
  const handleAchievementChange = (index, value) => {
    const newList = [...achievementsList];
    newList[index] = value;
    setAchievementsList(newList);
  };

  const addAchievementField = () => {
    setAchievementsList([...achievementsList, ""]);
  };


  const removeAchievementField = (index) => {
    if (achievementsList.length === 1) {
      handleAchievementChange(0, ""); 
      return;
    }
    const newList = achievementsList.filter((_, i) => i !== index);
    setAchievementsList(newList);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validAchievements = achievementsList
      .map(item => item.trim())
      .filter(item => item !== "");

    const achievementString = validAchievements.join("\n");

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("division", formData.division);
    data.append("description", formData.description);
    data.append("achievement", achievementString); 
    
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      await SportsmenAPI.create(data);
      navigate("/dashboard/team");
    } catch (err) {
      setError("Ошибка сохранения. Проверьте данные.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Новый спортсмен</h1>
        <button onClick={() => navigate(-1)} className="btn-outline" style={{border:'none', cursor:'pointer'}}>
          ← Назад
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-container-dashboard">
        <FormError message={error} />

        <div className="form-section">
          <h3 className="form-section-title">Основная информация</h3>
          <div className="form-grid-dashboard">
            <Input 
              label="ФИО Спортсмена" 
              name="full_name"
              placeholder="Иванов Иван Иванович"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            
            <div className="form-group">
              <label className="form-label">Ранг</label>
              <select 
                name="division" 
                className="form-input form-select"
                value={formData.division}
                onChange={handleChange}
              >
                <option value="gold">Золотой</option>
                <option value="diamond">Алмазный</option>
                <option value="green">Зеленый</option>
                <option value="red">Красный</option>
              </select>
            </div>
          </div>

          <Input 
            label="Фотография" 
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            fileName={formData.photo ? formData.photo.name : null}
          />
        </div>

        {/* --- СЕКЦИЯ 2: ОПИСАНИЕ --- */}
        <div className="form-section">
          <h3 className="form-section-title">Детали</h3>
          <Input 
            label="Описание" 
            name="description"
            textarea
            placeholder="Расскажите о спортсмене ..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Список достижений</h3>
          <div className="dynamic-list">
            {achievementsList.map((ach, index) => (
              <div key={index} className="dynamic-item">
                <Input 
                  label={index === 0 ? "Достижение" : "⠀"}
                  placeholder={`Например: Чемпион области 202${index + 1}`}
                  value={ach}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                />
                                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={() => removeAchievementField(index)}
                  title="Удалить строку"
                >
                  &times; {/* Символ крестика */}
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="btn-add-item" onClick={addAchievementField}>
            + Добавить еще достижение
          </button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Button type="submit" disabled={loading}>
            {loading ? "Загрузка..." : "Создать спортсмена"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateAthletePage;