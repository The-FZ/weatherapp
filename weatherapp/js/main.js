
  window.onload = (function()
  {
  $.getJSON('http://ipinfo.io', function(data){
   var pos = data.loc.split(",")
   //console.log(data.loc); 
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + pos[0] + "&lon=" + pos[1] +
  "&APPID=79e5267164bef94de54bdd72c9688cea");
  ourRequest.onload = function()
  {
    if (ourRequest.status>=200 && ourRequest.status <400)
    {
      var ourdata = JSON.parse(ourRequest.responseText);
      renderHTML(ourdata);
      //console.log(ourdata);
    }
    else
    {
            console.log("We are connected to the server but it returned an error");
    }
  }
  ourRequest.onerror = function()
      {
          console.log("connection error");
      }
  ourRequest.send();

  });

  var citi = document.getElementById("city");
  var temperature = document.getElementById("temp");

  function renderHTML(data)
  {
  var icon = data.weather[0].icon;
  var iconsrc = "http://openweathermap.org/img/w/"+icon+".png";
  var htmlstring1 = "";
  htmlstring1 += "<p>"+ data.name + ", " + data.sys.country + "</p>";
  var htmlstring2 = "";
  htmlstring2 += "<p>" + "<img src="+iconsrc+">"+ data.main.temp +" <sup>o</sup>C"+ "</p>";
  citi.innerHTML = htmlstring1;
  temperature.innerHTML = htmlstring2;
  }

  }())
