window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
	const transcript = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');
	
	p.textContent = transcript;
	
	if(e.results[0].isFinal) {
		p = document.createElement('p');
		words.appendChild(p);
		
		if(transcript.includes('what is the time')) {
    	speak(getTime);
   	};	
		
		if(transcript.includes('what is today\'s date')) {
    	speak(getDate);
    };
	}
});

recognition.addEventListener('end', recognition.start);
recognition.start();

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};
