# Project P4 Makelaar

## Lokale installatie

### 1. Clone het project

```bash
git clone <repo-url>
cd project-p4-makelaar
```

### 2. Maak een `.env` bestand

Kopieer het voorbeeldbestand:

```bash
cp .env.example .env
```

Voeg daarna je database URL toe:

```env
DATABASE_URL=postgres://postgres:root@127.0.0.1:5432/project-p4-makelaar
```

### 3. Installeer dependencies

```bash
pnpm install
```

of:

```bash
npm install
```

### 4. Start de development server

```bash
pnpm dev
```

of:

```bash
npm run dev
```

### 5. Open de applicatie

Ga naar:

```text
http://localhost:3000
```
or
```text
http://localhost:3001
```

Maak daarna je eerste admin gebruiker aan via de browser.

---

## PostgreSQL

Zorg ervoor dat PostgreSQL lokaal draait op poort `5432`.

Maak indien nodig een database aan:

```sql
CREATE DATABASE "project-p4-makelaar";
```

---

## Docker (optioneel)

Je kunt ook Docker gebruiken:

```bash
docker-compose up
```

---

## Technologieën

* Payload CMS
* Next.js
* PostgreSQL
* TypeScript
* Tailwindcss
