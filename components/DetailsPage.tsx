import { useQuery } from '@tanstack/react-query';
import { ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { H1, Main, ScrollView, YStack, Text, Paragraph } from 'tamagui';
import { MediaType } from '~/interfaces/apiresults';
import { getMovieDetails } from '~/services/api';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return (
    <Main>
      <ScrollView>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}` }}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}` }}
            style={{ width: 200, height: 300, margin: 10 }}
            sharedTransitionTag="tag"
          />
        </ImageBackground>
        <YStack p={10} animation="lazy" enterStyle={{ opacity: 0, y: 10 }}>
          <H1 color="$blue10">{movieQuery.data?.title || movieQuery.data?.name}</H1>
          <Text fontSize={16}>(2023)</Text>
          <YStack mt={10}>
            <Paragraph theme="alt2">{movieQuery.data?.tagline}</Paragraph>
            <Text fontSize={16}>{movieQuery.data?.overview}</Text>
          </YStack>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
