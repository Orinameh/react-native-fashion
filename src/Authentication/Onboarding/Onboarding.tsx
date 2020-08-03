import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";
import Animated, { multiply } from "react-native-reanimated";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
const { width } = Dimensions.get("window");

const BORDER_RADIUS = 75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

const slides = [
  {
    label: "Relaxed",
    color: "#BFEAF5",
    footerTitle: "Find Your Outfits",
    footerDesc:
      "Confused about your outfit? Don't worry! Find the latest outfit here",
  },
  {
    label: "Playful",
    color: "#BEECC4",
    footerTitle: "Hear it First, Wear it First",
    footerDesc:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
  },
  {
    label: "Excentric",
    color: "#FFE4D9",
    footerTitle: "Your Style, Your Way",
    footerDesc:
      "Create your individual & unique style and look amazing everyday",
  },
  {
    label: "Funky",
    color: "#FFDDDD",
    footerTitle: "Look Good, Feel Good",
    footerDesc:
      "Discover the latest trends in fashion and explore your personality",
  },
];
const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);
  // TODO: scrollHandler useScrollHandler?
  const onScroll = onScrollEvent({ x });

  const backgroundColor = interpolateColor(x, {
    // inputRange: [0, width, width * 2, width * 3],
    // outputRange: ["#BFEAF5", "#BEECC4", "#FFE4D9", "#FFDDDD"],
    inputRange: slides.map((_, index) => index * width),
    outputRange: slides.map(({ color }) => color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {/* <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Eccentric" />
          <Slide label="Funky" right /> */}
          {slides.map(({ label }, i) => (
            <Slide key={i} {...{ label }} right={i % 2 !== 0} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            },
          ]}
        >
          {slides.map(({ footerTitle, footerDesc }, i) => (
            <Subslide
              key={i}
              last={i === slides.length - 1}
              {...{ footerTitle, footerDesc }}
              onPress={() => {
                if (scroll.current) {
                  scroll.current
                    .getNode()
                    .scrollTo({ x: width * (i + 1), animated: true });
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
