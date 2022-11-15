function loadTheme(){
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark')
		if(document.getElementById('darkModeChanger')){
			document.getElementById('darkModeChanger').innerHTML = '<i class="fa-lg fa-solid fa-moon"></i>'
		}else setTimeout(loadTheme, 1000)
	} else {
		document.documentElement.classList.remove('dark')
		if(document.getElementById('darkModeChanger')){
			document.getElementById('darkModeChanger').innerHTML = '<i class="fa-lg fa-solid fa-sun-bright"></i>'
		}else setTimeout(loadTheme, 1000)
	}
}

function toggleDarkMode(auto=false) {
	if(auto){
		localStorage.theme = ''
	}else if (document.documentElement.classList.contains('dark')) {
		localStorage.theme = 'light'
	} else {
		localStorage.theme = 'dark'
	}
	loadTheme()
}

loadTheme()