import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Layout from "./components/layout/Layout";
import PublicLayout from "./components/layout/PublicLayout";
import RequireAuth from "./components/layout/RequireAuth";
import { SecuritySettings } from "./pages/dashboard/securitySettings.tsx/SecuritySettings";
import Welcome from "./pages/dashboard/welcome/Welcome";
import { Home, Login, Register } from "./pages/public/";
import { ProfileSettings } from "./pages/dashboard/profileSettings.tsx/ProfileSettings";
import { UserSettings } from "./pages/dashboard/userSettings/UserSettings";

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
                    <Route path="/settings" element={<UserSettings />}>
                        <Route index element={<ProfileSettings />} />
                        <Route path="security" element={<SecuritySettings />} />
                    </Route>
                    <Route path="/dashboard/:id" element={<DashboardLayout />}>
                        {/* <Route path="" element={} /> */}
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
