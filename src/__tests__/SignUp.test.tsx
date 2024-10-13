import { fireEvent, render, screen } from "@testing-library/react";
import SignUpPage from "../components/auth/SignUpPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store/store";

describe("Sign Up Page", () => {
  test("Sign up screen should load", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>
    );
    const inpBox = screen.getAllByRole("textbox");
    const navigatToLogin = screen.getByText("Already have an account ?");
    expect(inpBox.length).toBe(2);
    expect(navigatToLogin).toBeInTheDocument();
  });
  test("Sign Up Empty field Submit Fail", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>
    );
    const signupBtn = screen.getByTestId("signInBtn");
    fireEvent.click(signupBtn);
    const errorMsg = screen.getByTestId("errorMsg");
    expect(errorMsg).toBeInTheDocument();
  });
});
