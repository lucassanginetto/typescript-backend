# TypeScript Back-end

NodeJS API using TypeORM, PostgreSQL and Docker.

Based on Especializati's "TypeScript on the Back-end" course ([repo](https://github.com/especializati/typescript-back-end-typeorm)).

## Running

```sh
# Run PostgreSQL Docker container
docker-compose up -d

# Install Node dependencies
yarn install

# Create dotenv file using the example
cp .env.example .env

# Run API
yarn run dev
```
