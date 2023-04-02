import mapboxgl from "mapbox-gl"
import { RefObject, useEffect, useState } from "react"
import { ItemType, MapItem } from "~/types/definitions"
import colors from "tailwindcss/colors"

export function useMarkers(
  map: RefObject<mapboxgl.Map>,
  items: MapItem[],
  itemType: ItemType
) {
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])
  useEffect(() => {
    if (map.current == null) return

    markers.forEach((marker) => {
      marker.remove()
    })

    let color: string
    if (itemType === "user") {
      color = "#bb0000"
    } else if (itemType === "charger") {
      color = "#f4e61f"
    } else {
      color = "#ff5f00"
    }
    const newMarkers: any[] = []
    if (items) {
      items.forEach((item) => {
        // const markerElement = document.getElementById(`${itemType}-${item.id}`)
        item.coordinates.forEach((coord) => {
          if (coord) {
            newMarkers.push(
              new mapboxgl.Marker({
                // @ts-ignore
                color: colors[item.color.split("-")[1]]["600"],
                scale: 0.7,
              })
                .setLngLat([coord.lng, coord.lat])
                .addTo(map.current!)
            )
          }
        })
      })
    }
    setMarkers(newMarkers)
  }, [items])
}
