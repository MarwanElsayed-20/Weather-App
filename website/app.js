/* Global Variables */
const apiKey = `,us&appid=a66f0f4511c365c30e499fc6590b3ab0&units=imperial`;
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`
const zipCode = document.getElementById("zip");
const button = document.getElementById("generate");

button.addEventListener('click', performAction)
//when click function
function performAction (e) {
  //getting feeling value
  let feeling = document.getElementById("feelings").value;
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  // our API call
  getWeather('/weatherData')
  .then(function(data){
    //add our data
    postData('/addWeather', {
      temperature: data.main.temp,
      date: newDate,
      feelings: feeling
    })
    //update our ui dynamically
    retrieveData();
  })
}
// post async
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}
// get async
const getWeather = async (url) => {
  const res = await fetch(`${baseURL}${zipCode.value}${apiKey}`)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}
//dynamic ui
const retrieveData = async () => {
 const request = await fetch('/weatherData');
 try {
  // Transform into JSON
  const allData = await request.json()
  document.getElementById('date').innerHTML = allData.date;
  document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ 'degrees';
  document.getElementById('content').innerHTML = allData.feelings;
 }
 catch(error) {
   console.log("error", error);
 }
}
