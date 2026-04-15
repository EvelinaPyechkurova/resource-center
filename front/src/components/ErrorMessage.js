const ErrorMessage = ({ error }) => {
    return (
        <div className="errorMessage">
            <p>Please fix the following errors:</p>
            <ul>
                {Object.keys(error).map((key) => (
                    <li key={key}>{error[key]}</li>
                ))}
            </ul>
        </div>
    )
}
 
export default ErrorMessage;