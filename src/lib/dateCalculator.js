// Normalize a date to midnight local time, stripping the time component
function toDateOnly(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// utils/dateHelpers.js

export function getTripStatus(startDate, endDate) {
  const today = toDateOnly(new Date());
  const tripStartDate = toDateOnly(startDate);
  const tripEndDate = toDateOnly(endDate);

  // Trip hasn't started yet
  if (today < tripStartDate) {
    return "Trip has not started";
  }

  const diffInMs = tripEndDate - today;
  const daysRemaining = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return "Trip has expired";
  }

  if (daysRemaining === 0) {
    return "Trip ends today";
  }

  return `${daysRemaining} days remaining`;
}

// utils/dateHelpers.js

export function getPassedDays(startDate, endDate) {
  const today = toDateOnly(new Date());
  const tripStartDate = toDateOnly(startDate);
  const tripEndDate = toDateOnly(endDate);

  // Trip already over
  if (tripEndDate < today) {
    return "Trip has expired";
  }

  const diffInMs = today - tripStartDate;
  const daysPassed = Math.round(diffInMs / (1000 * 60 * 60 * 24)); // round, not floor

  if (daysPassed > 0) {
    return `Day ${daysPassed}`;
  }

  if (daysPassed === 0) {
    return "Trip begins today";
  }

  if (daysPassed === -1) {
    return "Trip starts tomorrow";
  }

  // daysPassed < -1, trip starts further in the future
  return `Trip starts in ${Math.abs(daysPassed)} days`;
}