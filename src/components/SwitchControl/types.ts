import { ItemType } from "~/types/definitions"

export type SwitchControlProps = {
  title: string
  onChange: (activated: boolean) => void
  checked: boolean
  switchType: ItemType
}
