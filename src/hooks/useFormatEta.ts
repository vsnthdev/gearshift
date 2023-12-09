import { DateTime } from "luxon";
import { useMemo } from "react";

export function useFormatEta(seconds: number) {
    return useMemo(() => {
        const now = DateTime.now()
        const eta = DateTime.now().plus({ seconds })

        const diff = eta.diff(now)

        if (diff.as('days') > 1) {
            const days = Math.floor(diff.as('days'))
            return `${days} ${days == 1 ? 'day' : 'days'}`
        } else if (diff.as('hours') >= 1) {
            return `${Math.floor(diff.as('hours'))} hr`
        } else if (diff.as('minutes') >= 1) {
            return `${Math.floor(diff.as('minutes'))} min`
        } else {
            return `${Math.floor(diff.as('seconds'))} sec`
        }
    }, [seconds])
}