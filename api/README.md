# API documentation

## /api/posts
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/posts | Returns page count and post count | - | - |
| /api/posts/**:page** | Returns **ITEMS\_PER\_PAGE** amount of posts at page **:page**| - | - |

_**ITEMS\_PER\_PAGE** defined in controllers/post.controller.js_

## /api/post
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------|-------------------|----------------------------|
| /api/post/**:postId** | Returns a post of id **:postId** | - | - |