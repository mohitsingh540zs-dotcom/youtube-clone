import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={AppRoutes} />
    </Suspense>
  </AuthProvider>,
);
