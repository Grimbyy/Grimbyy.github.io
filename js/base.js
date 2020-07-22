console.log("IM WORKING!");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleResponse(response) {
	response = response.toLowerCase();
	$("input").eq(-1).prop('disabled', true);
	writeHTML($("main"), "<hr>");
	await writeLine("-- RESULTS", 10)
	writeHTML($("main"), "<hr>");
	console.log(response)
	switch(response.split(" ")[0]) {
	  case "help":
	  	writeHTML($("main"), "<hr>");
	  	await writeLine("-- SYSTEM COMMANDS", 10)
	  	writeHTML($("main"), "<hr>");
	    await writeLine("--help: view all commands.\n--view: view documents stored on system.", 10)
	    writeHTML($("main"), "<hr>");
	    break;
	  case "welldoneonfindingthepassword":
	    await writeLine("Access Denied.", 150)
	    await sleep(500)
	    $("body").empty();
	    $("body").append('<iframe width="'+ window.innerWidth +'" height="'+ window.innerHeight +'" src="https://www.youtube.com/embed/g_vZasFzMN4?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:fixed;top: 0;left: 0;"></iframe>')
	    break;
	  case "view":
	  	let breakdown = response.split(" ")
	  	console.log(breakdown.length)
	  		if (breakdown.length == 1)
	  		{
	  			await writeLine("Files found: cv", 25);
	  		} else {
	  			//Display asked for document
	  			switch (breakdown[1]) {
	  				case "cv":
		  			await writeLine("Loading document" , 100)
		  			await write($("p").eq(-1), "...", 750);
		  			window.location.href = "http://grimbyy.github.io/cv";
		  			break;
	  			default:
	  				await writeLine("File not found.", 25);
	  		}
	  	}
	  	break;
	  default:
	    await writeLine("Invalid command, please enter a valid command [type help for commands]", 10)
	    break;
	}
	writeHTML($("main"), "<hr>");
	askInput("Input: ", 25); 
}

async function writeHTML(parent, text)
{
	parent.append( text );
}

async function writeLine(text, speedms) {
	$( "main" ).append( "<p></p>" );
	for (var i=0;i<text.length;i++)
	{
		$("p").eq( -1 ).append(text.split("")[i]);
		await sleep(speedms);
	};
}

async function askInput(text, speedms) {
	$( "main" ).append('<div style="display: inline-block;"></div>');
	$( "div" ).eq( -1 ).append( $('<p></p>') );
	for (var i=0;i<text.length;i++)
	{
		$("p").eq( -1 ).append(text.split("")[i]);
		await sleep(speedms);
	};
	$( "main" ).append('<div style="display: inline-block;"></div>');
	$( "div" ).eq( -1 ).append( '<input type="text" placeholder=" Please type a command..." size="100" style="width: 100%;border: 0;background-color: black;color: Red;font-family: Lucida Console;">' );
	$("input").eq( -1 ).focus();
	$("input").eq( -1 ).keyup(async function(event) {
    if (event.keyCode === 13) {
        await handleResponse($("input").eq( -1 ).val());
    }
});
}

async function write(element, text, speedms) {
	for (var i=0;i<text.length;i++)
	{
		await sleep(speedms/2);
		element.append(text.split("")[i]);
		await sleep(speedms/2);
	};
}

function clickBody() {
	$("input").eq( -1 ).focus();
}


async function initialText() {
	await writeLine("Welcome, User", 25);
	await write($("p")[0], "...", 750);
	await sleep(500);
	await writeLine("This is a test OS built with a single HTML document and a javascript file [using jquery]", 25);
	await sleep(500);
	await askInput("Please enter a command or PassPhrase (Type help for commands): ", 25);
}

initialText();