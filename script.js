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
		document.getElementById('theme-style').href = 'themes/white.css';
	}
	else if (mode == 'blue') {
		document.getElementById('theme-style').href = 'themes/blue.css';
	}
	else if (mode == 'green') {
		document.getElementById('theme-style').href = 'themes/green.css';
	}
	else if (mode == 'purple') {
		document.getElementById('theme-style').href = 'themes/purple.css';
	}
	localStorage.setItem('theme', mode);
}

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

// RESIZE
// let open = true;
// let closeDots = document.getElementsByClassName('dot-1');
// for (let i = 0; i < closeDots.length; i++) {
// 	closeDots[i].addEventListener('click', () => {
// 		if (!open) { return; }
// 		open = !open;
// 		document.querySelector('.intro > .main-container').classList.toggle('close');
// 	})
// }

// let openDots = document.getElementsByClassName('dot-3');
// 	for (let i = 0; i < openDots.length; i++) {
// 	openDots[i].addEventListener('click', () => {
// 		if (open) { return; }
// 		open = !open;
// 		document.querySelector('.intro > .main-container').classList.toggle('close');
// 	})
// }

// FORM
let postForm = function(form) {
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
			result.innerHTML = 'Something went wrong!';
		})
  };


  document.getElementById('submit-btn').addEventListener('click', (e) => {
	e.preventDefault();
	let form = document.getElementById('contact-form');
	if (!form.checkValidity()) { 
		focusInvalid(form);
		return;
	 }
	postForm(form);
	btn = document.getElementById('submit-btn');
	btn.setAttribute('disabled', '');
	text = document.getElementById('submit-btn-text');
	text.textContent = 'Sending...'
	Promise.resolve()
	.then(() => text.classList.toggle('text-hide'))
	.then(() => delay(1200))
	.then(() => text.classList.toggle('text-hide'))
	.then(() => delay(1200))
	.then(() => text.classList.toggle('text-hide'))
	.then(() => delay(1200))
	.then(() => {
		text.textContent = 'Sent!';
		text.classList.toggle('text-hide');
	})
	.then(() => delay(2000))
	.then(() => text.classList.toggle('text-hide'))
	.then(() => delay(1500))
	.then(() => {
		text.textContent = 'Send';
		text.classList.toggle('text-hide');
		btn.removeAttribute('disabled');
	})
});

const focusInvalid = (form) => {
	let inputs = form.elements;
	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		console.log(input);
		console.log(input.classList.contains('input-field'));
		if (input.classList && input.classList.contains('input-field') && !input.checkValidity()) {
			input.focus();
			return;
		}
	}
}


// FRAME SWITCHING
let solitaire = document.querySelector('.frame1');
let tic_tac_toe = document.querySelector('.frame2');
let calculator = document.querySelector('.frame3');
const frames = [solitaire, tic_tac_toe, calculator];
let shownFrame = 0;

function show(frame) {
	frames[frame].style.display = 'flex';
	frames[(frame + 1) % 3].style.display = 'none';
	frames[(frame + 2) % 3].style.display = 'none';
}

document.querySelector('.right').addEventListener('click', (e) => {
	e.target.style.pointerEvents = 'none';
	shownFrame = (shownFrame + 1) % 3;
	show(shownFrame);
	setTimeout(() => {
		e.target.style.pointerEvents = null;
	}, 100);
})

document.querySelector('.left').addEventListener('click', (e) => {
	e.target.style.pointerEvents = 'none';
	shownFrame = shownFrame === 0 ? 2 : shownFrame - 1;
	show(shownFrame);
	setTimeout(() => {
		e.target.style.pointerEvents = null;
	}, 100);
})

show(shownFrame);

