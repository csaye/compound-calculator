'use client'
import { Chart, LinearScale, PointElement } from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import styles from './page.module.scss'
import { useState } from 'react'
import { NumberInput } from '@/components/NumberInput'

Chart.register(LinearScale, PointElement)

export default function Index() {
  const [startingAmount, setStartingAmount] = useState<number | null>(null)
  const [totalYears, setTotalYears] = useState<number | null>(null)
  const [dailyAddition, setDailyAddition] = useState<number | null>(null)
  const [weeklyAddition, setWeeklyAddition] = useState<number | null>(null)
  const [monthlyAddition, setMonthlyAddition] = useState<number | null>(null)
  const [yearlyAddition, setYearlyAddition] = useState<number | null>(null)
  const [dailyInterest, setDailyInterest] = useState<number | null>(null)
  const [weeklyInterest, setWeeklyInterest] = useState<number | null>(null)
  const [monthlyInterest, setMonthlyInterest] = useState<number | null>(null)
  const [yearlyInterest, setYearlyInterest] = useState<number | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Compound Interest Calculator</h1>
      </div>
      <div className={styles.content}>
        {renderForm()}
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

  function renderForm() {
    return (
      <div className={styles.form}>
        <div>
          <NumberInput
            format='money'
            placeholder='Starting amount'
            onChange={setStartingAmount}
          />
          <NumberInput placeholder='Total years' onChange={setTotalYears} />
        </div>
        <div>
          <NumberInput
            format='money'
            placeholder='Daily addition'
            onChange={setDailyAddition}
          />
          <NumberInput
            format='money'
            placeholder='Weekly addition'
            onChange={setWeeklyAddition}
          />
          <NumberInput
            format='money'
            placeholder='Monthly addition'
            onChange={setMonthlyAddition}
          />
          <NumberInput
            format='money'
            placeholder='Yearly addition'
            onChange={setYearlyAddition}
          />
        </div>
        <div>
          <NumberInput
            format='percent'
            placeholder='Daily interest'
            onChange={setDailyInterest}
          />
          <NumberInput
            format='percent'
            placeholder='Weekly interest'
            onChange={setWeeklyInterest}
          />
          <NumberInput
            format='percent'
            placeholder='Monthly interest'
            onChange={setMonthlyInterest}
          />
          <NumberInput
            format='percent'
            placeholder='Yearly interest'
            onChange={setYearlyInterest}
          />
        </div>
      </div>
    )
  }
}
