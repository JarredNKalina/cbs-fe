module.exports = {
	name: "Columbiana Barber Shop",
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
	runtimeVersion: "1.0.0",
}
