import { ReactNode } from "react"

export type ButtonProps = {
  text: string
  icon: ReactNode
  color: string
  active: boolean
  coordinates: [
    {
      lat: number
      lng: number
    }?
  ]
}

export type ButtonGridProps = {
  elements: ButtonProps[]
  setSelected: CallableFunction
}
