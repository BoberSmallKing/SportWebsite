function AthleteCard({ athlete }) {
  return (
    <div className="athlete-card-retro">
      <div className="photo-container">
        <img
          src={athlete.photo || "/fighter-placeholder.jpg"}
          alt={athlete.full_name}
          className="athlete-pixel-photo"
        />

        <div className={`division-badge ${athlete.division}`}>
          {athlete.division[0].toUpperCase()}
        </div>

        <div className="rating-overlay">
          <span>{athlete.rating}</span>
        </div>
      </div>

      <div className="name-plate">{athlete.full_name.split(" ")[0]} </div>
    </div>
  );
}

export default AthleteCard;
