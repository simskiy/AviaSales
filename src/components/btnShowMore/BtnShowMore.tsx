import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces';
import { addItemsShowTickets, fetchTickets } from '../../store/mainSlice';
import styles from './btnShowMore.module.scss';

export default function BtnShowMore() {
  const dispatch = useDispatch()
  const lengthShowTickets = useSelector((state: IState) => state.reducer.server.showTickets.length)
  const lengthTickets = useSelector((state: IState) => state.reducer.server.tickets.length)

  return (
    <button
      className={styles.btn}
      onClick={() => {
        if (lengthShowTickets >= lengthTickets) {
          dispatch(fetchTickets())
        } else {
          dispatch(addItemsShowTickets())
        }
      }}
    >Показать еще 5 билетов!</button>
  )
}
