import { useState } from "react";

const FilterSidebar = ({fields, onSearch}) => {
    const [filters, setFilters] = useState(
        fields.reduce((acc, field) => ({...acc, [field.name]: ""}), {})
    );

    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    }

    const handleSearch = () => {
        const query = Object.keys(filters)
        .filter(key => filters[key])
        .map(key => `${key}=${encodeURIComponent(filters[key])}`)
        .join('&');
        onSearch(query);
    }

    return ( 
        <div className="filter-sidebar">
            <h3>Filters</h3>
            {fields.map(field => (
                <div className="filter" key={field.name}>
                    <label>{field.label.charAt(0).toUpperCase() + field.label.slice(1)}</label>
                    {Array.isArray(field.options) ? (
                        <select
                         name={field.name}
                         value={filters[field.name]}
                         onChange={handleChange}>
                            <option value=""></option>
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
                         type={field.type}
                         name={field.name}
                         value={filters[field.name]}
                         onChange={handleChange}                 
                        />
                    )}
                </div>
            ))}
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
 
export default FilterSidebar;