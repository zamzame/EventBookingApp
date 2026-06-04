import { useState, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById } from "../../api/events.js";
import { apiPost, apiPatch } from "../../api/client.js";
import { bookingReducer, initialState } from "./bookingReducer.js";
import { calcTotal, buildTicketLines, generateReference} from "./helpers.js";
import Stepper from "./Stepper.jsx";
import SelectTickets from "./steps/SelectTickets.jsx";
import AttendeeDetails from "./steps/AttendeeDetails.jsx";
import Confirmation from "./steps/Confirmation.jsx";
import { useUser } from "../../context/UserContext.jsx";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [message, setMessage] = useState(null); 

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000); 
  };     

  useEffect(() => {
    let cancelled = false;
    fetchEventById(id)
      .then((event) => {
        if (!cancelled) dispatch({ type: "LOAD_EVENT", event });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function submitBooking() {

    if (state.submitting || state.bookingResult) return;

    dispatch({ type: "SUBMIT_START" });
    // dispatch({ type: "NEXT" }); // When submitted stepper will move to "confirm"
     dispatch({ type: "NEXT" }); // When submitted stepper will move to "confirm"

    const payload = {
      userId: user.id,
      eventId: state.event.id,
      eventTitle: state.event.title,
      eventDate: state.event.date,
      tickets: buildTicketLines(state),
      attendees: state.attendees.map(({ ticketTypeId, ticketName, ...rest }) => rest),// eslint-disable-line no-unused-vars
      totalAmount: calcTotal(state),
      status: "confirmed",
      bookingDate: new Date().toISOString().split("T")[0],
      referenceNumber: generateReference(),
    };

    try {
      const saved = await apiPost("/bookings", payload);

      const updatedTickets = state.event.ticketTypes.map((t) => {
        const bought = state.tickets[t.id] || 0;
        return { ...t, available: Math.max(0, t.available - bought) };
      });
      await apiPatch(`/events/${state.event.id}`, { ticketTypes: updatedTickets });

      dispatch({ type: "SUBMIT_SUCCESS", result: saved });
      // dispatch({ type: "NEXT" }); // When submitted stepper will move to "confirm"

      showMessage("Booking confirmed!", "success"); 
    } catch (err) {
      dispatch({ type: "SUBMIT_ERROR", message: err.message });
      showMessage("Booking failed: " + err.message, "error"); 
    }
  }

  if (!state.event) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page booking-page">
      {message && (
              <div style={{
                background: message.type === "success" ? "green" : "red",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 1000
              }}>
                {message.text}
              </div>
            )}
      <h1>Book: {state.event.title}</h1>

      <Stepper currentStep={state.step} />

      {state.step === "select" && (
        <SelectTickets
          state={state}
          dispatch={dispatch}
          onCancel={() => navigate(`/events/${id}`)}
        />
      )}

      {state.step === "attendees" && (
        <AttendeeDetails
          state={state}
          dispatch={dispatch}
          onSubmit={submitBooking}
        />
      )}

      {state.step === "confirm" && (
        <Confirmation state={state} onRetry={submitBooking}/>
      )}
    </div>
  );
}
