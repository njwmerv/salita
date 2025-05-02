import {ReactNode} from 'react';

interface ModalProps{
    isOpen: boolean,
    children: ReactNode
}

export default function Modal({isOpen, children}: ModalProps){
    // Render
    return (isOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center w-dvw h-dvh m-auto bg-black/60">
            {children}
        </div>
    );
}