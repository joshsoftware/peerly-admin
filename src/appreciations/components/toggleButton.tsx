import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IPropsButtons } from '../types';

export default function AppreciationToggleButton(props: IPropsButtons) {
  const [alignment, setAlignment] = React.useState('appreciations');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    props.setFilter(newAlignment)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="appreciations">Appreciations</ToggleButton>
      <ToggleButton value="reported">Reported</ToggleButton>
    </ToggleButtonGroup>
  );
}
