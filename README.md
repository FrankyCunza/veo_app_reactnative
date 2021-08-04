# Install CLI
`npm install -g react-native-cli`

# Install packages
`npm install`

# RUN ANDROID
`npx react-native run-android`
`npx react-native run-android --port 5005`
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

# Dependencies
  # Async storage
  https://react-native-async-storage.github.io/async-storage/docs/usage
  # Vector Image
  https://github.com/oblador/react-native-vector-image

# Type annotations can only be used in TypeScript files.ts(8010) on React-Native CLI Startup
1. Set "javascript.validate.enable": false in your VS Code settings.

# If you sure the module exists, try these steps:
1. Clear Watchman watches: watchman watch-del-all
2. Delete node_modules and run yarn install
3. Reset Metro's cache: yarn start --reset-cache
4. Remove the cache: rm -rf /tmp/metro-*

# Watchman
https://github.com/facebook/watchman/releases/tag/v2020.08.17.00
