// import React from 'react';
import BtnShowMore from '../btnShowMore/BtnShowMore';
import FilterTicket from '../filterTicket/FilterTicket';
import FilterTransfer from '../filterTrransfer/FilterTransfer';
import TicketList from '../ticketList/TicketList';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <FilterTicket />
      <FilterTransfer />
      <TicketList />
      <BtnShowMore />
    </div>
  );
}

export default App;
