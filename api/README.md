# API documentation

🔒 - Route Protected

## /api/login
| **Route** | **GET** | **PUT** | **PATCH** | **POST** | **DELETE** |
|-----------------|--------|--------|--------|--------|--------|
| /api/login | - | - | - | **Body {email: '', password: ''}**<br /> Returns JWT token. | - |

## /api/posts
| **Route** | **GET** | **PUT** | **PATCH** | **POST** | **DELETE** |
|-----------------|--------|--------|--------|--------|--------|
| /api/posts?skip=**x**&limit=**y** | Returns posts with optional limit and skip params | - | - | 🔒 Adds a new post and returns it's object | - |
| /api/posts/**:postId** | Returns a post of id **:postId** | - | 🔒 Updates post of id **:postId** | - | 🔒 Deletes post of id **:postId** |

## /api/users
| **Route** | **GET** | **PUT** | **PATCH** | **POST** | **DELETE** |
|-----------------|--------|--------|--------|--------|--------|
| /api/users/**:username** | Returns a user of username **:username** | - | - | - | - |
| /api/users/**:username**/posts?skip=**x**&limit=**y** | Returns user's posts with optional limit and skip params | - | - | - | - |

## /api/pages
| **Route** | **GET** | **PUT** | **PATCH** | **POST** | **DELETE** |
|-----------------|--------|--------|--------|--------|--------|
| /api/pages?header=**true\|false**&footer=**true\|false** | Returns custom pages with optional header or footer params | - | - | - | - |
| /api/pages/**:name** | Returns a custom page of name **:name** | 🔒 Adds page from JSON payload with name **:name** | 🔒 Updates page of name **:name** | - | 🔒 Deletes page of name **:name** |
