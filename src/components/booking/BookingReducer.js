``` Reducer for 3-step booking-flow. ```

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
  ```action declarations: ```
  switch (action.type) { 
    case "LOAD_EVENT": {
        ```Load vevent to select tickets```
      const tickets={};
      return { ...state, event: action.event, tickets };
    }

    case "SET_QUANTITY": {
        ```Set quantity of a ticket type```
      const newTickets = {};  
      return { ...state, tickets: newTickets };
    }

    case "NEXT": {
      ```Handeling steps forwards: select -> attendees -> confirmation ```
      return state;
    }

    case "BACK": {
        ```Handeling steps backwards: confirmation -> attendees -> select```
      return state;
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
      };

    case "SUBMIT_ERROR":
      return { ...state, submitting: false, submitError: action.message };


    default:
      return state;
  }
}
