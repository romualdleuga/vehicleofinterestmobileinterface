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
        // Find a <table> element with id="ModelTable":
        var ModelTable = document.getElementById("ModelTable");
        //var tableRows = MakeTable.getElementsByTagName('tr');   
        var rowCount = ModelTable.rows.length;
//        alert("get talbe");
        for (var r = 1; r < rowCount; r++) {
            ModelTable.deleteRow(-1);
         }
         
        var request = makeHttpObject();
        var xmlDoc;
        var parser;
        var x, i;
        var rois, roi;
        request.open("GET", "http://localhost:8080/VehiclesOfInterestWebServices/webresources/model.vehiclemodel", true);
        request.send();
        request.onreadystatechange = function() {
              //console.log("Request data", request.responseText.toString());
            if (request.readyState == 4)
            {
alert("data " + request.responseText.toString());                
               parser = new DOMParser();
               rois = parser.parseFromString(request.responseText.toString(),"text/xml");
               roi = rois.documentElement.childNodes;
               

               for (i = 0; i < roi.length; i++)
               {
                  //console.log("Single Data", rois.getElementsByTagName("Model"));
                  var row = ModelTable.insertRow(-1);
                  
                  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  

                  // Add some text to the new cells:
                  cell1.innerHTML = rois.getElementsByTagName("make")[(i*2)+1].childNodes[0].nodeValue;
                  cell2.innerHTML = rois.getElementsByTagName("model")[i].childNodes[0].nodeValue;
                  
              } // end of for loop
            }  // end of if statement
            request.close();
              
          }; // end of fucntion
    } // end of refreshSales function


