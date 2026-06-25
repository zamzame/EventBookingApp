import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { formatPrice } from "../../../utils/currency.js";

export default function Confirmation({ state, onSubmit, onRetry, onBack }) {
  const navigate = useNavigate();

  if (state.submitting) {
    return (
      <div className="booking-step">
        <p>Booking your tickets...</p>
      </div>
    );
  }

  if (state.submitError) {
    return (
      <div className="booking-step">
        <p className="error">Booking failed: {state.submitError}</p>

        <div className="booking-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            ← Back
          </button>

          <button type="button" className="btn-primary" onClick={onRetry}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const result = state.bookingResult;

  if (!result) {
    return (
      <div className="booking-step">
        <h2>Confirm Your Booking</h2>

        <div className="booking-summary">
          <p>
            <strong>{state.event.title}</strong>
          </p>
          <p>{state.event.date}</p>

          <ul>
            {state.event.ticketTypes
              .filter((ticket) => state.tickets[ticket.id] > 0)
              .map((ticket) => (
                <li key={ticket.id}>
                  {state.tickets[ticket.id]} × {ticket.name} —{" "}
                  {formatPrice(ticket.price * state.tickets[ticket.id])}
                </li>
              ))}
          </ul>

          <p className="total-line">
            Total:{" "}
            {formatPrice(
              state.event.ticketTypes.reduce((sum, ticket) => {
                return sum + ticket.price * (state.tickets[ticket.id] || 0);
              }, 0)
            )}
          </p>
        </div>

        <div className="booking-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            ← Back
          </button>

          <button type="button" className="btn-primary" onClick={onSubmit}>
            Confirm Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-step booking-success">
      <CheckCircle size={64} className="success-icon" />
      <h2>Booking Confirmed!</h2>

      <p className="reference-line">
        Reference: <strong>{result.referenceNumber}</strong>
      </p>

      <div className="booking-summary">
        <p>
          <strong>{result.eventTitle}</strong>
        </p>
        <p>{result.eventDate}</p>

        <ul>
          {result.tickets.map((ticket, index) => (
            <li key={index}>
              {ticket.quantity} × {ticket.type} —{" "}
              {formatPrice(ticket.price * ticket.quantity)}
            </li>
          ))}
        </ul>

        <p className="total-line">Total: {formatPrice(result.totalAmount)}</p>
      </div>

      <div className="booking-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/my-bookings")}
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}