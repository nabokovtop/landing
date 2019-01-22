
// sticky header

var header = document.querySelector('header');

var doc = document.documentElement || document.scrollingElement;
var sticky = 550;


var progressSection = document.querySelector('.skills');
var progressTop = progressSection.offsetTop - 250;
var progressbars = document.querySelectorAll('.progress');
var progressAnimated = false;

var statSection = document.querySelector('.stats');
var statTop = statSection.offsetTop - 350;
var statItems = document.getElementsByClassName('cont');
var statAnimated = false;


var typewrite = document.querySelectorAll('.typewriter');


// smooth scroll

var links = document.querySelectorAll('nav a');
links = [].slice.call(links);
document.addEventListener('click', function(event){
	if(links.includes(event.target)){
		event.preventDefault();
		var targetHref = event.target.getAttribute('href');
		var targetEl = document.querySelector(targetHref);
		var top = targetEl.offsetTop - 105;
		var deltaOffset = doc.scrollTop - top;
		var delta = 0;

		var interval = setInterval(function(){
			if( deltaOffset > 0 && delta > deltaOffset) {
				doc.scrollTop += 20;
				delta += 20;
			}
			else if(  deltaOffset < 0 && delta <  deltaOffset){
				doc.scrollTop -= 20;
				delta -= 20;
			}
			else{
				clearInterval(interval);
			}
		},1);
	}
});


// progressbars
function animateProgress(elem){
	var max = Number(elem.getAttribute('data-value'));
	var current = 0;
	var interval = setInterval(function(){
		if(current < max){
			elem.style.width = current + "%";
			current++;
		}
		else{
			clearInterval(interval);
		}
	},10);
}

// counters


function animateCount(el){
	var count = +el.getAttribute('data-count');
	var current = 0;
	var delta = 1000/count;
	var interval = setInterval(function(){
		if(current <= count){
			el.innerText = current;
			current++; 
		}
		else{
			clearInterval(interval);
		}
	},delta);
}


//typewriter

function type(el){
	var text = el.getAttribute('data-text');
	var char = 0;

	var interval = setInterval(function(){
		if(char < text.length){
			el.textContent += text.charAt(char);
			char++;
		}
		else{
			clearInterval(interval);
		}
	}, 2000/text.length);
}

// load more

var loadBtn = document.querySelector('#portfolio .more-button');
var pfItems = document.querySelectorAll('.portfolio-item');
var pfDisplaying = 6;

loadBtn.onclick = loadItems;

function loadItems(){
	pfDisplaying += 6;
	for(var j = 0; j < pfDisplaying; j++){
		pfItems[j].style.display = 'block';
	}
	if(pfDisplaying == pfItems.length){
		loadBtn.style.display = 'none';
	}
}

//menu toggle


// loader

var loader = document.getElementById('loader');

setTimeout(function(){
	doc.scrollTop = 0;
	loader.remove();

	document.addEventListener('scroll', function(){
		if(doc.scrollTop > sticky){
			header.classList.add('sticky');
			if(doc.scrollTop > progressTop && !progressAnimated){
				progressAnimated = true;
				for(var i = 0; i < progressbars.length; i++){
					animateProgress(progressbars[i]);
				}
			}
			else if(doc.scrollTop > statTop && !statAnimated){
				statAnimated = true;
				for(var i = 0; i < statItems.length; i++){
					animateCount(statItems[i]);
					type(typewrite[i]);
				}
			}
		}
		else{
			header.classList.remove('sticky');
		}
	});
},2000);