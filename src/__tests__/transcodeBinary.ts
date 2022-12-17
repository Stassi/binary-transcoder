import { describe, expect, it } from '@jest/globals'
import { decode, encode } from '../transcodeBinary.js'

describe('transcode binary', () => {
  describe.each([
    {
      binary: '00000001',
      octets: [0b1],
    },
    {
      binary: '0000000111111111',
      octets: [0b1, 0b11111111],
    },
  ])(
    'input: $binary',
    ({ binary, octets }: { binary: string; octets: number[] }) => {
      describe('decode', () => {
        it('should return a binary string', () => {
          expect(decode(Uint8Array.from(octets))).toBe(binary)
        })
      })

      describe('encode', () => {
        it('should return an 8-bit array', () => {
          expect([...encode(binary)]).toStrictEqual(octets)
        })
      })
    }
  )
})
