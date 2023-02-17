import { html, render } from "../node_modules/lit-html/lit-html.js";



export default ({
    navigationHandler,
    isAutheticated,
    ...userData
}) => {
  return  html`
        <header id="site-header" @click=${navigationHandler}>
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    ${!isAutheticated 
                        ? html `
                        <!-- Guest users -->
                        <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                        </div>
                        `
                        : html `
                        <!-- Logged-in users -->
                        <div id="user">
                            <span>Welcome, ${userData.email}</span>
                            <a class="button" href="/create">Add Book</a>
                            <a class="button" href="/logout">Logout</a>
                        </div>
                        `}
                </section>
            </nav>
        </header>
`
}