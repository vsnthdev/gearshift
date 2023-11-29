import { Outlet } from 'react-router-dom'
import { Header } from './components';

export function App() {
    return <div className='flex grow'>
        <Header.Side />

        <div className='flex flex-col grow pr-5'>
            <Header.Top />

            <main className='bg-slate-100 rounded-3xl p-4 dark:bg-neutral-800'>
                <Outlet />
            </main>
        </div>
    </div>
}