import {Link} from 'react-router';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import {ARCHIVE_PAGE_ROUTE, GAME_PAGE_LINK, HOME_PAGE_ROUTE} from '../utility/routes.ts';

export default function NavBar(){
    // Methods/Handlers
    const Separator = () => {
        return (
            <div className="vertical-separator w-0.5 h-[50px] ml-4 mr-4 bg-amber-50"></div>
        );
    }
    
    // Render
    return (
        <nav>
            <div className="w-full min-w-fit h-16 flex flex-row items-center bg-[#3F72AF] justify-between">
                <Link to={HOME_PAGE_ROUTE}>
                    <p className="m-0 ml-4 sm:text-4xl text-2xl font-extrabold">Salita</p>
                </Link>
                
                <div className="flex flex-row items-center justify-end">
                    <Separator />
                    
                    <Link to={`${GAME_PAGE_LINK}today`} className="flex flex-col items-center">
                        <TodayRoundedIcon />
                        <p className="sm:text-xl text-lg font-bold hover:underline">Today's</p>
                    </Link>
                    
                    <Separator />
                    
                    <Link to={ARCHIVE_PAGE_ROUTE} className="flex flex-col items-center">
                        <HistoryRoundedIcon />
                        <p className="sm:text-xl text-lg font-bold hover:underline">Archive</p>
                    </Link>
                    
                    <Separator />
                </div>
            </div>
        </nav>
    );
}
