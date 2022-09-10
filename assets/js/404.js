addEventListener('DOMContentLoaded', () => {
    document.querySelector('.notFound').innerHTML = `The path '${location.pathname}' in the link '${location.origin}<span style="color:#ad8e8e">${location.pathname}</span>' is invalid`
});