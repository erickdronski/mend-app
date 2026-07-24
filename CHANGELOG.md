# Changelog

All notable changes to Mend are documented in this file. The project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A positioning regression test for universal product surfaces.
- A five-chapter progress map with overall completion, current-chapter work,
  shared pulse movement, and direct access to earned milestones.
- Compact chapter and overall-progress context on the Today screen's next step.
- Journey progress tests that prevent future chapters or one partner's private
  pulse from inflating shared progress.

### Changed

- Reframed the default experience around relationship connection, growth,
  understanding, and alignment while preserving direct repair and safety tools.
- Renamed journey stages and discovery sections to support relationships in
  everyday growth as well as difficult seasons.
- Updated maintained translations and product documentation to match the broader
  relationship-improvement promise.

### Fixed

- Restored Expo SDK 57-compatible native dependency versions after unsupported
  automated upgrades caused the app to crash at launch in Expo Go.
- Restored the AsyncStorage API used by the SDK-compatible native module.

## [1.0.0-beta.1] - 2026-07-23

### Added

- Initial public engineering baseline for the Expo and React Native application.
- Automated verification for source, safety contracts, and Expo configuration.
- Manual, environment-gated TestFlight build and submission workflow.

[Unreleased]: https://github.com/erickdronski/mend-app/compare/v1.0.0-beta.1...HEAD
[1.0.0-beta.1]: https://github.com/erickdronski/mend-app/releases/tag/v1.0.0-beta.1
