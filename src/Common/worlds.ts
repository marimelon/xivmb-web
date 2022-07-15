import {
  ElementalWorlds,
  GaiaWorlds,
  ManaWorlds,
  MeteorWorlds,
  XIVDataCenter,
  XIVDataCenters,
  XIVWorlds,
} from '../@types/world'

export const getWorlds = (dataCneter: XIVDataCenter) => {
  switch (dataCneter) {
    case 'Elemental':
      return ElementalWorlds
    case 'Mana':
      return ManaWorlds
    case 'Gaia':
      return GaiaWorlds
    case 'Meteor':
      return MeteorWorlds
  }
}

export const isXIVWorld = (
  value: string
): value is typeof XIVWorlds[number] => {
  return (XIVWorlds as readonly string[]).includes(value)
}

export const isDataCenter = (
  value: string
): value is typeof XIVDataCenters[number] => {
  return (XIVDataCenters as readonly string[]).includes(value)
}
