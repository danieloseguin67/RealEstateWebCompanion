# Docker DB not reachable after laptop restart (WebCompanion)

This repo runs SQL Server in Docker (Compose) for local development. After a Windows/laptop restart, it’s common to temporarily lose database connectivity until Docker Desktop and the containers are running again.

This guide is **problem-oriented**: it explains why it happens and how to reliably get the DB reachable again.

## Symptoms

You may see one of these:

- SSMS/Azure Data Studio can’t connect to `localhost:14330`.
- The API fails to start (or returns 5xx) because it can’t connect to SQL Server.
- `docker compose ps` shows nothing running.

## Why it happens

1. **Docker Desktop isn’t running yet**
   - After reboot, Docker Desktop may take time to start (or may not auto-start). Until it is running, no containers are running.

2. **The containers aren’t configured to restart automatically**
   - Without a restart policy, containers that were running before shutdown will remain stopped after reboot.
   - This repo’s Compose file has been updated to use `restart: unless-stopped` for the DB and API.

3. **SQL Server is still starting up**
   - SQL Server can take 10–60+ seconds to finish recovery and accept client connections, especially after an unclean shutdown or Windows update.

4. **Wrong server/port syntax in SSMS** (very common)
   - In SQL Server Management Studio, use a **comma** for the port:
     - ✅ `localhost,14330`
     - ❌ `localhost:14330`

## One-time setup (recommended)

### 1) Ensure your `.env` exists

The Compose stack requires `webapi/.env` containing `SA_PASSWORD`.

- Folder: `webapi/.env`
- Variable: `SA_PASSWORD=<strong password>`

If you don’t have one, copy `webapi/.env.example` to `webapi/.env` and set a password.

### 2) Use containers that restart automatically

The Compose file is configured with:

- `db`: `restart: unless-stopped`
- `api`: `restart: unless-stopped`

Meaning: once Docker Desktop is running, Docker will bring these containers back up automatically after a reboot (unless you explicitly stopped them).

File:

- `webapi/docker-compose.yml`

## Daily usage

### Start the stack

From the repo root:

```powershell
cd webapi
docker compose --env-file .env up -d
```

### Check what’s running

```powershell
cd webapi
docker compose ps
```

Expected ports:

- API: `http://localhost:8081` (container `8080`)
- SQL Server: `localhost:14330` (container `1433`)

### Confirm SQL Server is ready

If connections fail immediately after a reboot, check DB logs and wait until startup completes:

```powershell
docker logs --tail 100 webapi-db-1
```

Look for messages like:

- `Recovery is complete. ...`

## Connecting from tools

### SQL Server Management Studio (SSMS)

Use:

- Server name: `localhost,14330`
- Authentication: `SQL Server Authentication`
- Login: `sa`
- Password: the value of `SA_PASSWORD` in `webapi/.env`

### Connection string examples

From the host (Windows machine) using SQL auth:

```text
Server=localhost,14330;Database=realestatewebcompanion;User Id=sa;Password=<SA_PASSWORD>;TrustServerCertificate=True;Encrypt=False;
```

From another container in the same Compose network (how the API container connects):

```text
Server=db;Database=realestatewebcompanion;User Id=sa;Password=<SA_PASSWORD>;TrustServerCertificate=True;Encrypt=False;
```

## Troubleshooting checklist

### A) Nothing is running

If `docker compose ps` shows no services:

1. Start Docker Desktop.
2. Start the stack:

```powershell
cd webapi
docker compose --env-file .env up -d
```

### B) DB container is running but you still can’t connect

Common causes:

- You used `localhost:14330` in SSMS instead of `localhost,14330`.
- SQL Server is still starting (wait + re-try).
- Your `SA_PASSWORD` changed (container won’t accept the old password).

Verify ports:

```powershell
cd webapi
docker compose ps
```

### C) API is up but endpoints fail

The API depends on DB availability.

- Check API logs:

```powershell
docker logs --tail 200 webapi-api-1
```

- Check DB logs:

```powershell
docker logs --tail 200 webapi-db-1
```

### D) You want a clean reset (deletes DB data)

WARNING: this removes your persisted SQL Server data volume.

```powershell
cd webapi
docker compose down -v
```

Then bring it back:

```powershell
cd webapi
docker compose --env-file .env up -d
```

Optional: initialize schema/data using the one-shot init profile:

```powershell
cd webapi
docker compose --profile init --env-file .env up --build
```

## Notes

- On Windows, a reboot doesn’t guarantee containers start unless Docker Desktop is running.
- `restart: unless-stopped` covers the common “works until reboot” problem, but Docker Desktop still needs to start.
