export const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b

export const getRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const isEqual = (a: number, b: number, threshold: number = 0) => {
  return Math.round(a) <= Math.round(b) + threshold && Math.round(a) >= Math.round(b) - threshold
}
