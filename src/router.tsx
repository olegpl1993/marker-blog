import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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
        path: "topic/:id",
        element: <Topic />,
      },
      {
        path: "/:category",
        element: <Blog />,
      },
    ],
  },
]);

export default router;