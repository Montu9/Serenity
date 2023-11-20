import { Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "./pages/public/";
import Welcome from "./pages/dashboard/welcome/Welcome";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/layout/RequireAuth";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* Protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/welcome" element={<Welcome />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
