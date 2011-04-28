// check path type
var doc = app.documents[0];

var f = new File(doc.fullName);
alert("Paths\r" +
	"fsName(環境依存のフルパス)\r\t" + f.fsName +"\r"+
	"fullName(URIフルパス)\r\t" + f.fullName +"\r"+
	"absoluteURI(URIフルパス)\r\t" + f.absoluteURI +"\r"+
	"relativeURI(カレントフォルダからの相対パス)\r\t" + f.relativeURI
	);
