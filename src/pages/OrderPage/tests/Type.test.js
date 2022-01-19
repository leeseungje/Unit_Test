import { render, screen } from '@testing-library/react';
import Type from '../Type';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('제품 이미지가 서버에 있는지 확인', async () => {
    render(<Type orderType="products" />);

    // findAllByRole promise 리턴이 필요하므로 async, await가 필요하다.
    const productImages = await screen.findAllByRole('img', {
        name: /product$/i,
    });
    // toHaveLength 갯수가 같은지 확인
    expect(productImages).toHaveLength(3);
    const altText = productImages.map(element => element.alt);
    // toEqual 같은지 확인
    expect(altText).toEqual(['America product', 'England product', 'Korea product']);
});

test('서버에 옵션정보 가져오기', async () => {
    render(<Type orderType="options" />);

    // 체크박스 가져오기
    const optionCheckboxes = await screen.findAllByRole('checkbox');
    expect(optionCheckboxes).toHaveLength(2);
});

test('데이터가 없을때 error 체크', async () => {
    server.resetHandlers(
        rest.get('http://localhost:5000/producs', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(<Type orderType="products" />);

    const errorBanner = await screen.findByTestId('error-banner');
    expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});