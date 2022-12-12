import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAll, filterNothing, filterRef1, filterRef2, filterRef3 } from "../../store/mainSlice";
import styles from './FilterTransfer.module.scss'

const transfer = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']
const actions = [filterAll, filterNothing, filterRef1, filterRef2, filterRef3]
interface IFilterProps {
  label: string,
  ind: number
}

export default function FilterTransfer () {
  return (
    <fieldset className={styles.filter}>
      <legend className={styles.filter__title}>количество пересадок</legend>
        {transfer.map((item, index) => <FilterItem label={item} ind={index} key={index} />)}
    </fieldset>
  )
}

const FilterItem: React.FC<IFilterProps> = ({label, ind}) => {
  const state = useSelector((state: any) => state.reducer.filter)
  const keys = Object.keys(state)
  const dispatch = useDispatch()
  return (
    <p className={styles.filter__item}>
      <input
        type="checkbox"
        id={`item-${ind}`}
        className={styles.filter__input}
        onChange={() => dispatch(actions[ind]())}
        checked = {state[keys[ind]]}
      />
      <label htmlFor={`item-${ind}`} className={styles.filter__label}>{label}</label>
    </p>
  )
}
