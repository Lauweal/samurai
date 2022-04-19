import React from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fonts, sizes, palette } from '@samurai/design';
import { Dimensions } from 'react-native';
import { Dots } from './dot';

const { width, height } = Dimensions.get('window')

export interface IProcessItem {
  id: number;
  backgroundImage: any;
  bannerImage: any;
  title?: string | null;
  description?: string | null;
}

interface IProps {
  data: IProcessItem[];
  children?: (next: () => void, ok: boolean) => React.ReactElement;
}

const styles = StyleSheet.create({
  item: {
    width: width,
  },
  imageBox: {
    flex: 3,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  image: {
    width: height > 800 ? width * 0.8 : width * 0.7,
    height: height > 800 ? width * 0.8 : width * 0.7,
    marginBottom: -sizes.spacing_24,
  },
  recommend: {
    flex: 1,
    marginTop: sizes.spacing_24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.radius_8,
  },
  description: {
    marginTop: sizes.radius_8,
    textAlign: 'center',
    color: palette.text_2,
    paddingHorizontal: sizes.spacing_24,
  },
  footer: {
    height: 160,
  },
  dots: {
    flex: 1,
    justifyContent: 'center',
  },
});

export function Process(props: IProps) {
  const { data = [], children } = props;

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewChangeRef = React.useRef(
    (options: { viewableItems: any; changed: any }) => {
      setCurrentIndex(options.viewableItems[0].index);
    }
  );

  const onNextPress = () => {
    (flatListRef?.current as any).scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  const renderItem = (info: ListRenderItemInfo<IProcessItem>) => {
    const backgroundImageStyle = { height: info.index === 1 ? '86%' : '100%' };

    return (
      <View style={styles.item}>
        <View style={styles.imageBox}>
          <ImageBackground
            style={[styles.backgroundImage, backgroundImageStyle]}
            resizeMode="stretch"
            source={info.item.backgroundImage}
          >
            <Image
              style={styles.image}
              resizeMode="contain"
              source={info.item.bannerImage}
            />
          </ImageBackground>
        </View>
        <View style={styles.recommend}>
          <Text style={fonts.h2}>{info.item.title}</Text>
          <Text style={[styles.description, fonts.body3]}>
            {info.item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <React.Fragment>
      <Animated.FlatList<IProcessItem>
        ref={flatListRef as any}
        horizontal
        pagingEnabled
        data={data}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          <Dots scrollX={scrollX} count={data.length} />
        </View>
        {typeof children === 'function' &&
          children(onNextPress, currentIndex === props.data.length - 1)}
      </View>
    </React.Fragment>
  );
}
