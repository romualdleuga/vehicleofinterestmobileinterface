/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    function makeHttpObject() {
                try {return new XMLHttpRequest();}
                   catch (error) {alert("error");}
                try {return new ActiveXObject("Msxml2.XMLHTTP");}
                   catch (error) {alert("error");}
                try {return new ActiveXObject("Microsoft.XMLHTTP");}
                   catch (error) {alert("error");}
                throw new Error("Could not create HTTP request object.");
                }

    function refreshVOI(){  
        // Find a <table> element with id="VOITable":
        var VOITable = document.getElementById("VOITable");
        var tableRows = VOITable.getElementsByTagName('tr');   
        var rowCount = VOITable.rows.length;
alert("get talbe");
        for (var r = 1; r < rowCount; r++) {
            VOITable.deleteRow(-1);
         }
         
        var request = makeHttpObject();
        var xmlDoc;
        var parser;
        var x, i;
        var vois, voi;
        request.open("GET", "http://localhost:8080/VehiclesOfInterestWebServices/webresources/model.vehicleofinterest", true);
        request.send();
        request.onreadystatechange = function() {

            if (request.readyState == 4)
            {
alert("data " + request.responseText.toString());                
               parser = new DOMParser();
               vois = parser.parseFromString(request.responseText.toString(),"text/xml");
               voi = vois.documentElement.childNodes;

               for (i = 0; i < voi.length; i++)
               {
                  var row = VOITable.insertRow(-1);
                  
                  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);
                  var cell5 = row.insertCell(4);
                  var cell6 = row.insertCell(5);
                  var cell7 = row.insertCell(6);
                  var cell8 = row.insertCell(7);

                  // Add some text to the new cells:
                  cell1.innerHTML = vois.getElementsByTagName("licensePlate")[i].childNodes[0].nodeValue;
                  cell2.innerHTML = vois.getElementsByTagName("reason")[(i*2) + 1].childNodes[0].nodeValue;
                  cell3.innerHTML = vois.getElementsByTagName("make")[(i*4)+1].childNodes[0].nodeValue;
                  cell4.innerHTML = vois.getElementsByTagName("model")[(i*2)+1].childNodes[0].nodeValue;
                  cell5.innerHTML = vois.getElementsByTagName("vehYear")[i].childNodes[0].nodeValue;
                  cell6.innerHTML = vois.getElementsByTagName("color")[i].childNodes[0].nodeValue;
                  cell7.innerHTML = vois.getElementsByTagName("ownersName")[i].childNodes[0].nodeValue;
                  cell8.innerHTML = vois.getElementsByTagName("ownersPhone")[i].childNodes[0].nodeValue;
              } // end of for loop
            }  // end of if statement
            request.close();
              
          }; // end of fucntion
    } // end of refreshSales function


