import { Area, AreaInfo, Charger, MapItem, Station, User } from "~/types/definitions"

export type MapProps = {
  prop?: string
  users: MapItem[]
  chargers: MapItem[]
  stations: MapItem[]
  districts: Area[]
  pointsOfInterest: MapItem[]
  allItems: Record<string, unknown>
  showAreas: boolean
  onAreaSelected: (areaInfo: AreaInfo) => void
}

export type GeoJSON = {
  type: string
  features: Features[]
}

export type Features = {
  type: string
  geometry: {
    type: string
    coordinates: [[[number, number]]]
  }
  properties: {
    name: string
    minMax: {}
  }
}

export interface Polygon {
  [key: string]: number[][]
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

export interface JSONObject {
  [k: string]: JSONValue
}
