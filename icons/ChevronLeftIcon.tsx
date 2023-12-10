import React from "react"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function ChevronLeftIcon({ fill = "#2C55BE" }: IconsProps) {
	return (
		<Svg width="24" height="24" viewBox="0 0 16 16" fill="none">
			<Path
				d="M10.5 13L5.5 8L10.5 3"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke={fill}
			/>
		</Svg>
	)
}
