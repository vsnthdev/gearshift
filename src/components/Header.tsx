import { Link } from 'react-router-dom'
import { Github, Lightbulb, LightbulbOff, Menu, Search } from 'lucide-react'

export const Header = {
    Top() {
        return <header className='py-8 px-2 flex lg:px-12 xl:py-12'>
            {/* mobile nav button */}
            <div className='mr-6 sm:hidden'>
                <Menu className='w-6 h-6' />
            </div>

            {/* search */}
            <div className='flex grow lg:text-xl'>
                <div className='grow flex items-center space-x-2 group lg:space-x-4'>
                    <Search className='w-6 h-6 transition-opacity opacity-50 group-focus-within:opacity-100' />
                    <input type='text' placeholder='Search torrents' className='grow bg-transparent outline-none' />
                </div>
            </div>

            {/* helpful links */}
            <div className='flex items-center'>
                <Link target='_blank' to='https://github.com/vsnthdev/transmission-control#readme' className='group'>
                    <Github className='w-5 h-5 lg:w-6 lg:h-6 transition-opacity opacity-50 group-hover:opacity-100' />
                </Link>
            </div>
        </header>
    },

    Side() {
        return <section className='hidden sm:flex flex-col justify-between px-4 py-6 md:px-6 xl:px-9 xl:py-10'>
            {/* the logo */}
            <div className='flex flex-col items-center'>
                <div className='w-10 aspect-square bg-slate-400 rounded-full' />
            </div>

            {/* nav section */}
            {/* <nav className='flex flex-col items-center'>
                <NavLink to='/' className={({ isActive }) => cx('flex flex-col items-center space-y-2', isActive ? 'opacity-100' : 'opacity-60')}>
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