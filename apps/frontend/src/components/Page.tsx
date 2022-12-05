import { Button, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { trpc } from '../utils/trpc'

export const Page = () => {
  const dayList = trpc.getDays.useQuery()
  const [currDay, setCurrDay] = useState<NonNullable<typeof dayList.data>[number]>('day1')
  const dayResult = trpc.getDayResult.useQuery({ day: currDay, part: 'part1' })
  console.log(dayResult.data)
  return (
    <Paper>
      {dayList.data?.map((day) => (
        <Button key={day} onClick={() => setCurrDay(day)} >{day}</Button>
      ))}
      <Typography >
        {dayResult.data || 'loading'}
      </Typography>
    </Paper>
  )
}