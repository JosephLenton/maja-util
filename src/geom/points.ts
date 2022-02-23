import { Size } from '.'

export type Point2D = {
  x : number
  y : number
}

export function addPoints( a : Point2D, b : Point2D ):Point2D {
  return {
    x : a.x + b.x,
    y : a.y + b.y,
  }
}

export function subtractPoints( a : Point2D, b : Point2D ):Point2D {
  return {
    x : a.x - b.x,
    y : a.y - b.y,
  }
}

export function roundPoint( p : Point2D ):Point2D {
  return {
    x: Math.round(p.x),
    y: Math.round(p.y),
  }
}

export function floorPoint( p : Point2D ):Point2D {
  return {
    x: Math.floor(p.x),
    y: Math.floor(p.y),
  }
}

export function ceilPoint( p : Point2D ):Point2D {
  return {
    x: Math.ceil(p.x),
    y: Math.ceil(p.y),
  }
}

export function divPoint( p : Point2D, div : number ):Point2D {
  return {
    x : p.x / div,
    y : p.y / div,
  }
}

export function multPoint( p : Point2D, mult : number ):Point2D {
  return {
    x : p.x * mult,
    y : p.y * mult,
  }
}

export function divPointBySize( p : Point2D, size: Size ):Point2D {
  return {
    x : p.x / size.width,
    y : p.y / size.height,
  }
}

export function multPointBySize( p : Point2D, size: Size ):Point2D {
  return {
    x : p.x * size.width,
    y : p.y * size.height,
  }
}

export function addPointBySize( p : Point2D, size: Size ):Point2D {
  return {
    x : p.x + size.width,
    y : p.y + size.height,
  }
}

export function subPointBySize( p : Point2D, size: Size ):Point2D {
  return {
    x : p.x - size.width,
    y : p.y - size.height,
  }
}
