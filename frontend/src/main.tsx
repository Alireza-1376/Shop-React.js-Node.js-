import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import CartProvider from "./context/CartContext"
const root = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <CartProvider>
            <App />
        </CartProvider>
    </BrowserRouter>
)