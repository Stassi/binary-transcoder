import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'

const entableEight: (n: number[]) => number[][] = entable(8)

export function diffuse(x: BigUint64Array): Uint8Array {
  return Uint8Array.from(
    entableEight([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse(x: Uint8Array): BigUint64Array {
  return BigUint64Array.from(
    entableEight([...Buffer.from(x)]).map((y: number[]): bigint =>
      Buffer.from(y).readBigUint64BE()
    )
  )
}
