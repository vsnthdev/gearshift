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
            <h5 className='uppercase tracking-wider font-semibold opacity-50'>Basic</h5>
            <div className="text-sm flex flex-wrap gap-6">
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Name</span>
                    <span>{torrent.name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Saved at</span>
                    <span>{torrent.savePath}</span>
                </div>
                {!!torrent.raw.comment && <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Comment</span>
                    <span>{torrent.raw.comment}</span>
                </div>}
                {!!torrent.raw.creator && <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Creator</span>
                    <span>{torrent.raw.creator}</span>
                </div>}
            </div>
        </div>

        {/* activity stats */}
        <div className='flex flex-col space-y-2'>
            <h5 className='uppercase tracking-wider font-semibold opacity-50'>Activity</h5>
            <div className='text-sm flex flex-wrap gap-6'>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>State</span>
                    <span>{torrent.state.slice(0, 1).toUpperCase()}{torrent.state.slice(1)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Added at</span>
                    <span>{dateAdded}</span>
                </div>
                {!!torrent.isCompleted && <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Completed at</span>
                    <span>{dateCompleted}</span>
                </div>}
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Downloaded</span>
                    <span>{filesize(torrent.totalDownloaded)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Uploaded</span>
                    <span>{filesize(torrent.totalUploaded)}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Availability</span>
                    <span>{availability}%</span>
                </div>
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Last activity</span>
                    <span>{lastActiveOn}</span>
                </div>
            </div>
        </div>
    </div>
}

function FileStrip({ file, name }: { file: ParsedFile['any'], name: string }) {
    return <div className='flex flex-col w-max md:w-full'>
        {/* render file info */}
        <div className='relative flex items-center space-x-2 py-2 w-full'>
            {/* file type icon */}
            {file.type == 'dir' && <div className='p-2 rounded-full bg-slate-200 text-slate-500 dark:text-neutral-300 dark:bg-neutral-700'>
                <Folder className='w-4 h-4' />
            </div>}

            {file.type == 'file' && <div className='p-2 rounded-full bg-slate-200 text-slate-500 dark:text-neutral-300 dark:bg-neutral-700'>
                <File className='w-4 h-4' />
            </div>}

            <div className='flex flex-col'>
                <p className='w-full text-sm'>{name}</p>
                {file.type == 'file' && <span className='text-xs text-neutral-400 shrink-0'>{filesize(file.downloaded)} / {filesize(file.total)}</span>}
            </div>
        </div>

        {/* render recursively */}
        {file.type == 'dir' && file.sub && <div className='flex flex-col ml-8'>
            {Object.keys(file.sub).map(subDir => <FileStrip key={subDir} name={subDir} file={(file as any).sub[subDir]} />)}
        </div>}
    </div>
}

function TorrentFiles({ torrent }: { torrent: any }) {
    const files = useFilesystemParser(torrent.raw.files)

    return <div className='flex overflow-x-scroll scrollbar-none pt-3'>
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