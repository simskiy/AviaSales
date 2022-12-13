// import React from 'react';
import BtnShowMore from '../btnShowMore/BtnShowMore';
import SortTickets from '../sortTickets/SortTickets';
import FilterTransfer from '../filterTrransfer/FilterTransfer';
import TicketList from '../ticketList/TicketList';
import styles from './App.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets} from '../../store/mainSlice';
import { IState } from '../../interfaces';
import Logo from '../logo/Logo';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(fetchTickets())},[dispatch])
  const stopLoad = useSelector((state: IState) => state.reducer.server.stop)
  return (
    <div className={styles.wrapper}>
      <Logo />
      <SortTickets />
      <FilterTransfer />
      <TicketList />
      {!stopLoad ? <BtnShowMore /> : null}
    </div>
  );
}

export default App;
