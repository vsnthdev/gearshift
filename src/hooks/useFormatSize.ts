import { useMemo } from 'react'
import { filesize } from 'filesize'

export function useFormatSize(inputSize: number, hideRate?: boolean) {
    return useMemo(() => hideRate ? filesize(inputSize) : `${filesize(inputSize)}/s`, [inputSize, hideRate])
}