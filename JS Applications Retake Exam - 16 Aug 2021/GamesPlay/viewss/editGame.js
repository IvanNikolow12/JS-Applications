import {html, render} from '../node_modules/lit-html/lit-html.js';

export default (params) =>{
    // console.log(params) 
    return html `
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
            <form id="edit" @submit=${(e) => params.onEditSubmit(e, params.data.gameId)}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="${params.data.detail.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${params.data.detail.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${params.data.detail.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${params.data.detail.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${params.data.detail.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`
}