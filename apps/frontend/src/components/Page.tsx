import { Box, MenuItem, Paper, Select, styled, TextField, Typography } from '@mui/material'
import type { inferProcedureInput } from '@trpc/server'
import type { AppRouter } from 'advent-middleware/router'
import { useState } from 'react'
import { trpc } from '../utils/trpc'

type GetDayInput = inferProcedureInput<
  AppRouter['getDayResult']
>

const StyledSelect = styled(Select)(({ theme }) => ({
  margin: theme.spacing(1)
}))

export const Page = () => {
  const dayList = trpc.getDays.useQuery()
  const [currDay, setCurrDay] = useState<GetDayInput['day']>('day1')
  const [currPart, setCurrPart] = useState<GetDayInput['part']>('part1')
  const [currInput, setCurrInput] = useState<string | undefined>()
  const { data: dayResult } = trpc.getDayResult.useQuery({ day: currDay, part: currPart, input: currInput }, { refetchInterval: 1000, })
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
      <Paper sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', padding: 1, margin: 1 }}>
        <StyledSelect
          label='day'
          onChange={(change) => {
            setCurrDay(change.target.value as GetDayInput['day'])
          }}
          value={currDay}
        >
          {dayList.data?.map((day) => (
            <MenuItem key={day} value={day}>{day.toUpperCase()}</MenuItem>
          ))}
        </StyledSelect>
        <StyledSelect
          label='part'
          onChange={(change) => {
            setCurrPart(change.target.value as GetDayInput['part'])
          }}
          value={currPart}
        >
          {['part1', 'part2'].map((day) => (
            <MenuItem key={day} value={day}>{day.toUpperCase()}</MenuItem>
          ))}
        </StyledSelect>
        <TextField onChange={(change) => {
          setCurrInput(change.target.value)
        }} value={currInput} />
      </Paper>
      <Paper sx={{ flex: '3 3 auto', padding: 1, margin: 1 }}>
        <Typography sx={{ margin: 1 }} >
          Result:
        </Typography>
        <Typography sx={{ margin: 1, background: '' }} >
          {dayResult || 'loading'}
        </Typography>
      </Paper>
    </Box>
  )
}