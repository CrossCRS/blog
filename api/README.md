# API documentation

## /api/posts
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/posts/?skip=**x**&limit=**y** | Returns posts with optional limit and skip params | - | - |

## /api/post
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------|-------------------|----------------------------|
| /api/post/info | Returns page count and post count | - | - |
| /api/post/**:postId** | Returns a post of id **:postId** | - | - |