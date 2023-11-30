import { useEffect, useState } from 'react'
import { TorrentCard } from '../components'
import { Transmission } from '@ctrl/transmission'

const client = new Transmission({
    baseUrl: `http://192.168.0.100:9091`,
    username: 'vsnthdev',
    password: 'vsnthdev'
})

export function Index() {
    const [torrents, setTorrents] = useState<any>([])

    useEffect(() => {
        client.getAllData().then(data => setTorrents(data.torrents))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)
    }, [])

    const pauseTorrent = async (id: string) => await client.pauseTorrent(id)
    const resumeTorrent = async (id: string) => await client.resumeTorrent(id)

    return <div className='flex flex-col space-y-4'>
        {torrents.map((torrent: any) => <TorrentCard
            key={torrent.id}
            torrent={torrent}
            pauseTorrent={pauseTorrent}
            resumeTorrent={resumeTorrent}
        />)}
    </div>
}