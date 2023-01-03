interface Washer {
  _id: string
  name: string
  payCurrent: number
  payRequire: number
  stopTime: Date | string
  processTime: number
  status: 'Available' | 'Maintain' | 'Washing' | 'Payment'
  description: string
}