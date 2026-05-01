import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useSubjectsMap = () => {
    const [subjectsMap, setSubjectsMap] = useState({});

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await fetch(`${API_URL}/subjects`);
                const data = await res.json();

                const map = {};
                data.forEach(subject => {
                    map[subject._id] = subject.name;
                });

                setSubjectsMap(map);
            } catch (e) {
                console.error("Failed to fetch subjects", e);
            }
        };

        fetchSubjects();
    }, []);

    return subjectsMap;
};

export default useSubjectsMap;