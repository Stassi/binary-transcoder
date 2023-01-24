import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'

const entableFour: (n: number[]) => number[][] = entable(4)

export function diffuse32(x: Uint32Array): Uint8Array {
  return Uint8Array.from(
    entableFour([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse32(x: Uint8Array): Uint32Array {
  return Uint32Array.from(
    entableFour([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt32BE()
    )
  )
}
