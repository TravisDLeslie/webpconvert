// src/hooks/useFilePrefix.js
import { useState } from 'react';

const useFilePrefix = () => {
    const [prefix, setPrefix] = useState('');

    const generateFileName = (originalName) => {
        return `${prefix}${originalName}`;
    };

    return { setPrefix, generateFileName };
};

export default useFilePrefix;
