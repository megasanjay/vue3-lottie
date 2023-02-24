import { LottieJson } from '@reslear/dotlottie-player-core'

export function parseData(
  value: string | LottieJson | Record<string, unknown>,
): LottieJson | undefined {
  try {
    // check is string or json
    if (
      !value ||
      (typeof value !== 'string' && typeof value !== 'object') ||
      Array.isArray(value)
    ) {
      return
    }

    // is object return json
    if (typeof value === 'object') {
      return JSON.parse(JSON.stringify(value))
    }

    // is string parse and return is json
    const json = JSON.parse(value)

    if (typeof json === 'object') {
      return json
    }
  } catch {}

  return
}
