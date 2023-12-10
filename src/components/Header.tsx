import { Link } from 'react-router-dom'
import { Github, Lightbulb, LightbulbOff, Menu, Search } from 'lucide-react'

export const Header = {
    Top() {
        return <header className='flex px-2 py-8 lg:px-12 xl:py-12'>
            {/* mobile nav button */}
            <div className='mr-6 sm:hidden'>
                <Menu className='h-6 w-6' />
            </div>

            {/* search */}
            <div className='flex grow lg:text-xl'>
                <div className='group flex grow items-center space-x-2 lg:space-x-4'>
                    <Search className='h-6 w-6 opacity-50 transition-opacity group-focus-within:opacity-100' />
                    <input type='text' placeholder='Search torrents' className='grow bg-transparent outline-none' />
                </div>
            </div>

            {/* helpful links */}
            <div className='flex items-center'>
                <Link target='_blank' to='https://github.com/vsnthdev/transmission-control#readme' className='group'>
                    <Github className='h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100 lg:h-6 lg:w-6' />
                </Link>
            </div>
        </header>
    },

    Side() {
        return <section className='hidden flex-col justify-between px-4 py-6 sm:flex md:px-6 xl:px-9 xl:py-10'>
            {/* the logo */}
            <div className='flex flex-col items-center'>
                <div className='aspect-square w-10 rounded-full bg-slate-400' />
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
                <div className='group flex flex-col items-center'>
                    <Lightbulb className='hidden h-6 w-6 cursor-pointer opacity-50 transition-opacity group-hover:opacity-100 dark:inline' />
                    <LightbulbOff className='h-6 w-6 cursor-pointer opacity-50 transition-opacity group-hover:opacity-100 dark:hidden' />
                </div>
            </div>
        </section>
    }
}