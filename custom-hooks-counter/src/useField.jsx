import { useState } from "react";

// Type = form field type (text, date, number...)
const useField = (type) => {
    const [ value, setValue ] = useState("");
    // value and the function to update the value

    const onChange = (e) => setValue(e.target.value);
    // When change happens use the function to update value to the new value

    // Return object
    return {
        type,
        value,
        onChange,
    };
};

export default useField;