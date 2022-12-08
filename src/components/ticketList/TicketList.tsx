// import React from "react";
import Ticket from "../ticket/Ticket";
import styles from './ticketList.module.scss'

export default function TicketList () {
  return (
    <ul className={styles.ticketList}>
      <li><Ticket /></li>
      <li><Ticket /></li>
      <li><Ticket /></li>
      <li><Ticket /></li>
      <li><Ticket /></li>
      <li><Ticket /></li>
    </ul>
  )
}
