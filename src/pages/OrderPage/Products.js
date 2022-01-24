import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    text-align: center;
    img {
        width: 234px;
        height: 161px;
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    vertical-align: top;
    text-align: left;
`


const Products = ({ name, imagePath, updateItemCount }) => {
    const handleChange = (event) => {
        const currentValue = event.target.value;
        updateItemCount(name, currentValue)
    }
    return (
        <StyledWrapper>
            <img src={`${imagePath}`} alt={`${name} product`} />
            <StyledForm>
                <label htmlFor={name}>{name}</label>
                <input id={name} type="number" name="quantity" min="0" defaultValue={0} onChange={handleChange} />
            </StyledForm>
        </StyledWrapper>
    );
};

export default Products;
