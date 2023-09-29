
export default async function handler(req, res) {
  console.log('[/api/revalidate] Processing request to rebuild page content.');
  // check if the revalidate request is authenticated
  if (req.query.secret !== process.env.REVALIDATE_REQUEST_TOKEN) {
    console.log('[/api/revalidate] Aborting request, provided token is invalid.');
    return res.status(401).json({
      message: 'Provided token is invalid.'
    });
  }

  // get article id
  const articleId = req.query.articleId;
  if (! articleId || articleId === '') {
    console.error('[/api/revalidate] Aborting request does not provide article ID.');
    return res.status(400).json({
      error: 'article ID not provided in query parameters. Requests must include "articleId=<id>".'
    });
  }

  try {
    await res.revalidate(`/articles/${articleId}`);

    // also revalidate articles list
    await res.revalidate('/articles/list');

    console.log('[/api/revalidate] Success.')
    return res.json({
      revalidated: true
    });
  } catch (error) {
    console.error('[/api/revalidate] Encountered error when rebuilding page:', error);
    return res.status(500).json({
      error: 'Internal server error when revalidating.', 
    });
  }
}
