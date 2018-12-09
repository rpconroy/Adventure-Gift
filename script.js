

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
    this.getDims();
    this.svg.attr('width', this.width)
            .attr('height', this.height)
    theG = this.svg.append('g')
            .attr('class', 'MovingG');
    theG.append('rect')
        .attr('x', 50).attr('y','50')
        .attr('width','10px').attr('height','10px'); // test
    this.POIs = [];
    this.name = name;

    this.X = 0;
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
Adventure.prototype.redraw = function()
{
    if(this.X === undefined)
        this.X = 0;
    var multiplier = 1.5;
    console.log(d3.event.sourceEvent.wheelDeltaY);
    console.log(this.X);
    console.log(multiplier);
    this.X += d3.event.sourceEvent.wheelDeltaY * multiplier;
    // Amount the scroll is enhanced by
    // d3.event.transform.k is scroll modifier
    var moveG = d3.select('svg').select('g');
    moveG.attr("transform","translate("+this.X+",0)");
}
Adventure.prototype.moveSVG = function()
{
    zoom = d3.zoom()
            .on("zoom", this.redraw)
            .on("start", function(){d3.select('svg').style('cursor', 'grabbing')})
            .on("end", function(){d3.select('svg').style('cursor', 'pointer')});
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
