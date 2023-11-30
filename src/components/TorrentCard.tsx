import { DateTime } from 'luxon'
import { filesize } from 'filesize'
import { Clock, HardDriveDownload, HardDriveUpload } from 'lucide-react'

export function TorrentCard({ torrent }: { torrent: any }) {
    const formatEta = (seconds: number) => {
        const now = DateTime.now()
        const eta = DateTime.now().plus({ seconds })

        const diff = eta.diff(now)

        const duration = DateTime.fromObject({ second: diff.seconds }).toLocaleString({ second: 'numeric' })

        if (diff.as('days') > 1) {
            return `${Math.floor(diff.as('days'))} day`
        } else if (diff.as('hours') >= 1) {
            return `${Math.floor(diff.as('hours'))} hr`
        } else if (diff.as('minutes') >= 1) {
            return `${Math.floor(diff.as('minutes'))} min`
        } else {
            return duration
        }
    }

    const formatSize = (size: number) => `${filesize(size)}/s`

    return <div key={torrent.id} className='flex flex-col space-y-3 bg-white dark:bg-neutral-700 rounded-3xl p-5 sm:p-6 md:px-8'>
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
            <div className='h-1 bg-black/5 dark:bg-white/5 rounded-full'>
                <div className='h-full rounded-full bg-red-400' style={{ width: `${Number(torrent.progress * 100).toFixed(2)}%` }} />
            </div>
        </div>
    </div>
}