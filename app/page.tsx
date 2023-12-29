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
                  data: getData(),
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  animation: false,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Years',
                  },
                  min: 0,
                  max: totalYears ?? 0,
                },
                y: {
                  min: 0,
                  ticks: {
                    format: { style: 'currency', currency: 'USD' },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )

  function getData() {
    if (totalYears === null || startingAmount === null) return

    let x = 0
    let y = startingAmount
    const data = [{ x: 0, y }]

    for (let day = 1; day <= totalYears * 365; day++) {
      x = day / 365
      if (dailyInterest) y *= 1 + dailyInterest
      if (dailyAddition) y += dailyAddition

      if (day % 7 === 0) {
        if (weeklyInterest) y *= 1 + weeklyInterest
        if (weeklyAddition) y += weeklyAddition
      }

      if (day % 30 === 0) {
        if (monthlyInterest) y *= 1 + monthlyInterest
        if (monthlyAddition) y += monthlyAddition
        data.push({ x, y })
      }

      if (day % 365 === 0) {
        if (yearlyInterest) y *= 1 + yearlyInterest
        if (yearlyAddition) y += yearlyAddition
      }
    }

    return data
  }

  function renderForm() {
    return (
      <div className={styles.form}>
        <div>
          <NumberInput
            format='money'
            placeholder='Starting amount'
            onChange={setStartingAmount}
          />
          <NumberInput
            max={100}
            placeholder='Total years'
            onChange={setTotalYears}
          />
        </div>
        <p>Deposits</p>
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
        <p>Interest</p>
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
