import { Charger, User, Station } from "~/types/definitions"

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
