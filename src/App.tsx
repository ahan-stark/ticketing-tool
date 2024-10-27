import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import Homepage from "./components/home/Homepage";
import CreateNewTicket from "./components/home/createTicket/CreateNewTicket";
import DisplayTickets from "./components/home/displayTicket/DisplayTickets";
import DisplayResolvedTicket from "./components/home/displayResolvedTicket/DisplayResolvedTicket";

function App() {
  const Layout = () => {
    return (
      <>
        <Provider store={store}>
          <Header />
          <Outlet></Outlet>
        </Provider>
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/signin",
          element: <SignUpPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/home",
          element: <Homepage />,
        },
        {
          path: "/create-ticket",
          element: <CreateNewTicket />,
        },
        {
          path: "/display-tickets",
          element: <DisplayTickets />,
        },
        {
          path: "/resolved-tickets",
          element: <DisplayResolvedTicket />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
