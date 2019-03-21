"use strict";

import Home         from './views/pages/Home.js';
import Error404     from './views/pages/Error404.js';
import Crypto     from './views/pages/Crypto.js';
import Utils        from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home,
    '/crypto/:id'      : Crypto
};

const router = async () => {

    const content = null || document.getElementById('page_container');

    // Get the parsed URL
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    
    // Get the page or show 404 if route does not exist
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
  
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
