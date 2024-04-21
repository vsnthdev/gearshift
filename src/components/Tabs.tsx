import * as RTabs from '@radix-ui/react-tabs'

interface TabsProps {
    defaultTabId: string
    tabs: {
        name: string
        id: string
        icon: React.ReactNode
        content: React.ReactNode
    }[]
}

export function Tabs(props: TabsProps) {
    const { tabs, defaultTabId } = props

    return <RTabs.Root defaultValue={defaultTabId}>
        <RTabs.List className='flex flex-col'>
            <div className='flex text-slate-400 dark:text-neutral-400'>
                {tabs.map(tab => <RTabs.Trigger key={tab.id} value={tab.id} className='relative flex items-center space-x-2 rounded-t-md px-4 py-3 text-sm transition-colors after:transition-colors data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800 dark:data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-white'>
                    <div className='[&>svg]:size-4'>
                        {tab.icon}
                    </div>
                    <span>{tab.name}</span>
                </RTabs.Trigger>)}
            </div>

            <div className='-mt-1 flex grow flex-col rounded-md bg-slate-100 px-6 pb-8 pt-4 dark:bg-neutral-900'>
                {tabs.map(tab => <RTabs.Content key={tab.id} value={tab.id} className='flex grow flex-col'>{tab.content}</RTabs.Content>)}
            </div>
        </RTabs.List>
    </RTabs.Root>
}