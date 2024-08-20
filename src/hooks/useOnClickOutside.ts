import { useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler): void {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;