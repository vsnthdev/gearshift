import { useState } from 'react'
import { Dialog } from './Dialog'
import { Button } from './Button'
import { MagnetData } from '@ctrl/magnet-link'
import { BanIcon, PlusCircleIcon } from 'lucide-react'

export function useNewMagnetDetected() {
    const [detectedMagnet, setDetectedMagnet] = useState<MagnetData>()
    const [detectedMagnets, setDetectedMagnets] = useState<string[]>([])

    return {
        detectedMagnet,
        detectedMagnets,
        setDetectedMagnet,
        setDetectedMagnets,
    }
}

export function NewMagnetDetectedDialog(props: ReturnType<typeof useNewMagnetDetected>) {
    const { detectedMagnet, setDetectedMagnet } = props

    const dummy = () => true
    const close = () => setDetectedMagnet(undefined)

    return <Dialog title='New magnet link' control={{ close, open: dummy, toggle: dummy, isOpen: Boolean(detectedMagnet) }}>
        {detectedMagnet?.dn && <div className='flex flex-col space-y-8 md:space-y-4 text-slate-700 dark:text-neutral-300'>
            <p className='break-all md:py-2'>Would you like to add <strong className='font-semibold text-black dark:text-white'>{detectedMagnet.dn}</strong> which is in your clipboard?</p>

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