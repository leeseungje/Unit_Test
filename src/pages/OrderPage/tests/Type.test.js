import { render, screen } from "@testing-library/react"
import Type from "../Type"

test("제품 이미지가 서버에 있는지 확인", async () => {
    render(<Type orderType="products" />)

    // findAllByRole promise 리턴이 필요하므로 async, await가 필요하다.
    const productImages = await screen.findAllByRole("img", {
        name: /product$/i
    })
    // toHaveLength 갯수가 같은지 확인
    expect(productImages).toHaveLength(3)
    const altText = productImages.map((element) => element.alt);
    // toEqual 같은지 확인
    expect(altText).toEqual(["America product", "England product", "Korea product"])
})