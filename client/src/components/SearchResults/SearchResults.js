import React from "react";
import "./SearchResults.css";

// // SearchResults renders a bootstrap list item from 08-Stu- RecipeList.js
// export const SearchResults = props => (

//     <ul className="list-group">{props.children}</ul>
//   );

// const SearchResults = props => {
//     const recipes = props.results.map(recipe =>

//         <li>
//             {recipe.name}

//     </li>
//     );
// }
const SearchResults = props => {
    return props.results.map(recipe =>
        <li>
            {recipe.name}
    </li>
    );
}
export default SearchResults;


