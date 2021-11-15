export function alwaysMap<A, B>(
  maybeArray : undefined|A[]|A,
  mapFunction : (as:A) => B,
): B[] {
  if (!maybeArray) {
    return []
  }

  if (Array.isArray(maybeArray)) {
    return maybeArray.map(mapFunction)
  }

  return [mapFunction(maybeArray)]
}
