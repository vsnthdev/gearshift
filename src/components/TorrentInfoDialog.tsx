import { Dialog, DialogProps } from './Dialog'

interface TorrentInfoDialogProps extends Omit<DialogProps, 'children' | 'hideClose'> {
    torrent: any
}

export function TorrentInfoDialog(props: TorrentInfoDialogProps) {
    const { control, torrent } = props

    return <Dialog
        title='Torrent info'
        control={control}
    >
        <div className='overflow-scroll'>
            <pre>{JSON.stringify(torrent, null, 4)}</pre>
        </div>
    </Dialog>
}