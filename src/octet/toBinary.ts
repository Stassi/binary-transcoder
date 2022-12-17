import length from '../strings/length.js'
import modDivideBy from '../arithmetic/modDivideBy.js'
import strictEquals from '../logic/strictEquals.js'
import subtractFrom from '../arithmetic/subtractFrom.js'

const EMPTY_STRING = '',
  OCTET_BITS = 8,
  ZERO = 0,
  zero = `${ZERO}`,
  strictEqualsZero: (n: number) => boolean = strictEquals(ZERO),
  subtractFromBits: (subtrahend: number) => number = subtractFrom(OCTET_BITS)

export const modDivideByBits: (dividend: number) => number =
  modDivideBy(OCTET_BITS)

function prependLeadingZeroes(maxLength: number): string {
  return EMPTY_STRING.padStart(maxLength, zero)
}

function trimLeadingZeroes(padded: string): string {
  return padded.replace(/^0+/, EMPTY_STRING) || zero
}

export function padBinary(binary: string): string {
  const trimmed: string = trimLeadingZeroes(binary),
    missingPaddingLength: number = modDivideByBits(length(trimmed))

  return `${prependLeadingZeroes(
    strictEqualsZero(missingPaddingLength)
      ? ZERO
      : subtractFromBits(missingPaddingLength)
  )}${trimmed}`
}

export default function toBinary(n: number): string {
  return padBinary(n.toString(2))
}
