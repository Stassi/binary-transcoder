import { describe, expect, it } from '@jest/globals'
import { decode, encode } from '../transcodeNumber.js'

// TODO: Separately transcode binary strings

describe('transcode number', () => {
  describe.each([
    {
      number: 0,
      octets: [0],
    },
    {
      number: 1,
      octets: [1],
    },
    {
      number: 256,
      octets: [1, 0],
    },
    {
      number: 65536,
      octets: [1, 0, 0],
    },
    {
      number: 16777216,
      octets: [1, 0, 0, 0],
    },
    {
      number: 4294967296,
      octets: [1, 0, 0, 0, 0],
    },
    {
      number: 1099511627776,
      octets: [1, 0, 0, 0, 0, 0],
    },
    {
      number: 281474976710655,
      octets: [255, 255, 255, 255, 255, 255],
    },
  ])(
    'input: $number',
    ({ number, octets }: { number: number; octets: number[] }) => {
      describe('decode', () => {
        it('should return a number', () => {
          expect(decode(Uint8Array.from(octets))).toBe(number)
        })
      })

      describe('encode', () => {
        it('should return an octet array', () => {
          expect([...encode(number)]).toStrictEqual(octets)
        })
      })
    }
  )
})
