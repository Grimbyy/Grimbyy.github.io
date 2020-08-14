let targetFrame = $("#preview");

function resizeIframe(w, h) {
	targetFrame = $("#preview");
	if (!w && !h) {
		targetFrame.width(800);
		targetFrame.height(480);
		return true;
	} else {
		targetFrame.height(h);
		targetFrame.width(w);
		return true;
	}
	return false;
}

function loadProj(name) {
	targetFrame = $("#preview");
	switch (name) {
		case "Boids":
			targetFrame.attr('src',"https://grimbyy.github.io/P5JS/Boids/boids");
			$( "#selected" ).attr("id", "");
			$('td').filter(function(){return $(this).text() === 'Boids'}).attr("id", "selected");
			resizeIframe(800, 480);
		break;
		case "Mandelbrot":
			targetFrame.attr('src',"https://grimbyy.github.io/P5JS/Mandelbrot");
			$( "#selected" ).attr("id", "");
			$('td').filter(function(){return $(this).text() === 'Mandelbrot'}).attr("id", "selected");
			resizeIframe(850, 420);
		break;
		case "RayC":
			targetFrame.attr('src',"https://grimbyy.github.io/P5JS/Ray Casting/raycasting");
			$( "#selected" ).attr("id", "");
			$('td').filter(function(){return $(this).text() === 'Ray Casting'}).attr("id", "selected");
			resizeIframe(400, 400);
		break;
		default:
			targetFrame.attr('src',"https://grimbyy.github.io/P5JS/Boids/boids");
			$( "#selected" ).attr("id", "");
			$('td').filter(function(){return $(this).text() === 'Boids'}).attr("id", "selected");
			resizeIframe(720, 480);
		break;
	}
}