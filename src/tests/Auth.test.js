import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Auth from "./Auth";
import { login, logout } from "../redux/slices/userSlice";

const mockStore = configureStore([]);

describe("Auth Component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      user: {
        isAuthenticated: false,
        userInfo: null,
      },
    });

    history = createMemoryHistory();
  });

  test("should dispatch login action on form submit", async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Assuming login action sets isAuthenticated to true
    await waitFor(() => {
      expect(store.getActions()).toContainEqual(login());
      expect(history.location.pathname).toBe("/");
    });
  });

  test("should dispatch logout action on button click", async () => {
    store = mockStore({
      user: {
        isAuthenticated: true,
        userInfo: { email: "test@example.com", name: "Test User" },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(logout());
      expect(history.location.pathname).toBe("/");
    });
  });
});
