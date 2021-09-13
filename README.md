# Install CLI
`npm install -g react-native-cli`

# Install packages
`npm install`

# RUN ANDROID
`npx react-native run-android`
or
`react-native start`

# No Apps Connecting
  # Reset metro bundler cache : 
  `npx react-native start --reset-cache`
      
  # Remove Android assets cache : 
  `cd android && ./gradlew clean`
      
  # Relaunch metro server : 
  `npx react-native run-android`
# View devices
`adb devices`

# Async storage
https://react-native-async-storage.github.io/async-storage/docs/usage

# Type annotations can only be used in TypeScript files.ts(8010) on React-Native CLI Startup
1. Set "javascript.validate.enable": false in your VS Code settings.

# If you sure the module exists, try these steps:
1. Clear Watchman watches: `watchman watch-del-all`
2. Delete node_modules and run `yarn install`
3. Reset Metro's cache: `yarn start --reset-cache`
4. Remove the cache: `rm -rf /tmp/metro-*`

# Watchman
https://github.com/facebook/watchman/releases/tag/v2020.08.17.00


## BUILD BUNDLE
`./gradlew bundleRelease`

## Build APK
`./gradlew assembleRelease`

## Build to Production
https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51

## RUN DEVICE ID
`react-native run-android --deviceId DEVICEID`

`npm start -- --reset-cache`

watchman watch-del-all && rm -rf $TMPDIR/react-native-packager-cache-* &&
rm -rf $TMPDIR/metro-bundler-cache-* && rm -rf node_modules/ && npm cache clean --force &&
npm install && npm start -- --reset-cache