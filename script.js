

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
    .attr('height', this.height);
    this.POIs = [];
    this.name = name;

    // Init ActionListeners(scrolldown, resize)

    // Get Screen Dimensions
    // Create SVG
    d3.select
    // Create Welcome mesage
    //
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
