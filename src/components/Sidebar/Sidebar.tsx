import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import PhoneIcon from "@mui/icons-material/Phone"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PersonPinIcon from "@mui/icons-material/PersonPin"

import type { SidebarProps } from "./types"
import { useState } from "react"
import { Footer } from "~/components/Footer"

export function Sidebar({ title, children }: SidebarProps) {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className="w-full h-full drop-shadow-md bg-white rounded-md">
      {title && (
        <p className="text-slate-600 text-center text-2xl p-4">{title}</p>
      )}
      {/* <div style={{ overflowY: "scroll" }}> */}
      {children}
      {/* </div> */}
      <Footer className="absolute bottom-0 w-full h-8" />
    </div>
  )
}
