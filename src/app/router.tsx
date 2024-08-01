import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { App } = await import("./App");
      return { Component: App };
    },
    children: [
      {
        path: "/",
        lazy: async () => {
          const { Home } = await import("../pages/Home/Home");
          return { Component: Home };
        },
      },
      {
        path: "blog",
        lazy: async () => {
          const { Blog } = await import("../pages/Blog/Blog");
          return { Component: Blog };
        },
      },
      {
        path: "topic/:slug",
        lazy: async () => {
          const { Topic } = await import("../pages/Topic/Topic");
          return { Component: Topic };
        },
      },
      {
        path: "blog/:category",
        lazy: async () => {
          const { Blog } = await import("../pages/Blog/Blog");
          return { Component: Blog };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { Page404 } = await import("../pages/Page404/Page404");
          return { Component: Page404 };
        },
      },
    ],
  },
]);

export default router;
