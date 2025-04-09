import Animated from 'react-native-reanimated';
import { Link } from 'expo-router';
import { Card, Image, Paragraph, Text, YStack } from 'tamagui';
import { ResultItem } from '~/interfaces/apiresults';

type MovieCardProps = {
  movie: ResultItem;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`/(drawer)/home/${movie.media_type === 'movie' ? 'movie' : 'tv'}/${movie.id}` as any}
      asChild>
      <Card
        elevate
        backgroundColor="#15334a"
        width={150}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation="bouncy">
        <Card.Header p={0}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={{ width: 150, height: 190, margin: 0 }}
            alt={movie.title}
            sharedTransitionTag="tag"
          />
        </Card.Header>
        <Card.Footer>
          <YStack px={5} pb={20}>
            <Text fontSize={18} color="white" fontWeight="bold">
              {(movie.title || movie.name)?.split(' ').length > 3
                ? (movie.title || movie.name).split(' ').slice(0, 3).join(' ') + '...'
                : movie.title || movie.name}
            </Text>
            <Paragraph color={'#fff'} fontSize={14} fontWeight="bold">
              {new Date(movie.release_date || movie.first_air_date).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default MovieCard;
