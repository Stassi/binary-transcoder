import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'
import length from '../strings/length.js'
import modDivideBy from '../arithmetic/modDivideBy.js'
import strictEquals from '../logic/strictEquals.js'

const entableTwo: (n: number[]) => number[][] = entable(2)

export function diffuse(x: Uint16Array): Uint8Array {
  return Uint8Array.from(
    entableTwo([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse(x: Uint8Array): Uint16Array {
  const modDivideByTwo: (dividend: number) => number = modDivideBy(2),
    strictEqualsZero: (n: number) => boolean = strictEquals(0)

  return Uint16Array.from(
    !strictEqualsZero(modDivideByTwo(length(x)))
      ? x
      : entableTwo([...Buffer.from(x)]).map((y: number[]): number =>
          Buffer.from(y).readUInt16BE()
        )
  )
}
