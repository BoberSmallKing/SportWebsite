function AthleteCard({ athlete }) {
    return (
      <div className="athlete-card">
        <h3>{athlete.full_name}</h3>
  
        <span className={`rating ${athlete.rating}`}>
          {athlete.rating.toUpperCase()}
        </span>
  
        <p>{athlete.achievement}</p>
      </div>
    );
  }
  
  export default AthleteCard;
  