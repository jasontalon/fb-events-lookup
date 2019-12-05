import fb from './modules/fb'
import util from './util'
import _ from 'lodash'
import URL from 'url'
module.exports = {
  GET: [
    [
      '/city',
      async function(req, res) {
        const { q } = util.getQueryString(req.url)
        try {
          const data = await fb.city.search(q)
          util.send(res, data)
        } catch (err) {
          util.send(res, err, 400)
        }
      }
    ],
    [
      '/events',
      async function(req, res) {
        const {
          city,
          startDate,
          endDate,
          categories,
          paginationCursor = null,
          maxPageCount = 10
        } = util.getQueryString(req.url)
        const categoriesArr = categories.split(',')
        const searchQuery = {
          city,
          categories: categoriesArr,
          startDate,
          endDate,
          cursor: paginationCursor,
          maxPageCount
        }
        try {
          const data = await fb.event.search(searchQuery)
          const lastPage = data.pop() || {}
          const { paginationCursor, hasNextPage } = lastPage

          const events = [].concat.apply(
            [],
            data.map(r => r.events)
          )
          const parsedEvents = events.map(e => {
            return {
              id: e.id,
              title: e.title,
              description: e.description,
              date: `${e.month} ${e.day}`,
              time: e.dateAndTime,
              location: e.location,
              socialContext: e.socialContext,
              buyticketUrl: e.eventBuyTicketUrl,
              hasBuyTicketUrl: e.eventBuyTicketUrl ? true : false,
              isFreeEvent: e.isFreeEvent,
              buyTicketHost: e.eventBuyTicketUrl
                ? URL.parse(e.eventBuyTicketUrl).hostname.replace(
                    /(https:\/\/|http:\/\/|www\.|\.com|\.au|\.net)/gim,
                    ''
                  )
                : ''
            }
          })

          const parsedEventsWithHosts = []

          for (let i = 0; i < parsedEvents.length; i++) {
            const host = await fb.event.findHost(parsedEvents[i].id)
            if (!host) {
              parsedEventsWithHosts.push({ ...parsedEvents[i] })
              continue
            }
            const parsedHost = Object.keys(host).reduce((_new, curr) => {
              if (host[curr]) _new[curr] = host[curr]
              return _new
            }, {})
            const {
              url,
              category,
              id,
              name,
              about: { text: summary = '' } = {},
              city: { name: city = '' } = {}
            } = parsedHost
            parsedEventsWithHosts.push({
              ...parsedEvents[i],
              host: { id, name, url, category, city, summary }
            })
          }
          util.send(res, {
            events: parsedEventsWithHosts,
            paginationCursor,
            hasNextPage
          })
        } catch (err) {
          util.send(res, { message: err.toString() }, 400)
        }
      }
    ],
    [
      '/page',
      async function(request, response) {
        const { eventId } = util.getQueryString(request.url)
        try {
          const host = await fb.event.findHost(eventId)
          const parsedData = Object.keys(host).reduce((_new, curr) => {
            if (host[curr] != null) _new[curr] = host[curr]
            return _new
          }, {})
          console.log(parsedData)
          const {
            url,
            category,
            id,
            name,
            about: { text: summary = '' } = {},
            city: { name: city = '' } = {}
          } = parsedData
          util.send(response, { id, name, category, summary, city, url })
        } catch (error) {
          util.send(response, { error: error.toString() }, 400)
        }
      }
    ],
    [
      '/page/find',
      async function(request, response) {
        const { id } = util.getQueryString(request.url)
        const result = await fb.page.findPage(id)

        util.send(response, result)
        try {
        } catch (error) {
          util.send(response, { error: error.toString() }, 400)
        }
      }
    ]
  ],
  POST: [['/city', async function(req, res) {}]]
}
