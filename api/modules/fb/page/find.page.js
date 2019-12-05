require('dotenv').config()

const { BROWSERLESS_FN_ENDPOINT } = process.env

const compareImages = require('resemblejs/compareImages'),
  detailIcons = [
    'static/images/fb/email.png',
    'static/images/fb/address.png',
    'static/images/fb/instagram.png',
    'static/images/fb/phone.png',
    'static/images/fb/twitter.png',
    'static/images/fb/website.png',
    'static/images/fb/info.png',
    'static/images/fb/category.png'
  ]

const axios = require('axios')

const analyzeIconResemblance = (detail, icon) =>
    new Promise(async resolve =>
      resolve({
        detail,
        icon,
        ...(await compareImages(detail.img, icon))
      })
    ),
  isMatch = analysis => analysis.misMatchPercentage == 0,
  mapDetail = item => ({
    type: (item.icon.match(/^.*[\\\/](.*)\.[^.]+$/) || []).pop() || '',
    detail: item.detail.text
  }),
  convertResultArrayToObject = resemblanceAnalysisResults =>
    resemblanceAnalysisResults.reduce((accumulator, item) => {
      accumulator[item.type] = item.detail
      return accumulator
    }, {}),
  prepareTasksForAnalysis = scrapedDetails => {
    const tasks = []
    scrapedDetails.forEach(detail => {
      detailIcons.forEach(icon =>
        tasks.push(analyzeIconResemblance(detail, icon))
      )
    })
    return tasks
  }

async function findPage(id) {
  const code =
    "module.exports=async({page,context})=>{const{id}=context\r\nawait page.goto(`https://m.facebook.com/${id}`,{waitUntil:'networkidle2'})\r\nconst data=await page.evaluate(()=>Array.from(document.querySelectorAll(\"div[id='pages_msite_body_contents'] img[src*='.png']\")).map((element,index)=>{return{index,text:element.closest('div').innerText,img:element.getAttribute('src')}}))\r\nreturn{data,type:'application/json'}}"

  const { data } = await axios.post(BROWSERLESS_FN_ENDPOINT, {
    code,
    context: { id }
  })

  const avoid = item => {
    const avoidItem = [
      'See More',
      'See Less',
      'Share',
      'Interested',
      'Closed Now'
    ].find(p => item.text.includes(p))

    return !avoidItem && item.text != ''
  }

  const filteredData = data.filter(avoid)

  const resemblanceAnalysisTasks = prepareTasksForAnalysis(filteredData)

  const resemblanceAnalysisResults = Array.from(
    await Promise.all(resemblanceAnalysisTasks)
  )
    .filter(isMatch)
    .map(mapDetail)

  const pageDetails =
    resemblanceAnalysisResults.length > 0
      ? convertResultArrayToObject(resemblanceAnalysisResults)
      : null

  return pageDetails
    ? {
        id,
        ...pageDetails
      }
    : null
}

export default findPage
