import { Link } from "react-router-dom";


function AthleteCard({ athlete }) {
  const MAX_LENGTH = 70;

  const description =
    athlete.description && athlete.description.length > MAX_LENGTH
      ? athlete.description.slice(0, MAX_LENGTH) + "…"
      : athlete.description;

  return (
    <div className="athlete-card">
      <Link to={`/dashboard/athlete/${athlete.id}`}>
      <div className="athlete-photo-wrapper">
        <img
          src={athlete.photo || "/fighter-placeholder.jpg"}
          alt={athlete.full_name}
          className="athlete-photo"
        />

        <span className={`rating ${athlete.division}`}>
          {athlete.division.toUpperCase()}
        </span>
      </div>

      <div className="athlete-info">
        <h3 className="athlete-name">{athlete.full_name}</h3>
        <p style={{fontWeight: 600}}>Рейтинг: {athlete.rating}</p>
        {description && (
          <p className="athlete-description">{description}</p>
        )}
      </div>
      </Link>
    </div>
  );
}

export default AthleteCard;

