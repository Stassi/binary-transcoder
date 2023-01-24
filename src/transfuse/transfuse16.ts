import { Buffer } from 'node:buffer'
import entable from '../arrays/entable.js'

const entableTwo: (n: number[]) => number[][] = entable(2)

export function diffuse(x: Uint16Array): Uint8Array {
  return Uint8Array.from(
    entableTwo([...Buffer.from([...Buffer.from(x.buffer)]).reverse()])
      .reverse()
      .flat()
  )
}

export function interfuse(x: Uint8Array): Uint16Array {
  return Uint16Array.from(
    entableTwo([...Buffer.from(x)]).map((y: number[]): number =>
      Buffer.from(y).readUInt16BE()
    )
  )
}
