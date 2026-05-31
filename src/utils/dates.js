//Date handeling functions
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isUpcoming(dateString) {
  return new Date(dateString) >= new Date();
}

export function isThisWeek(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const week = 7 * 24 * 60 * 60 * 1000;
  return date >= now && date <= new Date(now.getTime() + week);
}

export function isThisMonth(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date >= now
  );
}