import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import { styles } from '../styles/lineChartStyles';

type ListingsChartProps = {
  labels: string[];
  data: number[];
};

export default function ListingsChart({ labels, data }: ListingsChartProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Auto-scroll to latest data (end)
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [labels, data]);

  // Shorten labels to MM/DD format
  const shortenedLabels = labels.map(label =>
    label.length >= 10 ? label.slice(5) : label
  );

  // Chart width grows with data points
  const pointWidth = 60;
  const chartWidth = Math.max(shortenedLabels.length * pointWidth, containerWidth);

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={900}
      delay={300}
      style={styles.chartContainer}
      onLayout={onLayout}
    >
      <Text style={styles.chartTitle}>
        📈 Property Listings Over Last 30 Days
      </Text>

      {containerWidth > 0 && (
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          <LineChart
            data={{
              labels: shortenedLabels,
              datasets: [
                {
                  data,
                  color: () => '#0288d1',
                  strokeWidth: 2,
                },
              ],
            }}
            width={chartWidth}
            height={280}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#f0f8ff',
              backgroundGradientTo: '#e1f5fe',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(2, 136, 209, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#ffffff',
              },
              propsForBackgroundLines: {
                strokeDasharray: '4',
                stroke: '#cfd8dc',
              },
              fillShadowGradient: '#0288d1',
              fillShadowGradientOpacity: 0.2,
              propsForLabels: {
                fontSize: 8,
              },
            }}
            bezier
            style={{
              borderRadius: 12,
              marginLeft: 12,
            }}
            withInnerLines
            withOuterLines={false}
            withDots
            withShadow
            withHorizontalLabels
            withVerticalLabels
          />
        </ScrollView>
      )}
    </Animatable.View>
  );
}
