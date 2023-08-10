import { useCallback, useRef } from 'react';

const useDebounce = (delay = 500) => {
    const timeout = useRef();
    return useCallback(
        (callback, overideDelay) => {
            clearTimeout(timeout.current);
            timeout.current = setTimeout(callback, overideDelay || delay);
        },
        [delay],
    );
};

export default useDebounce;
