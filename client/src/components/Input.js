import styled from "styled-components"

// renders the input field for the form
const Input = ({type, placeholder, name, required, handleChange}) => {
    return (
        <StyledInput 
            type={type} 
            placeholder={placeholder} 
            required={required} 
            // send the text to form with handleChange
            onChange={(e) => handleChange(name, e.target.value)}
        />
    )
}

const StyledInput = styled.input`
    font-family: 'inter', sans-serif;
    font-size: 16px;
    border-radius: 48px;
    width: 300px;
    border: 2px solid #EEEFF4;
    padding: 12px;
    margin: 5px 10px;
`

export default Input