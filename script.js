

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
    return deg * ( (2*Math.PI)/360 );
}
function radsToDeg(rads)
{
    return rads * 360/ (2*Math.PI);
}
Adventure.prototype.showPresent = function()
{
    var curPOI = this.POIDivs[0]
    var curPOIDiv = curPOI.div;
    curPOI.displayed = true;
    console.log((curPOI.y - 150))
    console.log((curPOI.x - 150))
    curPOIDiv.transition()
    .duration(1000)
    .style('width', '350px')
    .style('height', '350px')
    .style('top', (curPOI.y - 250) + 'px')
    .style('left', (curPOI.x - 150) + 'px')
    .on('end', function(){
        d3.selectAll('.POIdescription').style('display', 'block')
        d3.selectAll('.title').style('display', 'block')
        d3.selectAll('.acceptBut').style('display', 'inline-block')
        curPOIDiv.style('height', 'unset');
    });
    d3.selectAll('.presentImg')
        .transition()
        .delay(1000)
        .duration(2000)
        .style('opacity', 0);
}
direction = 45;
footX = 10;
footY = 10;
numSteps = 0;
Adventure.prototype.advanceFootprint = function(pos)
{
    var moveG = d3.select('svg').select('g');
    stepDistance = 5;
    dirInRads = degToRadians(direction);
    var deltaX;
    var deltaY;
    if(this.POIDivs.length != 0)//then follow present
    {
        var centerX = this.width/2;
        var centerY = this.height/2;
        var divX = this.POIDivs[0].x;
        var divY = this.POIDivs[0].y;

        var range = 5;
        var diffX = divX - centerX;
        var diffY = divY - centerY;
        console.log('divx' + divX);
        console.log('divy' + divY);
        console.log(centerX);
        console.log(centerY);
        if(( diffX < range  && diffX > -range) && (diffY < range  && diffY > -range))//show present
        {
            if(this.POIDivs[0].displayed === false)
            {
                this.showPresent();
                console.log('present');
            }
            return;
        }



        dirInRads = Math.atan((divY-centerY)/(divX-centerX));
        if(divX < centerX)
            dirInRads = Math.PI+dirInRads;
        direction = radsToDeg(dirInRads);
        console.log(dirInRads);
    }
    deltaX = Math.floor(Math.cos(dirInRads) * stepDistance * pos);
    deltaY = Math.floor(Math.sin(dirInRads) * stepDistance * pos);
    footX = footX + deltaX;
    footY = footY + deltaY;
    var variability = 20;
    moveG.attr("transform","translate("+footX+","+footY+")");
    directionChange = (Math.random()*variability) - (variability/2);
    direction += directionChange;
    this.svg.style('background-position', footX/10 +"px "+ footY/10 + "px");
    this.updatePOIs(deltaX,deltaY);
    numSteps++;
    if(numSteps%20==0)
        this.drawFootprint(direction);
    if(numSteps % 200 == 0 && this.POIDivs.length == 0)
        this.spawnPOI()

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
    .attr('xlink:href','AG/images/shoe.svg')
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
POIoffset = 0;
Adventure.prototype.storePOI = function()
{
    var curPOI = this.POIDivs.shift();
    console.log(curPOI);
    var curPOIDiv = curPOI.div;
    curPOIDiv.select('button').remove();
    curPOIDiv.transition()
    .style('top', "0px")
    .style('left', POIoffset+"px");
    POIoffset += 350;


}
Adventure.prototype.spawnPOI = function()
{

    curPOI = this.POIs.shift();
    var onX = Math.random();
    var xPos;
    var yPos;
    if(onX > .5)
    {
        var xPos = Math.random() * this.width;
        if(onX > .75)
            var yPos = this.height;
        else
            yPos = 10;
    }
    else
    {
    var yPos = Math.random() * this.height;
        if(onX < .25)
            xPos = this.width;
        else
            xPos = 10;
    }
    /*var target = theG
        .append('g')
        .attr('transform', 'translate('+xPos+','+yPos+')')
        .append('circle')
        .attr('r', '5px');*/

    var curPOIdiv = d3.select('body')
        .append('div')
        .classed('POI', true)
        .style('width', '100px')
        .style('height', '100px')
        .style('top', yPos + "px")
        .style('left', xPos + "px");
    //curPOIdiv
     //   .append('div')
    // fill in info
    curPOIdiv.append('img')
    .style('width', '100%')
    .attr('src', curPOI.image);
    curPOIdiv.append('p')
    .classed("title",true)
    .text(curPOI.name);
    var desc = curPOIdiv.append('div')
    .classed('POIdescription', true);
    desc.text(curPOI.description);
    desc.append('br');
    if(curPOI.link !== undefined)
    desc.append('a')
    .attr('href',curPOI.link)
    .text('Website Link');
    curPOIdiv.append('div')
    .classed('presentImg', true);
    curPOIdiv.append('div')
    .style('text-align', 'center')
    .append('button')
    .classed('acceptBut', true)
    .text(getAcceptText())
    .on('click', () => {this.storePOI()});

    divObj = {
        'div' : curPOIdiv,
        'x' : xPos,
        'y' : yPos,
        'displayed' : false
    }
    this.POIDivs.push(divObj);
    //setTimeout(() => {this.storePOI()}, 10000);

}
Adventure.prototype.updatePOIs = function(xStep, yStep)
{
    for(i=0; i < this.POIDivs.length; i++)
    {
        var curPOI = this.POIDivs[i].div;
        eleTop = parseInt(curPOI.style('top').slice(0,-2));
        eleLeft = parseInt(curPOI.style('left').slice(0,-2));
        console.log(eleTop+ " " + eleLeft);
        console.log(xStep+ " " + yStep);
        curPOI
        .style('top', (eleTop+yStep)+'px')
        .style('left', (eleLeft+xStep)+'px');
        this.POIDivs[i].x = eleLeft+xStep;
        this.POIDivs[i].y = eleTop+yStep;
    }

}
Adventure.prototype.moveSVG = function()
{
    zoom = d3.zoom()
            .on("zoom", () => {this.redraw()})
            .on("start", function(){d3.select('svg').style('cursor', 'url("AG/images/icons8-sleigh-48.png"), pointer')})
            .on("end", function(){d3.select('svg').style('cursor', 'url("AG/images/icons8-santa-48.png"), pointer')});
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

function getAcceptText()
{
    acceptTexts = ['Awesome!', 'Sounds Great!'
        ];
    idx = Math.floor(Math.random() * acceptTexts.length);
    return idx;
}


///////////////////////////////////
//                               //
// Point of interest (POI) Class //
//                               //
///////////////////////////////////

// POI constuctor
function POI(name, description, image, link)
{
    this.name = name;
    this.description = description
    this.image = image;
    this.link = link;
}

// Adds the location name
POI.prototype.addName = function(name)
{
    this.name = name;
}
