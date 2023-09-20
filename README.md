# Sapien-Think

https://sapienthink.com is a blog dedictated to philosophy topics, with a general focus on philosophy books and history.

## About the App
Sapien-think is built with NEXT.js, and pages are statically generated. See the `nextjs-app` directory for details on the front-end application.

Articles are stored via a custom CMS solution. An express API is responsible for uploading and fetching articles. See the `cms-api` directory for details.

See the [api docs](./cms-api/functions/controllers/ARTICLESAPIDOCS.md).

## Deployments

### Next.js App
The frontend application is currently deployed via [vercel](https://vercel.com/lukaskuppers/sapien-think-blog/settings/general). 

The `prod` branch is continuously deployed. **Only push production ready code to prod!!**

### CMS API
The custom CMS solution is hosted on Firebase. Run the following command from `~/cms-api` to deploy the API to prod:

```
firebase deploy --only functions
```
