# MeoPhim

React + Vite frontend that reads directly from the OPhim public API.

## Run

```powershell
npm install
npm run dev
```

Environment is read from `.env`:

```text
VITE_API_BASE_URL=https://ophim1.com/v1/api
VITE_ENABLE_LOGS=true
```

Default API base URL:

```text
VITE_API_BASE_URL=https://ophim1.com/v1/api
```

Runtime logs are printed in the browser DevTools console while running in dev mode, or when `VITE_ENABLE_LOGS=true`.

## Structure

```text
src
|-- api          # HTTP client for OPhim API endpoints
|-- components   # Shared UI components
|-- constants    # App constants
|-- pages        # Screen-level components
|-- router       # Hash route parser/builder
|-- utils        # Formatting and response helpers
|-- App.jsx
|-- main.jsx
`-- styles.css
```
