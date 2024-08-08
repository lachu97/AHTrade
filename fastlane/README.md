fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android generateBuild

```sh
[bundle exec] fastlane android generateBuild
```

Generate Android APK

### android incrementVersionCode

```sh
[bundle exec] fastlane android incrementVersionCode
```

Increment Version Code

### android getVersionName

```sh
[bundle exec] fastlane android getVersionName
```

Get Version Name

### android getVersionCode

```sh
[bundle exec] fastlane android getVersionCode
```

Get Version Code

### android build

```sh
[bundle exec] fastlane android build
```

Build the Android application.

### android beta

```sh
[bundle exec] fastlane android beta
```

Build and upload to App Center.

### android playstore

```sh
[bundle exec] fastlane android playstore
```

Upload App to PlayStore

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
