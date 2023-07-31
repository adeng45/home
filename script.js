// THEME
let theme = localStorage.getItem('theme');

if (theme == null) {
	setTheme('light');
}
else {
	setTheme(theme);
}

let themeDots = document.getElementsByClassName('theme-dot')

for (var i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener('click', function() {
		let mode = this.dataset.mode;
		console.log('Option clicked:', mode);
		setTheme(mode);
	})
}

function setTheme(mode) {
	if (mode == 'light') {
		document.getElementById('theme-style').href = 'white.css';
	}
	else if (mode == 'blue') {
		document.getElementById('theme-style').href = 'blue.css';
	}
	else if (mode == 'green') {
		document.getElementById('theme-style').href = 'green.css';
	}
	else if (mode == 'purple') {
		document.getElementById('theme-style').href = 'purple.css';
	}
	localStorage.setItem('theme', mode);
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
	.then(() => delay(1200))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1200))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1200))
	.then(() => {
		text.textContent = 'Sent!';
		text.classList.toggle('hide');
	})
	.then(() => delay(2000))
	.then(() => text.classList.toggle('hide'))
	.then(() => delay(1500))
	.then(() => {
		text.textContent = 'Send';
		text.classList.toggle('hide');
		btn.removeAttribute('disabled');
	})
});

