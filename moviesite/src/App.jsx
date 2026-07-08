import { RouterProvider } from "react-router";
import { router } from "./RouterConfig";
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
export default App;