console.log("IM WORKING!");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5000);
$( "#welcome-msg" ).append( "<br><p>This is a test OS built with a single HTML document and a javascript file [using jquery]</p>" );
sleep(2000);
$( "p" )[-1].append( "<br><p>What do you with to do? (Type help for commands)</p>" );