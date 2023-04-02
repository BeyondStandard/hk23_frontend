import { PointOfInterest } from "~/types/definitions"
import { GroupingTable, MinMax } from "~/types/utilsTypes"
import { contains } from "~/utils/contains"

export function createGroupingTable(allItems: any, geoJSON: any, minMax: MinMax, ) {
  let groupingTable: GroupingTable = {}
  // initialize table with 0 points
  geoJSON.features.forEach((area: any) => {
    groupingTable![area.properties.name] = {
      numPoints: 0,
      // chargers: [],
      // users: [],
      // stations: [],
      points: allItems
    }
  })

  let min = 100
  let max = 0
  console.log(allItems)
  geoJSON.features.forEach((area: any) => {
    allItems.points.forEach((point: PointOfInterest) => {
      if (
        contains(area.geometry.coordinates, point.coordinates[1], point.coordinates[0]) &&
        groupingTable != null
      ) {
        if (groupingTable[area.properties.name] !== undefined) {
          // increment count of number of points of interests
          groupingTable[area.properties.name].numPoints += 1
          groupingTable[area.properties.name].points.push(point)

          // update max
          if (max < groupingTable[area.properties.name].numPoints) {
            max = groupingTable[area.properties.name].numPoints
          }
        }
      }
    })
    // allItems.users.forEach((user: any) => {
    //   if (
    //     contains(area.geometry.coordinates, user.lat, user.lng) &&
    //     groupingTable != null
    //   ) {
    //     if (groupingTable[area.properties.name] !== undefined) {
    //       groupingTable[area.properties.name].users.push(user)
    //     }
    //   }
    // })
    // allItems.stations.forEach((station: any) => {
    //   if (
    //     contains(area.geometry.coordinates, station.lat, station.lng) &&
    //     groupingTable != null
    //   ) {
    //     if (groupingTable[area.properties.name] !== undefined) {
    //       groupingTable[area.properties.name].stations.push(station)
    //     }
    //   }
    // })
  })

  // update min
  for (const e in groupingTable as any) {
    if (min > groupingTable[e].numPoints) {
      min = groupingTable[e].numPoints
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
