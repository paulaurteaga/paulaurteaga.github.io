

function init(){
  var select = d3.select("#selectNumber");
  d3.json("/data/samples.json").then((data) => {
    var sampleNames=data.names
    sampleNames.forEach((sample) => {
      select
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  var initial=sampleNames[0]
  buildMetaData(initial)
  buildplots(initial);
  })
}

function buildMetaData(sample){
  d3.json("/data/samples.json").then((data) => {
    var metaData=data.metadata
    var filteredData=metaData.filter(sampleObject=>sampleObject.id==sample)
    var results=filteredData[0]
    var panel=d3.select("#sample-metadata");
    panel.html("");
    Object.entries(results).forEach(([key,value])=>{
      panel.append("h3").text(`${key}:${value}`);
    })
  })
}

function buildplots(sample){
        d3.json("/data/samples.json").then((data) => {
        var sampleData=data.samples
        var filteredData=sampleData.filter(r=>r.id==sample)
        var results=filteredData[0]
        var names=results.otu_ids;
        var labels=results.otu_labels;
        var samples=results.sample_values
        var traceBubble=[{
          x: names,
          y: samples,
          text: labels,
          mode: "markers",
          marker:{ size: samples,color: names}
        }]
        Plotly.newPlot("bubble", traceBubble);

        var pieSamples=samples.slice(0,10)
        var pieNames=names.slice(0,10)
        var pieLabels=labels.slice(0,10)

        var tracePie=[{
          values: pieSamples,
          labels: pieNames,
          hovertext: pieLabels,
          type:"pie"
        }]
        var pieLayout = {
          margin: { t: 0, l: 0 }
        };
        Plotly.newPlot("pie", tracePie,pieLayout)
        })
        
        
}
function newId(newData){
  
  buildMetaData(newData)
  buildplots(newData);
}
init();
    
     
      


