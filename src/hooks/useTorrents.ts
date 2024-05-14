import { useEffect, useState } from 'react'
import { Transmission } from '@ctrl/transmission'

export function useTorrents(client: Transmission | undefined) {
    const [torrents, setTorrents] = useState<any>([])
    const [freeSpace, setFreeSpace] = useState<any>()

    useEffect(() => {
        if (!client) return

        client.freeSpace().then(data => setFreeSpace(data.arguments))
        client.getAllData().then(data => setTorrents(data.torrents))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)

        setInterval(() => {
            client.freeSpace().then(data => setFreeSpace(data.arguments))
        }, 3000)
    }, [client])

    return { torrents, freeSpace }
}