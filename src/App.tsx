import { Outlet } from 'react-router-dom'
import { Header } from './components';

export function App() {
    return <div className='flex grow'>
        <Header.Side />

        <div className='flex flex-col grow pl-5 pr-5 pb-8 sm:pl-0'>
            <Header.Top />

            <main className='bg-slate-100 h-full rounded-3xl p-4 md:p-8 xl:p-12 dark:bg-neutral-800'>
                <Outlet />
            </main>
        </div>
    </div>
}