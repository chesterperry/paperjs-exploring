
let center = view.center;
let point = new Point(center);
let size = new Size(60, 60);
let square = new Path.Rectangle(point, size);
square.fillColor = 'black';
square.rotate(-30);
let arc1  = new Path.Arc([0,-1], [1,0], [0,1])
let arc2  = new Path.Arc([0,1], [-1,0], [0,-1])
let arcs = arc1.join(arc2)
arcs.position = center - [70, - 30];

isoView(square)
arcs.scale(40)
arcs.fillColor = 'red'

arcs.rotate(-30);
let tangentLine = getTangent(arcs);
placeTangent(arcs, tangentLine)




// FUNCTIONS 

function onMouseDown(event) {
	project.activeLayer.selected = false;
	if (event.item)
		event.item.selected = true;
}


function isoView(topPath) {
    console.log(topPath.segments)
    function getFloorPath (path) {
        let result = path.clone();
        let offset = 30
        result.position.y += 30
        result.position.x -= offset / 1.73
        return result
    }
    function getFrontPath(topPath, floorPath) {
        let segments = [topPath.segments[0].point,topPath.segments[1].point, floorPath.segments[1].point, floorPath.segments[0].point]
        let result = new Path(segments)
        result.closed = true;
        result.fillColor = 'blue';
        return result
    }
    
    function getSidePath(topPath, floorPath) {
        let segments = [topPath.segments[0].point,topPath.segments[3].point, floorPath.segments[3].point, floorPath.segments[0].point]
        let result = new Path(segments)
        result.closed = true;
        result.fillColor = 'blue';
        return result
    }
    let floorPath = getFloorPath(topPath);
    let frontPath = getFrontPath(topPath, floorPath);
    let sidePath = topPath.segments.length > 3 ? getSidePath(topPath, floorPath) : null;

    
}

function getTangent (path) {
var offset =  (360-35) * path.length / 360;
console.log(path.length)

var point1 = path.getPointAt(offset);

var tangent = path.getTangentAt(offset) * 30;

return new Path({
    segments: [point1, point1 - tangent],
})

}


function placeTangent(path, tangent) {
 
 let offset1 =  (360-35) * path.length / 360;
 let offset2 =  (35) * path.length / 360;

 tangent.position = offset1
 
 let tangent2 = tangent.clone()
 tangent.position = offset2

var group = new Group(tangent, tangent2);

group.style = {
    strokeColor: 'black',
    dashArray: [4, 10],
    strokeWidth: 4,
    strokeCap: 'round'
    
}

    
}



