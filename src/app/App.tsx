import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages";
import '@/app/styles.css'

const App: FC = () => {
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
