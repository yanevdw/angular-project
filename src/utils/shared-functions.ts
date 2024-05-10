export const calculateBookRating = (
  oneStarRating: number,
  twoStarRating: number,
  threeStarRating: number,
  fourStarRating: number,
  fiveStarRating: number,
): number => {
  if (oneStarRating !== 0) {
    return 1;
  } else if (twoStarRating !== 0) {
    return 2;
  } else if (threeStarRating !== 0) {
    return 3;
  } else if (fourStarRating !== 0) {
    return 4;
  } else if (fiveStarRating !== 0) {
    return 5;
  }

  return 0;
};
