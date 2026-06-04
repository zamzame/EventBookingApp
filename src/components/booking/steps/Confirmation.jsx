import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { formatPrice } from "../../../utils/currency.js";

export default function Confirmation({ state, onRetry }) {
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
          <button
            type="button"
            className="btn-primary"
            onClick={onRetry}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const result = state.bookingResult;
  if (!result) return null;

  return (
    <div className="booking-step booking-success">
      <CheckCircle size={64} className="success-icon" />
      <h2>Booking Confirmed!</h2>

      <p className="reference-line">
        Reference: <strong data-ref={result.referenceNumber}>{result.referenceNumber}</strong>
      </p>

      <div className="booking-summary">
        <p>
          <strong>{result.eventTitle}</strong>
        </p>
        <p>{result.eventDate}</p>
        <ul>
          {result.tickets.map((t, i) => (
            <li key={i}>
              {t.quantity} × {t.type} — {formatPrice(t.price * t.quantity)}
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
