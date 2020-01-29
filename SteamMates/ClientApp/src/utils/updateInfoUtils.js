export const getElapsedTimeText = latestUpdate => {
  const diff = new Date(Date.now()) - latestUpdate;

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
