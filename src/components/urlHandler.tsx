import React, { useEffect } from 'react';

type URLHandlerProps = {
    hash: string,
}

export const URLHandler = ({ hash }: URLHandlerProps) => {
    useEffect(() => {
        window.location.hash = hash;
    }, [hash]);
    return null;
}
