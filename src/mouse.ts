import React from 'react'
import { Point2D } from './geom'

const NONE_BUTTONS = 0
const PRIMARY_BUTTONS = 1
const SECONDARY_BUTTONS = 2

export function isLeftMouseDown(ev:React.MouseEvent<Element, MouseEvent>) {
  return (ev.buttons === PRIMARY_BUTTONS)
}

export function isRightMouseDown(ev:React.MouseEvent<Element, MouseEvent>) {
  return (ev.buttons === SECONDARY_BUTTONS)
}

export function isNoMouseDown(ev:React.MouseEvent<Element, MouseEvent>) {
  return (ev.buttons === NONE_BUTTONS)
}

export function getMouseMovement(
  ev: React.MouseEvent,
): Point2D {
  return {
    x: ev.movementX || 0,
    y: ev.movementY || 0,
  }
}
