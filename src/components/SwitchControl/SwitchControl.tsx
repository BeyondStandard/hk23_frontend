import { Switch } from "@mui/material"

import { ItemIcon } from "~/components/ItemIcon"

import type { SwitchControlProps } from "./types"

export function SwitchControl({
  switchType,
  title,
  checked,
  onChange,
}: SwitchControlProps) {
  return (
    <div className="w-full flex justify-between content-start py-2 border-solid border-t-b border-b-0 border-x-0 border-zinc-700">
      <div className="mx-6 w-full flex flex-row justify-between">
        <ItemIcon itemType={switchType} />
        <p className="text-white text-xl w-20 h-full text-bottom">{title}</p>
        <Switch
          aria-label={switchType}
          checked={checked}
          onChange={(e: { target: { checked: boolean } }) => {
            onChange(e.target.checked)
          }}
        />
      </div>
    </div>
  )
}
