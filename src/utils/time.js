export const getCurrentTime = (timezone = "") => {
  const date = new Date();
  return date.toLocaleTimeString([], { timeZone: timezone, hour: "numeric", minute: "numeric" });
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

export const getDayNameFromString = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
};

export const getDayNumberFromString = (dateString) => {
  return new Date(dateString).getDate();
};

export const getMonthNameFromString = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[date.getMonth()];
};
