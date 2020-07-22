console.log("IM WORKING!");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initialText() {
	sleep(5000);
	$( "main" ).append( "<p>This is a test OS built with a single HTML document and a javascript file [using jquery]</p>" );
	sleep(2000);
	$( "main" ).append( "<p>What do you with to do? (Type help for commands): </p>" );
	$( "p" )[$( "p" ).length - 1].append("<input type=""text"" placeholder=""Please type a command..."" style=""display: inline-block;"">");
}

demo();