import { describe, expect, it } from '@jest/globals'
import { diffuse, interfuse } from '../transfuse.js'

describe('transfuse (8-bit <=> 16-bit)', () => {
  describe.each([
    {
      single: [0x00, 0x00],
      double: [0x0000],
    },
    {
      single: [0x00, 0x01],
      double: [0x0001],
    },
    {
      single: [0x00, 0x10],
      double: [0x0010],
    },
    {
      single: [0x01, 0x00],
      double: [0x0100],
    },
    {
      single: [0x10, 0x00],
      double: [0x1000],
    },
    {
      single: [0xff, 0xff],
      double: [0xffff],
    },
    {
      single: [0x57, 0x69, 0x6b, 0x69],
      double: [0x5769, 0x6b69],
    },
  ])(
    '$double',
    ({ single, double }: { single: number[]; double: number[] }) => {
      const eightBits: Uint8Array = Uint8Array.from(single)
      const sixteenBits: Uint16Array = Uint16Array.from(double)

      describe('diffuse', () => {
        it('should convert 16-bit to 8-bit values', () => {
          expect([...diffuse(sixteenBits)]).toStrictEqual([...eightBits])
        })
      })

      describe('interfuse', () => {
        it('should convert 8-bit to 16-bit values', () => {
          expect([...interfuse(eightBits)]).toStrictEqual([...sixteenBits])
        })
      })
    }
  )
})
