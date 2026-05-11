# MeoPhim

React + Vite frontend for the movie backend.

## Run

```powershell
npm install
npm run dev
```

Environment is read from `.env`:

```text
VITE_API_BASE_URL=http://localhost:8080/v1/api
VITE_ENABLE_LOGS=true
```

To change backend URL, edit `.env` before starting Vite:

```text
VITE_API_BASE_URL=http://localhost:8080/v1/api
```

Runtime logs are printed in the browser DevTools console while running in dev mode, or when `VITE_ENABLE_LOGS=true`.

## Structure

```text
src
|-- api          # HTTP client for backend endpoints
|-- components   # Shared UI components
|-- constants    # App constants
|-- pages        # Screen-level components
|-- router       # Hash route parser/builder
|-- utils        # Formatting and response helpers
|-- App.jsx
|-- main.jsx
`-- styles.css
```
