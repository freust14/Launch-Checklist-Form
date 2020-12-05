let pilotNameInput;
let copilotNameInput;
let fuelLevelInput;
let cargoMassInput;

window.addEventListener("load", function () {
   fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then (function (response) {
      return response.json();
   })
   .then (function (json) {
      const div = document.getElementById("missionTarget");
      let randomIndex = Math.floor(Math.random()*json.length);
      div.innerHTML += `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[randomIndex].name}</li>
         <li>Diameter: ${json[randomIndex].diameter}</li>
         <li>Star: ${json[randomIndex].star}</li>
         <li>Distance from Earth: ${json[randomIndex].distance}</li>
         <li>Number of Moons: ${json[randomIndex].moons}</li>
      </ol>
      <img src="${json[randomIndex].image}">`
   
   });
   
   let form = document.querySelector("form");
   form.reset();
   form.addEventListener("submit", function (event) {
      pilotNameInput = document.querySelector("input[name=pilotName]");
      copilotNameInput = document.querySelector("input[name=copilotName]");
      fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || 
         fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
			event.preventDefault();
      } else {
         if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) ||
         isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else changeLaunchInfo();
      }
   
   
      });
   function changeLaunchInfo () {
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
      
      if (fuelLevelInput.value < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
         document.getElementById("launchStatus").style.color = "red";
         if (cargoMassInput.value > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
         } else {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
         }
      }
      
      if (cargoMassInput.value > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
         document.getElementById("launchStatus").style.color = "red";
         if (fuelLevelInput.value < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         } else {
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         }
      }
      
      if (cargoMassInput.value <= 10000 && fuelLevelInput.value >= 10000) {
         document.getElementById("launchStatus").innerHTML = "Shuttle Is Ready For Launch";
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("faultyItems").style.visibility = "hidden";
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
      }
   };
});

