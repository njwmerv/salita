import {Link} from 'react-router';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import {ARCHIVE_PAGE_ROUTE, HOME_PAGE_ROUTE} from '../utility/routes.ts';

export default function NavBar(){
    // Render
    return (
        <nav>
            <div className="w-full flex flex-row items-center bg-[#3F72AF]">
                <Link to={HOME_PAGE_ROUTE}>
                    <p className="m-0 ml-2 text-3xl bold">Salita</p>
                </Link>
                
                <Link to={ARCHIVE_PAGE_ROUTE}>
                    <HistoryRoundedIcon />
                </Link>
            </div>
        </nav>
    );
}
