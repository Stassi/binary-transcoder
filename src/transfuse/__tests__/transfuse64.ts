import { describe, expect, it } from '@jest/globals'
import { diffuse64, interfuse64 } from '../transfuse.js'

describe('transfuse 64-bit', () => {
  describe.each([
    {
      single: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
      octad: [0x0000000000000000n],
    },
    {
      single: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01],
      octad: [0x0000000000000001n],
    },
    {
      single: [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00],
      octad: [0x0000000001000000n],
    },
    {
      single: [0x00, 0x00, 0x00, 0x00, 0x57, 0x69, 0x6b, 0x69],
      octad: [0x0000000057696b69n],
    },
  ])('$octal', ({ single, octad }: { single: number[]; octad: bigint[] }) => {
    const eightBits: Uint8Array = Uint8Array.from(single)
    const sixtyFourBits: BigUint64Array = BigUint64Array.from(octad)

    describe('diffuse', () => {
      it('should convert 64-bit to 8-bit values', () => {
        expect([...diffuse64(sixtyFourBits)]).toStrictEqual([...eightBits])
      })
    })

    describe('interfuse', () => {
      it('should convert 8-bit to 64-bit values', () => {
        expect([...interfuse64(eightBits)]).toStrictEqual([...sixtyFourBits])
      })
    })
  })
})
