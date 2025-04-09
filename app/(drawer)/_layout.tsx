import Ionicons from '@expo/vector-icons/Ionicons';
import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerlableStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'MovieStar',
          headerShown: false,
          drawerIcon: ({ color, size }: any) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }: any) => <Ionicons name="star" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
