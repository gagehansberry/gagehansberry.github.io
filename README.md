# gagehansberry.github.io

Privacy policies and support pages for my iOS apps, published with GitHub Pages
at [gagehansberry.github.io](https://gagehansberry.github.io).

## Apps

| App | Privacy policy | Support |
| --- | --- | --- |
| Cream | [cream/privacy](https://gagehansberry.github.io/cream/privacy/) | [cream/support](https://gagehansberry.github.io/cream/support/) |
| Clicker | [tv-remote/privacy](https://gagehansberry.github.io/tv-remote/privacy/) | [tv-remote/support](https://gagehansberry.github.io/tv-remote/support/) |
| Sanitize | [clean-share/privacy](https://gagehansberry.github.io/clean-share/privacy/) | [clean-share/support](https://gagehansberry.github.io/clean-share/support/) |

## Structure

```
index.html            home page: what these apps are, and links to each
style.css             shared styles (light and dark)
<app>/privacy/        the app's privacy policy
<app>/support/        the app's support page
```

A folder is named for what the app does, not its display name, when the name
may still change: `tv-remote/` is Clicker's. Apps link to these URLs from inside
the build, so a folder is never renamed once a build points at it.

Each app has its own privacy policy describing that app's data handling. When
an app's data handling changes, its policy is updated before that version is
released, and the effective date at the top of the policy changes with it.
