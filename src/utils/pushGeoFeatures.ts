import { Polygon } from "~/components/Map/types"

export function exportGeoFunctions(geoJSON: any, poly: Polygon, polygon: any) {
  if (geoJSON.features.length === 0) {
    for (const x in polygon as Polygon) {
      const long: number = poly[x][0][0]
      const lat: number = poly[x][0][1]

      if (long > max_long) {
        max_long = long
      }
      if (long < min_long) {
        min_long = long
      }
      if (lat > max_lat) {
        max_lat = lat
      }
      if (lat < min_lat) {
        min_lat = lat
      }

      geoJSON.features.push({
        type: "Feature",
        properties: {
          name: x,
          minMax: {
            min_lat: min_lat,
            max_lat: max_lat,
            min_long: min_long,
            max_long: max_long,
          },
        },
        geometry: {
          type: "Polygon",
          coordinates: [poly[x]],
        },
      })
    }
  }
}
