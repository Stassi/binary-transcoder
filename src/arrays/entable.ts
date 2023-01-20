import add from '../arithmetic/add.js'
import length from '../strings/length.js'
import modDivideBy from '../arithmetic/modDivideBy.js'
import strictEquals from '../logic/strictEquals.js'
import useState from '../state/useState.js'

type EntableRoundState<T> = {
  complete: boolean
  generated: T[][]
  i: number
  remaining: T[]
}

type EntableRound<T> = {
  next(): EntableRound<T>
  state: EntableRoundState<T>
}

const strictEqualsZero: (n: number) => boolean = strictEquals(0)

function round<T>(
  { data, width }: { data: T[]; width: number },
  state: EntableRoundState<T> = {
    complete: false,
    generated: [],
    i: 0,
    remaining: data,
  }
): EntableRound<T> {
  const { generated, i: prevI }: EntableRoundState<T> = state

  return {
    state,
    next(): EntableRound<T> {
      const i: number = add(prevI, width),
        remaining: T[] = data.slice(i)

      return round(
        { data, width },
        {
          i,
          remaining,
          complete: strictEqualsZero(length(remaining)),
          generated: [...generated, data.slice(prevI, i)],
        }
      )
    },
  }
}

function entableUnary<T>({ data, width }: { data: T[]; width: number }): T[][] {
  const dataLength: number = length(data),
    modDivideByWidth: (dividend: number) => number = modDivideBy(width)

  if (strictEqualsZero(dataLength)) return []
  else if (!strictEqualsZero(modDivideByWidth(dataLength)))
    throw new RangeError(
      `Input length must be evenly divisible by width: ${width}`
    )

  const { get: getRound, set: setRound } = useState(round({ data, width }))

  while (!getRound().state.complete) {
    setRound(getRound().next())
  }

  return getRound().state.generated
}

export default function entable<T>(width: number): (data: T[]) => T[][] {
  return (data: T[]): T[][] => entableUnary({ data, width })
}
