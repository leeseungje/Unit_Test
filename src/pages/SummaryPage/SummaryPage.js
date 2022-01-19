import { useState } from "react"
import styled from "styled-components"

const StyledForm = styled.form``

const SummaryPage = () => {
    const [checked, setChecked] = useState(false)
    return (
        <>
            <StyledForm>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id="confirm-checkbox"
                />
                <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
                <br />
                <button disabled={!checked} type="submit">주문 확인</button>
            </StyledForm>
        </>
    )
}
export default SummaryPage