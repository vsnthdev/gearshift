import { DateTime } from 'luxon'
import { filesize } from 'filesize'
import { Clock, HardDriveDownload, HardDriveUpload, Pause, Play } from 'lucide-react'

export function TorrentCard({ torrent, pauseTorrent, resumeTorrent }: { torrent: any, pauseTorrent: (id: string) => any, resumeTorrent: (id: string) => any }) {
    const formatEta = (seconds: number) => {
        const now = DateTime.now()
        const eta = DateTime.now().plus({ seconds })

        const diff = eta.diff(now)

        const duration = DateTime.fromObject({ second: diff.seconds }).toLocaleString({ second: 'numeric' })

        if (diff.as('days') > 1) {
            const days = Math.floor(diff.as('days'))
            return `${days} ${days == 1 ? 'day' : 'days'}`
        } else if (diff.as('hours') >= 1) {
            return `${Math.floor(diff.as('hours'))} hr`
        } else if (diff.as('minutes') >= 1) {
            return `${Math.floor(diff.as('minutes'))} min`
        } else {
            return duration
        }
    }

    const formatSize = (size: number) => `${filesize(size)}/s`

    return <div key={torrent.id} className='flex flex-col space-y-3 bg-white dark:bg-neutral-700 rounded-3xl p-5 sm:p-6 md:px-8 lg:space-y-0 lg:flex-row'>
        <div className='flex flex-col space-y-3 lg:grow'>
            <h3 className='line-clamp-3 sm:text-lg'>{torrent.name}</h3>
            <div className='flex flex-col space-y-3'>
                {/* metrics */}
                <div className='flex space-x-3 justify-between'>
                    {/* left metrics */}
                    <div className='flex gap-2 items-center text-xs flex-wrap'>
                        {/* download speed */}
                        {torrent.state == 'downloading' && <div className='flex space-x-1 items-center dark:text-neutral-200'>
                            <HardDriveDownload className='w-3 h-3 sm:w-4 sm:h-4' />
                            <span>{formatSize(torrent.downloadSpeed)}</span>
                        </div>}

                        {/* upload speed */}
                        <div className='flex space-x-1 items-center dark:text-neutral-200'>
                            <HardDriveUpload className='w-3 h-3 sm:w-4 sm:h-4' />
                            <span>{formatSize(torrent.uploadSpeed)}</span>
                        </div>

                        {/* time remaining */}
                        {torrent.eta != -1 && <div className='flex space-x-1 items-center dark:text-neutral-200'>
                            <Clock className='w-3 h-3 sm:w-4 sm:h-4' />
                            <span>{formatEta(torrent.eta)}</span>
                        </div>}
                    </div>

                    {/* download percent */}
                    <div className='flex space-x-3 items-center text-sm'>
                        <span className='dark:text-neutral-200'>{Number(torrent.progress * 100).toFixed(2)}%</span>
                    </div>
                </div>

                {/* progress bar */}
                <div className='h-1.5 bg-black/5 dark:bg-white/5 rounded-full'>
                    <div className='h-full rounded-full bg-rose-400' style={{ width: `${Number(torrent.progress * 100).toFixed(2)}%` }} />
                </div>
            </div>
        </div>

        {/* torrent controls */}
        <div className="flex lg:ml-6">
            {/* start paused torrents */}
            {torrent.state == 'paused' && <button className='flex items-center space-x-1 rounded-full text-sm px-3 py-1 transition-colors bg-black/5 hover:bg-black/10 dark:bg-black/10 hover:bg-black/20 lg:flex-col lg:justify-center lg:space-y-1 lg:w-20 lg:rounded-xl lg:space-x-0' onClick={() => resumeTorrent(torrent.id)}>
                <Play className='w-4 h-4 aspect-square' />
                <span className='w-full'>Start</span>
            </button>}

            {/* paused downloading torrents */}
            {torrent.state == 'downloading' && <button className='flex items-center space-x-1 rounded-full text-sm px-3 py-1 transition-colors bg-black/5 hover:bg-black/10 dark:bg-black/10 hover:bg-black/20 lg:flex-col lg:justify-center lg:space-y-1 lg:w-20 lg:rounded-xl lg:space-x-0' onClick={() => pauseTorrent(torrent.id)}>
                <Pause className='w-4 h-4 aspect-square' />
                <span className='w-full'>Pause</span>
            </button>}
        </div>
    </div>
}