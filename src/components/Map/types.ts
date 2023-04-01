import { AreaInfo, Charger, MapItem, Station, User } from "~/types/definitions"

export type MapProps = {
  prop?: string
  users: MapItem[]
  chargers: MapItem[]
  stations: MapItem[]
  allItems: Record<string, unknown>
  showAreas: boolean
  onAreaSelected: (areaInfo: AreaInfo) => void
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

export type GroupingTable = {
  [key: string]: {
    numCharger: number
    chargers: Charger[]
    users: User[]
    stations: Station[]
  }
} | null

export type MinMax = {
  min: number
  max: number
}
