import { AppBar, Toolbar, Typography } from "@mui/material"

import type { FooterProps } from "./types"
export function Footer({ prop = "Footer", className = "" }: FooterProps) {
  return (
    <div className={className}>
      <AppBar position="static" className="min-h-5">
        <Toolbar style={style}>
          <Typography className="text-xs">&#169; BeyondStandard | Hackkosice 2023</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
const style = {
  display: "flex",
  justifyContent: "center",
  minHeight: "2rem",
  backgroundColor: "#009da5",
}
