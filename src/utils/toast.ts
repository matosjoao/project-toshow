import { toast } from 'react-toastify';

export const toastError = (message: string) => {
    toast.error(message, {
        theme: "colored",
        autoClose: 5000,
        pauseOnFocusLoss: false,
    });
};

export const toastSuccess = (message: string, onClose?: () => void) => {
    toast.success(message, {
        theme: "colored",
        onClose: onClose ? onClose : () => {},
        autoClose: 3000,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
    });
};