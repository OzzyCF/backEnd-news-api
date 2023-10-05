# Northcoders News API

Welcome to the Northcoders News API, your central hub for the latest news articles and discussions!

---

**Hosted Version**: [https://backend-news-api-ozzycf.onrender.com](https://backend-news-api-ozzycf.onrender.com)

---

## Overview

Northcoders News API is a RESTful API designed to deliver news articles to its users, and provide a platform for readers to engage with the content through comments. Built with modern development practices, this API is perfect for developers and companies looking to integrate news functionality into their platforms.

---

## Getting Started

### Prerequisites

- Node.js (v14.0 or later)
- PostgreSQL (v12.0 or later)

### Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv) (v16.3.1)
- [express](https://www.npmjs.com/package/express) (v4.18.2)
- [pg](https://www.npmjs.com/package/pg) (v8.7.3)
- [supertest](https://www.npmjs.com/package/supertest) (v6.3.3)

### DevDependencies

- [husky](https://www.npmjs.com/package/husky) (v8.0.2)
- [jest](https://www.npmjs.com/package/jest) (v27.5.1)
- [jest-extended](https://www.npmjs.com/package/jest-extended) (v2.0.0)
- [jest-sorted](https://www.npmjs.com/package/jest-sorted) (v1.0.14)
- [pg-format](https://www.npmjs.com/package/pg-format) (v1.0.4)

### Setup

1. **Clone the Repository**:

git clone https://github.com/OzzyCF/backEnd-news-api.git

2. **Navigate to the Repository Folder**:

cd backEnd-news-api

3. **Install Dependencies**:

`npm install`

## Database Initialization

The **Northcoders News API** provides a streamlined database setup process through two primary files: `seed.js` and `run-seed.js`.

- **`seed.js`**: This file is responsible for structuring your database tables appropriately, ensuring that the tables are set up with the right schema.

- **`run-seed.js`**: This file efficiently sources data from the development seed database and subsequently channels it to `seed.js` for population.

Together, these mechanisms ensure a seamless and automated flow for database initialization, offering developers a hassle-free setup experience.

### Setting Up Environment Variables

To run the project locally, you need to set up environment variables for database configurations:

1. **Create Environment Files**:

   After cloning the repo, create two files in the root directory: `.env.development` and `.env.test`.

2. **Development Configuration**:

   In `.env.development`, add:
   PGDATABASE=nc_news

3. **Testing Configuration**:

In `.env.test`, add:
PGDATABASE=nc_news_test

Remember not to commit these `.env.*` files to the repository.

### Running Tests

To ensure that everything is set up correctly:

`npm test`

---

## API Endpoints

Our Northcoders News API offers a diverse range of endpoints that provide access to news articles, comments, topics, and users. Whether you're looking to retrieve comprehensive article data, post a new comment, or delve into specific topics, our API has got you covered. Below is a breakdown of the available endpoints, their HTTP methods, and a brief description of each:

| Method | Endpoint                           | Description                                                  |
| ------ | ---------------------------------- | ------------------------------------------------------------ |
| GET    | /api                               | Retrieve a list of all available endpoints.                  |
| GET    | /api/topics                        | Retrieve all topics.                                         |
| GET    | /api/articles                      | Fetch all articles.                                          |
| GET    | /api/articles/:article_id          | Fetch a specific article by its ID.                          |
| GET    | /api/articles/:article_id/comments | Fetch all comments for a specific article by the article ID. |
| GET    | /api/users                         | Retrieve all users.                                          |
| POST   | /api/articles/:article_id/comments | Post a comment for a specific article by the article ID.     |
| PATCH  | /api/articles/:article_id          | Update votes for a specific article by its ID.               |
| DELETE | /api/comments/:comment_id          | Delete a specific comment by its ID.                         |

---

Made with ❤️ by [Oswaldo Colon F.](your-personal-website-or-linkedin)
