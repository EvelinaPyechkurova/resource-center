import { useState } from "react";

const FilterSidebar = ({ fields, onSearch }) => {
    const [filters, setFilters] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        const query = Object.keys(filters)
            .filter(key => filters[key])
            .map(key => `${key}=${encodeURIComponent(filters[key])}`)
            .join('&');

        onSearch(query);
    };

    return ( 
        <div className="filter-sidebar">

            {fields.map(field => (
                <div className="filter" key={field.name}>

                    {Array.isArray(field.options) ? (
                        <select
                            name={field.name}
                            value={filters[field.name]}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>
                                {field.label}
                            </option>

                            {field.options.map(option =>
                                typeof option === "object" ? (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ) : (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )
                            )}
                        </select>
                    ) : (
                        <input 
                            type={field.type || "text"}
                            name={field.name}
                            value={filters[field.name]}
                            onChange={handleChange}
                            placeholder={field.label}
                        />
                    )}

                </div>
            ))}

            <button onClick={handleSearch}>Filter</button>
        </div>
    );
};
 
export default FilterSidebar;