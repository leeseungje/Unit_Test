import axios from 'axios'
import { useEffect, useState } from 'react'
import Products from "./Products"

const Type = ({ orderType }) => {
    const [items, setItems] = useState([])
    useEffect(() => {
        loadItems(orderType)
    }, [orderType])
    const loadItems = async (orderType) => {
        try {
            let response = await axios.get(`/${orderType}`);
            setItems(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }
    const ItemComponents = orderType === "products" ? Products : null;
    const optionItems = items.map((item) => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ))
    return (
        <>
            {optionItems}
        </>
    )
}
export default Type