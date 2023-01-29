import createBuffer from '../../buffer/create.js'
import entable from '../../arrays/entable.js'
import toNumbers from '../toNumbers.js'

export function interfuse16(x: Uint8Array): Uint16Array {
  return Uint16Array.from(
    entable(2)(toNumbers(x)).map((y: number[]): number =>
      createBuffer(y).readUInt16BE()
    )
  )
}

export function interfuse32(x: Uint8Array): Uint32Array {
  return Uint32Array.from(
    entable(4)(toNumbers(x)).map((y: number[]): number =>
      createBuffer(y).readUInt32BE()
    )
  )
}

export function interfuse64(x: Uint8Array): BigUint64Array {
  return BigUint64Array.from(
    entable(8)(toNumbers(x)).map((y: number[]): bigint =>
      createBuffer(y).readBigUint64BE()
    )
  )
}

export * from './diffuse.js'
