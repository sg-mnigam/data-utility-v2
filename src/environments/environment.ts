// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://restapi.adequateshop.com',
  OKTA_BASE_URL: 'https://safeguard-dev.oktapreview.com/oauth2/aus2o902flb3fHbRi1d7',
  OKTA_CLIENT_ID :'0oa6961qs4MgKAhx01d7',
  OKTA_SCOPE :['openid', 'profile', 'email'],

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
