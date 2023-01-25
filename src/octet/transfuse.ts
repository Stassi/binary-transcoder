import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'

type UnsignedTypedArrays = Uint16Array | Uint32Array | BigUint64Array

function diffuse(width: number): (x: UnsignedTypedArrays) => Uint8Array {
  return (x: UnsignedTypedArrays): Uint8Array =>
    Uint8Array.from(
      entable(width)([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
        .reverse()
        .flat()
    )
}

export const diffuse16: (x: Uint16Array) => Uint8Array = diffuse(2),
  diffuse32: (x: Uint32Array) => Uint8Array = diffuse(4),
  diffuse64: (x: BigUint64Array) => Uint8Array = diffuse(8)

export function interfuse16(x: Uint8Array): Uint16Array {
  return Uint16Array.from(
    entable(2)([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt16BE()
    )
  )
}

export function interfuse32(x: Uint8Array): Uint32Array {
  return Uint32Array.from(
    entable(4)([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt32BE()
    )
  )
}

export function interfuse64(x: Uint8Array): BigUint64Array {
  return BigUint64Array.from(
    entable(8)([...Buffer.from(x)]).map((y: number[]): bigint =>
      Buffer.from(y).readBigUint64BE()
    )
  )
}
