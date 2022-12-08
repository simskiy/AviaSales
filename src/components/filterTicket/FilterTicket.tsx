import React from "react";
import styles from './filterTicket.module.scss'

const btns:string[] = ['самый дешевый', 'самый быстрый', 'оптимальный']

interface IFilterProps {
  name: string
}

export default function FilterTicket() {
  return (
    <ul className={styles.filter}>
      {btns.map((item, index) => <FilterItem name={item} key={index} /> )}
    </ul>
  )
}


const FilterItem: React.FC<IFilterProps> = ({name}) => {
  return (
    <li className={styles.item}>
      <button className={styles.btn}>
        {name}
      </button>
    </li>
  )
}
