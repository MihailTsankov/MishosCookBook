// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

reportWebVitals()

// Explicitly unregister any service workers to prevent the PWA install prompt
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
            registration.unregister().catch(() => void 0)
        }
    })
    .catch(() => void 0)

    // Also try to unregister the active registration (defensive)
    navigator.serviceWorker.ready.then(registration => {
        registration?.unregister().catch(() => void 0)
    }).catch(() => void 0)
}