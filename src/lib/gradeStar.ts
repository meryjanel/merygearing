export const gradeStar = (grade: number) => {
  return "★".repeat(grade) + "☆".repeat(3 - grade);
};
