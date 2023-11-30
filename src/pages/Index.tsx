import { useEffect, useState } from 'react'
import { TorrentCard } from '../components'
import { Transmission } from '@ctrl/transmission'

export function Index() {
    const [torrents, setTorrents] = useState<any>([])

    useEffect(() => {
        const client = new Transmission({
            baseUrl: `http://192.168.0.100:9091`,
            username: 'vsnthdev',
            password: 'vsnthdev'
        })

        client.getAllData().then(data => setTorrents(data.torrents))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)
    }, [])

    return <>
        {torrents.map((torrent: any) => <TorrentCard key={torrent.id} torrent={torrent} />)}
    </>
}