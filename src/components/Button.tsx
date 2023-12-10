import { VariantProps } from 'cva'
import { cva, cx } from '../utils/cva.config'

const button = cva({
    base: 'mr-2 flex transform-gpu items-center space-x-2 rounded-full py-2 font-medium outline-none transition-all active:scale-95',
    variants: {
        variant: {
            secondaryDark: 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800/40 dark:text-neutral-100 dark:hover:bg-neutral-600',
            secondary: 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600',
            primary: 'bg-slate-700 text-slate-100 hover:bg-slate-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white',
            danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/30 dark:text-rose-200 dark:hover:bg-rose-500/50',
        },
        textSize: {
            normal: 'text-sm',
            small: 'text-xs'
        }
    },
    compoundVariants: [
        {
            textSize: 'small',
            className: 'font-semibold'
        }
    ],
    defaultVariants: {
        textSize: 'normal',
        variant: 'secondary',
    }
})

interface ButtonProps extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
    text?: string
    icon?: React.ReactNode
}

export function Button(props: ButtonProps) {
    const { text, icon, className, variant, ...rest } = props

    return <button
        type='button'
        className={cx(
            // base styles
            button({ className, variant }),

            // when only text is given
            !icon && text && 'px-4',

            // when only icon is given
            icon && !text && 'p-2',

            // when both icon & text exist
            icon && text && 'pr-4 pl-3'
        )}
        {...rest}
    >
        {icon && <span className={cx(
            // when both icon & text are given
            icon && text && '[&>svg]:w-4 [&>svg]:h-4',

            // when only icon is given
            !text && icon && '[&>svg]:w-5 [&>svg]:h-5'
        )}>{icon}</span>}
        {text && <span className='[&>svg]:h-4 [&>svg]:w-4'>{text}</span>}
    </button>
}