import { describe, expect, it } from '@jest/globals'
import entable from '../entable.js'

describe('entable', () => {
  describe.each([
    {
      data: ['a', 'b'],
      width: 2,
      expected: [['a', 'b']],
    },
    {
      data: [0, 0],
      width: 2,
      expected: [[0, 0]],
    },
    {
      data: [0, 0, 0, 0],
      width: 2,
      expected: [
        [0, 0],
        [0, 0],
      ],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      width: 2,
      expected: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      width: 4,
      expected: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
  ])(
    'width: $width, data: $data',
    ({
      data,
      expected,
      width,
    }: {
      data: any[]
      expected: any[][]
      width: number
    }) => {
      it('should return a table with rows of the given width', () => {
        expect(entable(width)(data)).toStrictEqual(expected)
      })
    }
  )

  describe('width: 2, data: [0, 1, 2]', () => {
    it('should throw a RangeError', () => {
      expect(() => entable(2)([0, 1, 2])).toThrow(
        'Input length must be evenly divisible by width: 2'
      )
    })
  })

  describe('width: 10, data: []', () => {
    it('should return an empty array', () => {
      expect(entable(10)([])).toStrictEqual([])
    })
  })
})
