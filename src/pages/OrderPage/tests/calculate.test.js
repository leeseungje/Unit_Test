import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Type from "../Type"

test('여행 상품과 옵션의 개수에 따라 가격을 계산해주기', async () => {
    render(<Type orderType="products" />)

    // 여행 상품 가격은 0원 부터 시작
    const productsTotal = screen.getByText("상품 총 가격: ", { exact: false })
    expect(productsTotal).toHaveTextContent("0")

    // 아메리카 여행 상품 한개 올리기
    const americaInput = await screen.findByRole("spinbutton", {
        name: "America",
    })
    userEvent.clear(americaInput)
    userEvent.type(americaInput, "1");
    expect(productsTotal).toHaveTextContent("1000")

    // 잉글랜드 여행 상품 3개 올리기
    const englandInput = await screen.findByRole("spinbutton", {
        name: "England",
    })
    userEvent.clear(englandInput)
    userEvent.type(englandInput, "3");
    expect(productsTotal).toHaveTextContent("4000")
})
