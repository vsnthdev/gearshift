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
    children?: React.ReactNode
    disableBackdropClose?: boolean
    control: ReturnType<typeof useDialog>
}

export function Dialog(props: DialogProps) {
    const { control, hideClose, title, children, disableBackdropClose } = props
    const { isOpen, close } = control

    return <RDialog.Root open={isOpen}>
        <RDialog.Portal>
            {/* background overlay */}
            <RDialog.Overlay className='fixed inset-0 z-[990] bg-black/50 backdrop-blur-md' onClick={() => disableBackdropClose || close()} />

            <RDialog.Content className='fixed inset-0 z-[999] bg-white p-6 dark:bg-neutral-800 md:inset-auto md:left-[50%] md:top-[50%] md:max-h-[85vh] md:w-[90vw] md:max-w-[450px] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-3xl lg:max-w-[650px]'>
                {/* dialog header */}
                <div className='flex items-center space-x-3 text-slate-700 dark:text-white'>
                    {/* mobile back button */}
                    <div className='flex items-center md:hidden'>
                        <RDialog.Close asChild>
                            <button onClick={close} className='rounded-full bg-slate-100 p-2 text-slate-600 outline-none transition-colors hover:bg-slate-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-700'>
                                <ArrowLeft className='h-6 w-6' />
                            </button>
                        </RDialog.Close>
                    </div>

                    <div className="flex grow items-center justify-between">
                        <RDialog.Title className='text-2xl font-medium'>
                            {title}
                        </RDialog.Title>

                        {/* desktop close button */}
                        {hideClose || <div className='hidden items-center md:flex'>
                            <RDialog.Close asChild>
                                <button onClick={close} className='rounded-full bg-slate-100 p-2 text-slate-600 outline-none transition-colors hover:bg-slate-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-700'>
                                    <X className='h-6 w-6' />
                                </button>
                            </RDialog.Close>
                        </div>}
                    </div>
                </div>

                {/* content */}
                <div className='flex h-full w-full grow flex-col space-y-2 px-1 pt-5 md:p-3'>
                    {children}
                </div>
            </RDialog.Content>
        </RDialog.Portal>
    </RDialog.Root>
}