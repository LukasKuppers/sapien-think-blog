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

## Integrations

### OpenAI API:
The article generation jobs makes requests to the openAI API to generate article data. Requests are billed at approximately `$0.004 USD` per request. As such, caution should be employed when generating content.

Requests to OpenAI are authorized with a secret key, which can no longer be revealed from the admin dashboard. However, if a key is lost, new keys can be generated in the [dashboard](https://platform.openai.com/account/api-keys).

> [!WARNING]
> Automated token refills are currently disabled! At some point you may need to pay for more tokens, or enable automated refills.

### Unsplash API:
Requests are made to the Unsplash API to get image data for articles. In order to use Unsplash images in the frontend, the following checklist should be met: [unspalsh api app info](https://unsplash.com/oauth/applications/507939#api-app-info-card).

Also, API keys can be accessed and generated at the same dashboard link above.

> Note: If the app is not approved for production, a rate limit of maximum 50 requests/day applies.
