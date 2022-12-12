const baseUrl = 'https://aviasales-test-api.kata.academy'

async function getIdUser() {
  const res = await fetch(new URL('search', baseUrl))
  const data = await res.json()
  return await data.searchId
}

export async function getTickets() {
    let url = new URL('tickets', baseUrl)
    const id = await getIdUser()
    url.searchParams.set('searchId', id)
    const res = await fetch(url)
    const data = await res.json()
    return await data
  }
