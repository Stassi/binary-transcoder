export default function modDivideBy(
  divisor: number
): (dividend: number) => number {
  return (dividend: number): number => dividend % divisor
}
