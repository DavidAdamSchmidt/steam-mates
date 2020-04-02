export const calculateTitleFontSize = titleLength => {
  switch (true) {
    case titleLength > 60:
      return 18;
    case titleLength > 40:
      return 22;
    case titleLength > 30:
      return 25;
    case titleLength > 20:
      return 28;
    default:
      return 31;
  }
};

export const calculateCreatorsFontSize = (
  developersTextLength,
  publishersTextLength
) => {
  return (
    10 - Math.floor(Math.max(developersTextLength, publishersTextLength) / 30)
  );
};
