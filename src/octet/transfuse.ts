import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'

const entableTwo: (n: number[]) => number[][] = entable(2),
  entableFour: (n: number[]) => number[][] = entable(4),
  entableEight: (n: number[]) => number[][] = entable(8)

export function diffuse16(x: Uint16Array): Uint8Array {
  return Uint8Array.from(
    entableTwo([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function diffuse32(x: Uint32Array): Uint8Array {
  return Uint8Array.from(
    entableFour([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function diffuse64(x: BigUint64Array): Uint8Array {
  return Uint8Array.from(
    entableEight([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse16(x: Uint8Array): Uint16Array {
  return Uint16Array.from(
    entableTwo([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt16BE()
    )
  )
}

export function interfuse32(x: Uint8Array): Uint32Array {
  return Uint32Array.from(
    entableFour([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt32BE()
    )
  )
}

export function interfuse64(x: Uint8Array): BigUint64Array {
  return BigUint64Array.from(
    entableEight([...Buffer.from(x)]).map((y: number[]): bigint =>
      Buffer.from(y).readBigUint64BE()
    )
  )
}
