import { GroupingTable, MinMax } from "~/types/utilsTypes"
import { contains } from "~/utils/contains"

export function createGroupingTable(allItems: any, geoJSON: any, minMax: MinMax, ) {
  let groupingTable: GroupingTable = {}
  // initialize table with 0 chargers
  geoJSON.features.forEach((area: any) => {
    groupingTable![area.properties.name] = {
      numCharger: 0,
      chargers: [],
      users: [],
      stations: [],
    }
  })

  let min = 100
  let max = 0

  geoJSON.features.forEach((area: any) => {
    allItems.chargers.forEach((charger: any) => {
      if (
        contains(area.geometry.coordinates, charger.lat, charger.lng) &&
        groupingTable != null
      ) {
        if (groupingTable[area.properties.name] !== undefined) {
          // increment count of number of chargers
          groupingTable[area.properties.name].numCharger += 1
          groupingTable[area.properties.name].chargers.push(charger)

          // update max
          if (max < groupingTable[area.properties.name].numCharger) {
            max = groupingTable[area.properties.name].numCharger
          }
        }
      }
    })
    allItems.users.forEach((user: any) => {
      if (
        contains(area.geometry.coordinates, user.lat, user.lng) &&
        groupingTable != null
      ) {
        if (groupingTable[area.properties.name] !== undefined) {
          groupingTable[area.properties.name].users.push(user)
        }
      }
    })
    allItems.stations.forEach((station: any) => {
      if (
        contains(area.geometry.coordinates, station.lat, station.lng) &&
        groupingTable != null
      ) {
        if (groupingTable[area.properties.name] !== undefined) {
          groupingTable[area.properties.name].stations.push(station)
        }
      }
    })
  })

  // update min
  for (const e in groupingTable as any) {
    if (min > groupingTable[e].numCharger) {
      min = groupingTable[e].numCharger
    }
  }

  // console.log(groupingTable)
  // console.log("min: " + min + ", max: " + max)

  minMax = {
    min: min,
    max: max,
  }

  return {
    groupingTable,
    minMax
  }
}
