import { filesize } from "filesize";
import { useMemo } from "react";

export function useFormatSize(inputSize: number, hideRate?: boolean) {
    return useMemo(() => hideRate ? filesize(inputSize) : `${filesize(inputSize)}/s`, [inputSize, hideRate])
}