function FightsPage() {
    return (
      <>
        <div className="page-header">
          <h1>Бои</h1>
        </div>
  
        <div className="fight-form">
          <select>
            <option>Первый боец</option>
          </select>
  
          <select>
            <option>Второй боец</option>
          </select>
  
          <input type="date" />
  
          <label className="checkbox">
            <input type="checkbox" /> На рейтинг
          </label>
  
          <button className="btn-primary">Создать бой</button>
        </div>
  
        <div className="fight-result">
          <h3>Результат боя</h3>
  
          <select>
            <option>Победитель</option>
          </select>
  
          <button className="btn-outline">
            Подтвердить результат
          </button>
        </div>
      </>
    );
  }
  
  export default FightsPage;
  