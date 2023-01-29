import { Buffer } from 'node:buffer'

const create: {
  (data: Uint8Array | readonly number[]): Buffer
} = Buffer.from

export default create
