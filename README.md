# Install CLI
`npm install -g react-native-cli`

# Install packages
`npm install`

# Run in android
`react-native run-android`


# View devices
`adb devices`
# Type annotations can only be used in TypeScript files.ts(8010) on React-Native CLI Startup
Set "javascript.validate.enable": false in your VS Code settings.

If you sure the module exists, try these steps:
Clear Watchman watches: watchman watch-del-all
Delete node_modules and run yarn install
Reset Metro's cache: yarn start --reset-cache
Remove the cache: rm -rf /tmp/metro-*