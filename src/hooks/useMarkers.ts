import mapboxgl from "mapbox-gl"
import { RefObject, useEffect, useState } from "react"
import { ItemType, MapItem } from "~/types/definitions"


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
        const marker = new mapboxgl.Marker({
          color: color,
          scale: 0.7,
        })
          .setLngLat([item.lng, item.lat])
          .addTo(map.current!)
        newMarkers.push(marker)
      })
    }
    setMarkers(newMarkers)
  }, [items])
}
