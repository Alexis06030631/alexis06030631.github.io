addEventListener('DOMContentLoaded', () => {
    for (const summary of document.querySelectorAll('.page[data-path]>:first-child')) {
        const anchor = summary.querySelector('a'),
            href = ' ' + location.origin + summary.parentNode.dataset.path;

        anchor.innerText = href;
        anchor.href = href;
    }
});