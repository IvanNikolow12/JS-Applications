import { html, render } from "../node_modules/lit-html/lit-html.js";




export default ({
    navigationHandler,
    // params,
    data,
    // ...props
}) => {
    // console.log(data.gameId)
 return html`
        <!-- Details Page ( for Guests and Users ) -->
        <section id="details-page" class="details" @click=${navigationHandler}>
            <div class="book-information">
                <h3>${data.detail.title}</h3>
                <p class="type">Type: ${data.detail.type}</p>
                <p class="img"><img src="${data.detail.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    <a class="button" href="/edit/${data.gameId}">Edit</a>
                    <a class="button" href="/delete">Delete</a>

                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${data.detail.description}</p>
            </div>
        </section>
`
}