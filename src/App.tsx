import { Outlet, Link } from 'react-router-dom'
import { Github, Lightbulb, LightbulbOff, Search } from 'lucide-react';

export function App() {
    return <div className='flex grow'>
        <section className='flex flex-col justify-between px-4 py-6'>
            {/* the logo */}
            <div className='flex flex-col items-center'>
                <div className='w-10 aspect-square bg-slate-400 rounded-full' />
            </div>

            {/* nav section */}
            {/* <nav className='flex flex-col items-center'>
                <NavLink to='/' className={({ isActive }) => clsx('flex flex-col items-center space-y-2', isActive ? 'opacity-100' : 'opacity-60')}>
                    <FileDown className='w-5 h-5' />
                    <span className='text-xs uppercase font-medium'>Home</span>
                </NavLink>
            </nav> */}

            {/* settings section */}
            <div className='flex flex-col items-center'>
                <Lightbulb className='w-6 h-6 hidden dark:inline' />
                <LightbulbOff className='w-6 h-6 dark:hidden' />
            </div>
        </section>

        <div className='flex flex-col grow pr-5'>
            <header className='py-8 px-2 flex'>
                {/* search */}
                <div className='flex grow'>
                    <div className='grow flex items-center space-x-2'>
                        <Search className='w-6 h-6' />
                        <input type="text" placeholder='Search torrents' className='grow bg-transparent outline-none' />
                    </div>
                </div>

                {/* helpful links */}
                <div className='flex items-center'>
                    <Link to='https://github.com/vsnthdev/transmission-control#readme'>
                        <Github className='w-5 h-5' />
                    </Link>
                </div>
            </header>

            <main className='bg-white rounded-3xl p-10 dark:bg-neutral-800'>
                <Outlet />
            </main>
        </div>
    </div>
}