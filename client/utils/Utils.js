const kgToPounds = 2.20462 // 1 KG = 2.20462 lbs

const litresToGallons = 0.264172 // 1 L = 0.264172 gallons

export const convertKilogramsToPounds = (grainWeight) =>
  grainWeight * kgToPounds
export const convertLitresToGallons = (volume) => volume * litresToGallons

export function calculateMCU(grainWeight, grainColour, volume) {
  // MCU = (Weight of grain in lbs) * (Colour of grain in degrees Lovibond) / (volume in gallons)
  return (
    (convertKilogramsToPounds(grainWeight) * grainColour) /
    convertLitresToGallons(volume)
  )
}

export function calculateSRM(MCU) {
  // For multiple grain additions, calculate MCU for each addition and add them together
  // SRM colour = 1.4922 * (MCU * 0.6859)
  // Morey Equation - an excellent estimate of beer colour through the range of 1-50 SRM
  return 1.4922 * (MCU * 0.6859)
}

export function convertSRMToEBC(SRM) {
  // EBC = SRM * 1.97
  return SRM * 1.97
}

export function convertEBCToSRM(EBC) {
  // SRM = EBC * 0.508
  return EBC * 0.508
}

export function convertSRMtoLovibond(SRM) {
  // °L = (SRM + 0.76)/1.3546
  return (SRM + 0.76) / 1.3546
}

export function convertLovibondtoSRM(lovibond) {
  // SRM = (1.3564 x °L) - 0.76
  return 1.3564 * lovibond - 0.76
}

export function SRMToRgb(srm) {
  const r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))))
  const g = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.88, srm))))
  const b = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.7, srm))))

  return { r, g, b }
}

export function SRMToRGBCSS(srm) {
  const color = SRMToRgb(srm)

  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

// http://beersmith.com/blog/2011/02/04/counting-calories-in-your-homebrewed-beer/
// 12oz or 355 mL beer
export const caloriesAlc = (og, fg) => 1881.22 * fg * ((og - fg) / (1.775 - og))
export const caloriesExt = (og, fg) =>
  3550.0 * fg * (0.1808 * og + 0.8192 * fg - 1.0004)

export const calcCalories = (og, fg) =>
  caloriesAlc(og, fg) + caloriesExt(og, fg)

export const convertCToF = (C) => (C * 9) / 5 + 32

export const convertGToOz = (g) => g / 28.35
