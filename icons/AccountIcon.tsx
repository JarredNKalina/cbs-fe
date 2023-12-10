import React from "react"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function AccountIcon({ fill = "#7E869A" }: IconsProps) {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 26" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 10.2857C14.8404 10.2857 17.1429 7.98317 17.1429 5.14286C17.1429 2.30254 14.8404 0 12 0C9.15969 0 6.85714 2.30254 6.85714 5.14286C6.85714 7.98317 9.15969 10.2857 12 10.2857ZM0 25.7143C0 19.0869 5.37259 13.7143 12 13.7143C18.6274 13.7143 24 19.0869 24 25.7143H0Z"
				fill={fill}
			/>
		</Svg>
	)
}
