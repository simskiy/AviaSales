import img from './Logo.png'
import styles from './logo.module.scss'
export default function Logo() {
    return (
        <div className={styles.logo}>
            <img src={img} alt="Логотип" height={90} width={90}/>
        </div>
    )
}
