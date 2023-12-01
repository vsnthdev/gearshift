import { useEffect, useMemo, useState } from 'react'
import { TorrentCard } from '../components'
import { Transmission } from '@ctrl/transmission'
import { filesize } from 'filesize'
import { DownloadCloud, File, HardDrive, UploadCloud } from 'lucide-react'

const client = new Transmission({
    baseUrl: `http://192.168.0.100:9091`,
    username: 'vsnthdev',
    password: 'vsnthdev'
})

export function Index() {
    const [torrents, setTorrents] = useState<any>([])
    const [freeSpace, setFreeSpace] = useState<any>()

    const totalDownloaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalDownloaded, 0)), [torrents])
    const totalUploaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalUploaded, 0)), [torrents])

    useEffect(() => {
        client.freeSpace().then(data => setFreeSpace(data.arguments))
        client.getAllData().then(data => setTorrents(data.torrents))
        client.freeSpace().then(data => console.log(data))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)

        setInterval(() => {
            client.freeSpace().then(data => setFreeSpace(data.arguments))
        }, 3000)
    }, [])

    const pauseTorrent = async (id: string) => await client.pauseTorrent(id)
    const resumeTorrent = async (id: string) => await client.resumeTorrent(id)

    return <div className='flex flex-col space-y-8'>
        <div className='grid grid-cols-3 mt-4 gap-6 max-w-xl lg:max-w-3xl text-sm md:mt-0 lg:grid-cols-4'>
            {/* metrics card */}
            <div className='col-span-1 relative md:aspect-square md:bg-violet-300 md:text-violet-900 rounded-2xl text-center flex flex-col space-y-2 justify-center items-center md:text-left'>
                <div className='flex justify-center items-center'>
                    <div className='p-3 flex bg-black/5 rounded-full dark:bg-black/10 md:absolute md:top-5 md:left-5'>
                        <DownloadCloud className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center md:items-start md:absolute md:bottom-5 md:left-5'>
                    <h4 className='font-semibold md:text-xl md:font-bold'>{totalDownloaded}</h4>
                    <p className='text-xs md:text-base'>Downloaded</p>
                </div>
            </div>
            <div className='col-span-1 relative md:aspect-square md:bg-emerald-300 md:text-emerald-900 rounded-2xl text-center flex flex-col space-y-2 justify-center items-center'>
                <div className='flex justify-center items-center'>
                    <div className='p-3 flex bg-black/5 rounded-full dark:bg-black/10 md:absolute md:top-5 md:left-5'>
                        <UploadCloud className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center md:items-start md:absolute md:bottom-5 md:left-5'>
                    <h4 className='font-semibold md:text-xl md:font-bold'>{totalUploaded}</h4>
                    <p className='text-xs md:text-base'>Uploaded</p>
                </div>
            </div>
            {freeSpace && <div className='col-span-1 relative md:aspect-square md:bg-cyan-300 md:text-emerald-900 rounded-2xl text-center flex flex-col space-y-2 justify-center items-center'>
                <div className='flex justify-center items-center'>
                    <div className='p-3 flex bg-black/5 rounded-full dark:bg-black/10 md:absolute md:top-5 md:left-5'>
                        <HardDrive className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center md:items-start md:absolute md:bottom-5 md:left-5'>
                    <h4 className='font-semibold md:text-xl md:font-bold'>{filesize(freeSpace['total_size'])}</h4>
                    <p className='text-xs md:text-base'>Available</p>
                </div>
            </div>}
            <div className='hidden col-span-1 relative md:aspect-square bg-white rounded-2xl text-center lg:flex flex-col space-y-2 justify-center items-center dark:bg-neutral-900'>
                <div className='flex justify-center items-center'>
                    <div className='p-3 flex bg-black/5 rounded-full dark:bg-white/10'>
                        <File className='w-5 h-5 dark:text-neutral-300' />
                    </div>
                </div>
                <div className='px-4'>
                    <h4 className='font-semibold'>Drag & drop torrent files here or</h4>
                </div>
                <div className='flex'>
                    <button className='px-9 py-2 rounded-full transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800'>Browse</button>
                </div>
            </div>
        </div>

        <div className='flex flex-col'>
            <div className='mb-4 ml-2'>
                <h2 className='uppercase text-sm font-bold tracking-widest text-neutral-400'>Recent torrents</h2>
            </div>
            <div className='flex flex-col space-y-4 md:space-y-6'>
                {torrents.map((torrent: any) => <TorrentCard
                    key={torrent.id}
                    torrent={torrent}
                    pauseTorrent={pauseTorrent}
                    resumeTorrent={resumeTorrent}
                />)}
            </div>
        </div>
    </div>
}