import Axios from 'axios'

export default async function(eventId) {
  const headers = {
      'Accept-Language': 'en-US'
    },
    endpoint = 'https://www.facebook.com/api/graphql/',
    params = new URLSearchParams()

  params.append('variables', `{"eventID":"${eventId}"}`)
  params.append('doc_id', '1634531006589990')

  const { data } = await Axios.post(endpoint, params, { headers })

  const {
    data: {
      event: {
        hosts: { edges: hosts }
      },
      place
    }
  } = data
  const host = hosts.map(p => ({ ...p.node })).find(p => p.__typename == 'Page')
  if (!host) return place
  return host
}
