import { buildAttendeeSlots } from "./helpers.js";

export const initialState = {
  step: "select",
  event: null,
  tickets: {},
  attendees: [],
  errors: {},
  submitting: false,
  submitError: null,
  bookingResult: null,
};
export function bookingReducer(state, action) {

  switch (action.type) { 
    case "LOAD_EVENT": {

      const tickets = {};
      for (const t of action.event.ticketTypes) {
        tickets[t.id] = 0;
      }
      return { ...state, event: action.event, tickets };
    }

    case "SET_QUANTITY": {

      const newTickets = { ...state.tickets, [action.ticketId]: action.quantity };
      return { ...state, tickets: newTickets };
    }

    case "NEXT": {
      // Handeling steps forwards: select -> attendees -> confirmation
      if (state.step === "select") {
        // const slots = buildAttendeeSlots({ ...state, step: "select" });
        const slots = buildAttendeeSlots(state);
        const attendees = slots.map((s) => ({
          name: "",
          email: "",
          phone: "",
          ticketTypeId: s.ticketTypeId,
          ticketName: s.ticketName,
        }));
        return { ...state, step: "attendees", attendees };
      }
      if (state.step === "attendees") {
        return { ...state, step: "confirm" };
      }
      return state;
    }

    case "BACK": {
        // Handeling steps backwards: confirmation -> attendees -> select
      if (state.step === "attendees") return { ...state, step: "select" };
      if (state.step === "confirm" && !state.bookingResult) {
        return { ...state, step: "attendees" };
      }
      return state;
    }

    case "UPDATE_ATTENDEE": {
      const newAttendees = state.attendees.map((a, i) =>
        i === action.index ? { ...a, [action.field]: action.value } : a
      );
      return { ...state, attendees: newAttendees };
    }


    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "SUBMIT_START":
      return { ...state, submitting: true, submitError: null };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submitting: false,
        bookingResult: action.result,
        // step: "cofirm", // To resolve Next movement to confirmation step after submiting
      };

    case "SUBMIT_ERROR":
      return { ...state, submitting: false, submitError: action.message };


    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}
