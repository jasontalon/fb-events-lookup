import searchCity from './search.city'
describe('find city', () => {
  it('should find sydney', async () => {
    const city = 'sydney, australia'

    const output = await searchCity(city)
    expect(output).toEqual(expect.anything())
    console.log(output)
  })
})
