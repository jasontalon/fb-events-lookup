import findHost from './event.host'
describe('find host of event', () => {
  it('should find host of event', async () => {
    let data = await findHost(2450629218324887)
    debugger;
    const parsedData = Object.keys(data).reduce((_new, curr) => {
      if (data[curr] != null) _new[curr] = data[curr]
      return _new
    }, {})

    console.log(parsedData)

    debugger
  })
})
