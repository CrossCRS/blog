# API documentation

## /api/posts
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/posts?skip=**x**&limit=**y** | Returns posts with optional limit and skip params | - | - |
| /api/posts/**:postId** | Returns a post of id **:postId** | - | - |

## /api/users
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/users/**:username** | Returns a user of username **:username** | - | - |
| /api/users/**:username**/posts?skip=**x**&limit=**y** | Returns user's posts with optional limit and skip params | - | - |
