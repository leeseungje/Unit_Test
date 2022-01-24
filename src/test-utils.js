import { render } from "@testing-library/react"
import { OrderContextProvider } from "./context/OrderContext"

const customRender = (ui, options) => {
    render(ui, { wrapper: OrderContextProvider, ...options })
}

// customRender를 부르는 모든 라이브러리를 export 시킨다.
export * from '@testing-library/react'

// customRender로 오버라이드 시킨다.
export { customRender as render }

// customRender로 사용하되 그 이름은 render로 사용 한다.