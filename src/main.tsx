import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CategoryProvider } from "./contexts/CategoryProvider";
import { TagProvider } from "./contexts/TagProvider";
import router from "./router";
import "./styles/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CategoryProvider>
      <TagProvider>
        <RouterProvider router={router} />
      </TagProvider>
    </CategoryProvider>
  </QueryClientProvider>
);
