import { useState } from 'react';

const useRegister = () => {
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        confirmPassword: false,
    });

    // function for getting key password visibility and changing its value by parameter
    // key can be 'password' or 'confirmPassword'
    const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
        setVisiblePassword({
            ...visiblePassword, // get previous state
            [key]: !visiblePassword[key], // set or update 'object state' by key from parameter
        });
    };

    return {
        visiblePassword,
        handleVisiblePassword
    }
}

export default useRegister;