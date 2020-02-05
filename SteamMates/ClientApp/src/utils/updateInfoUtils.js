export const getElapsedTimeText = latestUpdate => {
  if (latestUpdate === null) {
    return "N/A (used backup)";
  }

  const diff = new Date(Date.now()) - new Date(latestUpdate);

  const hours = Math.floor(diff / 1000 / 60 / 60);
  if (hours > 0) {
    return createText(hours, "hour");
  }

  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes > 0) {
    return createText(minutes, "minute");
  }

  const seconds = Math.floor(diff / 1000);
  if (seconds > 0) {
    return createText(seconds, "second");
  }

  return "Now";
};

const createText = (value, unit) =>
  `${value} ${unit}${value > 1 ? "s" : ""} ago`;
