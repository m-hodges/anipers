import React, { useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Layout,
  Colors,
  statusBarHeight,
  menuBarHeight,
  referencesFilePath,
  WindowHeight,
  WindowWidth,
  Fonts,
} from 'src/constants';
import TopNav from '../search/TopNav';
import AppContext from 'src/AppContext';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types';
import FastImage from 'react-native-fast-image';
import ImmersiveMode from 'react-native-immersive-mode';

type NavigationProps = StackNavigationProp<RootStackParamList, 'thumbnails'>;

const Collections = () => {
  const navigation = useNavigation<NavigationProps>();

  const { savedImages } = useContext(AppContext);
  const flatListRef = useRef(null);

  useEffect(() => {
    ImmersiveMode.setBarMode('Normal');
  }, []);

  return (
    <View style={styles.container}>
      <TopNav folderActive />
      <View style={styles.subContainer}>
        {savedImages.size ? (
          <FlatList
            data={[...savedImages.values()]}
            renderItem={(el) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('wallpaper', {
                      image: el.item,
                      type: 'saved',
                    });
                  }}>
                  <FastImage
                    source={{
                      uri: el.item.cropped_file_url
                        ? el.item.cropped_file_url
                        : el.item.file_url,
                      priority: FastImage.priority.high,
                    }}
                    style={[styles.image]}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            keyExtractor={(item) => item.file_url}
            style={styles.listContainer}
            contentContainerStyle={styles.listContainerFlexPositioning}
            ref={flatListRef}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Text style={Fonts.regular}>
              When you save an image it will appear here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  container: {
    ...Layout.pageContainer,
    backgroundColor: Colors.background,
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: statusBarHeight + menuBarHeight,
    paddingBottom: 15,
    position: 'relative',
    zIndex: 1,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: menuBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 5,
    width: WindowWidth,
  },
  listContainerFlexPositioning: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: WindowHeight / 3.25,
    width: WindowWidth / 3.25,
    margin: 2,
  },
});
