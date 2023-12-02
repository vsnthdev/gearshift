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
    const { defaultTabId, tabs } = props

    return <RTabs.Root defaultValue={defaultTabId}>
        <RTabs.List className='flex flex-col space-y-4'>
            <div className='flex space-x-2 text-slate-400 dark:text-neutral-400'>
                {tabs.map(tab => <RTabs.Trigger key={tab.id} value={tab.id} className='relative transition-colors flex items-center space-x-2 after:transition-colors data-[state=active]:text-slate-800 dark:data-[state=active]:text-white px-3 py-3 after:h-0.5 after:absolute after:bottom-0 after:rounded-full after:left-0 after:right-0 data-[state=active]:after:bg-slate-800 dark:data-[state=active]:after:bg-white after:bg-transparent'>
                    <div className='[&>svg]:w-4 [&>svg]:h-4'>
                        {tab.icon}
                    </div>
                    <span>{tab.name}</span>
                </RTabs.Trigger>)}
            </div>

            <div>
                {tabs.map(tab => <RTabs.Content value={tab.id}>{tab.content}</RTabs.Content>)}
            </div>
        </RTabs.List>
    </RTabs.Root>
}