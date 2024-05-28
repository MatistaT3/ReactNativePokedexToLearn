import React, { useState } from 'react';
import { Input, Stack, Button, Text, Box } from 'native-base';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface FilterPokeListProps {
  onFilterChange: any;
}

const FilterPokeList: React.FC<FilterPokeListProps> = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newText = e.nativeEvent.text;
    setInputValue(newText);
    onFilterChange(newText);
  };

  const handleClear = () => {
    setInputValue('');
    onFilterChange('');
  };
  return (
    <Box>
      <Stack direction='row' space={4} alignItems='center'>
        <Input
          variant='rounded'
          placeholder='Busqueda'
          value={inputValue}
          onChange={handleInputChange}
        />
      </Stack>
      <Box>
        <Button onPress={handleClear}>
          <Text>Borrar</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPokeList;
