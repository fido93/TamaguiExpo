import { useLocalSearchParams } from 'expo-router';

import DetailsPage from '~/components/DetailsPage';
import { MediaType } from '~/interfaces/apiresults';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id file', id);
  return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};

export default Page;
