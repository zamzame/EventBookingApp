import { useState} from "react";
import { validateAttendee, canAdvance } from "../validators.js";

export default function AttendeeDetails({ state, dispatch }) {
  const [touched, setTouched] = useState({});

  const update = (index, field, value) => {
    dispatch({ type: "UPDATE_ATTENDEE", index, field, value });
  };

  const handleBlur = (index, field) => {
    setTouched(prev => ({ ...prev, [`${index}-${field}`]: true }));
  };

  const isTouched = (index, field) => touched[`${index}-${field}`];

  return (
    <div className="booking-step">
      <h2>Attendee Details</h2>
      <p className="muted">Please enter details for each ticket holder.</p>

      {state.attendees.map((attendee, i) => {
        const errors = validateAttendee(attendee);
        return (
          <fieldset key={i} className="attendee-card">
            <legend>Ticket {i + 1} ({attendee.ticketName})</legend>

            <label>
              Name
              <input
                type="text"
                value={attendee.name}
                onChange={(e) => update(i, "name", e.target.value)}
                onBlur={() => handleBlur(i, "name")}                
              />
              {/* {errors.name && <span className="field-error">{errors.name}</span>} */}

              {isTouched(i, "name") && errors.name && (
                <span className="field-error">{errors.name}</span>
              )}              
            </label>

            <label>
              Email
              <input
                type="email"
                value={attendee.email}
                onChange={(e) => update(i, "email", e.target.value)}
                onBlur={() => handleBlur(i, "email")}
              />
              {/* {errors.email && <span className="field-error">{errors.email}</span>} */}
              {isTouched(i, "email") && errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </label>

            <label>
              Phone
              <input
                type="tel"
                value={attendee.phone}
                onChange={(e) => update(i, "phone", e.target.value)}
                onBlur={() => handleBlur(i, "phone")}
              />
              {/* {errors.phone && <span className="field-error">{errors.phone}</span>} */}
              {isTouched(i, "phone") && errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </label>
          </fieldset>
        );
      })}

      <div className="booking-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => dispatch({ type: "BACK" })}
        >
          ← Back
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={!canAdvance(state)}
          onClick={() => dispatch({ type: "NEXT" })}
        >
          Next →
        </button>
      </div>
    </div>
  );
}