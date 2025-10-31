# Liquibase – Database Change Management Tool

## 🌍 What Is Liquibase?

Liquibase is an open-source tool for managing database schema changes. It helps developers and DevOps teams track, version, and automate changes to database structures (tables, columns, constraints, etc.), similar to how Git tracks code changes.

### 🧩 Analogy

Think of Liquibase as “Git for your database.” It tracks every migration or change, ensuring your database evolves safely and predictably.

## 🧱 Why Use Liquibase?

- **Version control for schema:** Track every change with history.
- **Easy rollback:** Undo changes if something goes wrong.
- **Automation:** Integrate with CI/CD pipelines for seamless deployments.
- **Cross-database compatibility:** Works with MySQL, PostgreSQL, Oracle, SQL Server, and more.

### Common Problems Liquibase Solves

- Manual SQL scripts are error-prone and hard to track.
- Environments become inconsistent (dev ≠ prod).
- Difficult to audit or roll back changes.

Liquibase fixes these by providing a structured, automated, and auditable way to manage schema changes.

## 🚀 Key Features

- **ChangeSets:** Define atomic changes in XML, YAML, JSON, or SQL.
- **Rollback Support:** Specify how to revert changes.
- **Database Diff:** Compare schemas and generate migration scripts.
- **Changelog Files:** Organize and version your changes.
- **Preconditions:** Run changes only if certain conditions are met.
- **Extensible:** Supports custom change types and plugins.

## 🛠️ How Liquibase Works

1. **Define Changes:** Write changes in changelog files.
2. **Apply Changes:** Run `liquibase update` to apply changes to your database.
3. **Track History:** Liquibase creates a tracking table (`DATABASECHANGELOG`) to record applied changes.
4. **Rollback:** Use `liquibase rollback` to revert changes.

## ⚡ Liquibase Setup Guide (Event Module)

### 1. Install Liquibase

- Download from [Liquibase Downloads](https://www.liquibase.org/download)
- Or install via Homebrew (macOS):
  ```sh
  brew install liquibase
  ```

### 2. Create Changelog Directory

- In your project, create:
  ```
  src/modules/events/liquibase/
  ```

### 3. Create a Changelog File

- Example: `db.changelog.yaml` in the above directory
- Sample changelog for an `events` table:
  ```yaml
  databaseChangeLog:
  	- changeSet:
  			id: 1
  			author: yourname
  			changes:
  				- createTable:
  						tableName: events
  						columns:
  							- column:
  									name: id
  									type: int
  									autoIncrement: true
  									constraints:
  										primaryKey: true
  							- column:
  									name: name
  									type: varchar(255)
  							- column:
  									name: date
  									type: date
  ```

### 4. Configure Liquibase Properties

- Create a `liquibase.properties` file:
  ```properties
  url=jdbc:postgresql://localhost:5432/yourdb
  username=youruser
  password=yourpassword
  changeLogFile=src/modules/events/liquibase/db.changelog.yaml
  ```

### 5. Run Liquibase

- Apply changes:
  ```sh
  liquibase update
  ```

### 6. Add More Changes

- For each schema change, add a new `changeSet` to your changelog file.

### 7. Useful Liquibase Commands

- `liquibase update` – Apply changes
- `liquibase rollbackCount 1` – Roll back last change
- `liquibase status` – Show pending changes
- `liquibase diff` – Compare two databases

## 📦 Example Changelog (YAML)

```yaml
databaseChangeLog:
	- changeSet:
			id: 1
			author: alice
			changes:
				- createTable:
						tableName: users
						columns:
							- column:
									name: id
									type: int
									autoIncrement: true
									constraints:
										primaryKey: true
							- column:
									name: name
									type: varchar(255)
```

## 📚 Resources

- [Liquibase Documentation](https://www.liquibase.org/documentation/index.html)
- [Getting Started Guide](https://www.liquibase.org/get-started/quickstart)
- [Best Practices](https://www.liquibase.org/blog/liquibase-best-practices)