import React from "react"

import {  MapItem, PointOfInterest } from "../types/definitions"

import { loadData } from "./utils"
import { ButtonProps } from "~/components/ButtonGrid/types"

export function usePoints(
  buttonsSelected: ButtonProps[]
): ButtonProps[] | null {
  const [points, setPoints] = React.useState<ButtonProps[] | null>(null)
  React.useEffect(() => {
    if (points) setPoints([])
    for (const el in buttonsSelected) {
      loadData(
        "/points_of_interest?limit=50&field=category_1&value=" + buttonsSelected[el].text
      ).then((data: { [key: string]: any }) => {
        var temp = data.result as PointOfInterest[]
        temp.forEach((item) => {
          buttonsSelected[el].coordinates.push({
            lat: item.location.coordinates[1],
            lng: item.location.coordinates[0],
          })
        })
      })
    }
    setPoints(buttonsSelected)
  }, [buttonsSelected])

  return points
}

export function pointsToMapItems(points: ButtonProps[] | null): MapItem[] {
  if (points != null && points.length > 0) {
    return points.map((points) => ({
      id: points.text,
      coordinates: points.coordinates,
      color: points.color,
    }))
  }
  return []
}
