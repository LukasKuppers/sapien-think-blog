# Content Management System API

Articles for the `sapien-think` blog are hosted via a custom CMS solution hosted on firebase.

See `cms-api/firebase.json` for config deteails.

See the [api docs](./functions/controllers/ARTICLESAPIDOCS.md).

The API runs on an express app, initialized in `cms-api/functions/index.js`.

## Useful Commands

Run all commands from `~/cms-api`

Emulate the functions on your local machine:

```
firebase emulators:start
```

Deploy to prod:

```
firebase deploy --only functions
```
