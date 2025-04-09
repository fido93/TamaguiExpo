import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input, Main, ScrollView, Spinner, YStack } from 'tamagui';
import MovieCard from '~/components/MovieCard';

import { getSearchResults, getTrending } from '~/services/api';
import { Container, Subtitle, Title } from '~/tamagui.config';
import useDebounce from '~/utils/useDebounce';

const Page = () => {
  const [searchString, setSearchString] = useState<string>('');
  const debouncedString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/e3h0knvtz4qPg9dwYdWynALrW9s.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color="#fff"
              marginBottom={10}
              enterStyle={{ opacity: 0, scale: 1.5, y: -10 }}
              animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              borderWidth={1}
              size="$4"
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle p={10} enterStyle={{ opacity: 0 }} animation="lazy">
        {searchQuery.data?.results ? 'Search Results' : 'Trending'}
      </Subtitle>
      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color="$blue10" py={14} />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={20}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results ? (
          <>{searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}</>
        ) : (
          <>{trendingQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}</>
        )}
      </ScrollView>
    </Main>
  );
};

export default Page;
