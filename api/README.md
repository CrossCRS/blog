# API documentation

## /api/login
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/login | - | **Body {email: '', password: ''}**<br /> Returns JWT token. | - |

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

## /api/pages
| **Route** | **GET** | **POST** | **DELETE** |
|-----------------|----------------------------------------------------|------|--------|
| /api/pages?header=**true\|false**&footer=**true\|false** | Returns custom pages with optional header or footer params | - | - |
| /api/pages/**:name** | Returns a custom page of name **:name** | - | - |
