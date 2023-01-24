import { describe, expect, it } from '@jest/globals'
import { diffuse32, interfuse32 } from '../transfuse32.js'

describe('transfuse 32-bit', () => {
  describe.each([
    {
      single: [0x00, 0x00, 0x00, 0x00],
      quad: [0x00000000],
    },
    {
      single: [0x00, 0x00, 0x00, 0x01],
      quad: [0x00000001],
    },
    {
      single: [0x01, 0x00, 0x00, 0x00],
      quad: [0x01000000],
    },
    {
      single: [0x57, 0x69, 0x6b, 0x69],
      quad: [0x57696b69],
    },
  ])('$quad', ({ single, quad }: { single: number[]; quad: number[] }) => {
    const eightBits: Uint8Array = Uint8Array.from(single)
    const thirtyTwoBits: Uint32Array = Uint32Array.from(quad)

    describe('diffuse', () => {
      it('should convert 32-bit to 8-bit values', () => {
        expect([...diffuse32(thirtyTwoBits)]).toStrictEqual([...eightBits])
      })
    })

    describe('interfuse', () => {
      it('should convert 8-bit to 32-bit values', () => {
        expect([...interfuse32(eightBits)]).toStrictEqual([...thirtyTwoBits])
      })
    })
  })
})
