import "./App.css";
import { MainLayout } from "@layouts/MainLayout";
import { EmptyPage } from "@pages/EmptyPage";
import { Home } from "@pages/Home";
import { NotFound } from "@pages/NotFound";
import { SingularProduct } from "@pages/SingularProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
