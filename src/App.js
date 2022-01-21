import { OrderContextProvider } from './context/OrderContext';
import OrderPage from './pages/OrderPage/OrderPage';

function App() {
    return (
        <div style={{ padding: '4em' }}>
            <OrderContextProvider>
                <OrderPage />
            </OrderContextProvider>
        </div>
    );
}

export default App;
