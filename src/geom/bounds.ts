import { Point2D, multPoint, divPoint, addPoints, subtractPoints } from './points'
import { Size } from './size'

export type Bounds = {
  min: Point2D,
  max: Point2D,
}

export function newBoundsFromCenter( center: Point2D, size: Size ): Bounds {
  const halfWidth = size.width / 2
  const halfHeight = size.height / 2

  return {
    min: {
      x: center.x - halfWidth,
      y: center.y - halfHeight,
    },
    max: {
      x: center.x + halfWidth,
      y: center.y + halfHeight,
    },
  }
}

export function newBoundsFromBottomLeft( bottomLeft: Point2D, size: Size ): Bounds {
  return {
    min: {
      ...bottomLeft,
    },
    max: {
      x: bottomLeft.x + size.width,
      y: bottomLeft.y + size.height,
    },
  }
}

export function newBoundsFromTopLeft( topLeft: Point2D, size: Size ): Bounds {
  return {
    min: {
      x: topLeft.x,
      y: topLeft.y - size.height,
    },
    max: {
      x: topLeft.x + size.width,
      y: topLeft.y,
    },
  }
}

export function newBoundsFromBottomRight( bottomRight: Point2D, size: Size ): Bounds {
  return {
    min: {
      x: bottomRight.x - size.width,
      y: bottomRight.y,
    },
    max: {
      x: bottomRight.x,
      y: bottomRight.y + size.height,
    },
  }
}

export function newBoundsFromTopRight( topRight: Point2D, size: Size ): Bounds {
  return {
    min: {
      x: topRight.x - size.width,
      y: topRight.y - size.height,
    },
    max: {
      x: topRight.x,
      y: topRight.y,
    },
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

export function boundsTopRight( bounds:Bounds ):Point2D {
  return {
    x: Math.max(bounds.min.x, bounds.max.x),
    y: Math.max(bounds.min.y, bounds.max.y),
  }
}

export function boundsBottomRight( bounds:Bounds ):Point2D {
  return {
    x: Math.max(bounds.min.x, bounds.max.x),
    y: Math.min(bounds.min.y, bounds.max.y),
  }
}

export function boundsTopLeft( bounds:Bounds ):Point2D {
  return {
    x: Math.min(bounds.min.x, bounds.max.x),
    y: Math.max(bounds.min.y, bounds.max.y),
  }
}

export function boundsCenter( bounds:Bounds ):Point2D {
  const minX = Math.min(bounds.min.x, bounds.max.x)
  const minY = Math.min(bounds.min.y, bounds.max.y)
  const maxX = Math.max(bounds.min.x, bounds.max.x)
  const maxY = Math.max(bounds.min.y, bounds.max.y)
  const width = maxX - minX
  const height = maxY - minY

  return {
    x: minX + (width/2),
    y: minY + (height/2),
  }
}

export function boundsToSize( bounds:Bounds ):Size {
  return {
    width: Math.max(bounds.min.x, bounds.max.x) - Math.min(bounds.min.x, bounds.max.x),
    height: Math.max(bounds.min.y, bounds.max.y) - Math.min(bounds.min.y, bounds.max.y),
  }
}

export function boundsContainsPoint( bounds:Bounds, point:Point2D ): boolean {
  let minX = Math.min(bounds.min.x, bounds.max.x)
  let minY = Math.min(bounds.min.y, bounds.max.y)
  let maxX = Math.max(bounds.min.x, bounds.max.x)
  let maxY = Math.max(bounds.min.y, bounds.max.y)

  return (minX <= point.x && point.x <= maxX) && (minY <= point.y && point.y <= maxY)
}

export function addBoundsByPoint( bounds: Bounds, point: Point2D ): Bounds {
  return {
    min: addPoints(bounds.min, point),
    max: addPoints(bounds.max, point),
  }
}

export function subtractBoundsByPoint( bounds: Bounds, point: Point2D ): Bounds {
  return {
    min: subtractPoints(bounds.min, point),
    max: subtractPoints(bounds.max, point),
  }
}
