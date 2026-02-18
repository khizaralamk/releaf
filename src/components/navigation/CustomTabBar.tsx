import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Easing, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles/COLORS';

const TAB_LONG_PRESS = 'tabLongPress' as const;

interface TabItemProps {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  icon: (props: { color: string; focused: boolean; size: number }) => React.ReactNode;
}

const TabItem: React.FC<TabItemProps> = ({
  isFocused,
  onPress,
  onLongPress,
  accessibilityLabel,
  icon,
}) => {
  const opacity = useRef(new Animated.Value(isFocused ? 1 : 0.4)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isFocused ? 1 : 0.4,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isFocused, opacity]);

  const iconColor = isFocused ? COLORS.colors.primary : COLORS.colors.gray_400;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabItem}
      activeOpacity={0.8}>
      <Animated.View style={{ opacity }}>
        {icon({ color: iconColor, focused: isFocused, size: 20 })}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['rgba(10, 14, 20, 0)', 'rgb(0, 0, 0)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: TAB_LONG_PRESS,
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              icon={options.tabBarIcon ?? (() => null)}
            />
          );
        })}
      </View>
    </LinearGradient>
  );

};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bar: {
    flexDirection: 'row',
    height: 76,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
