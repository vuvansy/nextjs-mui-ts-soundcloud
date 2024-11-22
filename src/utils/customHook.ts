import { useState, useEffect } from 'react';

//Hook trả ra giá trị là true nếu component đã render và ngược lại trả ra là false

export const useHasMounted = () => {

    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}