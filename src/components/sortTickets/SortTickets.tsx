import React from "react";
import styles from './sortTicket.module.scss'
import { sortCheap, sortExpensive, sortOptimal } from "../../store/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

interface ISortProps {
  name: string,
  action: ActionCreatorWithoutPayload
}

interface State {
  [key: string]: boolean | any
}

const btns = [
  {
    label: 'самый дешевый',
    action: sortCheap
  },
  {
    label: 'самый быстрый',
    action: sortExpensive
  },
  {
    label: 'оптимальный',
    action: sortOptimal
  }
]

export default function SortTickets() {
  return (
    <ul className={styles.filter}>
      {btns.map((item, index) => <SortItem name={item.label} key={index} action={item.action} /> )}
    </ul>
  )
}

const SortItem: React.FC<ISortProps> = ({name, action}) => {
  const dispatch = useDispatch()
  const state = useSelector((state: State) => state.reducer.sort)
  const str = action().type.toLowerCase().replace('tickets/sort', '')
  const classBtnChecked = state[str] ? styles['btn--checked'] : ''

  return (
    <li className={styles.item}>
      <button
        className={`${styles.btn} ${classBtnChecked}`}
        onClick={() => dispatch(action())}>
        {name}
      </button>
    </li>
  )
}
