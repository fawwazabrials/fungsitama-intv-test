export const generateInvoiceNumber = () => {
  const now = new Date();

  const pad = (n: number, width = 2) => n.toString().padStart(width, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1); // Months are 0-indexed
  const year = now.getFullYear();

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const milliseconds = pad(now.getMilliseconds(), 3);

  return `INVC/${day}${month}${year}/${hours}${minutes}${seconds}${milliseconds}`;
};
