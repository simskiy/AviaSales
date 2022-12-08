import React from "react";
import styles from './FilterTransfer.module.scss'

const transfer = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']
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
  return (
    <p className={styles.filter__item}>
      <input type="checkbox" id={`item-${ind}`} className={styles.filter__input} />
      <label htmlFor={`item-${ind}`} className={styles.filter__label}>{label}</label>
    </p>
  )
}
