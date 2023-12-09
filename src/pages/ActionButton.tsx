import { BoxButton, Button } from "../components";

export function ActionButton({ icon, name, onClick, variant }: { variant: 'secondaryDark' | 'danger', icon: React.ReactNode, name: string, onClick: () => any }) {
    return <>
        <Button
            icon={icon}
            text={name}
            variant={variant}
            onClick={onClick}
            className='lg:hidden'
        />
        <BoxButton
            icon={icon}
            text={name}
            variant={variant}
            onClick={onClick}
            className='hidden lg:flex'
        />
    </>
}