export function parseData(value: string | object): object | undefined {
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
export async function fetchData(value: string, fetchOptions?: object) {
  try {
    return await fetch(new URL(value).href, fetchOptions)
      .then((res) => res.text())
      .then((text) => parseData(text))
  } catch {}
}
