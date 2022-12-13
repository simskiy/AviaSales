import { useSelector } from "react-redux";
import Ticket from "../ticket/Ticket";
import styles from './ticketList.module.scss'
import { IState, ITicket } from "../../interfaces";
import Load from "../load/Load";
import ErrorDlg from "../errorDlg/ErrorDlg";

export default function TicketList () {
  const tickets = useSelector((state: IState) => state.reducer.server.showTickets )
  const isLoading = useSelector((state: IState) => state.reducer.server.status === 'loading')
  const isError = useSelector((state: IState) => state.reducer.server.status === 'rejected')
  return (
    <ul className={styles.ticketList}>
      {tickets.length === 0 ? <p>Рейсов, подходящих под заданные фильтры, не найдено</p> : null}
      {tickets.map((item: ITicket, ind: number) => (<li key={ind}><Ticket index={ind} /></li>))}
      {isLoading ? <Load /> : null}
      {isError ? <ErrorDlg /> : null}
    </ul>
  )
}
