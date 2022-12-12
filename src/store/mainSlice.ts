import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTickets } from "./response";
import { IState, ITicket } from "../interfaces";

const initialState = {
  filter: {
    all: false,
    nothing: false,
    ref1: false,
    ref2: false,
    ref3: false,
  },
  sort: {
    cheap: true,
    expensive: false,
    optimal: false,
  },
  server: {
    status: null,
    error: null,
    tickets: [],
    showTickets: [],
    stop: null
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

const fillShowTickets = (state: IState) => {
  const curLengthShowTickers = state.server.showTickets.length
  state.server.showTickets = []
  state.server.showTickets = state.server.tickets.slice(0, curLengthShowTickers)
}

export const fetchTickets: any = createAsyncThunk(
  'tickets/fetchTickets',
  async function () {
    const tickets = await getTickets()
    return tickets
  }
)

const mainSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    filterAll(state: IState) {
      state.filter.all = !state.filter.all
      Object.keys(state.filter).map(key => state.filter[key] = state.filter.all)
    },
    filterNothing(state: IState) {
      state.filter.nothing = !state.filter.nothing
      state.filter.all = isAllChecked(state)
    },
    filterRef1(state: IState) {
      state.filter.ref1 = !state.filter.ref1
      state.filter.all = isAllChecked(state)
    },
    filterRef2(state: IState) {
      state.filter.ref2 = !state.filter.ref2
      state.filter.all = isAllChecked(state)
    },
    filterRef3(state: IState){
      state.filter.ref3 = !state.filter.ref3
      state.filter.all = isAllChecked(state)
    },
    sortCheap(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'cheap')
      state.server.tickets.sort((a: ITicket, b: ITicket) => a.price - b.price )
      fillShowTickets(state)
    },
    sortExpensive(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'expensive')
      state.server.tickets.sort((a: ITicket, b: ITicket) => a.segments[0].duration - b.segments[0].duration)
    },
    sortOptimal(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'optimal')
      state.server.tickets.sort((a: ITicket,b: ITicket) => {
        const k1 = a.segments[0].duration / a.price
        const k2 = b.segments[0].duration / b.price
        return k2 - k1
      })
    },
    addItemsShowTickets(state: IState) {
      addItems(state)
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
        state.server.stop = action.payload.stop
        state.server.tickets = [...state.server.tickets, ...action.payload.tickets]
        state.server.stop = action.payload.stop
        addItems(state)
      })
  }
})

export const {filterAll, filterNothing, filterRef1, filterRef2, filterRef3} = mainSlice.actions
export const {sortCheap, sortExpensive, sortOptimal} = mainSlice.actions
export const {addItemsShowTickets} = mainSlice.actions
export default mainSlice.reducer
