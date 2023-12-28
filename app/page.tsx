'use client'
import { Chart, LinearScale, PointElement } from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import styles from './page.module.scss'

Chart.register(LinearScale, PointElement)

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Compound Interest Calculator</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.form}></div>
        <div className={styles.plot}>
          <Scatter
            width='300'
            height='300'
            data={{
              datasets: [
                {
                  label: 'Test data',
                  data: Array.from({ length: 10 }).map(() => ({
                    x: Math.random(),
                    y: Math.random(),
                  })),
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  animation: false,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  min: 0,
                  max: 1,
                },
                y: {
                  min: 0,
                  max: 1,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
