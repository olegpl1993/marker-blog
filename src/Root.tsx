import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { CategoryProvider } from "./contexts/CategoryProvider";
import { TagProvider } from "./contexts/TagProvider";
import "./styles/index.css";

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryProvider>
        <TagProvider>
          <App />
        </TagProvider>
      </CategoryProvider>
    </QueryClientProvider>
  );
}

export default Root;
