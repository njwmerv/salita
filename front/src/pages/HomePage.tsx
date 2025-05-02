import {GAME_PAGE_LINK} from "../utility/routes.ts";
import {Link} from "react-router-dom";

export default function HomePage(){
    // Render
    return (
        <div className="w-full h-[calc(100dvh-theme(spacing.16))] flex flex-col align-middle items-center-safe justify-center-safe pb-16">
            <h1 className="text-5xl font-extrabold m-2 text-center">Welcome to Salita!</h1>
            
            <h2 className="text-3xl text-center"> a Filipino Wordle game</h2>
            
            <p className="text-center">I made this game to practice my Tagalog. Hope you have fun with it!</p>
            
            <Link to={`${GAME_PAGE_LINK}today`}
                  key="archive-today"
                  role="button"
                  className="w-64 h-12 mt-4 rounded-2xl bg-amber-300 flex items-center justify-center">
                <p className="font-extrabold">PLAY</p>
            </Link>
        </div>
    );
}
