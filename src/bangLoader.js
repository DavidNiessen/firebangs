import config from '../config.js'

const bangsFilePath = '../assets/bangs.json'

let data = {
  bangs: null,
  indexes: null,
}
let lastUpdated = null

export const loadBangs = async () => {
  const now = new Date()
  if (
    !data.bangs ||
    !data.indexes ||
    !lastUpdated ||
    now.getTime() - lastUpdated.getTime() > config.updateAfterMs
  ) {
    let bangs
    try {
      bangs = await fetchBangs(config.remoteDataUrl)
    } catch (error) {
      console.warn('Failed to fetch remote bangs: ', error)
      bangs = await fetchBangs(bangsFilePath)
    }

    if (bangs) {
      data = {
        bangs: bangs,
        indexes: mapIndexes(bangs),
      }
      lastUpdated = now
    }
  }

  return data
}

export const fetchBangs = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `(${response.status} Failed to load Bangs from ${url}: ${response.statusText}`,
    )
  }

  const json = await response.json()

  if (!json) {
    throw new Error('Bangs json is invalid or empty')
  }

  return json
}

const mapIndexes = (bangs) => bangs.map((bang) => bang.t.toLowerCase())
