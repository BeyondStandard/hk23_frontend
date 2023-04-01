import React from "react"

import { ChargerEntry, StationEntry, UserEntry } from "~/components/ItemEntries"
import { SwitchControl } from "~/components/SwitchControl"

import { DashboardBox } from "../DashboardBox"
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

export function Dashboard() {
  const users = useUsers()
  const { chargers, setUserAsCharger } = useChargers()
  const stations = useStations()

  const [showUsers, setShowUsers] = React.useState(false)
  const [showChargers, setShowChargers] = React.useState(false)
  const [showStations, setShowStations] = React.useState(false)
  const [showAreas, setShowAreas] = React.useState(false)

  const [selectedArea, setSelectedArea] = React.useState<AreaInfo | null>(null)
  const onChangeUser = React.useCallback(
    (userId: string, promote: boolean) => {
      if (!users) return
      const selectedUser = users.find((user) => user.id == userId)
      if (!selectedUser) return
      selectedUser.isPromoted = promote
      setUserAsCharger(selectedArea?.areaName ?? "", selectedUser, promote)
    },
    [users, setUserAsCharger, selectedArea]
  )

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="flex w-full h-full pt-2 content-center justify-center flex-row">
        <div className="h-full w-3/12 px-1.5">
          <DashboardBox title={"Controls"}>
            <SwitchControl
              title="Areas"
              checked={showAreas}
              switchType="area"
              onChange={setShowAreas}
            />
            <SwitchControl
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
            />
          </DashboardBox>
        </div>
        <div className="h-full w-6/12 px-1.5">
          <DashboardBox>
            <Map
              users={usersToMapItems(showUsers ? users ?? [] : [])}
              chargers={chargersToMapItems(showChargers ? chargers ?? [] : [])}
              stations={stationsToMapItems(showStations ? stations ?? [] : [])}
              allItems={{
                users: users,
                chargers: chargers,
                stations: stations,
              }}
              showAreas={showAreas}
              onAreaSelected={setSelectedArea}
            />
          </DashboardBox>
        </div>
        <div className="h-full w-3/12 px-1.5">
          {selectedArea != null && (
            <DashboardBox title={selectedArea.areaName}>
              <div className="w-full h-full overflow-y-auto">
                <div className="w-full">
                  {selectedArea.users.map((user) => (
                    <UserEntry
                      key={user.id}
                      user={user}
                      onChangeUser={onChangeUser}
                    />
                  ))}
                  {/* {getAllChargers(selectedArea.chargers).map((charger) => <ChargerEntry key={charger.id} charger={charger} />)} */}
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
            </DashboardBox>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
