# Articles API Documentation

REST API to interface with articles DB.

## Authorization:

Every request must include the `api-key` header, which includes a valid api-key.

#

Endpoints:
- [POST /api/generate](#generate-article)
- [GET /api/articles](#list-all-articles)
- [GET /api/articles/{id}](#get-article-by-id)
- [POST /api/articles](#createupdate-article)
- [DELETE /api/articles/{id}](#delete-article-by-id)

## Generate Article

`POST /api/generate`

Generate an article and upload it to firestore. Also triggers a next.js revalidation of the article.

Article Names are fetched from [airtable](https://airtable.com/app9vAZn1T7YBq027/tbl7CnjcIArSJU3vj/viw30TBH8i1srD6pZ?blocks=hide). In airtalbe, keywords with status `done` or `ignore` will be ignored. Keywords that should be used to generate articles should have status `pending`. The keyword status will automatically be updated to `done` if article generation is successful.

## List All Articles

`GET /api/articles`

Get a list of all articles in the DB.

Returns a JSON text body in the following format:
```
{
  "articles": [
    {
      "params": {
        "id": <article unique id>, 
        "title": <article title>,
        "date": <article publish (creation) date> 
        "subtitle": <optional | article subtitle>, 
        "thumbnail_link": <optional | link to article thumbnail image>
      }
    }, 
    ...
  ]
}
```

### Filter List by Tags

It is possible to filter the list of returned articles by tags. To do this, supply a list of desired tags in the query parameters. Then, any returned articles will have at least one tag matching one of the supplied tags.

**Modified Request:**

`GET /api/articles?tags[]=tag1&tags[]=tag2...`

The return format will be the same, but only matching articles will be included.

### Returns:
- 200 - if the articles were fetched successfuly.

## Get Article by ID

`GET /api/articles/{id}`

Get the article content with unique identifier `id`, if it exists.

Returns a JSON text body in the following format:
```
{
  "metadata": {
    "id": <unique article id>, 
    "title": <article title>, 
    "date": <article publish (creation) date>
    "subtitle": <optional | article subtitle>, 
  }, 
  "tags": [
    "tag1", "tag2", ...
  ], 
  "image": {
    "regular_link": <the link used to display the full image>, 
    "thumbnail_link": <the link used to display the thumbnail image>
    "alt_text": <text description of the image>
    "download_link": <link used to trigger a download event>
    "photographer_username": <unsplash username of photographer>
    "photographer_name": <real photographer name>
  }, 
  "content": <Article content in markdown format>
}
```

> Note: Tags array and image object are optional - not every article contains tags and images.

### Returns:
- 200 - if the article was found and sent.
- 404 - if the article with `id` does not exist.

## Create/Update Article

`POST /api/articles`

Create a new article, or update an existing article if an article with the same ID already exists.

### Request body:
Accepts a JSON text body containing the article data.

Required JSON format:
```
{
  "metadata": {
    "id": <unique article id>, 
    "title": <article title>, 
    "subtitle": <optional | article subtitle>, 
  }, 
  "tags": [
    "tag1", "tag2", ...
  ], 
  "image": {
    "regular_link": <the link used to display the full image>, 
    "thumbnail_link": <the link used to display the thumbnail image>
    "alt_text": <text description of the image>
    "download_link": <link used to trigger a download event>
    "photographer_username": <unsplash username of photographer>
    "photographer_name": <real photographer name>
  }, 
  "content": <Article content in markdown format>
}
```

> Note: tags array and image object are optional.

### Returns:
- 201 - if the article was created.
- 200 - if an existing article was updated.

## Delete Article by ID

`DELETE /api/articles/{id}`

Permanently deletes article with unique identifier `id`, if it exists.

### Returns:
- 200 - if the article was found and deleted.
- 404 - if no such article exists.
