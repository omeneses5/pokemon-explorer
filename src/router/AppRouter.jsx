import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PokemonDetailPage from '../pages/PokemonDetailPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
