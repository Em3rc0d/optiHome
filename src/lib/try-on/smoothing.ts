export function smoothYaw(previous: number, next: number) {
  const difference = Math.abs(next - previous);

  const weight =
    difference > 15
      ? 0.86
      : difference > 7
        ? 0.68
        : difference > 3
          ? 0.48
          : 0.28;

  return previous + (next - previous) * weight;
}
