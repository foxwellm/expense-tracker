interface SunburstNodeChildren {
  name: string
  value: number
  children: SunburstNodeChildren[]
}

export interface SunburstNode {
  name: string
  children: SunburstNodeChildren[]
}
