import { VariantProps } from 'cva'
import { cva, cx } from '../utils/cva.config'

const boxButton = cva({
    base: 'flex flex-col items-center text-sm justify-center space-y-1 w-20 rounded-xl transition-all outline-none font-medium transform-gpu active:scale-95',
    variants: {
        variant: {
            secondaryDark: 'text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-neutral-100 dark:bg-neutral-800/40 dark:hover:bg-neutral-600',
            danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/30 dark:text-rose-200 dark:hover:bg-rose-500/50'
        }
    },
    defaultVariants: {
        variant: 'secondaryDark'
    }
})

interface BoxButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof boxButton> {
    text?: string
    icon?: React.ReactNode
}

export function BoxButton(props: BoxButtonProps) {
    const { className, text, icon, variant, ...rest } = props

    return <button
        type='button'
        className={boxButton({ className, variant })}
        {...rest}
    >
        {icon && <div className={cx(
            // when both text & icon are given
            text && '[&>svg]:w-4 [&>svg]:h-4 [&>svg]:aspect-square',

            // when there no text, but only icon
            !text && '[&>svg]:w-5 [&>svg]:h-5 [&>svg]:aspect-square'
        )}>
            {icon}
        </div>}
        {text && <span className='w-full'>{text}</span>}
    </button>
}