import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {GAME_ARCHIVE_MAPPING, GAME_PAGE_LINK} from '../utility/routes.ts';

export default function ArchivePage(){
    // State Variables
    const [previous, setPrevious] = useState(30);
    
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
        <div className="w-full h-[calc(100dvh-theme(spacing.16))] flex flex-col align-middle items-center-safe">
            <Link to={`${GAME_PAGE_LINK}today`}
                  key="archive-today"
                  role="button"
                  className="w-4/5 h-20 mt-2 rounded-2xl bg-amber-300 flex items-center justify-center">
                <p className="text-xl">TODAY</p>
            </Link>
            
            <div className="w-4/5 mt-2 grid grid-flow-row-dense gap-4 md:grid-cols-10 sm:grid-cols-7 grid-cols-4 place-items-center items-center justify-center">
                {Array.from({length: previous}).map((_, i : number) => {
                    const index : number = previous - i;
                    return (
                        <Link to={`${GAME_PAGE_LINK}${index}`} key={`archive-${index}`}
                              role="button"
                              className="col-span-1 h-16 w-full bg-amber-300 text-center rounded-2xl flex items-center justify-center">
                            {index}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}