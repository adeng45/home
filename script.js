// THEME
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

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

// FORM
let postForm = function(e) {
	let form = document.getElementById('contact-form');
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object); 
	form.reset();
	fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		})
		.then(async (response) => {
			await response;
			console.log(response);
		})
		.catch(error => {
			console.log(error);
			result.innerHTML = "Something went wrong!";
		})
  };


document.getElementById('submit-btn').addEventListener('click', (e) => {
	postForm(e);
	btn = document.getElementById('submit-btn');
	btn.setAttribute('disabled', '');
	text = document.getElementById('submit-btn-text');
	text.textContent = 'Sending...'
    // btn.classList.toggle('hide');
	Promise.resolve()
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1500))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1500))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1500))
	.then(() => {
		text.style.fontSize = '200%';
		text.style.position = 'relative';
		text.style.bottom = '4px';
		text.textContent = '✓';
		text.classList.toggle('hide');
	})
	.then(() => delay(1500))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(2000))
	.then(() => {
		text.style.fontSize = null;
		text.style.position = null;
		text.style.bottom = null;
		text.textContent = 'Send';
		text.classList.toggle('hide');
		btn.removeAttribute('disabled');
	})
});

