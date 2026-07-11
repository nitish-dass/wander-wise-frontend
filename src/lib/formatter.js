export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const formatShortDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
export function formatWeekday(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short", // Monday, Tuesday, etc.
  });
}