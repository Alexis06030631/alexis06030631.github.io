// This is a global file. It has content for all pages eg. header event listners, global variables etc.

// Array of projects for the header, so not to repeat the same code.
projectsObject = [
    {
        name: 'Surimi',
        brief: 'Discord bot',
        description: 'A new discord bot was a multifunctional robot with many features.<br/> It had only one goal: to do better! To do this, we take the liberty of adding ever more useful, thoughtful and intelligent features to meet all your needs!',
        image: '/assets/imgs/Surimi.png',
        link: 'https://surimi-bot.xyz',
    },
    {
        name: 'SNCF.js',
        brief: 'A nodejs module',
        description: 'SNCF.JS is a JavaScript library that allows you to easily use the SNCF api.<br/> SNCF.JS is object oriented which makes its use simple, fast and efficient',
        image: 'https://www.sncf.com/themes/contrib/sncf_theme/images/logo-sncf.svg',
        link: 'https://alexis06030631.github.io/SNCF.js/',
    },
    {
        name: 'Haddock',
        brief: 'manage environments',
        description: 'Haddock is an open source project meant to provide everyday apps trough a docker Ecosystem. This allow you to manage which app do you want and easily share app environments.',
        image: '',
        link: 'https://github.com/haddock-project/haddock-client',
    },

]

addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.remove('notLoaded'), 1000);
    document.querySelector('noscript')?.remove();

    header = document.querySelector('header');
    projects = header?.querySelector('.menuLink.projects');

    projects?.addEventListener('click', e => {
        const body = document.body;
        body.classList.toggle('expand-menu');
        body.classList.toggle('projects');
    });

    document.querySelector('.hbm')?.addEventListener('click', e => document.body.classList.toggle('menu'));
    document.body.addEventListener('click', e => {
        if (!(e.target.closest('header') || e.target.closest('.btn.aboutProjs') || e.target.closest('.outside')) && document.body.classList.contains('expand-menu'))
            projects.click();
    });

    const defaultMenuProject = document.querySelector('.menuStuff .projects .project');
    if (defaultMenuProject)
        for (const obj of projectsObject) {
            const newCard = defaultMenuProject.cloneNode(true);
            newCard.querySelector('.desc.name').innerText = obj.name;
            newCard.querySelector('.desc.small').innerText = obj.brief;
            newCard.querySelector('.top img').src = obj.image;
            newCard.querySelector('.desc.smaller').href = obj.link;
            obj.unequal && newCard.querySelector('.top img').classList.add('unequal');
            obj.description && newCard.setAttribute('title', obj.description);

            newCard.classList.remove('hidden');
            defaultMenuProject.parentElement.insertBefore(newCard, defaultMenuProject);
        }
});