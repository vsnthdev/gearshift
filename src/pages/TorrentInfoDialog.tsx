import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { filesize } from 'filesize'
import { Tabs } from '../components/Tabs'
import { File, Folder, Info } from 'lucide-react'
import { Dialog, DialogProps } from '../components/Dialog'
import { ParsedFile, useFilesystemParser } from '../hooks/useFilesystemParser'

function TorrentInfo({ torrent }: { torrent: any }) {
    const lastActiveOn = useMemo(() => DateTime.fromSeconds(torrent.raw.activityDate).toRelative(), [torrent.raw.activityDate])
    const availability = useMemo(() => Number(torrent.totalDownloaded / torrent.totalSize * 100).toFixed(2), [torrent.totalDownloaded, torrent.totalSize])

    const dateAdded = useMemo(() => DateTime.fromISO(torrent.dateAdded).toFormat('d LLL yyyy'), [torrent.dateAdded])
    const dateCompleted = useMemo(() => DateTime.fromISO(torrent.dateCompleted).toFormat('d LLL yyyy'), [torrent.dateCompleted])

    return <div className='flex flex-col space-y-4'>
        {/* basic info */}
        <div className='flex flex-col space-y-2'>
            <h5 className='font-semibold uppercase tracking-wider opacity-50'>Basic</h5>
            <div className="flex flex-wrap gap-6 text-sm">
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Name</span>
                    <span>{torrent.name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Saved at</span>
                    <span>{torrent.savePath}</span>
                </div>
                {!!torrent.raw.comment && <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Comment</span>
                    <span>{torrent.raw.comment}</span>
                </div>}
                {!!torrent.raw.creator && <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Creator</span>
                    <span>{torrent.raw.creator}</span>
                </div>}
            </div>
        </div>

        {/* activity stats */}
        <div className='flex flex-col space-y-2'>
            <h5 className='font-semibold uppercase tracking-wider opacity-50'>Activity</h5>
            <div className='flex flex-wrap gap-6 text-sm'>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>State</span>
                    <span>{torrent.state.slice(0, 1).toUpperCase()}{torrent.state.slice(1)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Added at</span>
                    <span>{dateAdded}</span>
                </div>
                {!!torrent.isCompleted && <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Completed at</span>
                    <span>{dateCompleted}</span>
                </div>}
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Downloaded</span>
                    <span>{filesize(torrent.totalDownloaded)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Uploaded</span>
                    <span>{filesize(torrent.totalUploaded)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Availability</span>
                    <span>{availability}%</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-semibold uppercase opacity-50'>Last activity</span>
                    <span>{lastActiveOn}</span>
                </div>
            </div>
        </div>
    </div>
}

function FileStrip({ file, name }: { file: ParsedFile['any'], name: string }) {
    return <div className='flex w-max flex-col md:w-full'>
        {/* render file info */}
        <div className='relative flex w-full items-center space-x-2 py-2'>
            {/* file type icon */}
            {file.type == 'dir' && <div className='rounded-full bg-slate-200 p-2 text-slate-500 dark:bg-neutral-700 dark:text-neutral-300'>
                <Folder className='h-4 w-4' />
            </div>}

            {file.type == 'file' && <div className='rounded-full bg-slate-200 p-2 text-slate-500 dark:bg-neutral-700 dark:text-neutral-300'>
                <File className='h-4 w-4' />
            </div>}

            <div className='flex flex-col'>
                <p className='w-full text-sm'>{name}</p>
                {file.type == 'file' && <span className='shrink-0 text-xs text-neutral-400'>{filesize(file.downloaded)} / {filesize(file.total)}</span>}
            </div>
        </div>

        {/* render recursively */}
        {file.type == 'dir' && file.sub && <div className='ml-8 flex flex-col'>
            {Object.keys(file.sub).map(subDir => <FileStrip key={subDir} name={subDir} file={(file as any).sub[subDir]} />)}
        </div>}
    </div>
}

function TorrentFiles({ torrent }: { torrent: any }) {
    const files = useFilesystemParser(torrent.raw.files)

    return <div className='flex overflow-x-scroll pt-3 scrollbar-none'>
        {Object.keys(files).map(dir => <FileStrip key={dir} name={dir} file={files[dir] as any} />)}
    </div>
}

interface TorrentInfoDialogProps extends Omit<DialogProps, 'children' | 'hideClose'> {
    torrent: any
}

export function TorrentInfoDialog(props: TorrentInfoDialogProps) {
    const { control, torrent } = props

    return <Dialog
        title='Torrent info'
        control={control}
    >
        <Tabs
            defaultTabId='info'
            tabs={[
                {
                    id: 'info',
                    name: 'Info',
                    icon: <Info />,
                    content: <TorrentInfo torrent={torrent} />
                },
                {
                    id: 'files',
                    name: 'Files',
                    icon: <File />,
                    content: <TorrentFiles torrent={torrent} />
                }
            ]}
        />
    </Dialog>
}