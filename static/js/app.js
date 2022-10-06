const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dropdown = document.getElementById('selDataset');
let defaultOption = document.createElement('option');


var sampleInfo, metaData, metaLabel, metaEntries, metaEntriesAll;


function init(){
    fetch(url)  
    .then(  
        function(response) {  
        if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
            return;  
        }

       
        response.json().then(function(data) {  
            
           
            sampleInfo = Object.values(data.samples); 
            metaData = Object.values(data.metadata);
            metaLabel = Object.keys(data.metadata[0]); 
            metaEntries = Object.entries(data.metadata[0]); 
            
            metaEntriesAll = Object.entries(data.metadata);

            defaultOption.text = data.names[0];
            
            
           
            
            let demoInfo = "";
            metaEntries.forEach(myFunction); 
           
            document.getElementById("sample-metadata").innerHTML =demoInfo;

            function myFunction(value, index, array){
                demoInfo += value[0] +": "+value[1]+"<br>"
            }

            
            
            let sampleID = sampleInfo[0].id;

            
            let tempIds = sampleInfo[0].otu_ids.slice(0,10); 
            let tempLabels = sampleInfo[0].otu_labels.slice(0,10); 
            let tempSample = sampleInfo[0].sample_values.slice(0,10); 

                     
            let temp = tempIds.slice(); 
            for (let i = 0; i <temp.length; i++){
                temp[i]= "OTU " + temp[i];
            };

           
            barData =[{
                type:"bar",
                y:temp,
                x:tempSample,
                orientation: 'h',
                hovertext:tempLabels,
                transforms: [{
                    type: 'sort',
                    target: 'y',
                    order: 'descending'
                  }]
            }];  
                
            let barLayout = {
                title:{text:`Top 10 OTUs in Test Subject: ${sampleID}`, font:{size:20}}
            };
           
            bubbleData=[{
                x:sampleInfo[0].otu_ids,
                y:sampleInfo[0].sample_values,
                text:sampleInfo[0].otu_labels,
                mode:'markers',
                marker:{
                  size:sampleInfo[0].sample_values,
                  color:sampleInfo[0].otu_ids
                    
                }
              }];
          
          
              let bubbleLayout ={
                title: {text:`Bubble Chart for Test Subject: ${sampleInfo[0].id}`, font:{size:25}},
                showlegend:false,
                height:550,
                width:1250
          
              };

            
            gaugeData=[{
                value:metaData[0].wfreq,
                title:{text:`Belly Button Washing Frequency <br /> Scrubs per Week for ID: ${metaData[0].id} <br />`},
                type:"indicator",
                mode:"gauge+number",
                gauge: {
                  axis: {range: [null, 9] },
                  bar:{color:"transparent"},
                  threshold:{ 
                    line:{color:"red",width:4},
                    thickness:0.75,
                    value:metaData[0].wfreq
                  },
                  steps: 
                    [{ range: [0, 1], color: "#cece84"},
                    { range: [1, 2], color: "#bcc274" },
                    { range: [2, 3], color: "#aab766" },
                    { range: [3, 4], color: "#98ac57" },
                    { range: [4, 5], color: "#86a149" },
                    { range: [5, 6], color: "#73963c" },
                    { range: [6, 7], color: "#5f8b2f" },
                    { range: [7, 8], color: "#4b8022" },
                    { range: [8, 9], color: "#347515" }]
                  
                }
            }];
          
          
              let gaugeLayout={
                width:500,
                height:500,
                margin: { t: 2, b: 0 }
              };
          

            
            Plotly.newPlot('bar', barData, barLayout);
            Plotly.newPlot('bubble', bubbleData, bubbleLayout);
            Plotly.newPlot('gauge', gaugeData, gaugeLayout);

        });  
        }  
    )  
    .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });

}

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      
      response.json().then(function(data) {  
        let option;
       
    	for (let i = 0; i < data.names.length; i++) {
          option = document.createElement('option');
      	  option.text = data.names[i];
      	  
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  }); 


var foundIt; 
function optionChanged(value){
    console.log("Dropdown was changed! Yeah!!");
    console.log(`Value: ${value}`);

    
    for (let i= 0; i< sampleInfo.length; i++)
    {
        if (sampleInfo[i].id == value){
            foundIt = i;
        };
    };

    console.log(`Found it index: ${foundIt} with ID: ${sampleInfo[foundIt].id}`);
    
    
    updatePlotly(sampleInfo[foundIt],metaData[foundIt]);

    
    
    d3.json(url).then(function(response) {
        metaEntriesAll = Object.entries(response.metadata[foundIt]);
              
        let demoInfo = "";
        metaEntriesAll.forEach(myFunction); 
      
        document.getElementById("sample-metadata").innerHTML =demoInfo;

        function myFunction(value, index, array){
            demoInfo += value[0] +": "+value[1]+"<br>";
           
        }

    });
    
  };




function updatePlotly(subjectSelected,selectedMeta) {
  
    console.log(subjectSelected);
    console.log(selectedMeta);
    
    
            
    let sampleID = subjectSelected.id; 

   
    let tempIds = subjectSelected.otu_ids.slice(0,10); 
    let tempLabels = subjectSelected.otu_labels.slice(0,10); 
    let tempSample = subjectSelected.sample_values.slice(0,10); 

                
    
    let temp = tempIds.slice(); 
    for (let i = 0; i <temp.length; i++){
        temp[i]= "OTU " + temp[i];
    };

    
    barData2 =[{
        type:"bar",
        y:temp,
        x:tempSample,
        orientation: 'h',
        hovertext:tempLabels,
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
            }]
    }];  
        
    let barLayout2 = {
        title:`Top 10 OTUs in Test Subject: ${sampleID}`
    };
    
    bubbleData2=[{
      x:subjectSelected.otu_ids,
      y:subjectSelected.sample_values,
      text:subjectSelected.otu_labels,
      mode:'markers',
      marker:{
          size:subjectSelected.sample_values,
          color:subjectSelected.otu_ids
          
      }
    }];
    
    
    let bubbleLayout2 ={
      title: `Bubble Chart for Test Subject: ${subjectSelected.id}`,
      showlegend:false,
      height:550,
      width:1250

    };

    
      
    gaugeData2=[{
        value:selectedMeta.wfreq,
        title:{text:`Belly Button Washing Frequency <br /> Scrubs per Week for ID: ${selectedMeta.id} <br />`},
        type:"indicator",
        mode:"gauge+number",
        gauge: {
          axis: {range: [null, 9] },
          bar:{color:"transparent"},
          threshold:{
            line:{color:"red",width:4},
            thickness:0.75,
            value:selectedMeta.wfreq
          },
          steps: 
            [{ range: [0, 1], color: "#cece84"},
            { range: [1, 2], color: "#bcc274" },
            { range: [2, 3], color: "#aab766" },
            { range: [3, 4], color: "#98ac57" },
            { range: [4, 5], color: "#86a149" },
            { range: [5, 6], color: "#73963c" },
            { range: [6, 7], color: "#5f8b2f" },
            { range: [7, 8], color: "#4b8022" },
            { range: [8, 9], color: "#347515" }]
          
        }
    }];


    let gaugeLayout2={
      width:500,
      height:500,
      margin: { t: 2, b: 0 }
    };



    Plotly.newPlot('bar', barData2, barLayout2);
    Plotly.newPlot('bubble', bubbleData2, bubbleLayout2);
    Plotly.newPlot('gauge', gaugeData2, gaugeLayout2);

}


init();