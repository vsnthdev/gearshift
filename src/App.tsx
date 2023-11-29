import { Outlet } from 'react-router-dom'

export function App() {
    return <div className='flex grow'>
        <section className='flex flex-col justify-between px-2 py-4'>
            {/* the logo */}
            <div className='flex flex-col items-center'>
                <div className='w-8 aspect-square bg-slate-400 rounded-full' />
            </div>

            {/* nav section */}
            <nav className='flex flex-col items-center'>
                <a href="">torrents</a>
            </nav>

            {/* settings section */}
            <div className='flex flex-col items-center'>
                <a href="">dark</a>
            </div>
        </section>

        <div className='flex flex-col grow pr-10'>
            <header className='py-4 flex'>
                {/* search */}
                <div className='flex grow'>
                    <div className='grow border-2 border-black'>
                        <p>search torrents</p>
                    </div>
                </div>

                {/* helpful links */}
                <div className='flex'>
                    <a href="">github</a>
                </div>
            </header>

            <main className='bg-white rounded-3xl p-10 dark:bg-neutral-800'>
                <Outlet />
            </main>
        </div>
    </div>
}