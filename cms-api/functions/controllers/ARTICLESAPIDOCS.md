# Articles API Documentation

REST API to interface with articles DB.

## Authorization:

Every request must include the `api-key` header, which includes a valid api-key.

#

Endpoints:
- [GET /api/articles](#list-all-articles)
- [GET /api/articles/{id}](#get-article-by-id)
- [POST /api/articles](#createupdate-article)
- [DELETE /api/articles/{id}](#delete-article-by-id)

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

> Note: image field is optional - some articles may not include images

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

> Note: image object is optional - articles need not include images

### Returns:
- 201 - if the article was created.
- 200 - if an existing article was updated.

## Delete Article by ID

`DELETE /api/articles/{id}`

Permanently deletes article with unique identifier `id`, if it exists.

### Returns:
- 200 - if the article was found and deleted.
- 404 - if no such article exists.
