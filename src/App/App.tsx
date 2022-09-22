import { MainLayout } from "@layouts/MainLayout";
import EmptyPage from "@pages/EmptyPage";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import SingularProduct from "@pages/SingularProduct/SingularProduct";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Route, Routes } from "react-router-dom";

function App() {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingularProduct />} />
        <Route path="/services" element={<EmptyPage />} />
        <Route path="/article" element={<EmptyPage />} />
        <Route path="/about-us" element={<EmptyPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
