export default function strictEquals<T>(x: T): (y: T) => boolean {
  return (y: T): boolean => x === y
}
