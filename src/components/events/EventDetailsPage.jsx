import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, User, ArrowLeft } from "lucide-react";
import { useEvent } from "./useEvent.js";
import { formatDate } from "../../utils/dates.js";
import { formatPrice } from "../../utils/currency.js";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error } = useEvent(id);

  if (loading) {
    return (
      <div className="page">
        <p>Loading event...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to events
        </Link>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="page">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to events
        </Link>
        <p>Event not found.</p>
      </div>
    );
  }

  const allSoldOut = event.ticketTypes.every((t) => t.available === 0);

  return (
    <div className="page details-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Back to events
      </Link>

      <img src={event.image} alt={event.title} className="details-image" />

      <span className="details-category">{event.category}</span>
      <h1 className="details-title">{event.title}</h1>

      <div className="details-meta">
        <p>
          <Calendar size={16} /> {formatDate(event.date)} · {event.time}
        </p>
        <p>
          <MapPin size={16} /> {event.location} · {event.venue}
        </p>
        <p>
          <User size={16} /> Organized by {event.organizerName}
        </p>
      </div>

      <section className="details-section">
        <h2>About this event</h2>
        <p>{event.description}</p>
      </section>

      <section className="details-section">
        <h2>Tickets</h2>
        <ul className="ticket-list">
          {event.ticketTypes.map((ticket) => (
            <li key={ticket.id} className="ticket-row">
              <span className="ticket-name">{ticket.name}</span>
              <span className="ticket-price">{formatPrice(ticket.price)}</span>
              <span className="ticket-avail">{ticket.available} left</span>
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        className="book-btn"
        onClick={() => navigate(`/book/${id}`)}
        disabled={allSoldOut}
      >
        {allSoldOut ? "Sold out" : "Book Tickets"}
      </button>
    </div>
  );
}
