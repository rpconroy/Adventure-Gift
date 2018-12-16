

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
    this.scrollX = 0;
    this.direction = 45; //deg
    this.footX = 10;
    this.footY = 10;
    this.svg = d3.select('body').append('svg');
    this.getDims();
    this.svg.attr('width', this.width)
            .attr('height', this.height)
    theG = this.svg.append('g')
            .attr('class', 'MovingG');
    theG.append('rect')
        .attr('x', this.footX).attr('y',this.footY)
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
function degToRadians(deg)
{
    return deg * ( (2*Math.PI)/360 )
}
direction = 45;
footX = 10;
footY = 10
function advanceFootprint(pos)
{

    var moveG = d3.select('svg').select('g');
    stepDistance = 5;
    dirInRads = degToRadians(direction);
    var deltaX = Math.cos(dirInRads) * stepDistance * pos;
    var deltaY = Math.sin(dirInRads) * stepDistance * pos;
    footX = footX + deltaX;
    footY = footY + deltaY;
    var variability = 10;
    moveG.attr("transform","translate("+footX+","+footY+")");
    directionChange = (Math.random()*variability) - (variability/2);
    direction += directionChange;

    //d3.select('rect').attr('x', .footX)
    //.attr('y',.footY)
}
Adventure.prototype.drawFootprint = function()
{
}
Adventure.prototype.redraw = function()
{
    if(this.scrollX === undefined)
        this.scrollX = 0;
    var multiplier = 1.5;
    console.log(d3.event.sourceEvent.wheelDeltaY);
    console.log(this.scrollX);
    console.log(multiplier);
    this.scrollX += d3.event.sourceEvent.wheelDeltaY * multiplier;
    if(d3.event.sourceEvent.wheelDeltaY < 0)
        advanceFootprint(1);
    else
        advanceFootprint(-1);
    // Amount the scroll is enhanced by
    // d3.event.transform.k is scroll modifier
//    var moveG = d3.select('svg').select('g');
   // moveG.attr("transform","translate("+this.scrollX+",0)");
}
Adventure.prototype.moveSVG = function()
{
    zoom = d3.zoom()
            .on("zoom", this.redraw)
            .on("start", function(){d3.select('svg').style('cursor', 'url("images/mmk.png"), pointer')})
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
