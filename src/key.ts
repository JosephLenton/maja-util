export type Meta =
  | 'ctrl'
  | 'alt'
  | 'shift'
  | 'ctrl-shift'
  | 'alt-ctrl'
  | 'alt-shift'
  | 'alt-ctrl-shift'
  | ''

export function getKey(ev:React.KeyboardEvent): string {
  let key = ev.key.toLocaleLowerCase()
  if ( key === 'control' ) {
    key = 'ctrl'
  }

  let meta = getKeyMeta(ev) as string
  if ( key === 'ctrl' || key === 'alt' || key === 'shift' ) {
    meta = meta.replace(key, '')
  }

  if ( meta === '' ) {
    return key
  }

  const metaKey = `${meta}-${ev.key.toLowerCase()}`
  if ( metaKey.charAt(0) === '-' ) {
    return metaKey.substr(1)
  }

  if ( metaKey.charAt(metaKey.length-1) === '-' ) {
    return metaKey.substr(0, metaKey.length-1)
  }

  return `${meta}-${ev.key.toLowerCase()}`.replace('--', '-')
}

export function getKeyMeta(ev:React.KeyboardEvent): Meta {
  const hasAlt = ev.altKey
  const hasCtrl = ev.ctrlKey
  const hasShift = ev.shiftKey

  if ( hasAlt ) {
    if ( hasCtrl ) {
      if ( hasShift ) {
        return 'alt-ctrl-shift'
      }

      return 'alt-ctrl'
    }

    return 'alt'
  }

  if ( hasCtrl ) {
    if ( hasShift ) {
      return 'ctrl-shift'
    }

    return 'ctrl'
  }

  if ( hasShift ) {
    return 'shift'
  }

  return ''
}
