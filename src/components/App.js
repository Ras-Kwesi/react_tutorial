import React, { useState } from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext, themes } from "../context/theme-context";

function App() {
    const [theme, setTheme] = useState(themes.grey);

    document.body.style.backgroundColor = theme.backgroundColor; // new code!
    document.body.style.color = theme.textColor; // new code!

    // function toggleTheme() {
    // setTheme(theme =>
    //     theme.textColor === "AntiqueWhite" ? themes.light : themes.dark
    // );
    // setTheme(theme => {
    //     if (theme.textColor === "Black") {
    //         return themes.light
    //     } else if (theme.textColor === "DarkSlateGrey") {
    //         return themes.grey
    //     } else if (theme.textColor === "AntiqueWhite") {
    //         return themes.dark
    //     }
    //     // else {
    //     //     return themes.dark
    //     // }
    // });

    // }

    function toggleTheme() {
        setTheme(currentTheme => {  // It swithces since each case holds the other theme. So white holds grey, grey black and black white
            switch (currentTheme) {
                case themes.light:
                    return themes.grey;
                case themes.grey:
                    return themes.dark;
                case themes.dark:
                    return themes.light;
                default:
                    return themes.light;
            }
        });
    }

    return (
        <ThemeContext.Provider value={theme}>
            <Header />
            <hr />
            {/* <ToggleTheme toggleTheme={toggleTheme}/> */}
            <ThemeContext.Consumer>
                {contextTheme => <ToggleTheme theme={contextTheme} toggleTheme={toggleTheme} />}
            </ThemeContext.Consumer>
            <TicketControl />
        </ThemeContext.Provider>
    );
//     return ( // Testing using components outside context
//         <React.Fragment>
//             <ThemeContext.Provider value={theme}>
//                 <Header />
//                 <ThemeContext.Consumer>
//                     {contextTheme => <ToggleTheme theme={contextTheme} toggleTheme={toggleTheme} />}
//                 </ThemeContext.Consumer>
//             </ThemeContext.Provider>
//             {/* We've moved <TicketControl> outside of <ThemeContext.Provider> */}
//             <TicketControl />
//         </React.Fragment>
//     );
}

export default App;
