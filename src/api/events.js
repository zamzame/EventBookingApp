import { apiGet } from "./client.js";

export function fetchEvents() {
  return apiGet("/events");
}

export function fetchEventById(id) {
  return apiGet(`/events/${id}`);
}