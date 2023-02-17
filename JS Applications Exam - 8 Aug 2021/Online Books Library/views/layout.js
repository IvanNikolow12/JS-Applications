import { html, render } from "../node_modules/lit-html/lit-html.js";

import footer from "./footer.js";
import header from "./header.js";


export default (children, props) => html `
${header(props)}
${children(props)}
${footer(props)}
`