import NavBar from './components/NavBar.tsx';
import HomePage from './pages/HomePage.tsx';
import GamePage from './pages/GamePage.tsx';
import {Navigate} from 'react-router-dom';
import ArchivePage from './pages/ArchivePage.tsx';
import {Routes, Route} from 'react-router';
import {GAME_PAGE_LINK, GAME_PAGE_ROUTE, ARCHIVE_PAGE_ROUTE} from './utility/routes.ts';

export default function App(){
    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path={ARCHIVE_PAGE_ROUTE} element={<ArchivePage />} />
                <Route path={GAME_PAGE_ROUTE} element={<GamePage />} />
                <Route path={GAME_PAGE_LINK} element={<Navigate to={ARCHIVE_PAGE_ROUTE} />} />
            </Routes>
        </>
    )
}