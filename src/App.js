import { useState } from 'react';
import { OrderContextProvider } from './context/OrderContext';
import OrderPage from './pages/OrderPage/OrderPage';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import CompletePage from './pages/CompletePage/CompletePage';

function App() {
    const [step, setStep] = useState(0);
    return (
        <div style={{ padding: '4em' }}>
            <OrderContextProvider>
                {step === 0 && <OrderPage setStep={setStep} />}
                {step === 1 && <SummaryPage setStep={setStep} />}
                {step === 2 && <CompletePage setStep={setStep} />}
            </OrderContextProvider>
        </div>
    );
}

export default App;
