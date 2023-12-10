import React from "react"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function BookingsIcon({ fill = "#7E869A" }: IconsProps) {
	return (
		<Svg width="24" height="24" viewBox="0 0 28 28" fill="none">
			<Path
				d="M8.66667 7.33333V2M19.3333 7.33333V2M7.33333 12.6667H20.6667M4.66667 26H23.3333C24.8061 26 26 24.8061 26 23.3333V7.33333C26 5.86057 24.8061 4.66667 23.3333 4.66667H4.66667C3.19391 4.66667 2 5.86057 2 7.33333V23.3333C2 24.8061 3.19391 26 4.66667 26Z"
				stroke={fill}
				strokeWidth="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}
