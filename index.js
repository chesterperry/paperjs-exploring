let center = view.center;
let point = new Point(center);
let size = new Size(60, 60);
let square = new Path.Rectangle(point, size);
square.fillColor = 'black';
square.rotate(-30);
let arc1  = new Path.Arc([0,-1], [1,0], [0,1])
let arc2  = new Path.Arc([0,1], [-1,0], [0,-1])
let arcs = arc1.join(arc2)
let angle = 0
arcs.position = center - [70, - 30];

isoView(square)
arcs.scale(40)
arcs.fillColor = 'red'
// arcs.strokeColor = 'black'

// arcs.rotate(-30);
let tangentLine = getTangent(arcs, angle);
let newPath = placeTangent(arcs, tangentLine, angle)
let point1 = new Point(newPath.tangent1[1].point)
let point2 = new Point(newPath.tangent2[1].point)
let point3 = new Point(newPath.tangent3[1].point)
let point1a = new Point(newPath.tangent1[0].point)
let point2a = new Point(newPath.tangent2[0].point)
let point3a = new Point(newPath.tangent3[0].point)
let arc3 = new Path.Arc(point1,point2,point3)
let arc4 = new Path.Arc(point3a,point2a,point1a)

let commonPath = new Path();

commonPath.add(point1a, point1)
commonPath.addSegments(arc3.segments)
commonPath.add(point3, point3a )
commonPath.addSegments(arc4.segments)
// commonPath.closed = true;
// commonPath.name = 'common'
// arc4.add(point3, point3a)
// arc4.closed = true;

// arc4.union(commonPath)

commonPath.style = {
    fillColor: 'black',
    // strokeColor: 'black',
    strokeWidth: 1
    
}

console.log(commonPath.segments)

// FUNCTIONS 

function onMouseDown(event) {
	project.activeLayer.selected = false;
	if (event.item)
		event.item.selected = true;
}


function isoView(topPath) {
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
    
    return {:}
}

function getTangent (path, angle) {
var offset =  (360-angle) * path.length / 360;

var point1 = path.getPointAt(offset);

var tangent = path.getTangentAt(offset) * 30;

return new Path({
    segments: [point1, point1 - tangent],
})

}


function placeTangent(path, tangent, angle) {
 let offsetN = angle
 let offset1 =  (360-offsetN) * path.length / 360;
 let offset2 = (270-offsetN) * path.length / 360;
 let offset3 =  (180-offsetN) * path.length / 360;
var point1 = path.getPointAt(offset1);
let tangentOffset = {x:tangent.bounds.width/2, y: -tangent.bounds.height/2}
 tangent.position = point1 - tangentOffset
 let tangent2 = tangent.clone() 
 let tangent3 = tangent.clone()
 let point2 = path.getPointAt(offset2);
 let point3 = path.getPointAt(offset3);
 
 tangent2.position = point2 - tangentOffset
 tangent3.position = point3 - tangentOffset

var group = new Group(tangent, tangent2, tangent3);

group.style = {
    // strokeColor: 'black',
    strokeWidth: 1,
    strokeCap: 'round'
    
}

return {tangent1: [tangent.firstSegment, tangent.lastSegment], tangent2: [tangent2.firstSegment, tangent2.lastSegment], tangent3: [tangent3.firstSegment, tangent3.lastSegment]}

}



