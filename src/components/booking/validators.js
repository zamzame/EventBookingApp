export function validateAttendee(attendee) {
  const errors = {};

  if (!attendee?.name || attendee.name.trim().length < 2) {
    errors.name = "Name must have at least 2 characters";
  }

  const email = attendee?.email || "";
  // Check the email validity
  if (email.length <5 || !email.includes("@") || !email.includes(".")) {
    errors.email = " Email should be valid";
  }
  const phone = (attendee?.phone || "").replace(" ", "");
  if (phone.length < 10) {
    errors.phone = "Phone should have at least 10 digits";
  }

  return errors;
}


export function isAttendeeValid(attendee) { 
  return Object.keys(validateAttendee(attendee)).length === 0;
}

export function canAdvance(state) {
  if (state.step === "select") {
    return Object.values(state.tickets).some((q) => q > 0);
  }
  if (state.step === "attendees") {
    return state.attendees.length > 0 && state.attendees.every(isAttendeeValid);
  }

  
  return true;
}