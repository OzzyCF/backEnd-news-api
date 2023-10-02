# Northcoders News API

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
