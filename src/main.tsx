import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { CategoryProvider } from "./app/providers/CategoryProvider";
import { TagProvider } from "./app/providers/TagProvider";
import router from "./app/router";
import "./index.css";
import "./shared/styles/fonts.css";
import "./shared/styles/variables.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <CategoryProvider>
        <TagProvider>
          <RouterProvider router={router} />
        </TagProvider>
      </CategoryProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
