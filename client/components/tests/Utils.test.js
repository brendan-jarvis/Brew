import * as Utils from '../../utils/Utils'

describe('Colour conversion functions', () => {
  test('Convert SRM to EBC returns a correct result', () => {
    const expected = 19.7

    const actual = Utils.convertSRMToEBC(10)

    expect(actual).toBe(expected)
  })

  test('Convert EBC to SRM returns a correct result', () => {
    const expected = 10.16

    const actual = Utils.convertEBCToSRM(20)

    expect(actual).toBe(expected)
  })
})

describe('Metric to Imperial conversion functions.', () => {
  test('Convert litres to gallons returns a correct result.', () => {
    const expected = 5.283440000000001

    const actual = Utils.convertLitresToGallons(20)

    expect(actual).toBe(expected)
  })

  test('Convert kilograms to pounds returns a correct result.', () => {
    const expected = 11.0231

    const actual = Utils.convertKilogramsToPounds(5)

    expect(actual).toBe(expected)
  })
})

describe('Calculate MCU and SRM.', () => {
  test('Calculate MCU returns a correct result.', () => {
    const kgGrain = 5
    const colour = 2
    const volumeLitres = 22.7304

    // 11.0231 lbs * 2 lovibond / 5 gallons
    const expected = 3.671469125609683

    const actual = Utils.calculateMCU(kgGrain, colour, volumeLitres)

    expect(actual).toBe(expected)
  })

  test('Calculate SRM from MCU returns a correct result.', () => {
    // 1.4922 * (MCU * 0.6859)
    const MCU = 3.671469125609683
    const expected = 3.757748576632128

    const actual = Utils.calculateSRM(MCU)

    expect(actual).toBe(expected)
  })
})

describe('Calculate Lovibond from SRM and SRM from Lovibond.', () => {
  test('Calculate Lovibond from SRM returns a correct result.', () => {
    const SRM = 7

    const expected = 5.728628377380776

    const actual = Utils.convertSRMtoLovibond(SRM)

    expect(actual).toBe(expected)
  })

  test('Calculate SRM from Lovibond returns a correct result.', () => {
    // 1.4922 * (MCU * 0.6859)
    const lovibond = 5.73
    const expected = 7.012172000000001

    const actual = Utils.convertLovibondtoSRM(lovibond)

    expect(actual).toBe(expected)
  })
})
