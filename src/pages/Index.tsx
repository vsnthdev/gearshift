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
    const [freeSpace, setFreeSpace] = useState<any>()

    useEffect(() => {
        client.freeSpace().then(data => setFreeSpace(data.arguments))
        client.getAllData().then(data => setTorrents(data.torrents))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)

        setInterval(() => {
            client.freeSpace().then(data => setFreeSpace(data.arguments))
        }, 3000)
    }, [])

    const pauseTorrent = async (id: string) => await client.pauseTorrent(id)
    const resumeTorrent = async (id: string) => await client.resumeTorrent(id)

    return <div>
        <div className='flex flex-col space-y-4 md:space-y-6'>
            {torrents.map((torrent: any) => <TorrentCard
                key={torrent.id}
                torrent={torrent}
                pauseTorrent={pauseTorrent}
                resumeTorrent={resumeTorrent}
            />)}
        </div>
    </div>
}