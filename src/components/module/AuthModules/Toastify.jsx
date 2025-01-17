// toastifySetup.js
import { toast } from 'react-toastify';

const showToast = (message, type) => {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: 'rtl-toast',
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        case 'warn':
            toast.warn(message, options);
            break;
        default:
            toast(message, options);
    }
};

export { showToast };
