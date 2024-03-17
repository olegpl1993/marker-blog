import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { App } = await import("./App");
      return { Component: App };
    },
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { Blog } = await import("./pages/Blog/Blog");
          return { Component: Blog };
        },
        errorElement: <PageNotFound />,
      },
      {
        path: "blog",
        lazy: async () => {
          const { Blog } = await import("./pages/Blog/Blog");
          return { Component: Blog };
        },
        errorElement: <PageNotFound />,
      },
      {
        path: "topic/:id",
        lazy: async () => {
          const { Topic } = await import("./pages/Topic/Topic");
          return { Component: Topic };
        },
        errorElement: <PageNotFound />,
      },
      {
        path: "blog/:category",
        lazy: async () => {
          const { Blog } = await import("./pages/Blog/Blog");
          return { Component: Blog };
        },
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
