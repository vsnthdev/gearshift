import { VariantProps, cx } from 'cva'
import { cva } from '../utils/cva.config'

const infoCard = cva({
    base: 'relative col-span-1 flex flex-col  items-center justify-center space-y-2 overflow-hidden rounded-2xl text-center md:aspect-square md:text-left',
    variants: {
        color: {
            violet: 'md:bg-violet-300 md:text-violet-900',
            emerald: 'md:bg-emerald-300 md:text-emerald-900',
            cyan: 'md:bg-cyan-300 md:text-cyan-900'
        }
    },
    defaultVariants: {
        color: 'violet'
    }
})

interface InfoCardProps extends VariantProps<typeof infoCard> {
    plain?: boolean
    icon?: React.ReactNode
    value?: string
    text?: string
}

export function Infocard(props: InfoCardProps) {
    const { color, plain, icon, value, text } = props

    return <div className={infoCard({ color })}>
        {/* background design elements */}
        {!plain && <svg className='absolute inset-0 z-0 hidden h-full md:block' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='28.5' patternTransform='scale(1) rotate(140)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)' /><path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432' strokeWidth='5.5' stroke='hsla(0, 0%, 0%, 1)' fill='none' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,-160)' fill='url(#a)' /></svg>}
        {!plain && <div className={cx(
            // base styles
            'hidden md:block absolute -top-10 left-0 right-0 bottom-0 w-full h-[150%] z-10',

            // default violet, or explictly violet colored
            (color == 'violet' || !color) && 'bg-gradient-to-tr from-violet-400 to-violet-400/80',
            color == 'emerald' && 'bg-gradient-to-tr from-emerald-400 to-emerald-400/80',
            color == 'cyan' && 'bg-gradient-to-tr from-cyan-400 to-cyan-400/80'
        )} />}

        {icon && <div className='flex items-center justify-center'>
            <div className={cx(
                // base styles
                'p-3 flex bg-slate-200 dark:bg-neutral-950 rounded-full z-30 md:absolute md:top-5 md:left-5',

                // default violet, or explictly violet colored
                (color == 'violet' || !color) && 'md:bg-[#9B81E4] md:dark:bg-[#9B81E4]',
                color == 'emerald' && 'md:bg-[#35C28E] md:dark:bg-[#35C28E]',
                color == 'cyan' && 'md:bg-[#26C3DA] md:dark:bg-[#26C3DA]'
            )}>
                <span className='[&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6 '>
                    {icon}
                </span>
            </div>
        </div>}

        {value && <div className='z-30 flex flex-col items-center justify-center md:absolute md:bottom-5 md:left-5 md:items-start'>
            {value && <h4 className='font-semibold md:text-xl md:font-bold'>{value}</h4>}
            {text && <p className='text-xs md:text-base md:font-semibold'>{text}</p>}
        </div>}
    </div>
}