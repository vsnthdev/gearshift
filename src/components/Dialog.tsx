import * as RDialog from '@radix-ui/react-dialog'
import { ArrowLeft, X } from 'lucide-react'
import { useState } from 'react'

export function useDialog() {
    const [isOpen, setIsOpen] = useState(true)

    const toggle = () => setIsOpen(exi => !exi)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return { isOpen, toggle, open, close }
}

export function Dialog({ control, hideClose, title }: { title: string, hideClose?: boolean, control: ReturnType<typeof useDialog> }) {
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
                            <button onClick={close} className='p-2 bg-slate-100 outline-none text-slate-600 dark:text-white hover:bg-slate-200 dark:bg-black/30 rounded-full'>
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
                                <button onClick={close} className='p-2 bg-slate-100 outline-none text-slate-600 dark:bg-black/30 rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-neutral-700'>
                                    <X className='w-6 h-6' />
                                </button>
                            </RDialog.Close>
                        </div>}
                    </div>
                </div>
            </RDialog.Content>
        </RDialog.Portal>
    </RDialog.Root>
}