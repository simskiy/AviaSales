import { Spin } from "antd";
import React from "react";
import styles from './load.module.scss'

const Load: React.FC = () => {
  return (
    <div className={styles.load}>
      <Spin tip="Loading" size="large"/>
    </div>
  )
}

export default Load
