import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import ErrorBanner from '../../components/ErrorBanner';
import Products from './Products';
import Options from './Options';
import styled, { css } from 'styled-components';
import { OrderContext } from '../../context/OrderContext';

const StyledOption = styled.div`
    display: flex;
    ${props =>
        props.name === 'options'
            ? css`
                  flex-direction: column;
              `
            : css`
                  gap: 10px;
              `}
`;

const Type = ({ orderType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDatas, updateItemCount] = useContext(OrderContext);

    useEffect(() => {
        loadItems(orderType);
    }, [orderType]);
    const loadItems = async orderType => {
        try {
            let response = await axios.get(`http://localhost:5000/${orderType}`);
            setItems(response.data);
        } catch (e) {
            setError(true);
        }
    };
    if (error) {
        return <ErrorBanner message="에러가 발생했습니다." />;
    }
    const ItemComponents = orderType === 'products' ? Products : Options;
    const optionItems = items.map(item => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, orderType)}
        />
    ));
    let orderTypeKorean = orderType === 'products' ? '상품' : '옵션';
    return (
        <>
            <h2>주문 종류 </h2>
            <p>하나의 가격</p>
            <p>
                {orderTypeKorean} 총 가격:{orderDatas.totals[orderType]}
            </p>
            <StyledOption name={orderType}>{optionItems}</StyledOption>
        </>
    );
};
export default Type;
