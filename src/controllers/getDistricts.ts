import React from "react"

import { Area } from "../types/definitions"

import { loadData } from "./utils"

export function useDistricts(): Area[] | null {
  const [districts, setDistricts] = React.useState<Area[] | null>(null)
  React.useEffect(() => {
    // if (points != null) return
    loadData("/districts").then((data: { [key: string]: any }) => {
      setDistricts(data.result as Area[])
    })
  }, [])

  return districts
}

// export function pointsToMapItems(points: ButtonProps[] | null): MapItem[] {
//   if (points != null && points.length > 0) {
//     return points.map((points) => ({
//       id: points.text,
//       coordinates: points.coordinates,
//       color: points.color,
//     }))
//   }
//   return []
// }
