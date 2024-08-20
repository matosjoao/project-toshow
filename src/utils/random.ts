export const generateUUID = () => {
    const crypto = window.crypto || window.msCrypto; // for compatibility with IE
    if (!crypto) {
        console.error("Your browser doesn't support crypto API");
        return null;
    }
    
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);
    
    const uuid = array[0].toString(16).padStart(8, '0') +
                 array[1].toString(16).padStart(8, '0') +
                 '-' +
                 array[2].toString(16).padStart(8, '0') +
                 array[3].toString(16).padStart(8, '0');
    
    return uuid;
};