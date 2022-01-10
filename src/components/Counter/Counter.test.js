import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

test('the Counter Starts at 0', () => {
    render(<Counter />);
    // screen object를 이용해서 원하는 엘레멘트에 접근(접근할 때 id로)
    const counterElement = screen.getByTestId('counter');
    // id가 counter인 엘레멘트의 텍스트가 0인지 테스트
    expect(counterElement).toHaveTextContent(0);
});

test('플러스 버튼에 "+" 버튼인지 체크', () => {
    render(<Counter />);

    const buttonElement = screen.getByTestId('plus-button');
    expect(buttonElement).toHaveTextContent('+');
});

test('플러스 버튼에 "-" 버튼인지 체크', () => {
    render(<Counter />);

    const buttonElement = screen.getByTestId('minus-button');
    expect(buttonElement).toHaveTextContent('-');
});

test('플러스버튼을 눌렀을 시 1로 바뀌었는지 확인', () => {
    render(<Counter />);
    const buttonElement = screen.getByTestId('plus-button');
    // click plus button
    fireEvent.click(buttonElement);
    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent(1);
});

test('마이너스버튼을 눌렀을 시 -1로 바뀌었는지 확인', () => {
    render(<Counter />);
    const buttonElement = screen.getByTestId('minus-button');
    // click minus button
    fireEvent.click(buttonElement);
    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent(-1);
});

test('on/off버튼 색상이 파란색인지 확인', () => {
    render(<Counter />);
    const buttonElement = screen.getByTestId('on/off-button');
    expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('on/off버튼을 눌렀을 경우 비활성화가 되는지 확인', () => {
    render(<Counter />);
    const buttonElement = screen.getByTestId('on/off-button');
    // click plus button
    fireEvent.click(buttonElement);
    const plusButtonElement = screen.getByTestId('plus-button');
    const minusButtonElement = screen.getByTestId('minus-button');
    expect(plusButtonElement && minusButtonElement).toBeDisabled();
});
