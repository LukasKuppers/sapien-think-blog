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
        "thumbnail": <optional | link to article image>
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
  "data": {
    "id": <unique article id>, 
    "title": <article title>, 
    "date": <article publish (creation) date>
    "subtitle": <optional | article subtitle>, 
    "thumbnail": <optional | link to article image>
  }, 
  "content": <Article content in markdown format>
}
```

> [!WARNING]
> `GET /api/articles/{id}` should not be used for building static blog content - as it could incurr hosting costs if the blog is getting built frequently (with many articles). Instead, directly access firestore for UI builds.

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
  "data": {
    "id": <unique article id: ex: "article-title">, 
    "title": <article title>, 
    "subtitle": <optional | subtitle>
    "thumbnail": <optional | link to article image>
  }, 
  "content": <markdown containing article content>
}
```

### Returns:
- 201 - if the article was created.
- 200 - if an existing article was updated.

## Delete Article by ID

`DELETE /api/articles/{id}`

Permanently deletes article with unique identifier `id`, if it exists.

### Returns:
- 200 - if the article was found and deleted.
- 404 - if no such article exists.
