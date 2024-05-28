import { StyleSheet } from 'react-native';
import {
  NativeBaseProvider,
  Button,
  Heading,
  FlatList,
  Spinner,
} from 'native-base';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import RenderPokeGrid from '@/components/RenderPokeGrid';
import FilterPokeList from '@/components/FilterPokeList';

export default function PokeGrid() {
  const [pokemonDataLimited, setPokemonDataLimited] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allPokemonData, setAllPokemonData] = useState<any[]>([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState<any[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(false);

  const fetchLimitedPokemonData = async (limit = 30) => {
    const baseUrl = 'https://pokeapi.co/api/v2/';
    const offset = (currentPage - 1) * limit;

    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}pokemon?limit=${limit}&offset=${offset}`
      );
      const data = response.data.results;

      const promises = data.map(async (pokemon: any) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      });
      const allPokemonLimitedData = await Promise.all(promises);
      setPokemonDataLimited(allPokemonLimitedData);
    } catch (error) {
      console.error('Error fetching limited pokemon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLimitedPokemonData();
  }, [currentPage]);

  const fetchallPokemonData = useCallback(async () => {
    const baseUrl = 'https://pokeapi.co/api/v2/';

    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}pokemon?limit=1025`);
      const data = response.data.results;

      const promises = data.map(async (pokemon: any) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      });
      const allPokemonData = await Promise.all(promises);
      setAllPokemonData(allPokemonData);
      setFilteredPokemonData(allPokemonData);
    } catch (error) {
      console.error('Error fetching all pokemon data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchallPokemonData();
  }, [fetchallPokemonData]);

  const handleFilterChange = (filter: string) => {
    if (filter.trim() !== '') {
      const filteredData = allPokemonData.filter((pokemon) =>
        pokemon.name.includes(filter.toLowerCase())
      );
      setFilteredPokemonData(filteredData);
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading size='4xl' fontSize={50} style={styles.title} marginTop={8}>
          PokéList
        </Heading>
        <View lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
        <View>
          <FilterPokeList onFilterChange={handleFilterChange} />
        </View>
        <View>
          {loading ? (
            <View>
              <Spinner size='lg' />
            </View>
          ) : (
            <View>
              <RenderPokeGrid
                pokemon={
                  filterActive ? filteredPokemonData : pokemonDataLimited
                }
              />
            </View>
          )}
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020629',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
