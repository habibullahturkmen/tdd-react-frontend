const Input = (props) => {
    const { id, type, label, onChange, help } = props;
    let inputClass = "form-control";
    if (help) {
        inputClass += " is-invalid";
    }
    return (
        <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input id={id} type={type || "text"} className={inputClass} onChange={onChange} />
        <span className="invalid-feedback">{help}</span>
    </div>
    );
};

export default Input;