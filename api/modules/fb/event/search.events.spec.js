import api from './search.events'
import moment from 'moment'

describe('fb find events', () => {
  it.skip('should find events', async () => {
    const response = await api({
      city: '2490299',
      categories: ['1821948261404481', '370585540007142'], //music, food
      startDate: '2019-11-28',
      endDate: '2019-11-30',
      maxPageCount: 2
    })

    const events = [].concat.apply(
      [],
      response.map(r => r.events)
    )

    expect(events.length).toBeGreaterThan(0)
    console.log(events)
    debugger
  }, 120000)

  it('should find weekend', () => {
    const from = moment().add(5, 'days').format("YYYY-MM-DD")
    const until = moment().add(6, 'days').format("YYYY-MM-DD")
    console.log({ from, until })
  })
})
