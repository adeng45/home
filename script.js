let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

/* Use async await..., I know... */
document.getElementById('submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
	btn = document.getElementById('submit-btn');
	btn.setAttribute('disabled', '');
	text = document.getElementById('submit-btn-text');
	text.textContent = 'Sending...'
	text.classList.toggle('hide');
    btn.classList.toggle('hide');
    setTimeout(() => {
		text.style.display = 'none';
		btn.classList.toggle('hide');
		setTimeout(() => {
			text.style.display = 'block';
			text.textContent = 'Send';
			text.classList.toggle('hide');
			btn.removeAttribute('disabled');
		}, 3000);
    }, 2500);
});


function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = './styles/default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = './styles/blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = './styles/green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = './styles/purple.css'
	}

	localStorage.setItem('theme', mode)
}