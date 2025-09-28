fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios release

```sh
[bundle exec] fastlane ios release
```

Build and export IPA for App Store

### ios upload

```sh
[bundle exec] fastlane ios upload
```

Build and upload to App Store Connect

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Build for TestFlight distribution

### ios adhoc

```sh
[bundle exec] fastlane ios adhoc
```

Build Ad Hoc distribution

### ios clean

```sh
[bundle exec] fastlane ios clean
```

Clean build and derived data

### ios development

```sh
[bundle exec] fastlane ios development
```

Build development IPA with automatic signing

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
