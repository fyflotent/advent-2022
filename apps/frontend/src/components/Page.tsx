import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from 'advent-middleware/router';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { AppBar } from './AppBar';

type GetDayInput = inferProcedureInput<AppRouter['getDayResult']>;

export const Page = () => {
  const [currDay, setCurrDay] = useState<GetDayInput['day']>('day1');
  const [currPart, setCurrPart] = useState<GetDayInput['part']>('part1');
  const [currInput, setCurrInput] = useState<string | undefined>();

  const dayList = trpc.getDays.useQuery();
  const { data: dayResult, error } = trpc.getDayResult.useQuery({
    day: currDay,
    part: currPart,
    input: currInput,
  });

  return (
    <Box>
      <AppBar />
      <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
        <Paper
          sx={{
            flex: '0 1 33%',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            gap: 2,
          }}
        >
          <FormControl>
            <InputLabel>Day</InputLabel>
            <Select
              label="Day"
              onChange={(change) => {
                setCurrDay(change.target.value as GetDayInput['day']);
              }}
              value={currDay}
            >
              {dayList.data?.map((day) => (
                <MenuItem key={day} value={day}>
                  {day.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Part</InputLabel>
            <Select
              label="Part"
              onChange={(change) => {
                setCurrPart(change.target.value as GetDayInput['part']);
              }}
              value={currPart}
            >
              {['part1', 'part2'].map((day) => (
                <MenuItem key={day} value={day}>
                  {day.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            multiline
            minRows={2}
            maxRows={4}
            onChange={(change) => {
              setCurrInput(change.target.value);
            }}
            value={currInput ?? ''}
          />
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setCurrInput(undefined);
            }}
          >
            Clear Input
          </Button>
        </Paper>

        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            padding: 2,
            gap: 2,
          }}
        >
          <Typography variant="h6">Result</Typography>
          <Paper variant="outlined" sx={{ flex: '1 1 auto', padding: 1 }}>
            <Typography component="pre" sx={{ color: 'text.secondary' }}>
              {dayResult ?? 'loading...'}
            </Typography>
            {error && (
              <Typography component="pre" sx={{ color: 'error.main' }}>
                {error.message}
              </Typography>
            )}
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
};
