import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDialog from "./components/RecipeDialog";
import ElvenTreeBorders from "./components/ElvenTreeBorders";

function AppRoutes() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location } | null;

    return (
        <>
            <ElvenTreeBorders />
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<RecipeGrid />} />
                <Route path="/recipe/:id" element={<RecipeGrid />} />
            </Routes>

            {/* When navigated from the grid, show dialog over the grid */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/recipe/:id" element={<RecipeDialog />} />
                </Routes>
            )}

            {/* When navigated directly to a recipe URL (no background state) */}
            {!state?.backgroundLocation && (
                <Routes>
                    <Route path="/recipe/:id" element={<RecipeDialog />} />
                </Routes>
            )}
        </>
    );
}

export default function App() {
    // Use Vite's BASE_URL as the router basename so the app works when
    // deployed to a subpath (for example GitHub Pages at /MishosCookBook/).
    const routerBaseName = import.meta.env.BASE_URL ?? "/";

    return (
        <BrowserRouter basename={routerBaseName}>
            <AppRoutes />
        </BrowserRouter>
    );
}
