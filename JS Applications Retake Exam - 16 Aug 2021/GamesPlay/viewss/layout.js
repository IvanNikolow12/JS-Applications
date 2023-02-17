import {html, render} from '../node_modules/lit-html/lit-html.js';

import header from './header.js';


export default (children, props) => html`
    ${header(props)}

    ${children(props)}
`;