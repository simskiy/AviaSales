// import React from "react";
import { useSelector } from "react-redux";
import Ticket from "../ticket/Ticket";
import styles from './ticketList.module.scss'
import { IState, ITicket } from "../../interfaces";
import Load from "../load/Load";

export default function TicketList () {
  const tickets = useSelector((state: IState) => state.reducer.server.showTickets )
  const isLoading = useSelector((state: IState) => state.reducer.server.status === 'loading')
  return (
    <ul className={styles.ticketList}>
      {tickets.map((item: ITicket, ind: number) => (<li key={ind}><Ticket index={ind} /></li>))}
      {isLoading ? <Load /> : null}
    </ul>
  )
}
