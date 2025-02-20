import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/app/styles.css'

const App: FC = () => {
  const navigate = useLocation();
  return (
    <>
        <TransitionGroup className="transition-group">
            <CSSTransition
                key={navigate.key}
                timeout={{ enter: 1000, exit: 300 }}
                classNames={'slide'}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Routes>
            </CSSTransition>
        </TransitionGroup>
    </>
  );
};

export default App;
