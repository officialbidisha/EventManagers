function tConvert(time: string): string {
  // Check if the input time is valid
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Please use HH:mm or HH:mm:ss.");
  }

  // Destructure matched time components
  const [, hours, minutes] = match;

  // Convert hours to 12-hour format and determine AM/PM
  const adjustedHours = +hours % 12 || 12;
  const period = +hours < 12 ? "AM" : "PM";

  // Return formatted time
  return `${adjustedHours}:${minutes} ${period}`;
}

export default tConvert;
