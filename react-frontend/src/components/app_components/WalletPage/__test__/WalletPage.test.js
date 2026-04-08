import React from "react";
import { render, screen } from "@testing-library/react";

import WalletPage from "../WalletPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders wallet page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WalletPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("wallet-datatable")).toBeInTheDocument();
    expect(screen.getByRole("wallet-add-button")).toBeInTheDocument();
});
