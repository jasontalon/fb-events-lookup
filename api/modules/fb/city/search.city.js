import Axios from 'axios'

export default async function(city) {
  const url = `https://www.facebook.com/ajax/typeahead/global_cities.php?value=${city}&__a=1`,
    { data } = await Axios.get(url),
    {
      payload: { entries }
    } = JSON.parse(data.replace(/for \(;;\);/, ''))

  return entries.map(p => ({ value: p.uid, text: p.text }))
}
