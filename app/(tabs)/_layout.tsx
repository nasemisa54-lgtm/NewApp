import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import AppContext from '@/hooks/AppContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';

export default function TabLayout() {
  const { user } = useContext(AppContext)
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) =>
            <Entypo name="shopping-cart" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ color }) =>
            <FontAwesome5 name="user-cog" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="oreders"
        options={{
          // href: user?.isAdmin ? '/oreders' : null,
          tabBarIcon: ({ color }) =>
            <AntDesign name="menu-fold" size={24} color={color} />,
        }}
      />
    </Tabs>
  );

}
