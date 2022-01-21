import { createContext, useMemo, useState } from "react"

const OrderContext = createContext();

export function OrderContextProvider(props) {
    const [orderCounts, setOderCounts] = useState({
        producs: new Map(),
        options: new Map(),
    })

    // useMemo 재사용해야하기 때문에 해당 Hook을 사용
    const value = useMemo(() => {
        return [{ ...orderCounts }]
    }, [orderCounts])

    return <OrderContext.Provider value={value} {...props} />
}