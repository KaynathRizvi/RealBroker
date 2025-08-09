import React, { useState, useEffect, useRef } from 'react';
import { View, Text, LayoutChangeEvent, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable'; // For entry animations
import { styles } from '../styles/lineChartStyles';

type ListingsChartProps = {
  labels: string[]; // Dates or time labels
  data: number[];   // Corresponding numeric values
};

export default function ListingsChart({ labels, data }: ListingsChartProps) {
  const [containerWidth, setContainerWidth] = useState(0); // Width of the chart container
  const scrollViewRef = useRef<ScrollView>(null); // Ref to enable programmatic scrolling

  /**
   * 📏 Get container width when layout is calculated
   * - Useful for determining how wide the chart should be
   */
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  /**
   * 🔄 Auto-scroll to the latest data point when data or labels change
   * - Waits 100ms to ensure chart is rendered before scrolling
   */
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [labels, data]);

  /**
   * ✂️ Shorten labels for display
   * - If label is a full date string (YYYY-MM-DD), show only MM-DD
   */
  const shortenedLabels = labels.map(label =>
    label.length >= 10 ? label.slice(5) : label
  );

  /**
   * 📐 Determine chart width
   * - Chart width grows dynamically based on number of data points
   * - Ensures points are spaced evenly and not squished
   */
  const pointWidth = 60; // Width allotted per data point
  const chartWidth = Math.max(shortenedLabels.length * pointWidth, containerWidth);

  return (
    <Animatable.View
      animation="fadeInUp" // Smooth entry animation
      duration={900}
      delay={300}
      style={styles.chartContainer}
      onLayout={onLayout} // Measure container size when mounted
    >
      <Text style={styles.chartTitle}>
        📈 Property Listings Over Last 30 Days
      </Text>

      {/* Only render chart when container width is known */}
      {containerWidth > 0 && (
        <ScrollView
          horizontal // Allows horizontal scrolling for large datasets
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          <LineChart
            data={{
              labels: shortenedLabels,
              datasets: [
                {
                  data, // The data points
                  color: () => '#0288d1', // Line color
                  strokeWidth: 2, // Line thickness
                },
              ],
            }}
            width={chartWidth} // Dynamically sized chart
            height={280} // Fixed chart height
            yAxisLabel="" // No label before Y-axis numbers
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#f0f8ff',
              backgroundGradientTo: '#e1f5fe',
              decimalPlaces: 0, // No decimal places for Y values
              color: (opacity = 1) => `rgba(2, 136, 209, ${opacity})`, // Line & fill color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label text color
              propsForDots: {
                r: '5', // Dot radius
                strokeWidth: '2',
                stroke: '#ffffff',
              },
              propsForBackgroundLines: {
                strokeDasharray: '4', // Dashed grid lines
                stroke: '#cfd8dc',
              },
              fillShadowGradient: '#0288d1', // Gradient under the line
              fillShadowGradientOpacity: 0.2, // Transparency for gradient
              propsForLabels: {
                fontSize: 8, // Small font for X-axis labels
              },
            }}
            bezier // Smooth curves between points
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