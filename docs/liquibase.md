## Project files touched

- `src/liquibase/tour/tour.module.ts` — registers controller, service and provides `PrismaService`.
- `src/liquibase/tour/tour.controller.ts` — REST endpoints for CRUD (/tours).
- `src/liquibase/tour/tour.service.ts` — Prisma-powered service implementing create, findAll, findOne, update, remove.
- `src/liquibase/tour/tour.dto.ts` — DTOs with validation (class-validator) matching the Prisma model.
- `src/prisma/prisma.service.ts` — Nest-friendly Prisma client (connect/disconnect & shutdown hooks).
- `.env` — `DATABASE_URL` for Prisma (must percent-encode special characters in password).

## DTO contract (inputs/outputs)

- CreateTourDto: { name, description?, location, startDate (ISO string), endDate (ISO string) }
- UpdateTourDto: partial of CreateTourDto


## Prisma schema (already present)

The repository contains `prisma/schema.prisma` with a `Tour` model:

```prisma
model Tour {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  location    String
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## .env and DATABASE_URL

- Prisma reads `DATABASE_URL` from `.env` by default.
- If the DB password contains special characters such as `@`, percent-encode them for the URL. Example:

```properties
# example: password = dinesh@123  -> encode @ as %40
DATABASE_URL="postgresql://liquibase:dinesh%40123@localhost:5432/liquibase?schema=public"
```

Note: GUI tools and `psql` expect the raw password `dinesh@123` (no percent-encoding). Percent-encoding is only for the connection URL string.

## Create/reset DB user and database (run as Postgres superuser)

If your `liquibase` user or `liquibase` database does not exist, run these commands (replace `postgres` with a superuser you can access):

```bash
# create user
psql -h localhost -U postgres -c "CREATE USER liquibase WITH PASSWORD 'dinesh@123';"

# create database owned by liquibase
psql -h localhost -U postgres -c "CREATE DATABASE liquibase OWNER liquibase;"

# grant privileges (if needed)
psql -h localhost -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE liquibase TO liquibase;"

# OR to reset password if user exists
psql -h localhost -U postgres -c "ALTER USER liquibase WITH PASSWORD 'dinesh@123';"
```

If `psql` prompts for a password you don't know, connect with a local superuser account (your macOS user or `postgres`) or follow your Postgres installation docs to reset the postgres password.

## Generate Prisma client and apply schema

After `DATABASE_URL` points to a reachable Postgres DB, run:

```bash
yarn install            # if dependencies not installed
npx prisma generate     # generate Prisma client
npx prisma db push      # push schema to DB (dev quick option)
# or using migrations (recommended for tracked changes):
npx prisma migrate dev --name init
```

If you get authentication errors (P1000), check the credentials and percent-encoding (see above) and verify you can connect via `psql`:

```bash
PGPASSWORD='dinesh@123' psql -h localhost -U liquibase -d liquibase -p 5432
```

## Start the Nest app

```bash
yarn start:dev
```

The app exposes endpoints on `http://localhost:3000` by default. Endpoints:

- POST /tours -> create a tour
- GET /tours -> list all tours
- GET /tours/:id -> get a single tour
- PUT /tours/:id -> update
- DELETE /tours/:id -> delete (204)

Example curl to create:

```bash
curl -X POST http://localhost:3000/tours \
  -H "Content-Type: application/json" \
  -d '{"name":"City Walk","description":"A walking tour","location":"Old Town","startDate":"2025-11-10T09:00:00.000Z","endDate":"2025-11-10T12:00:00.000Z"}'
```

## View data with a GUI

- Prisma Studio (quick):

  ```bash
  npx prisma studio
  # opens http://localhost:5555 where you can view/edit the Tour model
  ```

- DBeaver or pgAdmin (full-featured): create a new PostgreSQL connection with
  Host: `localhost`, Port: `5432`, Database: `liquibase`, User: `liquibase`, Password: `dinesh@123`.

## Troubleshooting

- P1000 / authentication failed: wrong username/password, or `.env` not loaded. Check:
  - `echo "$DATABASE_URL"` (if non-empty, shell env var overrides `.env`).
  - percent-encoded password in `.env` for Prisma; raw password for GUI/psql.
- Connection refused: Postgres not running or not listening on `localhost:5432`. Start Postgres (Homebrew example):

```bash
brew services start postgresql
```

- If `psql` connection fails for local socket auth (`peer`), connect as a superuser to run the user/db creation commands or change `pg_hba.conf` auth method temporarily.

## Next steps / optional improvements

- Add global validation pipe in `main.ts` to enforce DTO validation.
- Add e2e tests for the controller/service.
- Add a `PrismaModule` and provide `PrismaService` globally.
- Add pagination and filters to `GET /tours`.

---

This file summarizes the current CRUD + DB setup and how to get the app talking to Postgres and viewing data in a GUI. If you want, I can:

- register `PrismaService` globally,
- add a small seed script to populate sample tours,
- or add Swagger UI to explore the API in-browser.


