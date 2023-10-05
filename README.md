# Northcoders News API

Welcome to the **Northcoders News API** - your central hub for the latest news articles and discussions!

🌐 **Hosted Version**: [https://backend-news-api-ozzycf.onrender.com](https://backend-news-api-ozzycf.onrender.com)

## Overview

The Northcoders News API is a RESTful API designed to deliver news articles to its users, providing a platform for readers to engage with the content through comments. Whether you're a developer or a company, this API offers a modern solution for news integration.

## Getting Started

### Prerequisites

- **Node.js** (v14.0 or later)
- **PostgreSQL** (v12.0 or later)

### Dependencies & DevDependencies

Your project relies on several dependencies and devDependencies. You can find detailed information and documentation for each by following the links provided:

**Dependencies**:

- [dotenv](https://www.npmjs.com/package/dotenv) (v16.3.1)
- [express](https://www.npmjs.com/package/express) (v4.18.2)
- [pg](https://www.npmjs.com/package/pg) (v8.7.3)
- [supertest](https://www.npmjs.com/package/supertest) (v6.3.3)

**DevDependencies**:

- [husky](https://www.npmjs.com/package/husky) (v8.0.2)
- [jest](https://www.npmjs.com/package/jest) (v27.5.1)
- [jest-extended](https://www.npmjs.com/package/jest-extended) (v2.0.0)
- [jest-sorted](https://www.npmjs.com/package/jest-sorted) (v1.0.14)
- [pg-format](https://www.npmjs.com/package/pg-format) (v1.0.4)

### Installation & Setup

1. **Clone the Repository**:
   `git clone https://github.com/OzzyCF/backEnd-news-api.git`

2. **Navigate to the Repository Folder**:
   `cd backEnd-news-api`

3. **Install Dependencies**:
   `npm install`

## Database Initialization

Our API offers a smooth database initialization process:

- **`seed.js`**: Sets up your database tables with the right schema.
- **`run-seed.js`**: Channels data from the development seed database to `seed.js` for population.

### Setting Up Environment Variables

For local setup, set your environment variables:

1. **Create Environment Files**: After cloning, create `.env.development` and `.env.test` in the root.

2. **Development Configuration**: In `.env.development`, add:
   `PGDATABASE=nc_news`

3. **Testing Configuration**: In `.env.test`, add:
   `PGDATABASE=nc_news_test`

🚫 **Note**: Do not commit `.env.*` files.

### Running Tests

Check everything with:
`npm test`

## API Endpoints

Explore a variety of endpoints with the Northcoders News API:

| Method | Endpoint                           | Description                                      |
| ------ | ---------------------------------- | ------------------------------------------------ |
| GET    | /api                               | List of all available endpoints.                 |
| GET    | /api/topics                        | All topics.                                      |
| GET    | /api/articles                      | All articles.                                    |
| GET    | /api/articles/:article_id          | Specific article by ID.                          |
| GET    | /api/articles/:article_id/comments | Comments for a specific article by ID.           |
| GET    | /api/users                         | All users.                                       |
| POST   | /api/articles/:article_id/comments | Post a comment for a specific article by its ID. |
| PATCH  | /api/articles/:article_id          | Update votes for a specific article by its ID.   |
| DELETE | /api/comments/:comment_id          | Delete a specific comment by its ID.             |

## Feedback

Your feedback enriches our API! Please [open an issue](https://github.com/OzzyCF/backEnd-news-api/issues) for bugs or feature requests.

## Acknowledgments

Special thanks to Northcoders for their continuous support and guidance during the development of this API.
(https://northcoders.com/)

---

💌 Made with passion by [Oswaldo Colon ](https://www.linkedin.com/in/oswaldo-colon-a87513162/)
