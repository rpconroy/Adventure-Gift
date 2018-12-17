

////////////////////
//
// Adventure Class
//
///////////////////

var scrollX = 0;
function Adventure(name)
{
    //
    // Init adventure
    //
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
footY = 10;
test = 0;
Adventure.prototype.advanceFootprint = function(pos)
{
    var moveG = d3.select('svg').select('g');
    stepDistance = 5;
    dirInRads = degToRadians(direction);
    var deltaX = Math.cos(dirInRads) * stepDistance * pos;
    var deltaY = Math.sin(dirInRads) * stepDistance * pos;
    footX = footX + deltaX;
    footY = footY + deltaY;
    var variability = 20;
    moveG.attr("transform","translate("+footX+","+footY+")");
    directionChange = (Math.random()*variability) - (variability/2);
    direction += directionChange;
    this.svg.style('background-position', footX/10 +"px "+ footY/10 + "px");

    test++;
    if(test%20==0)
        this.drawFootprint(direction);

    //d3.select('rect').attr('x', .footX)
    //.attr('y',.footY)
}
myswitch = 0;
Adventure.prototype.drawFootprint = function(dir)
{

    // Get the center of the screen
    var centerX = this.width/2;
    var centerY = this.height/2;
    console.log(centerX);
    console.log(footX);
    console.log(centerY);
    console.log(footY);
    var holdingG = theG.append('g')
    .attr('transform','translate('+(centerX - footX)+','+(centerY - footY)+')');
    var footPrint = holdingG.append('image')
    .attr('transform','rotate('+(dir+90)+')')
    .attr('width', '30px')
    .attr('height', '45px')
    .attr('xlink:href','images/shoe.svg')
    .style('opacity','1');
    if(myswitch == 0)
    {
        footPrint
    .attr('transform','rotate('+(dir+180+90)+')scale(1,-1)')
        myswitch = 1;
    }
    else
    {
        myswitch = 0;
    }
        //<image x="10" y="20" width="80" height="80" xlink:href="recursion.svg" />




}
Adventure.prototype.redraw = function()
{
    console.log(this);
    var multiplier = 1.5;
    console.log(d3.event.sourceEvent.wheelDeltaY);
    mmktest = d3.event
    console.log(multiplier);
    scrollX += d3.event.sourceEvent.wheelDeltaY * multiplier;
    if(d3.event.sourceEvent.wheelDeltaY < 0)
       this.advanceFootprint(-1);
    else
        this.advanceFootprint(-1); // -1 to go backwards
    // Amount the scroll is enhanced by
    // d3.event.transform.k is scroll modifier
//    var moveG = d3.select('svg').select('g');
   // moveG.attr("transform","translate("+this.scrollX+",0)");
}
Adventure.prototype.moveSVG = function()
{
    zoom = d3.zoom()
            .on("zoom", () => {this.redraw()})
            .on("start", function(){d3.select('svg').style('cursor', 'url("images/icons8-santa-48.png"), pointer')})
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
function POI(name, description, image)
{
    this.name = name;
    this.description = description
    this.image = image;
}

// Adds the location name
POI.prototype.addName = function(name)
{
    this.name = name;
}
