addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme) document.body.classList.add(currentTheme);

    document.querySelector('img').onerror = el => el.target.style.opacity = 0;
    document.querySelector('.btn.aboutProjs').addEventListener('click', e => {
        e.preventDefault();
        projects.click();
    });

    const win = document.querySelector('.window');
    const win2 = document.querySelector('.window:nth-of-type(2)');

    for (const e of document.querySelectorAll('.outside.next'))
        e.addEventListener('click', e => {
            win.classList.toggle('active');
            document.querySelector('.next:not(.invisible)').classList.add('invisible');

            if (e.target.closest('.next.close'))
                document.querySelector('.outside.next:not(.close)')?.classList.remove('invisible');
            else if (e.target.closest('.next'))
                document.querySelector('.outside.next.close')?.classList.remove('invisible');

            if (document.body.classList.contains('otherWindow')) {
                document.body.classList.remove('otherWindow');
                win.classList.remove('invisible');

                win2.animate([{ left: '150%' }], { duration: 900, easing: 'ease' })
                    .onfinish = () => win2.classList.add('hidden');

                win.animate([{ left: '-150%' }, { left: '50%' }], { duration: 900, easing: 'ease' })
            }
        });

    const updated = document.querySelector('.page-info .left .item.updated .value');
    fetch('https://api.github.com/repos/Alexis06030631/alexis06030631.github.io')
        .then(res => res.json())
        .then(res => {
            if(!!res.updated_at) updated.innerText = new Date(res.pushed_at).toGMTString()
            else updated.innerText = 'Cannot fetch data';
        })

    document.querySelector('.menuLink.contact').addEventListener('click', e => {
        e.preventDefault();
        if (!win2) return open(e.target.href);

        const small = matchMedia('(max-width: 500px)').matches;
        const next = noAnimation => {
            const next = () => {
                win.classList.add('invisible');
                document.querySelector('form .field.message textarea').focus();
            };
            if (noAnimation) next();
            else win.animate([{ left: '-150%' }], { duration: 1000, easing: 'ease' }).onfinish = next;

            win2.classList.remove('hidden');
            document.body.classList.add('otherWindow');
            // document.querySelectorAll('.outside.next').forEach(e => e.remove());
        }

        if (!document.querySelector('.window.active')) next(small);
        else {
            document.querySelector('.outside.next:not(.close)').click();
            small ? next(true) : setTimeout(next, 500)
        }
    });

    for (const theme of document.querySelectorAll('.themes .theme[data-theme]'))
        theme.addEventListener('click', e => {
            const theme = e.target.dataset.theme;
            if (theme) {
                document.body.classList.remove('light', 'dark', 'darker');
                document.body.classList.add(theme);

                localStorage.removeItem('theme');
                if (theme !== 'dark')
                    // dark theme is the default
                    localStorage.setItem('theme', theme);
            }
        });
});