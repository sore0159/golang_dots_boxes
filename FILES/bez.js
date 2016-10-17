var canvas = document.getElementById("can");
var pointList = [];
for (var i = 0; i < 3; i += 1) {
        pt = [Math.random()*500, Math.random()*500];
        pointList.push(pt);
}

var pic = document.getElementById("pic");
fetch("bez.api", { method: 'POST', credentials: 'include', body: JSON.stringify(pointList) }).then(function(response) {
        pic.src = "bez.png?"+ new Date().getTime();
        drawBez(pointList);
});
var sub = document.getElementById("subButton");

function drawBez(pts) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    var gc = new Path2D();
    if (pts.length === 3) {
		gc.moveTo(pts[0][0], pts[0][1]);
		gc.lineTo(pts[1][0], pts[1][1]);
		gc.lineTo(pts[2][0], pts[2][1]);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#AAA";
		ctx.stroke(gc);
		//
        gc = new Path2D();
		gc.moveTo(pts[0][0], pts[0][1]);
		gc.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 5;
		ctx.stroke(gc);
		//
        ctx.fillStyle = "#F00";
		ctx.lineWidth = 1;
		blip(pts[0], ctx);
		blip(pts[2], ctx);
        ctx.fillStyle = "#00F";
		blip(pts[1], ctx);
    } else if (pts.length === 4) {
    }
}
function blip(pt, ctx) {
    var path = new Path2D();
	var r = 8;
	path.arc(pt[0], pt[1], r, 0, 2*Math.PI);
	ctx.fill(path);
    ctx.stroke(path);
}
/*
	if len(pts) == 3 {
	} else if len(pts) == 4 {
		gc.SetLineWidth(2)
		gc.SetStrokeColor(color.NRGBA{130, 130, 130, 255})
		gc.MoveTo(pts[0][0], pts[0][1])
		gc.LineTo(pts[1][0], pts[1][1])
		gc.MoveTo(pts[3][0], pts[3][1])
		gc.LineTo(pts[2][0], pts[2][1])
		gc.Stroke()
		//
		gc.SetStrokeColor(color.Black)
		gc.SetLineWidth(5)
		gc.MoveTo(pts[0][0], pts[0][1])
		gc.CubicCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1], pts[3][0], pts[3][1])
		gc.Stroke()
		//
		gc.SetLineWidth(1)
		gc.SetFillColor(color.NRGBA{255, 0, 0, 255})
		Blip(pts[0], gc)
		Blip(pts[3], gc)
		gc.SetFillColor(color.NRGBA{0, 0, 255, 255})
		Blip(pts[1], gc)
		Blip(pts[2], gc)
	}
	if err := png.Encode(w, img); err != nil {
		fmt.Println("Bez file encode error:", err)
	}
}

func Blip(pt [2]float64, gc draw2d.GraphicContext) {
   */
