const Form = ({
    fields,
    handleSubmit,
    isLoading,
    submitLabel = "Submit",
    helperText
}) => {
    return (
        <form className="form" onSubmit={handleSubmit}>

            {/* FIELDS */}
            <div className="form-fields">
                {fields.map(field => (
                    <div className="form-field" key={field.name}>

                        {/* LABEL (optional for radio) */}
                        {field.type !== "radio" && (
                            <label className="form-label">
                                {field.label}
                            </label>
                        )}

                        {/* RADIO GROUP */}
                        {field.type === "radio" && (
                            <div className="form-radio-group">
                                {field.options.map((option, index) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`form-radio-option ${
                                            field.value === option.value ? "active" : ""
                                        }`}
                                        onClick={() =>
                                            field.onChange({
                                                target: {
                                                    name: field.name,
                                                    value: option.value
                                                    }
                                                })
                                            }
                                        >
                                    {option.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* SELECT */}
                        {field.type === "select" && (
                            <select
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                required={field.required}
                                className="form-input"
                            >
                                <option value="">{field.label}</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* INPUT (text/password/etc) */}
                        {(
    !field.type ||
    field.type === "text" ||
    field.type === "password" ||
    field.type === "email" ||
    field.type === "datetime-local"
) && (
    <div className="form-input-wrapper">
        {field.icon && (
            <span className="form-icon">
                {field.icon}
            </span>
        )}
        <input
            type={field.type || "text"}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            placeholder={field.placeholder || ""}
            className="form-input"
        />
    </div>
)}
                    </div>
                ))}
            </div>

            {/* SUBMIT */}
            <button className="form-submit" type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : submitLabel}
            </button>

            {/* HELPER TEXT */}
            {helperText && (
                <div className="form-helper">
                    {helperText}
                </div>
            )}
        </form>
    );
};

export default Form;