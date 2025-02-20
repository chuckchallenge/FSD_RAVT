import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages";
import '@/app/styles.css'

const App: FC = () => {
  const navigate = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
