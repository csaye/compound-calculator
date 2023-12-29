import { useState } from 'react'

type Props = {
  format?: 'money' | 'percent'
  max?: number
  onChange: (value: number | null) => void
  placeholder?: string
}

export function NumberInput({
  format,
  max = format === 'percent' ? 100 : 1_000_000_000,
  onChange,
  placeholder,
}: Props) {
  const [rawString, setRawString] = useState('')

  return (
    <input
      value={rawString}
      onChange={(e) => onRawStringChange(e.target.value)}
      placeholder={placeholder}
    />
  )

  function onRawStringChange(rawInput: string) {
    let sanitizedInput = getSanitized(rawInput)
    // ignore trailing % if deleting from end
    if (rawString.endsWith('%') && !rawInput.includes('%')) {
      sanitizedInput = sanitizedInput.slice(0, -1)
    }

    let num = Number(sanitizedInput)
    if (max && num > max) num = max

    if (!sanitizedInput || isNaN(num)) {
      if (rawString) {
        setRawString('')
        onChange(null)
      }
      return
    }

    const nextRawString = formatNumber()
    if (nextRawString !== rawString) {
      setRawString(nextRawString)
      onChange(num)
    }

    function getSanitized(num: string) {
      num = num.replace(/[^0-9\.]/g, '')
      // remove all but first period
      if (num.includes('.')) {
        const parts = num.split('.')
        num = [parts[0], parts.slice(1).join('')].join('.')
      }
      return num
    }

    function formatNumber() {
      let numFormatted = num.toLocaleString('en-US')

      if (format === 'money') {
        numFormatted = num.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        })
      }

      // keep period at end of formatted number
      if (rawInput.endsWith('.') && !numFormatted.includes('.')) {
        numFormatted += '.'
      }

      if (format === 'percent') numFormatted += '%'

      return numFormatted
    }
  }
}
