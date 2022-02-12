
export type Orientation = {
  flipX: boolean,
  flipY: boolean,
}

export type Size = {
  width: number,
  height: number,
}

export type Bounds = {
  min: Point2D,
  max: Point2D,
}

export type Line = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export type Circle = {
  x : number,
  y : number,
  r : number,
}

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

export function multBounds( b : Bounds, mult: number ):Bounds {
  return {
    min: multPoint(b.min, mult),
    max: multPoint(b.max, mult),
  }
}

export function divBounds( b : Bounds, div: number ):Bounds {
  return {
    min: divPoint(b.min, div),
    max: divPoint(b.max, div),
  }
}

export function boundsBottomLeft( bounds:Bounds ):Point2D {
  return {
    x: Math.min(bounds.min.x, bounds.max.x),
    y: Math.min(bounds.min.y, bounds.max.y),
  }
}

export function boundsToSize( bounds:Bounds ):Size {
  return {
    width: Math.max(bounds.min.x, bounds.max.x) - Math.min(bounds.min.x, bounds.max.x),
    height: Math.max(bounds.min.y, bounds.max.y) - Math.min(bounds.min.y, bounds.max.y),
  }
}

export function lineIntersectsCircle( line:Line, circle:Circle ):boolean {
  // The line intersection below is really for infinite lines.
  // So I do a box intersection first.
  //
  // @todo remove the need for box & line intersection. Simplify.
  if ( ! rectIntersectsCircle(line, circle) ) {
    return false
  }

  let x1 = line.x1
  let x2 = line.x2
  let y1 = line.y1
  let y2 = line.y2
  const cx = circle.x
  const cy = circle.y
  const cr = circle.r

  x1 -= cx
  x2 -= cx
  y1 -= cy
  y2 -= cy
  const dx = x2 - x1
  const dy = y2 - y1
  const dr_squared = (dx*dx) + (dy*dy)
  const D = x1*y2 - x2*y1

  return (cr*cr) * dr_squared > D*D
}

export function rectIntersectsCircle( line:Line, circle:Circle ):boolean {
  const rectHalfWidth = Math.abs(line.x1 - line.x2)/2
  const rectHalfHeight = Math.abs(line.y1 - line.y2)/2

  const rectX = Math.min(line.x1, line.x2) + rectHalfWidth
  const rectY = Math.min(line.y1, line.y2) + rectHalfHeight

  const distX = Math.abs(circle.x - rectX)
  const distY = Math.abs(circle.y - rectY)

  const cr = circle.r

  if (distX > (rectHalfWidth + cr)) {
    return false
  }

  if (distY > (rectHalfHeight + cr)) {
    return false
  }

  if (distX <= (rectHalfWidth)) {
    return true
  }

  if (distY <= (rectHalfHeight)) {
    return true
  }

  const cornerDistance_sq = (distX - rectHalfWidth)*(distX - rectHalfWidth) +
                      (distY - rectHalfHeight)*(distY - rectHalfHeight)

  return (cornerDistance_sq <= (cr*cr))
}

export function pointsToLines( points : number[] ):Line[] {
  const lines : Line[] = new Array( points.length / 4 )

  for ( let i = 0; i < lines.length; i++ ) {
    const pointsI = i*4

    lines[i] = {
      x1: points[pointsI],
      y1: points[pointsI+1],
      x2: points[pointsI+2],
      y2: points[pointsI+3],
    }
  }

  return lines
}

export function linesToPointsRounded( lines : Line[] ):number[] {
  const points : number[] = new Array( lines.length * 4 )

  for ( let i = 0; i < lines.length; i++ ) {
    const line = lines[i]
    const pointsI = i*4

    points[pointsI] = Math.round(line.x1)
    points[pointsI+1] = Math.round(line.y1)
    points[pointsI+2] = Math.round(line.x2)
    points[pointsI+3] = Math.round(line.y2)
  }

  return points
}

export function newLine( start : Point2D, end : Point2D ) : Line {
  return {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
  }
}
