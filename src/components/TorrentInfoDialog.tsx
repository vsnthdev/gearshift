import { Tabs } from './Tabs'
import { DateTime } from 'luxon'
import { filesize } from 'filesize'
import { Dialog, DialogProps } from './Dialog'
import { File, Info, Magnet } from 'lucide-react'

function TorrentInfo({ torrent }: { torrent: any }) {
    const availability = Number(torrent.totalDownloaded / torrent.totalSize * 100).toFixed(2)
    const lastActiveOn = DateTime.fromSeconds(torrent.raw.activityDate).toRelative()

    return <div className='flex flex-col space-y-4'>
        {/* basic info */}
        <div className='flex flex-col space-y-2'>
            <h5 className='uppercase tracking-wider font-semibold opacity-50'>Basic</h5>
            <div className="text-sm flex flex-wrap gap-6">
                <div className='flex flex-col'>
                    <span className='opacity-50 uppercase font-semibold text-xs'>Name</span>
                    <span>{torrent.name}</span>
                </div>
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
                    content: <h3 className='text-3xl'>Files</h3>
                },
                {
                    id: 'peers',
                    name: 'Peers',
                    icon: <Magnet />,
                    content: <h3 className='text-3xl'>Peers</h3>
                }
            ]}
        />
    </Dialog>
}