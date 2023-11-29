import { Github, Lightbulb, LightbulbOff, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Header = {
    Top() {
        return <header className='py-8 px-2 flex'>
            {/* search */}
            <div className='flex grow'>
                <div className='grow flex items-center space-x-2 group'>
                    <Search className='w-6 h-6 transition-opacity opacity-50 group-focus-within:opacity-100' />
                    <input type='text' placeholder='Search torrents' className='grow bg-transparent outline-none' />
                </div>
            </div>

            {/* helpful links */}
            <div className='flex items-center'>
                <Link target='_blank' to='https://github.com/vsnthdev/transmission-control#readme' className='group'>
                    <Github className='w-5 h-5 transition-opacity opacity-50 group-hover:opacity-100' />
                </Link>
            </div>
        </header>
    },

    Side() {
        return <section className='flex flex-col justify-between px-4 py-6'>
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
                <div className='flex flex-col items-center group'>
                    <Lightbulb className='cursor-pointer transition-opacity w-6 h-6 hidden opacity-50 dark:inline group-hover:opacity-100' />
                    <LightbulbOff className='cursor-pointer transition-opacity w-6 h-6 opacity-50 dark:hidden group-hover:opacity-100' />
                </div>
            </div>
        </section>
    }
}