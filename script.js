

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
    .append('g')
    .attr('class', 'MovingG');
    this.POIs = [];
    this.name = name;

    // Choose scroll direction

    // Init ActionListeners(scrolldown, resize)
    this.initActionListeners()

    // Create Welcome mesage
    //
}

Adventure.prototype.initActionListeners = function()
{
    var zoom = d3.behavior.zoom();
    this.call(zoom);

}
function redraw()
{
        // d3.event.transform.k is scroll modifier
       this.svg.interrupt();
        var moveG = this.svg.select('g.movingG')
        
        moveG.attr("transform","translate("+d3.event.transform.k+",0");
}
function zoomAndPan(node)
{
    zoom = d3.zoom()
            .on("zoom", redraw)
            .on("start", function(){/* Add start cursor */});
            .on("end", function(){/* Add end cursor */});
            // Map Action Listeners
    node.call(zoom);
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
