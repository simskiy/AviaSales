import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: false,
  nothing: false,
  ref1: false,
  ref2: false,
  ref3: false,
}

interface IState {
  [key: string]: boolean | string
}

const isAllChecked = (state: IState) => {
  for (let elem in state) {
    if (!state[elem] && elem !== 'all') return false
  }
  return true
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAll(state: IState) {
      state.all = !state.all
      Object.keys(state).map(key => state[key] = state.all)
    },
    filterNothing(state) {
      state.nothing = !state.nothing
      state.all = isAllChecked(state)
    },
    filterRef1(state) {
      state.ref1 = !state.ref1
      state.all = isAllChecked(state)
    },
    filterRef2(state) {
      state.ref2 = !state.ref2
      state.all = isAllChecked(state)
    },
    filterRef3(state){
      state.ref3 = !state.ref3
      state.all = isAllChecked(state)
    }
  }
})

export const {filterAll, filterNothing, filterRef1, filterRef2, filterRef3} = filterSlice.actions
export default filterSlice.reducer
