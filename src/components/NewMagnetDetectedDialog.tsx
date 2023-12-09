import { Dialog } from './Dialog'
import { Button } from './Button'
import { MagnetData } from '@ctrl/magnet-link'
import { BanIcon, PlusCircleIcon } from 'lucide-react'

interface NewMagnetDetectedDialogProps {
    magnet: MagnetData | undefined
    setDetectedMagnet: React.Dispatch<React.SetStateAction<MagnetData | undefined>>
}

export function NewMagnetDetectedDialog(props: NewMagnetDetectedDialogProps) {
    const { magnet, setDetectedMagnet } = props

    const dummy = () => true
    const close = () => setDetectedMagnet(undefined)

    return <Dialog title='New magnet link' control={{ close, open: dummy, toggle: dummy, isOpen: Boolean(magnet) }}>
        {magnet?.dn && <div className='flex flex-col space-y-8 md:space-y-4 text-slate-700 dark:text-neutral-300'>
            <p className='break-all md:py-2'>Would you like to add <strong className='font-semibold text-black dark:text-white'>{magnet.dn}</strong> which is in your clipboard?</p>

            <div className='flex space-x-2'>
                <Button
                    text='Cancel'
                    variant='secondary'
                    icon={<BanIcon />}
                    onClick={close}
                />
                <Button
                    text='Add now'
                    variant='primary'
                    icon={<PlusCircleIcon />}
                />
            </div>
        </div>}
    </Dialog>
}