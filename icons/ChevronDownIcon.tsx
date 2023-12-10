import React from "react"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function ChevronDownIcon({ fill = "#2C55BE" }: IconsProps) {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				d="M13 6L8 11L3 6"
				stroke={fill}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}
