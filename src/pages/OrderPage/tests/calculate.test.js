import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import Type from '../Type';
import OrderPage from '../OrderPage';

test('여행 상품과 옵션의 개수에 따라 가격을 계산해주기', async () => {
    // context 사용 시 wrapper를 감싸주어야 한다.
    render(<Type orderType="products" />);

    // 여행 상품 가격은 0원 부터 시작
    const productsTotal = screen.getByText('상품 총 가격:', { exact: false });
    expect(productsTotal).toHaveTextContent('0');

    // 아메리카 여행 상품 한개 올리기
    const americaInput = await screen.findByRole('spinbutton', {
        name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(productsTotal).toHaveTextContent('1000');

    // 잉글랜드 여행 상품 3개 올리기
    const englandInput = await screen.findByRole('spinbutton', {
        name: 'England',
    });
    userEvent.clear(englandInput);
    userEvent.type(englandInput, '3');
    expect(productsTotal).toHaveTextContent('4000');
});

test('옵션 가격을 더한 총 가격 테스트', async () => {
    render(<Type orderType="options" />);

    const optionsTotal = screen.getByText('옵션 총 가격:', { exact: false });
    expect(optionsTotal).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
        name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);
    expect(optionsTotal).toHaveTextContent('500');

    const dinnerCheckbox = await screen.findByRole('checkbox', {
        name: 'Dinner',
    });
    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('1000');

    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('500');
});

describe('상품 가격, 옵션 가격을 더한 촉 가격 구하기', () => {
    test('총 가격의 시작이 0 에서 상품 가격이 추가 되었을 경우 테스트', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });
        expect(total).toHaveTextContent('0');

        const americaInput = await screen.findByRole('spinbutton', {
            name: 'America',
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, '1');
        expect(total).toHaveTextContent('1000');
    });

    test('옵션 가격이 업데이트 되었을 경우 총 가격', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });

        const insuranceCheckbox = await screen.findByRole('checkbox', {
            name: 'Insurance',
        });
        userEvent.click(insuranceCheckbox);
        expect(total).toHaveTextContent('500');
    });

    test('모든 상품이 제거되었을 경우 총 가격 테스트', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });

        const insuranceCheckbox = await screen.findByRole('checkbox', {
            name: 'Insurance',
        });
        userEvent.click(insuranceCheckbox);

        const americaInput = await screen.findByRole('spinbutton', {
            name: 'America',
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, '3');

        userEvent.clear(americaInput);
        userEvent.type(americaInput, '1');

        expect(total).toHaveTextContent('1500');
    });
});
