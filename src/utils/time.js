export const getTimeFromString = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString();
};

export const getDateFromString = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export const getCurrentTime = () => {
  const date = new Date();
  return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
};

export const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export const getCurrentHour = () => {
  const now = new Date();
  return now.getHours();
};
