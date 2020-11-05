const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let forecastMessage = document.querySelector('.forecastMessage');
let forecastError = document.querySelector('.forecastError');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  forecastMessage.textContent = 'Loading...';
  forecastError.textContent = '';
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
  .then( response => {
    response.json().then((data) => {
      if(data.error){
        forecastError.textContent = data.error;
        forecastMessage.textContent = '';
      }else{
        forecastError.textContent = '';
        forecastMessage.textContent = data.forecast;
      }
    });
  });
});