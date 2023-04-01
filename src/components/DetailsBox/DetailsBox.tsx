import type { DetailsBoxProps } from "./types"
export function DetailsBox({ prop = "DetailsBox" }: DetailsBoxProps) {
  return (
    <div>
      <h1>{prop}</h1>
    </div>
  )
}
