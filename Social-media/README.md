# Smalltalk frontend

Smalltalk is a React frontend for a community feed. It includes searchable and
sortable posts, a post composer, topic insights, and a persisted light/dark
theme.

## Run locally

```sh
npm install
npm run dev
```

Run the production build and lint checks with `npm run build` and `npm run lint`.

## Frontend-only preview

The app currently uses `src/services/posts-api.js`, a local mock service that
persists posts in browser `localStorage`. The first visit seeds the feed from
`src/services/mock-posts.js`. Creating or deleting a post changes only this
browser's preview data; it does not publish to a social network or save to a
server.

To reset the preview to its original sample posts, clear the
`smalltalk.mock-posts` item from this site's browser storage.

## Backend integration contract

The UI consumes these methods from `src/services/posts-api.js`:

- `listPosts()` resolves to an array of posts.
- `createPost({ author, title, body, tags })` resolves to the created post.
- `deletePost(postId)` resolves when the post has been removed.

The expected post shape is:

```json
{
  "id": "post-id",
  "author": "Display name",
  "title": "Post title",
  "body": "Post content",
  "tags": ["topic"],
  "reactions": {
    "likes": 0,
    "dislikes": 0
  },
  "createdAt": "2026-10-12T08:30:00.000Z"
}
```

When the backend is ready, replace the implementation in `posts-api.js` with
HTTP requests while retaining these method names and data shapes. The React
components and feed state can then continue using the same interface. The API
base URL and authentication behavior can be added there to match the backend
team's agreed endpoints; no credentials or pretend login flow are included in
this frontend preview.
