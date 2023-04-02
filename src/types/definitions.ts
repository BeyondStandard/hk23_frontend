export type ListItem = {
  id: string
  title: string
  subtitle: string
}

export type MapItem = {
  id: string
  coordinates: [{
    lat: number
    lng: number
  }?]
  color: string
}

export type ItemType = "area" | "user" | "charger" | "station" | "point"

export type PointOfInterest = {
  _id: string
  name: string
  category_1: string
  category_2: string
  location: {
    type: string
    coordinates: [
      number,
      number
    ]
  },
  poly_5: boolean | null
  poly_10: boolean | null
  poly_15: boolean | null
  poly_20: boolean | null
}

// export type
// {
//   "detail": [
//     {
//       "loc": [
//         "string",
//         0
//       ],
//       "msg": "string",
//       "type": "string"
//     }
//   ]
// }

export type User = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  isPromoted?: boolean
}

export type Charger = {
  id: string
  name: string
  vicinity: string
  lat: number
  lng: number
  rating?: number
  user_ratings_total?: number
  belongsToUser?: string
}

export type Station = {
  id: string
  title: string
  subtitle: string
  type: string
  lat: number
  lng: number
}

export type AreaInfo = {
  areaName: string
  users: User[]
  chargers: Charger[]
  stations: Station[]
}
