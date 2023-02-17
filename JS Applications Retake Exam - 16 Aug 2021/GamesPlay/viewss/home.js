import {html, render} from '../node_modules/lit-html/lit-html.js';
import latestGame from './latestGame.js';

export default ({
    navigationHandler,
    gameData,
    data,
    ...props
}) => {
    let arrayWithGames = []
    if (data) {

        for (let i = data.length; i > data.length - 3; i--) {
            let currentGame = data.pop();
            arrayWithGames.push(currentGame)
            i--;
            if(arrayWithGames.includes(undefined)) {
                arrayWithGames.pop()
            }
        }
            return html`
            <!-- Main Content -->
            <main id="main-content">
                    </main>
            <!--Home Page-->
            <section id="welcome-world"  @click=${navigationHandler}>

            <div class="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero">
            <div id="home-page">
            <h1>Latest Games</h1>
            ${arrayWithGames ?.map(x => latestGame({...x, ...props}))} 
            </div>
            `
    } else {
        return html `
             <p class="no-articles">No games yet</p> 

        `
    }
}
        
        // return html`
        //     <!-- Main Content -->
        //     <main id="main-content">
        //             </main>
        //     <!--Home Page-->
        //     <section id="welcome-world"  @click=${navigationHandler}>

        //     <div class="welcome-message">
        //         <h2>ALL new games are</h2>
        //         <h3>Only in GamesPlay</h3>
        //     </div>
        //     <img src="./images/four_slider_img01.png" alt="hero">
        //     <div id="home-page">
        //     <h1>Latest Games</h1>

        //     <!-- Display div: with information about every game (if any) -->
        //     ${data ?.map(x => latestGame({...x, ...props}))} 
        // `
    // } else {
    //     return html`
    //     <!-- Main Content -->
    //     <main id="main-content">
    //                 </main>
    //         <!--Home Page-->
    //         <section id="welcome-world"  @click=${navigationHandler}>

    //         <div class="welcome-message">
    //             <h2>ALL new games are</h2>
    //             <h3>Only in GamesPlay</h3>
    //             </div>
    //             <img src="./images/four_slider_img01.png" alt="hero">
    //             <div id="home-page">
    //             <h1>Latest Games</h1>
    //         <p class="no-articles">No games yet</p>
    //         </div>
    //     `
    // }
// return html `
//     <!-- Main Content -->
//     <main id="main-content">
//             </main>
//     <!--Home Page-->
//     <section id="welcome-world"  @click=${navigationHandler}>

//     <div class="welcome-message">
//         <h2>ALL new games are</h2>
//         <h3>Only in GamesPlay</h3>
//     </div>
//     <img src="./images/four_slider_img01.png" alt="hero">

//     <div id="home-page">
//         <h1>Latest Games</h1>

//         <!-- Display div: with information about every game (if any) -->
//         <!-- <div class="game">
//             <div class="image-wrap">
//                 <img src="./images/CoverFire.png">
//             </div>
//             <h3>Cover Fire</h3>
//             <div class="rating">
//                 <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
//             </div>
//             <div class="data-buttons">
//                 <a href="/details/" class="btn details-btn">Details</a>
//             </div>
//         </div> -->
//         <!-- <div class="game">
//             <div class="image-wrap">
//                 <img src="./images/ZombieLang.png">
//             </div>
//             <h3>Zombie Lang</h3>
//             <div class="rating">
//                 <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
//             </div>
//             <div class="data-buttons">
//                 <a href="#" class="btn details-btn">Details</a>
//             </div>
//         </div>
//         <div class="game">
//             <div class="image-wrap">
//                 <img src="./images/MineCraft.png">
//             </div>
//             <h3>MineCraft</h3>
//             <div class="rating">
//                 <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
//             </div>
//             <div class="data-buttons">
//                 <a href="#" class="btn details-btn">Details</a>
//             </div>
//         </div> -->

//         <!-- Display paragraph: If there is no games  -->
//         <!-- <p class="no-articles">No games yet</p>
//     </div>
//     </section> -->
// `