# Docs

## Authentication API

### Register

**Endpoint:** `POST /register`

**Description:** Registers a new user and generates a JWT token.

**Request:**

```json
{
  "username": "user",
  "password": "strongpassword"
}
```

**Response (201 Created):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...",
  "username": "user"
}
```

### Login

**Endpoint:** `POST /login`

**Description:** Logs in a user and generates a JWT token.

**Request:**

```json
{
  "username": "user",
  "password": "strongpassword"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...",
  "username": "user"
}
```

**Error Response (401 Unauthorized):**

```json
{
  "error": "invalid username or password"
}
```
