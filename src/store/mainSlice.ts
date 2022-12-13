import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState, ITicket } from "../interfaces";

const initialState = {
  filter: {
    all: true,
    nothing: true,
    ref1: true,
    ref2: true,
    ref3: true,
  },
  sort: {
    cheap: false,
    expensive: false,
    optimal: false,
  },
  server: {
    status: null,
    error: null,
    tickets: [],
    showTickets: [],
    stop: false,
    userId: null
  }
}

const NUM_TICKETS = 5

const isAllChecked = (state: IState) => {
  for (let elem in state.filter) {
    if (!state.filter[elem] && elem !== 'all') return false
  }
  return true
}

const addItems = (state: IState) => {
  const curLengthShowTickers = state.server.showTickets.length
  state.server.showTickets = state.server.showTickets.concat(state.server.tickets.slice(curLengthShowTickers, curLengthShowTickers + NUM_TICKETS))
}

const filterTickets = (state: IState) => {
  const curLengthShowTickers = state.server.showTickets.length
  let result: ITicket[] = []
  state.server.tickets.forEach((item: ITicket) => {
    const l = item.segments[0].stops.length
    switch (true) {
      case state.filter.nothing && l === 0: result.push(item); break
      case state.filter.ref1 && l === 1: result.push(item); break
      case state.filter.ref2 && l === 2: result.push(item); break
      case state.filter.ref3 && l === 3: result.push(item); break
    }
  })
  state.server.showTickets = result.slice(0, curLengthShowTickers < NUM_TICKETS ? 5 : curLengthShowTickers)
}

export const fetchTickets: any = createAsyncThunk(
  'tickets/fetchTickets',
  async function (_, {rejectWithValue, getState, dispatch}) {
    const baseUrl = 'https://aviasales-test-api.kata.academy'
    let url = new URL('tickets', baseUrl)
    const state: any = getState()
    let id = state.reducer.server.userId
    try {
      if (!id) {
        const res = await fetch(new URL('search', baseUrl))
        if (!res.ok) throw new Error('Server Error. Не смогли получить id')
        const data = await res.json()
        id = data.searchId
        dispatch({type: 'tickets/addUserId', payload: id})
      }
      url.searchParams.set('searchId', id)
      const response = await fetch(url)
      if (!response.ok) throw new Error('Server Error. Не смогли получить данные')
      const tickets = await response.json()
      return await tickets
    } catch (error) {
      return rejectWithValue(error)
    }

  }
)

const mainSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    filterAll(state: IState) {
      state.filter.all = !state.filter.all
      Object.keys(state.filter).map(key => state.filter[key] = state.filter.all)
      filterTickets(state)
    },
    filterNothing(state: IState) {
      state.filter.nothing = !state.filter.nothing
      state.filter.all = isAllChecked(state)
      filterTickets(state)
    },
    filterRef1(state: IState) {
      state.filter.ref1 = !state.filter.ref1
      state.filter.all = isAllChecked(state)
      filterTickets(state)
    },
    filterRef2(state: IState) {
      state.filter.ref2 = !state.filter.ref2
      state.filter.all = isAllChecked(state)
      filterTickets(state)
    },
    filterRef3(state: IState){
      state.filter.ref3 = !state.filter.ref3
      state.filter.all = isAllChecked(state)
      filterTickets(state)
    },
    sortCheap(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'cheap')
      state.server.tickets.sort((a: ITicket, b: ITicket) => a.price - b.price )
      filterTickets(state)
    },
    sortExpensive(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'expensive')
      state.server.tickets.sort((a: ITicket, b: ITicket) => a.segments[0].duration - b.segments[0].duration)
      filterTickets(state)
    },
    sortOptimal(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'optimal')
      state.server.tickets.sort((a: ITicket,b: ITicket) => {
        const k1 = a.segments[0].duration / a.price
        const k2 = b.segments[0].duration / b.price
        return k2 - k1
      })
      filterTickets(state)
    },
    addItemsShowTickets(state: IState) {
      addItems(state)
      filterTickets(state)
    },
    addUserId(state: IState, actions) {
      state.server.userId = actions.payload
    }
  },
  extraReducers(builder) {
    builder
    // get Tickets
    .addCase(fetchTickets.pending, (state: IState, action) => {
      state.server.status = 'loading'
      state.server.error = null
    })
    .addCase(fetchTickets.fulfilled, (state: IState, action) => {
      state.server.status = 'resolved'
      // state.server.error = null
      state.server.stop = action.payload.stop
      state.server.tickets = [...state.server.tickets, ...action.payload.tickets]
      state.server.stop = action.payload.stop
      addItems(state)
    })
    .addCase(fetchTickets.rejected, (state: IState, action) => {
      state.server.status = 'rejected'
      state.server.error = action.payload.message
    })
  }
})

export const {filterAll, filterNothing, filterRef1, filterRef2, filterRef3} = mainSlice.actions
export const {sortCheap, sortExpensive, sortOptimal} = mainSlice.actions
export const {addItemsShowTickets} = mainSlice.actions
export default mainSlice.reducer
