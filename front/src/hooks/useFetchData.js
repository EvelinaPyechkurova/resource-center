import { useState, useEffect } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch(url, { signal: abortCont.signal });

                if(!res.ok)
                    throw Error(`Could not fetch the data for ${url}`);

                const data = await res.json();
                setData(data);
                setError(null);
            } catch(e) {
                if(e.name === 'AbortError') 
                    console.log('Fetch aborted');
                else 
                    setError(e.message);

            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
            
        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetchData;