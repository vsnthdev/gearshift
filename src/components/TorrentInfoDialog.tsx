import { Tabs } from './Tabs'
import { Dialog, DialogProps } from './Dialog'
import { File, Info, Magnet } from 'lucide-react'

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
                    content: <h3 className='text-3xl'>Info</h3>
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