import React from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

interface RadialCircleProps {
  first_color: string
  second_color: string
  third_color: string
}
export function RadialCircle({
  first_color,
  second_color,
  third_color
}: RadialCircleProps) {
  return (
      <Svg height="160px" width="160px" >
        <Defs>
          <RadialGradient
            id="grad"
            cx="79.38%"
            cy="28.12%"
            rx="71.87%"
            ry="71.87%"
            fx="79.38%"
            fy="28.12%"
          >
            <Stop offset="0%" stopColor={first_color} stopOpacity="1" />
            <Stop offset="50.75%" stopColor={second_color} stopOpacity="1" />
            <Stop offset="100%" stopColor={third_color} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Circle cx="80" cy="80" r="80" fill="url(#grad)" />
      </Svg>
  );
}
