# Portfolio Project — Custom CMS

Full-stack portfolio built with a from-scratch CMS (no Strapi/Sanity), per the project spec in
`Portfolio Project with CMS - Python.pdf`.

## Structure

- `backend/` — Django + DRF REST API, JWT auth, PostgreSQL (SQLite fallback for local dev)
- `cms-admin/` — React (Vite) admin dashboard: login, CRUD for all content types, draft/publish, media upload
- `frontend/` — Next.js public portfolio site, fetches content from the CMS API
- `render.yaml` — Render Blueprint: deploys backend + admin + free Postgres in one click

## Local development

```bash
# Backend
cd backend
python -m venv venv && source venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo   # optional demo content
python manage.py runserver

# Admin panel
cd cms-admin
npm install
cp .env.example .env
npm run dev   # http://localhost:5173

# Portfolio frontend
cd frontend
npm install
npm run dev   # http://localhost:3000
```

Default seeded admin login: `admin` / `Admin@12345` (change this before going live).

## Deploy

1. **Backend + Admin + Postgres (Render)**: push this repo to GitHub, then in Render
   dashboard use **New → Blueprint**, point it at this repo. It provisions:
   - `portfolio-cms-backend` (Django API)
   - `portfolio-cms-admin` (static React admin panel)
   - `portfolio-cms-db` (free Postgres)

   After first deploy, set `CORS_ALLOWED_ORIGINS` env var on the backend service to your
   admin panel URL + frontend URL (comma-separated), then redeploy.

2. **Frontend (Vercel)**: import this repo, set the project root to `frontend/`, and set
   `NEXT_PUBLIC_API_URL` to the deployed backend's `/api` URL.

## API

See `backend/cms/urls.py` for the full route list — auth, about, skills, projects, blogs,
experience, testimonials, services, media upload, contact form.
