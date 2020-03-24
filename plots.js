

function init(){
  var select = document.getElementById("selectNumber");
  d3.json("/data/samples.json").then((names) => {
    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  var initial=sampleNames[0]
  buildplots(initial);
  console.log(initial)
  })
}



function buildplots(sample){
        d3.json(`/data/${sample}`).then((data) => {
        var panel=d3.select("#sample-metadata");
        panel.html("");
        Object.entries(data).forEach(([key,value])=>{
          panel.append("h3").text(`${key}:${value}`);
        })})
        //buildGaude(data.WFREQ);
        var names=data.out_ids;
        var labels=data.otu_labels;
        var samples=data.sample_values
        var traceBubble=[{
          x: names,
          y: samples,
          text: labels,
          marker:{ size: samples,color: names}
        }]
        var bubbleArray=[traceBubble]
        Plotly.newplot("bubble", bubbleArray);

        var tracePie=[{
          values: samples.slice(0,10),
          labels: names.slice(0,10),
          hovertext: labels.slice(0,10),
          type:"pie"
        }]
        var pieArray=[tracePie]
        Plotly.newPlot("pie", pieArray)
}
function newId(newData){
  buildplots(newData);
}
init();
    
     
      


