import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createRoot } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
