import createBuffer from './buffer/create.js'
import length from './strings/length.js'
import subdivideOctets from './octet/subdivide.js'
import toBinary from './octet/toBinary.js'
import toDecimal from './octet/toDecimal.js'

export function decode(encoded: Uint8Array): number {
  return createBuffer(encoded).readUIntBE(0, length(encoded))
}

export function encode(n: number): Uint8Array {
  const binary: string = toBinary(n)
  const decimal: number[] = subdivideOctets(binary).map(toDecimal)
  return Uint8Array.from(decimal)
}
