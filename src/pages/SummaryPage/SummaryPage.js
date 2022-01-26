import { useContext, useState } from 'react';
import styled from 'styled-components';
import { OrderContext } from '../../context/OrderContext';

const StyledForm = styled.form``;

const SummaryPage = ({ setStep }) => {
    const [orderDatas] = useContext(OrderContext);
    const [checked, setChecked] = useState(false);

    const hasOption = orderDatas.options.size > 0;
    let optionsRender = null;

    // Array.from() Map에서 배열 만들기
    const productArray = Array.from(orderDatas.products);
    const productList = productArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    if (hasOption) {
        const optionArray = Array.from(orderDatas.options.keys());
        const optionList = optionArray.map(key => <li key={key}>{key}</li>);
        optionsRender = (
            <>
                <h2>옵션: {orderDatas.totals.options}</h2>
                <ul>{optionList}</ul>
            </>
        );
    } else {
        return <>{optionsRender}</>;
    }

    const handleSubmit = event => {
        event.preventDefault();
        setStep(2);
    };

    return (
        <>
            <h1>주문 확인</h1>
            <h2>여행 상품: {orderDatas.totals.products}</h2>
            <ul>{productList}</ul>
            {optionsRender}
            <StyledForm onSubmit={handleSubmit}>
                <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} id="confirm-checkbox" />
                <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
                <br />
                <button onClick={() => setStep(2)} disabled={!checked} type="submit">
                    주문 확인
                </button>
            </StyledForm>
        </>
    );
};
export default SummaryPage;
