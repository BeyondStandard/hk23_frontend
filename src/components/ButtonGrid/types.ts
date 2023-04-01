import { Color } from "@mui/material"
import { ReactNode } from "react"

export type ButtonProps = {
  text: string
  icon: ReactNode
  color: string
  active: boolean
}

export type ButtonGridProps = { elements: ButtonProps[] }
