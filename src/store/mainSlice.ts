import { createSlice } from "@reduxjs/toolkit";

interface IState {
  [key: string]: {
    [key: string]: boolean | string
  }
}

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
  }
}

const isAllChecked = (state: IState) => {
  for (let elem in state.filter) {
    if (!state.filter[elem] && elem !== 'all') return false
  }
  return true
}

const mainSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    filterAll(state: IState) {
      state.filter.all = !state.filter.all
      Object.keys(state.filter).map(key => state.filter[key] = state.filter.all)
    },
    filterNothing(state) {
      state.filter.nothing = !state.filter.nothing
      state.filter.all = isAllChecked(state)
    },
    filterRef1(state) {
      state.filter.ref1 = !state.filter.ref1
      state.filter.all = isAllChecked(state)
    },
    filterRef2(state) {
      state.filter.ref2 = !state.filter.ref2
      state.filter.all = isAllChecked(state)
    },
    filterRef3(state){
      state.filter.ref3 = !state.filter.ref3
      state.filter.all = isAllChecked(state)
    },
    sortCheap(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'cheap')
    },
    sortExpensive(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'expensive')
    },
    sortOptimal(state: IState) {
      Object.keys(state.sort).map(key => state.sort[key] = key === 'optimal')
    }
  }
})

export const {filterAll, filterNothing, filterRef1, filterRef2, filterRef3} = mainSlice.actions
export const {sortCheap, sortExpensive, sortOptimal} = mainSlice.actions
export default mainSlice.reducer
