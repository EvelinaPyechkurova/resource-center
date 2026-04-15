const Form = ({ fields, handleSubmit, isLoading }) => {
    return (
        <form onSubmit={ handleSubmit }>
            {fields.map(field => (
                <div key={field.name}>
                    <label>{field.label}</label>
                    {Array.isArray(field.options) ? (
                        <select
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            required={field.required}
                        >
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
                            value={field.value}
                            onChange={field.onChange}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
            </button>
        </form>
    );
};

export default Form;