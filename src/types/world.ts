export const XIVDataCenters = ['Elemental', 'Gaia', 'Mana', 'Meteor'] as const

export type XIVDataCenter = (typeof XIVDataCenters)[number]

export const ElementalWorlds = [
  'Atomos',
  'Aegis',
  'Carbuncle',
  'Garuda',
  'Gungnir',
  'Kujata',
  'Tonberry',
  'Typhon',
] as const
export type ElementalWorld = (typeof ElementalWorlds)[number]

export const GaiaWorlds = [
  'Alexander',
  'Bahamut',
  'Durandal',
  'Fenrir',
  'Ifrit',
  'Ridill',
  'Tiamat',
  'Ultima',
] as const
export type GaiaWorld = (typeof GaiaWorlds)[number]

export const ManaWorlds = [
  'Anima',
  'Asura',
  'Chocobo',
  'Hades',
  'Ixion',
  'Masamune',
  'Pandaemonium',
  'Titan',
] as const
export type ManaWorld = (typeof ManaWorlds)[number]

export const MeteorWorlds = [
  'Belias',
  'Mandragora',
  'Ramuh',
  'Shinryu',
  'Unicorn',
  'Valefor',
  'Yojimbo',
  'Zeromus',
] as const
export type MeteorWorld = (typeof MeteorWorlds)[number]

export const XIVWorlds = [
  ...ElementalWorlds,
  ...GaiaWorlds,
  ...ManaWorlds,
  ...MeteorWorlds,
]
export type XIVWorld = (typeof XIVWorlds)[number]

export const isXIVDataCenter = (
  value: string,
): value is (typeof XIVDataCenters)[number] => {
  return (XIVDataCenters as readonly string[]).includes(value)
}

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
