(async function(){
    async function tryFetch(paths){
        for(const p of paths){
            try{
                const res = await fetch(p);
                if(res.ok){
                    const text = await res.text();
                    return {path: p, text};
                }
            }catch(e){/*ignore*/}
        }
        return {path:null, text:''};
    }

    const headerPaths = ['../components/header.html','components/header.html','/components/header.html'];
    const footerPaths = ['../components/footer.html','components/footer.html','/components/footer.html'];

    const headerResp = await tryFetch(headerPaths);
    const footerResp = await tryFetch(footerPaths);

    if(headerResp.text && !document.querySelector('nav')){
        document.body.insertAdjacentHTML('afterbegin', headerResp.text);
    }
    if(footerResp.text && !document.querySelector('footer')){
        // insert before any existing script tags at end
        const scripts = document.querySelectorAll('script');
        if(scripts.length){
            scripts[scripts.length-1].insertAdjacentHTML('beforebegin', footerResp.text);
        } else {
            document.body.insertAdjacentHTML('beforeend', footerResp.text);
        }
    }

    // Reattach mobile menu toggle if present
    const attachMobileToggle = () => {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if(btn && menu && !btn.dataset.mobileAttached){
            btn.addEventListener('click', () => { menu.classList.toggle('hidden'); });
            btn.dataset.mobileAttached = '1';
        }
    };

    // Delay to ensure DOM nodes present
    setTimeout(attachMobileToggle, 50);

    // If Tailwind didn't generate header styles (injected after initial scan), add minimal fallback CSS
    const ensureHeaderStyles = () => {
        const nav = document.querySelector('nav');
        if(!nav) return;
        const comp = window.getComputedStyle(nav);
        const needsFallback = (comp.position !== 'fixed') || (comp.display === 'none');
        if(needsFallback){
            const css = `
                nav { position: fixed !important; top: 0; left: 0; right: 0; z-index: 9999 !important; background: rgba(255,255,255,0.92) !important; backdrop-filter: blur(6px) !important; border-bottom: 1px solid rgba(226,232,240,1) !important; }
                .hidden { display: none !important; }
                .md\\:flex { display: flex !important; }
                .md\\:hidden { display: none !important; }
                .w-full { width: 100% !important; }
                .contact-cta { background: linear-gradient(90deg, #3b82f6, #7c3aed) !important; color: #ffffff !important; padding: 0.5rem 0.75rem !important; border-radius: 0.5rem !important; font-weight: 600 !important; display: inline-block !important; box-shadow: 0 6px 12px rgba(59,130,246,0.25) !important; text-align: center; }
                .contact-cta:hover { filter: brightness(0.95); }
                @media (min-width: 1024px){ .contact-cta { padding: 0.5rem 1rem !important; } }
            `;
            const s = document.createElement('style');
            s.setAttribute('data-fallback-header','1');
            s.appendChild(document.createTextNode(css));
            document.head.appendChild(s);
        }
    };

    setTimeout(ensureHeaderStyles, 120);
})();
