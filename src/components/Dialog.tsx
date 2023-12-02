import * as RDialog from '@radix-ui/react-dialog'
import { ArrowLeft, X } from 'lucide-react'
import { useState } from 'react'

export function useDialog() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(exi => !exi)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return { isOpen, toggle, open, close }
}

export interface DialogProps {
    title: string
    hideClose?: boolean
    control: ReturnType<typeof useDialog>
    children?: React.ReactNode
}

export function Dialog(props: DialogProps) {
    const { control, hideClose, title, children } = props
    const { isOpen, close } = control

    return <RDialog.Root open={isOpen}>
        <RDialog.Portal>
            {/* background overlay */}
            <RDialog.Overlay className='bg-black/50 backdrop-blur-md fixed inset-0 z-[990]' />

            <RDialog.Content className='fixed z-[999] inset-0 p-6 md:top-[50%] md:left-[50%] md:max-h-[85vh] md:w-[90vw] md:max-w-[450px] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-3xl bg-white dark:bg-neutral-800'>
                {/* dialog header */}
                <div className='flex space-x-3 items-center text-slate-700 dark:text-white'>
                    {/* mobile back button */}
                    <div className='flex items-center md:hidden'>
                        <RDialog.Close asChild>
                            <button onClick={close} className='p-2 transition-colors bg-slate-100 outline-none text-slate-600 dark:text-white hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-700 rounded-full'>
                                <ArrowLeft className='w-6 h-6' />
                            </button>
                        </RDialog.Close>
                    </div>

                    <div className="flex justify-between items-center grow">
                        <RDialog.Title className='text-2xl font-medium'>
                            {title}
                        </RDialog.Title>

                        {/* desktop close button */}
                        {hideClose || <div className='hidden items-center md:flex'>
                            <RDialog.Close asChild>
                                <button onClick={close} className='p-2 bg-slate-100 outline-none text-slate-600 dark:bg-neutral-900 rounded-full transition-colors dark:text-white hover:bg-slate-200 dark:hover:bg-neutral-700'>
                                    <X className='w-6 h-6' />
                                </button>
                            </RDialog.Close>
                        </div>}
                    </div>
                </div>

                {/* content */}
                <div className='grow flex flex-col space-y-2 w-full h-full px-1 pt-5 pb-6 md:px-3 md:pt-3'>
                    {children}
                </div>
            </RDialog.Content>
        </RDialog.Portal>
    </RDialog.Root>
}