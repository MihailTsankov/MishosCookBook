import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import "./i18n";

export interface RenderWithProvidersOptions {
    initialEntries?: string[];
    routePath?: string;
}

function createTestWrapper(
    userInterface: ReactElement,
    { initialEntries = ["/"], routePath }: RenderWithProvidersOptions = {},
) {
    return function TestWrapper() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MemoryRouter initialEntries={initialEntries}>
                    {routePath ? (
                        <Routes>
                            <Route path={routePath} element={userInterface} />
                        </Routes>
                    ) : (
                        userInterface
                    )}
                </MemoryRouter>
            </ThemeProvider>
        );
    };
}

export function renderWithProviders(
    userInterface: ReactElement,
    options: RenderWithProvidersOptions = {},
) {
    const Wrapper = createTestWrapper(userInterface, options);
    return render(<Wrapper />);
}

export { default as userEvent } from "@testing-library/user-event";
export { screen, within, waitFor } from "@testing-library/react";




