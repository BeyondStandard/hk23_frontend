import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import SportsBarIcon from "@mui/icons-material/SportsBar"
import StoreIcon from "@mui/icons-material/Store"
import AddModeratorIcon from "@mui/icons-material/AddModerator"
import PetsIcon from "@mui/icons-material/Pets"
import SchoolIcon from "@mui/icons-material/School"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import HealingIcon from "@mui/icons-material/Healing"
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"
import ToysIcon from "@mui/icons-material/Toys"
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice"
import LiquorIcon from "@mui/icons-material/Liquor"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"
import UnpublishedIcon from "@mui/icons-material/Unpublished"
import { ButtonProps } from "../components/ButtonGrid/types"

export const BUTTONS: ButtonProps[] = [
  {
    text: "Hospital",
    icon: <LocalHospitalIcon />,
    color: "bg-green-600",
    active: false,
  },
  { text: "Bar", icon: <SportsBarIcon />, color: "bg-red-600", active: false },
  {
    text: "Cafe",
    icon: <LocalCafeIcon />,
    color: "bg-blue-600",
    active: false,
  },
  {
    text: "Convenience Store",
    icon: <StoreIcon />,
    color: "bg-yellow-600",
    active: false,
  },
  {
    text: "Dentist",
    icon: <AddModeratorIcon />,
    color: "bg-violet-600",
    active: false,
  },
  { text: "Dog Park", icon: <PetsIcon />, color: "bg-sky-600", active: false },
  {
    text: "Elementary School",
    icon: <SchoolIcon />,
    color: "bg-amber-600",
    active: false,
  },
  {
    text: "Fast-food Restaurant",
    icon: <FastfoodIcon />,
    color: "bg-green-600",
    active: false,
  },
  {
    text: "Gym",
    icon: <FitnessCenterIcon />,
    color: "bg-red-600",
    active: false,
  },
  {
    text: "Kindergarten",
    icon: <EscalatorWarningIcon />,
    color: "bg-blue-600",
    active: false,
  },
  {
    text: "Parcel Locker",
    icon: <LocalShippingIcon />,
    color: "bg-yellow-600",
    active: false,
  },
  {
    text: "Pediatrician",
    icon: <HealingIcon />,
    color: "bg-rose-600",
    active: false,
  },
  {
    text: "Pharmacy",
    icon: <LocalPharmacyIcon />,
    color: "bg-green-600",
    active: false,
  },
  {
    text: "Playground",
    icon: <ToysIcon />,
    color: "bg-indigo-600",
    active: false,
  },
  {
    text: "Post Office",
    icon: <LocalPostOfficeIcon />,
    color: "bg-orange-600",
    active: false,
  },
  {
    text: "Pub",
    icon: <LiquorIcon />,
    color: "bg-pink-600",
    active: false,
  },
  {
    text: "Public Transport Stop",
    icon: <DirectionsBusIcon />,
    color: "bg-blue-600",
    active: false,
  },
  {
    text: "Restaurant",
    icon: <RestaurantIcon />,
    color: "bg-rose-600",
    active: false,
  },
  {
    text: "Supermarket",
    icon: <LocalGroceryStoreIcon />,
    color: "bg-lime-600",
    active: false,
  },
  {
    text: "Deselect All",
    icon: <UnpublishedIcon />,
    color: "bg-amber-600",
    active: false,
  },
]
