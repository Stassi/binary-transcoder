import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'
import length from '../strings/length.js'
import modDivideBy from '../arithmetic/modDivideBy.js'
import strictEquals from '../logic/strictEquals.js'

const entableFour: (n: number[]) => number[][] = entable(4)

export function diffuse(x: Uint32Array): Uint8Array {
  return Uint8Array.from(
    entableFour([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse(x: Uint8Array): Uint32Array {
  const modDivideByFour: (dividend: number) => number = modDivideBy(4),
    strictEqualsZero: (n: number) => boolean = strictEquals(0)

  return Uint32Array.from(
    !strictEqualsZero(modDivideByFour(length(x)))
      ? x
      : entableFour([...Buffer.from(x)]).map((y: number[]): number =>
          Buffer.from(y).readUInt32BE()
        )
  )
}
