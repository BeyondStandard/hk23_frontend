import mapboxgl from "mapbox-gl"
import { RefObject, useEffect, useRef, useState } from "react"

import polygon from "~/constants/polygons.json"
import { contains } from "~/utils/contains"
import { easingFunctions } from "~/utils/easingFunctions"

import type { GroupingTable, MapProps, MinMax, Polygon } from "./types"

import { AreaInfo, ItemType, MapItem } from "~/types/definitions"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!

let max_long = 0
let max_lat = 0
let min_long = 180
let min_lat = 180
let groupingTable: GroupingTable = null
let minMax: MinMax = {
  min: 0,
  max: 100,
}
const poly: Polygon = polygon

export function MapBox({
  users,
  chargers,
  stations,
  allItems,
  showAreas,
  onAreaSelected,
}: MapProps) {
  const mapContainer: any = useRef(null)
  const map: any = useRef(null)
  const [lng, setLng] = useState(11.576123)
  const [lat, setLat] = useState(48.137152)
  const [zoom, setZoom] = useState(13)

  const geoJSON: any = { type: "FeatureCollection", features: [] }

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

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on("load", () => {
      const x = "Munich"

      // Add a layer showing the state polygons.
      geoJSON.features.forEach((e: any) => {
        if (groupingTable) {
          const gradient =
            (groupingTable[e.properties.name].numCharger - minMax.min) /
            (minMax.max - minMax.min)

          const blue = 0
          const green = Math.round(gradient * 255)
          const red = Math.round(
            (-3 * (gradient * gradient) + 2.5 * gradient + 0.5) * 255
          )

          // Add a source for the state polygons.
          // for (const x in polygon as any) {
          map.current.addSource(`${e.properties.name}-source`, {
            type: "geojson",
            data: e,
          })
          map.current.addLayer({
            id: `${e.properties.name}-layer`,
            type: "fill",
            source: `${e.properties.name}-source`,
            layout: {
              // Make the layer visible by default.
              visibility: showAreas ? "visible" : "none",
            },
            paint: {
              "fill-color": `rgba(${red}, ${green}, ${blue}, 0.2)`,
              "fill-outline-color": "rgba(244, 129, 30, 1)",
            },
          })

          // When a click event occurs on a feature in the states layer,
          // open a popup at the location of the click, with description
          // HTML from the click event's properties.
          map.current.on("click", `${e.properties.name}-layer`, (x: any) => {
            new mapboxgl.Popup()
              .setLngLat(x.lngLat)
              .setHTML(x.features[0].properties.name)
              .addTo(map.current)

            const areaName = x.features[0].properties.name
            const areaData = groupingTable![areaName]

            onAreaSelected({
              areaName: areaName,
              ...areaData,
            } as AreaInfo)

            const easingFn = easingFunctions.easeOutQuint
            const duration = 3000
            const animate = true
            const center = [x.lngLat.lng, x.lngLat.lat]

            const animationOptions = {
              duration: duration,
              easing: easingFn,
              animate: animate,
              center: center,
              essential: true, // animation will happen even if user has `prefers-reduced-motion` setting on
            }

            // Create a random location to fly to by offsetting the map's
            // initial center point by up to 10 degrees.
            // const center = [
            //   -95 + (Math.random() - 0.5) * 20,
            //   40 + (Math.random() - 0.5) * 20,
            // ]

            // merge animationOptions with other flyTo options
            // let center = [x.lngLat.lng, x.lngLat.lat]
            animationOptions.center = center

            map.current.flyTo(animationOptions)

            map.current.getSource("center").setData({
              type: "Point",
              coordinates: center,
            })
            map.current.setLayoutProperty(
              "center",
              "text-field",
              `Center: [${center[0].toFixed(1)}, ${center[1].toFixed(1)}`
            )
          })
        }
      })

      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      map.current.on("mouseenter", `${x}-layer`, () => {
        map.current.getCanvas().style.cursor = "pointer"
      })

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.current.on("mouseleave", `${x}-layer`, () => {
        map.current.getCanvas().style.cursor = ""
      })
    })
  }, [onAreaSelected])

  useEffect(() => {
    if (map.current == null) {
      return
    } else if (map.current.isStyleLoaded() && groupingTable != null) {
      geoJSON.features.forEach((e: any) => {
        // Toggle layer visibility by changing the layout object's visibility property.
        map.current.setLayoutProperty(
          `${e.properties.name}-layer`,
          "visibility",
          showAreas ? "visible" : "none"
        )
      })
    }
  }, [showAreas])

  useMarkers(map, users, "user")
  useMarkers(map, chargers, "charger")
  useMarkers(map, stations, "station")

  if (
    !groupingTable &&
    allItems.users &&
    allItems.chargers &&
    allItems.stations
  ) {
    createGroupingTable(allItems, geoJSON)
  }

  return (
    <div className="w-full h-full">
      {/* <div className="w-15, h-15 bg-red absolute" id="testid"/> */}
      {/* {users.map(user => <IconMarker key={user.id} itemType="user" id={user.id} />)} */}
      <div ref={mapContainer} id="map" className="map-container" />
    </div>
  )
}

function useMarkers(
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
        // const markerElement = document.getElementById("testid")
        const marker = new mapboxgl.Marker({
          // element: markerElement,
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

function createGroupingTable(allItems: any, geoJSON: any) {
  groupingTable = {}
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
}
