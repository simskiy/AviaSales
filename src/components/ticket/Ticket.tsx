// import React from "react";
import styles from './ticket.module.scss';

import img from './logo.png'

export default function Ticket () {
  return (
    <div className={styles.ticket}>
      <header className={styles.header}>
        <span className={styles.cost}>13 400 Р</span>
        <img src={img} alt="логотип авиакомпании" className={styles.logo}/>
      </header>
      <ul className={styles['route-list']}>
        <Route />
        <Route />
      </ul>
    </div>
  )
}

const Route = () => {
  return (
    <li className={styles['route-item']}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.thead}>
            <th scope="col" className="city">MOW - HKT</th>
            <th scope="col" className="way">в пути</th>
            <th scope="col" className="transfer">2 пересадки</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tdata}>
            <td>10:45 - 18:00</td>
            <td>21ч 15м</td>
            <td>HCG, JNB</td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}
