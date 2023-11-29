import './index.css'
import React from 'react'
import { App } from './App'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <div>Dashboard</div>
            },
            {
                path: '/setup',
                element: <div>Setup</div>
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
