import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {GAME_ARCHIVE_MAPPING, GAME_PAGE_LINK} from '../utility/routes.ts';

export default function ArchivePage(){
    // State Variables
    const [previous, setPrevious] = useState(0);
    
    // Methods/Handlers
    async function getNumberOfPrevious(){
        try{
            const response: Response = await fetch(GAME_ARCHIVE_MAPPING, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const prev: number = await response.json();
            setPrevious(prev);
        }
        catch(error){
            console.log("Failed to load archive data");
        }
    }
    
    // Effects
    useEffect(() => {
        getNumberOfPrevious();
    }, []);
    
    // Render
    return (
        <div>
            <Link to={`${GAME_PAGE_LINK}today`} key="archive-today">
                <button>
                    TODAY
                </button>
            </Link>
            
            <div className="grid">
                {Array.from({length: previous}).map((_, i : number) => {
                    const index : number = previous - i;
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