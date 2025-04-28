import {Link} from 'react-router-dom';
import {GAME_PAGE_LINK} from '../utility/routes.ts';

export default function ArchivePage(){
    // State Variables
    const NUMBER_OF_PREVIOUS : number = 10;
    
    // Methods/Handlers
    
    // Render
    return (
        <div>
            <Link to={`${GAME_PAGE_LINK}today`} key="archive-today">
                <button>
                    TODAY
                </button>
            </Link>
            
            <div className="grid">
                {Array.from({length: NUMBER_OF_PREVIOUS}).map((_, i : number) => {
                    const index : number = NUMBER_OF_PREVIOUS - i;
                    return (
                        <Link to={`${GAME_PAGE_LINK}${index}`} key={`archive-${index}`}>
                            <button>{index}</button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}