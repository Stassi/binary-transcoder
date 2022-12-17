import toBinary from './octet/toBinary.js'
import toDecimal from './octet/toDecimal.js'
import transcode from './transcode.js'

export function decode(octets: Uint8Array): string {
  return toBinary(transcode(octets).toNumber())
}

export function encode(binary: string): Uint8Array {
  return transcode(toDecimal(binary)).toUInt8Array()
}
