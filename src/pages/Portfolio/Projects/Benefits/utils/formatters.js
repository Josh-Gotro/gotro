//TODO: could be moved to common project
export function toDollarAmount(amount) {
  return Number.parseFloat(amount).toFixed(2);
}

export const getAlaskaDateString = () => {
  const akTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Anchorage" }),
  );
  return (
    akTime.getFullYear() +
    "-" +
    String(akTime.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(akTime.getDate()).padStart(2, "0")
  );
};
