import { RouterProvider } from "react-router-dom";
import ReactQueryProvider from "@/providers/TanstackQueryProvider";
import Routes from "@/routes/Routes";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={Routes} />
    </ReactQueryProvider>
  );
}
export default App;
