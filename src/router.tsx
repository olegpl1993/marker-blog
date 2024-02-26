import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Blog from "./pages/Blog/Blog";
import Topic from "./pages/Topic/Topic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Blog />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "topic/:id",
        element: <Topic />,
        errorElement: <PageNotFound />,
      },
      {
        path: "blog/:category",
        element: <Blog />,
        errorElement: <PageNotFound />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
