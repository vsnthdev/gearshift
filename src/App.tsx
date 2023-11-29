import { Outlet, NavLink, Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { FileDown, Github, Lightbulb, LightbulbOff, Search } from 'lucide-react';

export function App() {
    return <div className='flex grow'>
        <section className='flex flex-col justify-between px-2 py-4'>
            {/* the logo */}
            <div className='flex flex-col items-center'>
                <div className='w-8 aspect-square bg-slate-400 rounded-full' />
            </div>

            {/* nav section */}
            <nav className='flex flex-col items-center'>
                <NavLink to='/' className={({ isActive }) => clsx('flex flex-col items-center space-y-2', isActive ? 'opacity-100' : 'opacity-60')}>
                    <FileDown className='w-5 h-5' />
                    <span className='text-xs uppercase font-medium'>Home</span>
                </NavLink>
            </nav>

            {/* settings section */}
            <div className='flex flex-col items-center'>
                <Lightbulb className='w-5 h-5 hidden dark:inline' />
                <LightbulbOff className='w-5 h-5 dark:hidden' />
            </div>
        </section>

        <div className='flex flex-col grow pr-10'>
            <header className='py-4 flex'>
                {/* search */}
                <div className='flex grow'>
                    <div className='grow flex items-center'>
                        <Search className='w-6 h-6' />
                        <input type="text" placeholder='Search torrents' className='grow bg-transparent outline-none' />
                    </div>
                </div>

                {/* helpful links */}
                <div className='flex'>
                    <Link to='https://github.com/vsnthdev/transmission-control#readme'>
                        <Github className='w-6 h-6' />
                    </Link>
                </div>
            </header>

            <main className='bg-white rounded-3xl p-10 dark:bg-neutral-800'>
                <Outlet />
            </main>
        </div>
    </div>
}