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
        <RTabs.List className='flex flex-col'>
            <div className='flex text-slate-400 dark:text-neutral-400'>
                {tabs.map(tab => <RTabs.Trigger key={tab.id} value={tab.id} className='relative text-sm transition-colors flex items-center space-x-2 after:transition-colors data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800 dark:data-[state=active]:text-white dark:data-[state=active]:bg-neutral-900 px-4 py-3 rounded-t-md'>
                    <div className='[&>svg]:w-4 [&>svg]:h-4'>
                        {tab.icon}
                    </div>
                    <span>{tab.name}</span>
                </RTabs.Trigger>)}
            </div>

            <div className='flex flex-col grow pt-4 pb-8 px-6 rounded-md -mt-1 bg-slate-100 dark:bg-neutral-900'>
                {tabs.map(tab => <RTabs.Content value={tab.id}>{tab.content}</RTabs.Content>)}
            </div>
        </RTabs.List>
    </RTabs.Root>
}