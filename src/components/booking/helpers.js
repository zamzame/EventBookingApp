export function calcTotal(state) {
  if (!state.event) return 0;
  return state.event.ticketTypes.reduce((sum, ticket) => {
    const qty = state.tickets[ticket.id] || 0;
    return sum + qty * ticket.price;
  }, 0);
}

export function getTotalTickets(state) {
  return Object.values(state.tickets).reduce((sum, q) => sum + q, 0);
}

export function buildAttendeeSlots(state) {
  console.log("Building attendee slots with state:", state);
  if (!state.event) return [];
  const slots = [];
  for (const ticket of state.event.ticketTypes) {
    const qty = state.tickets[ticket.id] || 0;
    for (let i = 0; i < qty; i++) {
      slots.push({ ticketTypeId: ticket.id, ticketName: ticket.name });
    }
  }
  return slots;
}

export function buildTicketLines(state) {
  return state.event.ticketTypes
    .filter((t) => (state.tickets[t.id] || 0) > 0)
    .map((t) => ({
      type: t.name,
      quantity: state.tickets[t.id],
      price: t.price,
    }));
}

export function generateReference() {
  return "BK" + Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0");
}
