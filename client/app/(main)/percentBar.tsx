import React from "react"
import { View, Text } from "react-native"
import percentBarStyles from "../styles/percentBarStyles"

type PercentBarItem = {
  label: string
  value: number
}
type PercentBarsProps = {
  data: PercentBarItem[]
  total: number
   onPress?: () => void
}

export default function PercentBars({ data, total }: PercentBarsProps) {
  return (
    <>
      {data.map((item, idx) => {
        const percent = Math.round((item.value / total) * 100)
        const fillStyles = [
          percentBarStyles.barFillBase,
          percentBarStyles[`barFill${idx}`],
        ]

        return (
          <View key={idx} style={percentBarStyles.barContainer}>
            <Text style={percentBarStyles.barLabel}>
              {item.label}: {percent}%
            </Text>
            <View style={percentBarStyles.barBackground}>
              <View style={[...fillStyles, { width: `${percent}%` }]} />
            </View>
          </View>
        )
      })}
    </>
  )
}
