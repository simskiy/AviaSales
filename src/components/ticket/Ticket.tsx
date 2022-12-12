// import React from "react";
import styles from './ticket.module.scss';

// import img from './logo.png'
import { useSelector } from 'react-redux';
import { IState } from '../../interfaces';
import { minutesToHours } from 'date-fns';

interface IFlight {
  [key: string]: string | Date | number | any[any]
}

const formatTime = (time: number) => {
  let h = checkTime(minutesToHours(time))
  const m = checkTime(time - (h * 60))
  return `${h}ч ${m}м`
}

const checkTime = (time: number) => {
  return time.toString.length < 2 ? (0 + time) : time
}

const checkTransfer = (transfer: string[]) => {
  const l = transfer.length
  switch(true) {
    case l === 0: return 'без пересадок'
    case l === 1: return '1 пересадка'
    case (l > 1 || l < 5): return `${l} пересадки`
    case (l > 4 || l < 10): return `${l} пересадок`
    default: return 'много пересадок'
  }
}

const checkPrice = (price: number) => {
  const a = price.toString().slice(0, -3)
  const b = price.toString().slice(-3)
  return `${a} ${b} Р`
}

export default function Ticket (props: { index: number; }) {
  const ticket = useSelector((state: IState) => state.reducer.server.tickets[props.index])
  const img = `https://pics.avs.io/99/36/${ticket.carrier}.png`
  return (
    <div className={styles.ticket}>
      <header className={styles.header}>
        <span className={styles.cost}>{checkPrice(ticket.price)}</span>
        <img src={img} alt="логотип авиакомпании" className={styles.logo}/>
      </header>
      <ul className={styles['route-list']}>
        <Track flight={ticket.segments[0]} />
        <Track flight={ticket.segments[1]} />
      </ul>
    </div>
  )
}

const Track = (props:{flight: IFlight}) => {
  const flight = props.flight
  return (
    <li className={styles['route-item']}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.thead}>
            <th scope="col" className="city">{`${flight.origin} - ${flight.destination}`}</th>
            <th scope="col" className="way">в пути</th>
            <th scope="col" className="transfer">{checkTransfer(flight.stops)}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tdata}>
            <td>10:45 - 18:00</td>
            <td>{formatTime(flight.duration as number)}</td>
            <td>{flight.stops.join(' ')}</td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}


