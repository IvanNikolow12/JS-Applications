import {html, render} from '../node_modules/lit-html/lit-html.js';
import game from './game.js';

export default ({
    navigationHandler,
    data,
    ...props
}) => 
{ 

    if(data) {
        return html`
        <!-- Catalogue -->
        <section id="catalog-page" @click=${navigationHandler}>
            <h1>All Games</h1>
           <!-- Display div: with information about every game (if any) -->
            ${data ?.map(x => game({...x, ...props}))} 
        </section>
        `
    } else {
        return html`
        <!-- Catalogue -->
        <section id="catalog-page" @click=${navigationHandler}>
             <h1>All Games</h1>
             <!-- Display paragraph: If there is no games  -->
             <h3 class="no-articles">No articles yet</h3>
         </section>
        `
        
    }
}