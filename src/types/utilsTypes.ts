import { Charger, User, Station, PointOfInterest } from "~/types/definitions"

export type GroupingTable = {
  [key: string]: {
    numPoints: number
    // chargers: Charger[]
    // users: User[]
    // stations: Station[]
    points: PointOfInterest[]
  }
} | null

export type MinMax = {
  min: number
  max: number
}
