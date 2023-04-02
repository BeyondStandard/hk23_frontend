import {
  Box,
  Paper,
  Grid,
  Typography,
  SelectChangeEvent,
  IconButton,
  ButtonBase,
} from "@mui/material"
import type { ButtonGridProps, ButtonProps } from "./types"
import { styled } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { usePoints } from "~/controllers/getPoints"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "4.5rem",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
}))

export function ButtonGrid({ elements, setSelected }: ButtonGridProps) {
  // const [selectedCategories, setSelectedCategories] = useState([] as ButtonProps[])

  const handleChange = (
    button: ButtonProps,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    button.active = !button.active
    let arr: ButtonProps[] = []
    elements.forEach((item) => {
      if (item.active) {
        if (button.text != "Deselect All") {
          arr.push(item)
        } else {
          button.active, item.active = false
        }
      }
    })
    setSelected(arr)
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="absolute bottom-10">
      <Grid container spacing={0.25}>
        {elements.map((el, i) => {
          return (
            <Grid item xs={3} key={`${el}-${i}`}>
              <ButtonBase sx={{ width: "100%" }}>
                <Item
                  square
                  className={`${el.active ? el.color : ""}`}
                  onClick={(e) => handleChange(el, e)}
                >
                  <Grid
                    container
                    direction={"column"}
                    sx={{ color: el.active ? "white" : "inherit" }}
                  >
                    <Grid item xs={6}>
                      {el.icon}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontSize: "0.6rem",
                        }}
                      >
                        {el.text}
                      </Typography>
                    </Grid>
                  </Grid>
                </Item>
              </ButtonBase>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
