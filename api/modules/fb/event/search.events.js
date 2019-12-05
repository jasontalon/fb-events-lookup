import Axios from 'axios'

export default findEvents

async function findEvents({
  city,
  categories,
  startDate,
  endDate,
  timezone,
  cursor,
  page = 1,
  maxPageCount = 10
}) {
  const results = [],
    headers = {
      'Accept-Language': 'en-US'
    },
    endpoint =
      'https://www.facebook.com/events/discover/query/' +
      makeSearchQueryString(city, categories, startDate, endDate, timezone),
    params = new URLSearchParams()

  params.append('__a', '1')
  if (cursor) params.append('cursor', cursor)

  const { data } = await Axios.post(endpoint, params, { headers })
  const {
    payload: {
      results: [searchResults]
    }
  } = JSON.parse(data.replace(/for \(;;\);/gm, ''))

  if (!searchResults) return results

  results.push(searchResults)
  const { paginationCursor, hasNextPage } = searchResults

  if (paginationCursor && hasNextPage) {
    page += 1
    if (maxPageCount < page) return results
    results.push(
      ...(await findEvents({
        city,
        categories,
        startDate,
        endDate,
        timezone,
        cursor: paginationCursor,
        page,
        maxPageCount
      }))
    )
  }

  return results
}

function makeSearchQueryString(city, categories, startDate, endDate, timezone) {
  const suggestion_token = {
    city,
    event_categories: categories,
    time: JSON.stringify({
      start: startDate,
      end: endDate
    }),
    timezone
  }

  return `?suggestion_token=${JSON.stringify(suggestion_token)}`
}
