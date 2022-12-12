// import React from 'react';
import BtnShowMore from '../btnShowMore/BtnShowMore';
import SortTickets from '../sortTickets/SortTickets';
import FilterTransfer from '../filterTrransfer/FilterTransfer';
import TicketList from '../ticketList/TicketList';
import styles from './App.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTickets } from '../../store/mainSlice';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      <SortTickets />
      <FilterTransfer />
      <TicketList />
      <BtnShowMore />
    </div>
  );
}

export default App;
