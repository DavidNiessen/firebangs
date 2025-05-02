import { loadBangs } from './bangLoader.js'

if (typeof browser === 'undefined') {
  globalThis.browser = chrome
}

const REGEX = /!(\S+)/i

const handler = async (details) => {
  const { bangs, indexes } = await loadBangs()

  if (!bangs || !indexes) return

  const url = new URL(details.url)
  const params = url.searchParams

  const query = params.get('q')
  if (!query) return

  // find possible bangs in query
  const match = matchQueryForBang(query)
  if (!match) return

  // try to match to bang
  const bang = findBangByString(match, bangs, indexes)
  if (!bang) return

  // replace url
  const newUrl = buildNewUrl(bang, query)
  updateTab(newUrl)
}

const matchQueryForBang = (query) => {
  const matcher = query.match(REGEX)
  return matcher?.[0]?.toLowerCase()?.replace('!', '')
}

const findBangByString = (input, bangs, indexes) => {
  // find index by string
  const index = indexes.find((it) => it === input)

  if (!index) {
    return undefined
  }

  // find bang by index
  return bangs.find((it) => it.t === index)
}

const updateTab = (url) => {
  browser.tabs.update({ url })
}

const buildNewUrl = (bang, query) => {
  const bangUrl = bang.u

  if (!bangUrl) {
    console.log(`bang has invalid url`)
    return
  }

  const queryWithoutBangs = query.replace(REGEX, '').trim()
  const encodedQuery = encodeURIComponent(queryWithoutBangs)

  return bangUrl.replace('{{{s}}}', encodedQuery)
}

chrome.webRequest.onBeforeRequest.addListener(
  handler,
  { urls: ['<all_urls>'] },
)