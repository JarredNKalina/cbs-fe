module.exports = {
	name: "CBS App",
	version: "1.0.0",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	assetBundlePatterns: ["**/*"],
	extra: {
		clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
		eas: {
			projectId: "d5a6c68d-aaf9-4661-a59f-953b0559a71c",
		},
	},
	android: {
		package: "com.jarredkalina.columbianabarbershop",
	},
	ios: {
		bundleIdentifier: "com.jarredkalina.columbianabarbershop",
	},
	runtimeVersion: "1.0.0",
}
