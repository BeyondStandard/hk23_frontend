import React from "react"

import { ChargerEntry, StationEntry, UserEntry } from "~/components/ItemEntries"
import { SwitchControl } from "~/components/SwitchControl"

import { Sidebar } from "../Sidebar"
import { Map } from "../Map"

import {
  chargersToListItems,
  chargersToMapItems,
  useChargers,
} from "~/controllers/chargers"
import {
  stationsToListItems,
  stationsToMapItems,
  useStations,
} from "~/controllers/stations"
import {
  useUsers,
  usersToListItems,
  usersToMapItems,
} from "~/controllers/users"
import { AreaInfo } from "~/types/definitions"
import { MenuProps } from "~/components/Dashboard/types"
import { ButtonGrid } from "~/components/ButtonGrid"
import { BUTTONS } from "~/constants/buttons"
import { pointsToMapItems, usePoints } from "~/controllers/getPoints"
import { ButtonProps } from "~/components/ButtonGrid/types"

export function Dashboard() {
  // const users = useUsers()
  // const { chargers, setUserAsCharger } = useChargers()
  // const stations = useStations()

  const [showUsers, setShowUsers] = React.useState(false)
  const [showChargers, setShowChargers] = React.useState(false)
  const [showStations, setShowStations] = React.useState(false)
  const [showAreas, setShowAreas] = React.useState(false)
  const [buttonsSelected, setButtonsSelected] = React.useState<ButtonProps[]>(
    []
  )
  const [update, setUpdate] = React.useState(false)

  const pointsOfInterest = usePoints(buttonsSelected)

  const [selectedArea, setSelectedArea] = React.useState<AreaInfo | null>(null)
  // const onChangeUser = React.useCallback(
  //   (userId: string, promote: boolean) => {
  //     if (!users) return
  //     const selectedUser = users.find((user) => user.id == userId)
  //     if (!selectedUser) return
  //     selectedUser.isPromoted = promote
  //     setUserAsCharger(selectedArea?.areaName ?? "", selectedUser, promote)
  //   },
  //   [users, setUserAsCharger, selectedArea]
  // )

  // React.useEffect(() => {
  //   setUpdate(!update)
  // }, [pointsOfInterest])

  const handleChange = (arr: ButtonProps[]) => {
    setButtonsSelected(arr)
    // setUpdate(!update)
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-500">
      <div className="flex w-full h-full pt-2 content-center justify-center flex-row">
        <div className="h-full w-3/12 px-1.5">
          <Sidebar>
            <SwitchControl
              title="Areas"
              checked={showAreas}
              switchType="area"
              onChange={setShowAreas}
            />
            {/* <SwitchControl
              title="Users"
              checked={showUsers}
              switchType="user"
              onChange={setShowUsers}
            />
            <SwitchControl
              title="Chargers"
              checked={showChargers}
              switchType="charger"
              onChange={setShowChargers}
            />
            <SwitchControl
              title="Stations"
              checked={showStations}
              switchType="station"
              onChange={setShowStations}
            />*/}
            <ButtonGrid elements={BUTTONS} setSelected={handleChange} />
          </Sidebar>
        </div>
        <div className="h-full w-6/12 w-full pr-1.5">
          <Map
            // users={usersToMapItems(showUsers ? users ?? [] : [])}
            // chargers={chargersToMapItems(showChargers ? chargers ?? [] : [])}
            // stations={stationsToMapItems(showStations ? stations ?? [] : [])}
            users={[]}
            chargers={[]}
            stations={[]}
            pointsOfInterest={pointsToMapItems(pointsOfInterest)}
            allItems={{
              // users: users,
              // chargers: chargers,
              // stations: stations,
              points: pointsOfInterest,
            }}
            showAreas={showAreas}
            onAreaSelected={setSelectedArea}
          />
        </div>
        {/* <div className="h-full w-3/12 px-1.5">
          {selectedArea != null && (
            <Sidebar title={selectedArea.areaName}>
              <div className="w-full h-full overflow-y-auto">
                <div className="w-full">
                  {selectedArea.users.map((user) => (
                    <UserEntry
                      key={user.id}
                      user={user}
                      onChangeUser={onChangeUser}
                    />
                  ))}
                  {selectedArea.chargers
                    .filter((charger) => charger.belongsToUser == null)
                    .map((charger) => (
                      <ChargerEntry key={charger.id} charger={charger} />
                    ))}
                  {selectedArea.stations.map((station) => (
                    <StationEntry key={station.id} station={station} />
                  ))}
                </div>
              </div>
            </Sidebar>
          )}
        </div> */}
      </div>
    </div>
  )
}
