### firefox-bug

This repo is a reproducible case in Firefox where a [Link header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) containing a list of links is squashed in the cache to only the serve the last entry when the if-match hits and server returns 304.

### Environment
- Firefox v88.0.1 (64-bit)
- macOS 11.2.3 (and others)

### Run it
```sh
yarn && yarn start
```

Toggling cache to disabled will show the correct (3) link entries.
Toggling cache to enabled will show only the last link entry for the second request, and any subsequent request once cached.

Open Firefox to http://localhost:2337