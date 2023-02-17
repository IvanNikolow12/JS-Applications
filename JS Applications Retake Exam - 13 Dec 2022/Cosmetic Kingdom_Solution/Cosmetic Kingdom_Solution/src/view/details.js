import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteProductById,
  getProductById,
  getTotalBuys,
  didUserBought,
  buy,
} from "../api/data.js";

const detailsTamplate = (
  product,
  isOwner,
  onDelete,
  isLoggedIn,
  totalBuysCount,
  onClickBuy,
  didUserBuy
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.detail.imageUrl}" alt="example1" />
            <p id="details-title">${product.detail.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.detail.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.detail.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought:<span id="buys">${totalBuysCount}</span> times.</h4>
                <span>${product.detail.description}</span>
              </div>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${product.id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
      ${(() => {
        
          if (isLoggedIn && !isOwner) {
            return html`<a
              href="javascript:void(0)"
              @click=${onClickBuy}
              id="buy-btn"
              >Buy</a
            >`;
          }
        
      })()}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const productId = ctx.params.id;
  const product = await getProductById(productId);
  const user = ctx.user;
  // console.log(product)



  let userId;
  let totalBuysCount;
  let didUserBuy;
  let ownerId;

  if (user != null) {
    userId = ctx.user.localId;
    ownerId = product.detail.ownerId;
    // console.log(userId)
    didUserBuy = await didUserBought(productId, userId);
  }

  const isOwner = ctx.user.localId == product.detail.ownerId
  const isLoggedIn = user !== undefined;

  totalBuysCount = await getTotalBuys(productId);
  ctx.render(
    detailsTamplate(
      product,
      isOwner,
      onDelete,
      isLoggedIn,
      totalBuysCount,
      onClickBuy,
      didUserBuy
    )
  );

  async function onClickBuy() {
    const donation = {
      productId,
    };
    await buy(donation);

    totalBuysCount = await getTotalBuys(productId);
    // console.log(totalBuysCount)
    didUserBuy = await didUserBought(productId, userId);
    ctx.render(
      detailsTamplate(
        product,
        isOwner,
        onDelete,
        isLoggedIn,
        totalBuysCount,
        onClickBuy,
        didUserBought
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteProductById(productId);
      ctx.page.redirect("/");
    }
  }
}
