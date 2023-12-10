interface File {
    bytesCompleted: number
    length: number
    name: string
    splits?: string[]
}

export interface ParsedFile {
    [key: string]: {
        type: 'dir' | 'file'
        sub?: ParsedFile[]
        downloaded: number
        total: number
    }
}

export function useFilesystemParser(files: File[]): ParsedFile {
    const parsed: any = {}
    files = files.map(file => ({ ...file, splits: file.name.split('/').map(str => str.trim()).filter(Boolean) }))

    for (const file of files) {
        for (const index in file.splits) {
            const name = file.splits[+index]
            const previous = file.splits[+index - 1]

            if (previous) {
                if (parsed[previous]) {
                    parsed[previous] = { type: 'dir', sub: { ...parsed[previous].sub, ...{ [name]: { type: 'file', total: file.length, downloaded: file.bytesCompleted } } } }
                } else {
                    parsed[previous] = { sub: { [name]: { type: 'file', total: file.length, downloaded: file.bytesCompleted } } }
                }
            } else {
                if (!parsed[name]) {
                    parsed[name] = { type: 'file', total: file.length, downloaded: file.bytesCompleted }
                }
            }
        }
    }

    return parsed
}