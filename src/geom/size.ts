export type Size = {
  width: number,
  height: number,
}

export function roundSize( p : Size ):Size {
  return {
    width: Math.round(p.width),
    height: Math.round(p.height),
  }
}

export function divSize( p : Size, div : number ):Size {
  return {
    width : p.width / div,
    height : p.height / div,
  }
}

export function multSize( p : Size, mult : number ):Size {
  return {
    width : p.width * mult,
    height : p.height * mult,
  }
}

export function multSizeBySize( p : Size, other: Size ):Size {
  return {
    width : p.width * other.width,
    height : p.height * other.height,
  }
}
