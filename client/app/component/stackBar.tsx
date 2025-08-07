import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  LayoutChangeEvent,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import styles from "../styles/stackBarStyles";

const chartConfig = {
  backgroundGradientFrom: "#e0f7fa",
  backgroundGradientTo: "#b2ebf2",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.6,
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: "#ccc",
  },
  propsForLabels: {
    fontSize: 8,
  },
};

type Props = {
  data: {
    property_name: string;
    request_count: number;
  }[];
};

export default function StackBar({ data }: Props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // ⛔️ DO NOT return early before hooks

  // Shorten labels to max 8 chars (avoid clutter)
  const labels = data.map((item) =>
    item.property_name.length > 8
      ? item.property_name.slice(0, 8) + "…"
      : item.property_name
  );
  const values = data.map((item) => item.request_count);

  const barWidth = 60;
  const chartWidth = Math.max(labels.length * barWidth, containerWidth);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [labels, values]);

  if (!data || data.length === 0) {
    return (
      <View onLayout={onLayout} style={styles.container}>
        <Text style={styles.chartTitle}>🏘️ Requests per Property</Text>
        <Text style={styles.noDataText}>No request data available.</Text>
      </View>
    );
  }

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Text style={styles.chartTitle}>🏘️ Requests per Property</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingHorizontal: 12 }}
        ref={scrollViewRef}
      >
        <BarChart
          data={{
            labels,
            datasets: [{ data: values }],
          }}
          width={chartWidth}
          height={280}
          chartConfig={chartConfig}
          fromZero
          verticalLabelRotation={0}
          yAxisLabel=""
          yAxisSuffix=""
          showBarTops
          withHorizontalLabels
          withInnerLines
          withVerticalLabels
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
}

