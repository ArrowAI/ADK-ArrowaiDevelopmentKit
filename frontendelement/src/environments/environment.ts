// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	FACEBOOK_GRAPH: "https://graph.facebook.com/v3.2",
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	firebase: {},
	N8N_SERVER:"http://localhost:5678/rest",
	INTERACTION_ENGINE: 'https://interaction.arrowai.in',
	SOCKET_SERVER: "https://interaction-staging.arrowai.in",
	CONSOLE_URL: 'https://console.arrowai.in',
	DREAM_FACTORY_URL: 'https://api.arrowai.in/api/v2/chat_developer',
	API_SERVER: 'https://apiserver.arrowai.in',
	API_SERVER_LOCAL: 'https://apiserver.arrowai.in',
	AIHR_SERVER: "https://aihr.arrowai.in",
	CHAT_ENGINE: "https://chatengine-staging.arrowai.in",
};

///chats/app/clear/fast/bots?botId=5e78c41d4fbc350d00000001


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
