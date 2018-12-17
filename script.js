

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
    this.POIs = [];
    this.POIDivs = [];
    this.name = name;
    this.direction = 45; //deg
    this.footX = 10;
    this.footY = 10;
    this.svg = d3.select('body').append('svg');
    this.getDims();
    this.svg.attr('width', this.width)
            .attr('height', this.height)
    theG = this.svg.append('g')
            .attr('class', 'MovingG');
    this.introDiv = d3.select('body')
        .append('div')
        .attr('id','introDiv')
        .style('width', this.width + "px")
        .style('height', this.height  + "px")
    this.introDiv.append('p')
        .style('margin-top', '15%')
        .style('margin-bottom', '0px')
        .text('Welcome to Your Adventure')
    this.introDiv
        .append('p')
        .style('font-size','2.5em')
        .style('margin-top', '10px')
        .style('margin-bottom', '10px')
        .text(this.name);
    this.introDiv
    .append('div')
    .style('font-size', '.5em')
    .text('(Scroll or drag to continue)');




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
    var deltaX = Math.floor(Math.cos(dirInRads) * stepDistance * pos);
    var deltaY = Math.floor(Math.sin(dirInRads) * stepDistance * pos);
    footX = footX + deltaX;
    footY = footY + deltaY;
    var variability = 20;
    moveG.attr("transform","translate("+footX+","+footY+")");
    directionChange = (Math.random()*variability) - (variability/2);
    direction += directionChange;
    this.svg.style('background-position', footX/10 +"px "+ footY/10 + "px");
    this.updatePOIs(deltaX,deltaY);
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
    opacity = this.introDiv.style('opacity');
    if(opacity > 0)
    {
        eleTop = parseInt(this.introDiv.style('top').slice(0,-2));
        eleLeft = parseInt(this.introDiv.style('left').slice(0,-2));
        this.introDiv.style('opacity', opacity - .05)
        .style('top', (eleTop-1)+'px')
        .style('left', (eleLeft-1)+'px')
    }
    else
        this.introDiv.remove();
    var multiplier = 1.5;
    mmktest = d3.event
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
Adventure.prototype.spawnPOI = function()
{

    curPOI = this.POIs.shift();
    var xPos = Math.random() * this.width;
    var yPos = Math.random() * this.height;
    var curPOIdiv = d3.select('body')
        .append('div')
        .classed('POI', true)
        .style('top', yPos + "px")
        .style('left', xPos + "px");
    // fill in info
    curPOIdiv.append('img')
    .style('width', '100%')
    .attr('src', curPOI.image);
    curPOIdiv.append('p')
    .text(curPOI.name);
    curPOIdiv.append('div')
    .text(curPOI.description);
    this.POIDivs.push(curPOIdiv);
}
Adventure.prototype.updatePOIs = function(xStep, yStep)
{
    for(i=0; i < this.POIDivs.length; i++)
    {
        var curPOI = this.POIDivs[i];
        eleTop = parseInt(curPOI.style('top').slice(0,-2));
        eleLeft = parseInt(curPOI.style('left').slice(0,-2));
        console.log(eleTop+ " " + eleLeft);
        console.log(xStep+ " " + yStep);
        curPOI
        .style('top', (eleTop+yStep)+'px')
        .style('left', (eleLeft+xStep)+'px');
    }

}
Adventure.prototype.moveSVG = function()
{
    zoom = d3.zoom()
            .on("zoom", () => {this.redraw()})
            .on("start", function(){d3.select('svg').style('cursor', 'url("images/icons8-sleigh-48.png"), pointer')})
            .on("end", function(){d3.select('svg').style('cursor', 'url("images/icons8-santa-48.png"), pointer')});
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
