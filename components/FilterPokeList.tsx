import React from 'react';
import { Input, Stack, Button, Text, Box } from 'native-base';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface FilterPokeListProps {
  onFilterChange: any;
}

const FilterPokeList: React.FC<FilterPokeListProps> = ({ onFilterChange }) => {
  return (
    <Box>
      <Stack direction='row' space={4} alignItems='center'>
        <Input
          variant='rounded'
          placeholder='Busqueda'
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            onFilterChange(e.nativeEvent.text)
          }
        />
      </Stack>
      <Box>
        <Button onPress={() => onFilterChange('')}>
          <Text>Borrar</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPokeList;
