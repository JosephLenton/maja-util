import React from 'react'
import { Point2D } from './geom'

export type MouseButton =
  | 'left'
  | 'right'
  | 'middle'

const NONE = 0
const PRIMARY_BUTTONS = 1
const SECONDARY_BUTTONS = 2
const TERTIARY_BUTTONS = 2

export function isLeftMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseDown(ev, 'left')
}

export function isRightMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseDown(ev, 'right')
}

export function isMiddleMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseDown(ev, 'middle')
}

export function isOnlyLeftMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isOnlyMouseDown(ev, 'left')
}

export function isOnlyRightMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isOnlyMouseDown(ev, 'right')
}

export function isOnlyMiddleMouseDown(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isOnlyMouseDown(ev, 'middle')
}

export function isLeftMouseUp(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseUp(ev, 'left')
}

export function isRightMouseUp(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseUp(ev, 'right')
}

export function isMiddleMouseUp(ev:React.MouseEvent<Element, MouseEvent>): boolean {
  return isMouseUp(ev, 'middle')
}

export function isMouseDown(ev:React.MouseEvent<Element, MouseEvent>, button:MouseButton): boolean {
  const buttonCode = getMouseButtonCode(button)
  return (ev.buttons & buttonCode) !== NONE
}

export function isOnlyMouseDown(ev:React.MouseEvent<Element, MouseEvent>, button:MouseButton): boolean {
  const buttonCode = getMouseButtonCode(button)
  return ev.buttons === buttonCode
}

export function isMouseUp(ev:React.MouseEvent<Element, MouseEvent>, button:MouseButton): boolean {
  const buttonCode = getMouseButtonCode(button)
  return (ev.buttons & buttonCode) === NONE
}

export function getMouseMovement(
  ev: React.MouseEvent,
): Point2D {
  return {
    x: ev.movementX || 0,
    y: ev.movementY || 0,
  }
}

function getMouseButtonCode(button: MouseButton): number {
  if (button === 'left') {
    return PRIMARY_BUTTONS
  } else if (button === 'right') {
    return SECONDARY_BUTTONS
  } else if (button === 'middle') {
    return TERTIARY_BUTTONS
  } else {
    throw new Error(`Unknown button given ... '${button}'`)
  }
}
