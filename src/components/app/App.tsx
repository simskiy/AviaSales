// import React from 'react';
import BtnShowMore from '../btnShowMore/BtnShowMore';
import SortTickets from '../sortTickets/SortTickets';
import FilterTransfer from '../filterTrransfer/FilterTransfer';
import TicketList from '../ticketList/TicketList';
import styles from './App.module.scss';

const App = () => {

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
