import { filesize } from 'filesize'
import { Transmission } from '@ctrl/transmission'
import { useEffect, useMemo, useState } from 'react'
import { DownloadCloudIcon, HardDriveIcon, UploadCloudIcon } from 'lucide-react'
import { Infocard } from './InfoCard'
import { NewTorrent } from './NewTorrent'
import { TorrentCard } from './TorrentCard'
import { useTorrents } from '../hooks/useTorrents'
import { NewMagnetDetectedDialog, useNewMagnetDetected } from './NewMagnetDetectedDialog'

export function Index() {
    // HOOKS
    const [client, setClient] = useState<Transmission>()
    const { torrents, freeSpace } = useTorrents(client)
    const magnetDetection = useNewMagnetDetected(torrents)

    // VALUES
    const totalDownloaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalDownloaded, 0)), [torrents])
    const totalUploaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalUploaded, 0)), [torrents])

    useEffect(() => {
        if (!client) {
            setClient(new Transmission({
                username: 'vsnthdev',
                password: 'vsnthdev',
                baseUrl: 'http://192.168.0.101:9091'
            }))
        }
    }, [client])

    return <>
        <div className='flex flex-col space-y-8'>
            {/* info cards */}
            <div className='mt-4 grid max-w-xl grid-cols-3 gap-6 text-sm md:mt-0 lg:max-w-3xl lg:grid-cols-4'>
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

                {client && <NewTorrent client={client} />}
            </div>

            {/* torrents list */}
            <div className='flex flex-col'>
                <div className='mb-4 ml-2'>
                    <h2 className='text-sm font-bold uppercase tracking-widest text-neutral-400'>Recent torrents</h2>
                </div>
                <div className='flex flex-col space-y-4 md:space-y-6'>
                    {client && torrents.map((torrent: any) => <TorrentCard
                        client={client}
                        key={torrent.id}
                        torrent={torrent}
                    />)}
                </div>
            </div>
        </div>

        {client && <NewMagnetDetectedDialog {...magnetDetection} client={client} />}
    </>
}