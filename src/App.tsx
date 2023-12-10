import { Outlet } from 'react-router-dom'
import { Header } from './components';

export function App() {
    return <div className='flex grow'>
        <Header.Side />

        <div className='flex grow flex-col px-5 pb-8 sm:pl-0'>
            <Header.Top />

            <main className='h-full rounded-3xl bg-slate-100 p-4 dark:bg-neutral-800 md:p-8 xl:p-14'>
                <Outlet />
            </main>
        </div>
    </div>
}