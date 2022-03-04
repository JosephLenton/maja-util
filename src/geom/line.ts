import { Point2D } from './points'
import { Circle } from './circle'

export type Line = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export function newLine( start : Point2D, end : Point2D ) : Line {
  return {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
  }
}

export function addLineByPoint( line: Line, point: Point2D ): Line {
  return {
    x1: line.x1 + point.x,
    y1: line.y1 + point.y,
    x2: line.x2 + point.x,
    y2: line.y2 + point.y,
  }
}

export function subtractLineByPoint( line: Line, point: Point2D ): Line {
  return {
    x1: line.x1 - point.x,
    y1: line.y1 - point.y,
    x2: line.x2 - point.x,
    y2: line.y2 - point.y,
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

function rectIntersectsCircle( line:Line, circle:Circle ):boolean {
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

export function linesToPoints( lines : Line[] ):number[] {
  const points : number[] = new Array( lines.length * 4 )

  for ( let i = 0; i < lines.length; i++ ) {
    const line = lines[i]
    const pointsI = i*4

    points[pointsI] = line.x1
    points[pointsI+1] = line.y1
    points[pointsI+2] = line.x2
    points[pointsI+3] = line.y2
  }

  return points
}
