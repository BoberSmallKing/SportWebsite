function AthleteCard({ athlete }) {
  const MAX_LENGTH = 100;

  const description =
    athlete.description && athlete.description.length > MAX_LENGTH
      ? athlete.description.slice(0, MAX_LENGTH) + "…"
      : athlete.description;

  return (
    <div className="athlete-card">
      <div className="athlete-photo-wrapper">
        <img
          src={athlete.photo || "/fighter-placeholder.jpg"}
          alt={athlete.full_name}
          className="athlete-photo"
        />

        <span className={`rating ${athlete.rating}`}>
          {athlete.rating.toUpperCase()}
        </span>
      </div>

      <div className="athlete-info">
        <h3 className="athlete-name">{athlete.full_name}</h3>
        {description && (
          <p className="athlete-description">{description}</p>
        )}
      </div>
    </div>
  );
}

export default AthleteCard;

