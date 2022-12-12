import { createSlice } from "@reduxjs/toolkit";

interface IState {
  [key: string]: boolean
}

const initialState = {
    'cheap': true,
    'expensive': false,
    'optimal': false,
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sortCheap(state: IState) {
      Object.keys(state).map(key => state[key] = key === 'cheap')
    },
    sortExpensive(state: IState) {
      Object.keys(state).map(key => state[key] = key === 'expensive')
    },
    sortOptimal(state: IState) {
      Object.keys(state).map(key => state[key] = key === 'optimal')
    }
  }
})

export const {sortCheap, sortExpensive, sortOptimal} = sortSlice.actions
export default sortSlice.reducer
