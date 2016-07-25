# mypage-to-ics

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Import an Apple MyPage schedule to your calendar.

This script generates and downloads an ICS file locally. **No privacy issues!**

**Compatibility**: This has only been tested with the latest versions of Safari
  on OS X and iOS.

## Installation

Add `bookmarklet.js` as a bookmark:

1. View [bookmarklet.js][bookmarklet].
2. Select all (⌘+A) and drag the contents to your bookmarks bar.
3. Rename it to something useful (e.g. "Import Schedule").

## Usage

1. Navigate to MyPage Schedule.
2. Select the week to import on the calendar.
3. Open the bookmarklet (remember, it's a bookmark). The ICS file will download.

**Note**: If using on OS X, the file will be named "Unknown" with no extension.
  Manually add "`.ics`" to the filename to turn it into an ICS file.

## Known Issues

* **Safari on iOS displays "Download Failed" message.**

  Ignore this message; this does not affect importing the schedule. Safari on
  iOS has strict file management.

If you encounter any other issue, please open a new [issue][issues] with a
description.

[bookmarklet]: https://raw.githubusercontent.com/angeloashmore/mypage-to-ics/master/bookmarklet.js
[issues]: https://github.com/angeloashmore/mypage-to-ics/issues
