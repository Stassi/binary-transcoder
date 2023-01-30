import entable from '../../arrays/entable.js'
import toNumbers from '../toNumbers.js'

type IncludesArrayBuffer = { buffer: ArrayBufferLike }
type Diffuse<T> = (x: T) => Uint8Array

function diffuse(width: number): (x: IncludesArrayBuffer) => Uint8Array {
  return ({ buffer: arrayBuffer }: IncludesArrayBuffer): Uint8Array => {
    return Uint8Array.from(
      entable({ width, data: toNumbers(arrayBuffer).reverse() })
        .reverse()
        .flat()
    )
  }
}

export const diffuse16: Diffuse<Uint16Array> = diffuse(2),
  diffuse32: Diffuse<Uint32Array> = diffuse(4),
  diffuse64: Diffuse<BigUint64Array> = diffuse(8)
