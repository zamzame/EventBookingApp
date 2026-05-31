import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { formatDate } from "../../utils/dates.js";
import { formatPrice } from "../../utils/currency.js";

export default function EventCard({ event, isFavorite, onToggleFavorite }) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(event.id);
  };

  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <img src={event.image} alt={event.title} className="event-card-img" />

      <button
        type="button"
        className={`heart-btn ${isFavorite ? "active" : ""}`}
        onClick={handleHeartClick}
        aria-label="Toggle favorite"
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div className="event-card-body">
        <span className="event-card-category">{event.category}</span>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-date">{formatDate(event.date)}</p>
        <p className="event-card-location">{event.location}</p>
        <p className="event-card-price">{formatPrice(lowestPrice)}</p>
      </div>
    </Link>
  );
}