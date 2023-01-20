export default function useState<T>(state: T): {
  get: () => T
  set: (x: T) => void
} {
  return {
    get: function (): T {
      return state
    },
    set: function (x: T): void {
      state = x
    },
  }
}
