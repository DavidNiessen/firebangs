import config from '../config.js'

const bangsFilePath = '../assets/bangs.json'

let bangs
let indexes

export const loadBangs = async (forceRefetch = false) => {
  if (bangs && !forceRefetch) {
    return { bangs, indexes }
  }

  const url = config.fetchRemoteData ? config.fetchRemoteData : bangsFilePath

  bangs = await fetchBangs(url)
  indexes = mapIndexes(bangs)

  return { bangs, indexes }
}

export const fetchBangs = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`(${response.status} Failed to load Bangs from ${url}: ${response.statusText}`)
  }

  const json = await response.json()

  if (!json) {
    throw new Error('Bangs json is invalid or empty')
  }

  return json
}

const mapIndexes = (bangs) => bangs.map(bang => bang.t.toLowerCase())