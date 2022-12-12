// import React from "react";
import { useSelector } from "react-redux";
import Ticket from "../ticket/Ticket";
import styles from './ticketList.module.scss'
import { IState } from "../../interfaces";
import { Key } from "react";

export default function TicketList () {
  const tickets = useSelector((state: IState) => state.reducer.server.showTickets )
  return (
    <ul className={styles.ticketList}>
      {tickets.map((_: any, ind: Key | number) => (<Ticket key={ind} index={ind as number}/>))}
    </ul>
  )
}
