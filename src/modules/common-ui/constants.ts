export const adminEmails = [
  "arthur.robieux@gmail.com",
  "sugarqueen.pro@gmail.com"
];

export const randomToken = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};
