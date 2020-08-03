import React from "react";
// import Animated from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },

  footerTitle: {
    fontFamily: "SFProText-SemiBold",
    fontSize: 22,
    color: "#0C0D34",
    lineHeight: 30,
    marginBottom: 12,
  },
  footerDesc: {
    fontFamily: "SFProText-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#0C0D34",
    textAlign: "center",
    marginBottom: 40,
  },
});

interface SubslideProps {
  footerTitle: string;
  footerDesc: string;
  last?: boolean;
  onPress: () => void;
  //   x: Animated.Node<number>;
}

const Subslide = ({
  footerTitle,
  footerDesc,
  last,
  onPress,
}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerTitle}>{footerTitle}</Text>
      <Text style={styles.footerDesc}>{footerDesc}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        {...{ onPress }}
      />
    </View>
  );
};

export default Subslide;
