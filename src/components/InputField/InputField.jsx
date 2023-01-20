import "./inputField.scss"

const InputField = ({
    type,
    placeholder,
    name,
    additionalClass,
    validationMessage,
    validation,
    errors,
    disabled,
    onChange,
    value
}) => {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`InputField
                    ${errors?.[name] && "Input--error"}
                    ${additionalClass && additionalClass}
                `}
                value={value}
                ref={validation}
                disabled={disabled}
                onChange={onChange}
            />
            {errors?.[name] && (
                <p className="InputField__label">{validationMessage}</p>
            )}
        </>
    )
}

export default InputField
