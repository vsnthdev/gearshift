import { filesize } from 'filesize'
import { Transmission } from '@ctrl/transmission'
import { useEffect, useMemo, useState } from 'react'
import { MagnetData, magnetDecode } from '@ctrl/magnet-link'
import { NewMagnetDetectedDialog, TorrentCard } from '../components'
import { DownloadCloud, File, HardDrive, UploadCloud } from 'lucide-react'

const client = new Transmission({
    baseUrl: `http://192.168.0.100:9091`,
    username: 'vsnthdev',
    password: 'vsnthdev'
})

export function Index() {
    // HOOKS
    const [torrents, setTorrents] = useState<any>([])
    const [freeSpace, setFreeSpace] = useState<any>()
    const [detectedMagnet, setDetectedMagnet] = useState<MagnetData>()

    // VALUES
    const totalDownloaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalDownloaded, 0)), [torrents])
    const totalUploaded = useMemo(() => filesize(torrents.reduce((total: number, torrent: any) => total + torrent.totalUploaded, 0)), [torrents])

    useEffect(() => {
        client.freeSpace().then(data => setFreeSpace(data.arguments))
        client.getAllData().then(data => setTorrents(data.torrents))

        setInterval(() => {
            client.getAllData().then(data => setTorrents(data.torrents))
        }, 1000)

        setInterval(() => {
            client.freeSpace().then(data => setFreeSpace(data.arguments))
        }, 3000)
    }, [])

    // enable clipboard magnet link capturing
    useEffect(() => {
        const magnets: string[] = torrents.map((torr: any) => torr.raw.magnetLink)

        const onFocus = () => {
            navigator.clipboard.readText().then(copiedText => {
                const decoded = magnets.map(magnet => magnetDecode(magnet).infoHash)
                const magnet = magnetDecode(copiedText)

                if (magnet.infoHash && !decoded.includes(magnet.infoHash)) {
                    setDetectedMagnet(magnet)
                }
            })
        }

        window.addEventListener('focus', onFocus)

        return () => {
            window.removeEventListener('focus', onFocus)
        }
    }, [torrents])

    const pauseTorrent = async (id: string) => await client.pauseTorrent(id)
    const resumeTorrent = async (id: string) => await client.resumeTorrent(id)

    return <>
        <div className='flex flex-col space-y-8'>
            <div className='grid grid-cols-3 mt-4 gap-6 max-w-xl lg:max-w-3xl text-sm md:mt-0 lg:grid-cols-4'>
                {/* metrics card */}
                <div className='col-span-1 relative overflow-hidden md:aspect-square md:bg-violet-300 md:text-violet-900 rounded-2xl text-center flex flex-col space-y-2 justify-center items-center md:text-left'>
                    {/* background pattern */}
                    <svg className='hidden md:block absolute inset-0 z-0 h-full' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='28.5' patternTransform='scale(1) rotate(140)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)' /><path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432' strokeWidth='5.5' stroke='hsla(0, 0%, 0%, 1)' fill='none' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,-160)' fill='url(#a)' /></svg>
                    <div className='hidden md:block absolute -top-10 left-0 right-0 bottom-0 w-full h-[150%] z-10 bg-gradient-to-tr from-violet-400 to-violet-400/80' />

                    <div className='flex justify-center items-center'>
                        <div className='p-3 flex bg-slate-200 dark:bg-neutral-950 md:bg-[#9B81E4] md:dark:bg-[#9B81E4] rounded-full z-30 md:absolute md:top-5 md:left-5'>
                            <DownloadCloud className='w-5 h-5 md:w-6 md:h-6' />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center md:items-start z-30 md:absolute md:bottom-5 md:left-5'>
                        <h4 className='font-semibold md:text-xl md:font-bold'>{totalDownloaded}</h4>
                        <p className='text-xs md:font-semibold md:text-base'>Downloaded</p>
                    </div>
                </div>
                <div className='col-span-1 relative md:aspect-square md:bg-emerald-300 md:text-emerald-900 overflow-hidden rounded-2xl text-center flex flex-col space-y-2 justify-center items-center'>
                    {/* background pattern */}
                    <svg className='hidden md:block absolute inset-0 z-0 h-full' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='28.5' patternTransform='scale(1) rotate(140)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)' /><path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432' strokeWidth='5.5' stroke='hsla(0, 0%, 0%, 1)' fill='none' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,-160)' fill='url(#a)' /></svg>
                    <div className='hidden md:block absolute -top-10 left-0 right-0 bottom-0 w-full h-[150%] z-10 bg-gradient-to-tr from-emerald-400 to-emerald-400/80' />

                    <div className='flex justify-center items-center'>
                        <div className='p-3 flex bg-slate-200 dark:bg-neutral-950 md:bg-[#35C28E] md:dark:bg-[#35C28E] rounded-full z-30 md:absolute md:top-5 md:left-5'>
                            <UploadCloud className='w-5 h-5 md:w-6 md:h-6' />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center md:items-start z-30 md:absolute md:bottom-5 md:left-5'>
                        <h4 className='font-semibold md:text-xl md:font-bold'>{totalUploaded}</h4>
                        <p className='text-xs md:font-semibold md:text-base'>Uploaded</p>
                    </div>
                </div>
                {freeSpace && <div className='col-span-1 relative md:aspect-square md:bg-cyan-300 md:text-cyan-900 overflow-hidden rounded-2xl text-center flex flex-col space-y-2 justify-center items-center'>
                    {/* background pattern */}
                    <svg className='hidden md:block absolute inset-0 z-0 h-full' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='28.5' patternTransform='scale(1) rotate(140)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)' /><path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432' strokeWidth='5.5' stroke='hsla(0, 0%, 0%, 1)' fill='none' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,-160)' fill='url(#a)' /></svg>
                    <div className='hidden md:block absolute -top-10 left-0 right-0 bottom-0 w-full h-[150%] z-10 bg-gradient-to-tr from-cyan-400 to-cyan-400/80' />

                    <div className='flex justify-center items-center'>
                        <div className='p-3 flex bg-slate-200 dark:bg-neutral-950 md:bg-[#26C3DA] md:dark:bg-[#26C3DA] rounded-full z-30 md:absolute md:top-5 md:left-5'>
                            <HardDrive className='w-5 h-5 md:w-6 md:h-6' />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center md:items-start z-30 md:absolute md:bottom-5 md:left-5'>
                        <h4 className='font-semibold md:text-xl md:font-bold'>{filesize(freeSpace['total_size'])}</h4>
                        <p className='text-xs md:font-semibold md:text-base'>Available</p>
                    </div>
                </div>}
                <div className='hidden col-span-1 relative md:aspect-square bg-white rounded-2xl text-center lg:flex flex-col space-y-2 justify-center items-center dark:bg-neutral-900'>
                    <div className='flex justify-center items-center'>
                        <div className='p-3 flex bg-black/5 rounded-full dark:bg-white/10'>
                            <File className='w-5 h-5 dark:text-neutral-300' />
                        </div>
                    </div>
                    <div className='px-4'>
                        <h4 className='font-semibold'>Drag & drop torrent files here or</h4>
                    </div>
                    <div className='flex'>
                        <button className='text-xs font-medium px-9 py-2 rounded-full transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-neutral-950 dark:hover:bg-neutral-800'>Browse</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='mb-4 ml-2'>
                    <h2 className='uppercase text-sm font-bold tracking-widest text-neutral-400'>Recent torrents</h2>
                </div>
                <div className='flex flex-col space-y-4 md:space-y-6'>
                    {torrents.map((torrent: any) => <TorrentCard
                        key={torrent.id}
                        torrent={torrent}
                        pauseTorrent={pauseTorrent}
                        resumeTorrent={resumeTorrent}
                    />)}
                </div>
            </div>
        </div>

        <NewMagnetDetectedDialog setDetectedMagnet={setDetectedMagnet} magnet={detectedMagnet} />
    </>
}