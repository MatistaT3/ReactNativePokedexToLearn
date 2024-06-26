import React, { useEffect } from 'react';
import {
  FlatList,
  Box,
  Heading,
  HStack,
  Avatar,
  Text,
  VStack,
  Spacer,
} from 'native-base';

interface RenderPokeGridProps {
  pokemon: any;
}

const RenderPokeGrid: React.FC<RenderPokeGridProps> = ({ pokemon }) => {
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const itemsPerPage = 30;

  useEffect(() => {
    loadMorePokemon();
  }, [pokemon, page]);

  const loadMorePokemon = () => {
    const newPokemon = pokemon
      .slice(0, page * itemsPerPage)
      .map((pokemon: any) => ({
        id: pokemon.id,
        name: pokemon.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      }));
    setPokemonList(newPokemon);
  };

  const handleLoadMore = () => {
    if (page * itemsPerPage < pokemon.length) {
      setPage(page + 1);
    }
  };

  return (
    <Box width='100%' bg='#020629'>
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth='1'
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor='muted.800'
            py='2'
          >
            <HStack space={[2, 3]} justifyContent='space-between' width='100%'>
              <Avatar
                size='96px'
                source={{
                  uri: item.img,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'white',
                  }}
                  color='white'
                  bold
                  fontSize='lg'
                >
                  {item.name}
                </Text>
                <Text
                  color='white'
                  fontSize='lg'
                  _dark={{
                    color: 'white',
                  }}
                >
                  # {item.id}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </Box>
  );
};

export default RenderPokeGrid;
