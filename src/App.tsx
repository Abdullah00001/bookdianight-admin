import { RouterProvider } from "react-router-dom";
import ReactQueryProvider from "@/providers/TanstackQueryProvider";
import Routes from "@/routes/Routes";
import { Toaster } from "@/components/ui/toaster";
import { GlobalModal } from "@/components/ui/global-modal";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={Routes} />
      <Toaster />
      <GlobalModal />
    </ReactQueryProvider>
  );
}
export default App;
