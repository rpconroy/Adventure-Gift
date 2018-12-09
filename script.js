

////////////////////
//
// Adventure Class
//
///////////////////

function Adventure(name)
{
    //
    // Init adventure
    //
    this.svg = d3.select('body').append('svg');
    this.getDims()
    this.svg.attr('width', this.width)
            .attr('height', this.height)
    theG = this.svg.append('g')
            .attr('class', 'MovingG');
    theG.append('rect')
        .attr('x', 50).attr('y','50')
        .attr('width','10px').attr('height','10px'); // test
    this.POIs = [];
    this.name = name;

    // Choose scroll direction

    // Init ActionListeners(scrolldown, resize)
    this.initActionListeners()

    // Create Welcome mesage
    //
}
function resize()
{
}
Adventure.prototype.initActionListeners = function()
{
    window.addEventListener("resize", resize);
    this.moveSVG()

}
function redraw()
{
        // d3.event.transform.k is scroll modifier
       this.svg.interrupt();
        var moveG = this.svg.select('g.movingG')
        
        moveG.attr("transform","translate("+d3.event.transform.k+",0");
}
Adventure.prototype.moveSVG = function() 
{
    zoom = d3.zoom()
            .on("zoom", redraw)
            .on("start", function(){/* Add start cursor */})
            .on("end", function(){/* Add end cursor */});
            // Map Action Listeners
    this.svg.call(zoom);
}
Adventure.prototype.getDims = function()
{
    this.width = window.innerWidth;
    this.height = window.innerHeight;
}
Adventure.prototype.addName = function(name)
{
    this.name = name;
}

Adventure.prototype.addPOI = function(poi)
{
    this.POIs.push(poi)
}


///////////////////////////////////
//                               //
// Point of interest (POI) Class //
//                               //
///////////////////////////////////

// POI constuctor
function POI()
{
}

// Adds the location name
POI.prototype.addName = function(name)
{
    this.name = name;
}
