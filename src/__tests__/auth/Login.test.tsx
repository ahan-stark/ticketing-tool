import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../../components/auth/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("Login Page", () => {
  beforeEach(() => {});
  test("login page should load", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const inpBox = screen.getAllByRole("textbox");
    const loginBtn = screen.getByTestId("logInBtn");
    const navigatToSignUp = screen.getByText(/New user ?/i);
    expect(inpBox.length).toBe(2);
    expect(loginBtn).toBeInTheDocument();
    expect(navigatToSignUp).toBeInTheDocument();
  });
  test("Login Empty field Submit Fail", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const loginBtn = screen.getByTestId("logInBtn");
    fireEvent.click(loginBtn);
    const errorMsg = screen.getByTestId("error-msg");
    expect(errorMsg).toBeInTheDocument();
  });
});
