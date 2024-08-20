import { useState, useEffect } from 'react';

/**
 * Hook to detect when a specific key is pressed
 * @param targetKey The key to detect
 */
function useKeyPress(targetKey: string): boolean {
    // State for keeping track of whether the key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    // If key is pressed down, set to true
    function downHandler({ key }: KeyboardEvent): void {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // If key is released, set to false
    function upHandler({ key }: KeyboardEvent): void {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetKey]); // Re-run the effect if targetKey changes

    return keyPressed;
}

export default useKeyPress;