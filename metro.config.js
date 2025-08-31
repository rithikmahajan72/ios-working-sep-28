const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [],
  resolver: {
    blockList: [
      /node_modules\/react-native\/ReactCommon\/.*/,
      /node_modules\/react-native\/ReactAndroid\/.*/,
      /node_modules\/react-native\/React\/Base\/.*/,
      /node_modules\/react-native\/third-party\/.*/,
      /ios\/Pods\/.*/,
      /ios\/build\/.*/,
      /android\/build\/.*/,
      /android\/\.gradle\/.*/,
    ],
  },
  watcher: {
    additionalExts: ['ts', 'tsx'],
    watchman: {
      deferStates: ['hg.update'],
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
