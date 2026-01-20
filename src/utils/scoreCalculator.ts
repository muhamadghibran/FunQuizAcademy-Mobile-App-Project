export const calculateScore = (
  correctAnswers: number,
  pointsPerQuestion: number = 10,
): number => {
  if (correctAnswers < 0) return 0;
  return correctAnswers * pointsPerQuestion;
};

export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return (current / total) * 100;
};
