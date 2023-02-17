import { html, render } from "../node_modules/lit-html/lit-html.js";

import book from "./book.js";



export default ({
    navigationHandler,
    data,
    ...props
    
}) => {
   
    if(data) {
    return html`
        <!-- Main Content -->
        <main id="site-content"></main>
        <!-- Dashboard Page ( for Guests and Users ) -->
        <section id="dashboard-page" class="dashboard"  @click=${navigationHandler}>
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
            ${data ?.map(x => book({...x, ...props}))} 
            </ul>
        </section>
        `
    } else {
       return html `
       <!-- Main Content -->
       <main id="site-content"></main>
        <!-- Dashboard Page ( for Guests and Users ) -->
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
        <!-- Display paragraph: If there are no books in the database -->
        <p class="no-books">No books in database!</p>
        `
    }
                

}