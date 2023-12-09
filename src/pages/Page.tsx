import { useMemo } from 'react'
import { filesize } from 'filesize'
import { Infocard } from './InfoCard'
import { TorrentCard } from './TorrentCard'
import { Transmission } from '@ctrl/transmission'
import { useTorrents } from '../hooks/useTorrents'
import { DownloadCloudIcon, HardDriveIcon, UploadCloudIcon } from 'lucide-react'
import { NewMagnetDetectedDialog, useNewMagnetDetected } from './NewMagnetDetectedDialog'

const client = new Transmission({
    baseUrl: `http://192.168.0.100:9091`,
    username: 'vsnthdev',
    password: 'vsnthdev'
})

export function Index() {
    // HOOKS
    const { freeSpace, torrents } = useTorrents(client)
    const magnetDetection = useNewMagnetDetected(torrents)

    // VALUES
    const totalDownloaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalDownloaded, 0)), [torrents])
    const totalUploaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalUploaded, 0)), [torrents])

    return <>
        <div className='flex flex-col space-y-8'>
            {/* info cards */}
            <div className='grid grid-cols-3 mt-4 gap-6 max-w-xl lg:max-w-3xl text-sm md:mt-0 lg:grid-cols-4'>
                <Infocard
                    color='violet'
                    text='Downloaded'
                    value={totalDownloaded}
                    icon={<DownloadCloudIcon />}
                />

                <Infocard
                    color='emerald'
                    text='Uploaded'
                    value={totalUploaded}
                    icon={<UploadCloudIcon />}
                />

                <Infocard
                    color='cyan'
                    text='Available'
                    value={freeSpace && filesize(freeSpace['total_size'])}
                    icon={<HardDriveIcon />}
                />

                {/* <div className='hidden col-span-1 relative md:aspect-square bg-white rounded-2xl text-center lg:flex flex-col space-y-2 justify-center items-center dark:bg-neutral-900'>
                    <div className='flex justify-center items-center'>
                        <div className='p-3 flex bg-black/5 rounded-full dark:bg-white/10'>
                            <File className='w-5 h-5 dark:text-neutral-300' />
                        </div>
                    </div>
                    <div className='px-4'>
                        <h4 className='font-semibold'>Drag & drop torrent files here or</h4>
                    </div>
                    <div className='flex'>
                        <button className='text-xs font-medium px-9 py-2 rounded-full transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800'>Browse</button>
                    </div>
                </div> */}
            </div>

            {/* torrents list */}
            <div className='flex flex-col'>
                <div className='mb-4 ml-2'>
                    <h2 className='uppercase text-sm font-bold tracking-widest text-neutral-400'>Recent torrents</h2>
                </div>
                <div className='flex flex-col space-y-4 md:space-y-6'>
                    {torrents.map((torrent: any) => <TorrentCard
                        client={client}
                        key={torrent.id}
                        torrent={torrent}
                    />)}
                </div>
            </div>
        </div>

        <NewMagnetDetectedDialog {...magnetDetection} client={client} />
    </>
}