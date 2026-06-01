/* Select the ticket quantity of each*/
import { Minus, Plus } from "lucide-react";
import { calcTotal } from "../helpers.js";

export default function SelectTickets({ state, dispatch}) {
  const total = calcTotal(state);

  const changeQty = (ticketId, delta, max) => {
    const current = state.tickets[ticketId] || 0;
    const next = Math.max(0, Math.min(max, current + delta));
    dispatch({ type: "SET_QUANTITY", ticketId, quantity: next });
  };

  return (
    <div className="booking-step">
      <h2>Select Tickets</h2>

      <ul className="ticket-pick-list">
        {state.event.ticketTypes.map((ticket) => {

          const qty = state.tickets[ticket.id] || 0;
          const lineTotal = qty * ticket.price;

          return (
            <li key={ticket.id} className="ticket-pick">
              <div>
                <p className="tp-name">{ticket.name}</p>
                <p className="tp-price">{ticket.price}</p>
              </div>

              <div className="qty-control">
                <button
                  type="button"
                  onClick={() => changeQty(ticket.id, -1, ticket.available)}
                  disabled={qty === 0}
                  aria-label="Decrease"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-display">{qty}</span>
                <button
                  type="button"
                  onClick={() => changeQty(ticket.id, +1, ticket.available)}
                  disabled={qty >= ticket.available}
                  aria-label="Increase"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="line-total">{lineTotal}</div>
            </li>
          );
        })}
      </ul>

      <div className="booking-total">
        <span>Total</span>
        <span>{total}</span>
      </div>

    </div>
  );
}