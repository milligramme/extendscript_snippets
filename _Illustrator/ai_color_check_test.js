/**
 *  ai color check
 */
#target "Illustrator"

// XXXX
// appearance 
// 
// TODO
// group
// compound path


doc = app.documents;
for (var di=0, diL=doc.length; di < diL ; di++) {
  main(doc[di]);
  $.writeln("=====================");
};

function main (doc) {
  var o=doc.pageItems;

  for (var i=0, iL=o.length; i < iL ; i++) {
    var f_or_s = ['fillColor', 'strokeColor'];
    var str = "";
    for (var j=0, jL=f_or_s.length; j < jL ; j++) {
      var result = check_color_value ( o[i], f_or_s[j] );
      tmp = result[1].c > 0 ? "C" : "";
      str += tmp;
      tmp = result[1].m > 0 ? "M" : "";
      str += tmp;
      tmp = result[1].y > 0 ? "Y" : "";
      str += tmp;
      tmp = result[1].k > 0 ? "K" : "";
      str += tmp;
      tmp = result[1].r > 0 ? "R" : "";
      str += tmp;
      tmp = result[1].g > 0 ? "G" : "";
      str += tmp;
      tmp = result[1].b > 0 ? "B" : "";
      str += tmp;
      tmp = result[1].gray >= 0 ? "x" : "";
      str += tmp;
      tmp = result[1].spot !== undefined ? "s" : "";
      str += tmp
      tmp = result[1].gradient !== undefined ? result[1].stops_type : "";
      str += tmp
      tmp = result[1].pattern !== undefined ? "p" : "";
      str += tmp
      // $.writeln(f_or_s[j] +": "+result[0]+result[1].toSource());
    };
    $.writeln(str);
  }
}
var doc = app.documents[0];



/**
 * check color value for preflight
 * @param {Object} obj pageitems
 * @param {String} fill_or_stroke Check FillColor or StrokeColor
 * 
 * 
 * @returns {Object} Hash of properties
 */
function check_color_value (obj, fill_or_stroke) {
  var filled_or_stroked = fill_or_stroke === 'fillColor' ? 'filled' : 'stroked' ;
  var color_target, fill_target;
  var valu = {};
  
  if (obj.typename !== "PathItem") {
    color_target = obj.textRange[fill_or_stroke];
  }
  else {
    color_target = obj[fill_or_stroke];
    fill_target = obj[filled_or_stroked];
  };

  if (fill_target === true || fill_target === undefined) {
    // $.writeln("aloha");
    switch(color_target.typename){
      case "CMYKColor": 
        valu = {
          "c": color_target.cyan,
          "m": color_target.magenta,
          "y": color_target.yellow,
          "k": color_target.black
        };
        break;
      case "SpotColor": 
        valu = {
          "spot": color_target.spot, /// spot color object
          "tint": color_target.tint
        };
        break;
      case "RGBColor": 
        valu = {
          "r": color_target.red,
          "g": color_target.green,
          "b": color_target.blue
        };
        break;
      case "GrayColor": 
        valu = {
          "gray": color_target.gray
        };
        break;
      case "GradientColor":
        // fetch array of gradientstops colortype
        var grad_stop_type_arr = [];
        var grad_stop = color_target.gradient.gradientStops
        for (var gsi=0, gsiL=grad_stop.length; gsi < gsiL ; gsi++) {
          var gc = grad_stop[gsi].color.cyan > 0 ? "C" : "";
          var gm = grad_stop[gsi].color.magenta > 0 ? "M" : "";
          var gy = grad_stop[gsi].color.yellow > 0 ? "Y" : "";
          var gk = grad_stop[gsi].color.black > 0 ? "K" : "";
          var g0 = grad_stop[gsi].color.gray > 0 ? "g" : "";
          var gr = grad_stop[gsi].color.red > 0 ? "R" : "";
          var gg = grad_stop[gsi].color.green > 0 ? "G" : "";
          var gb = grad_stop[gsi].color.blue > 0 ? "B" : "";
          var val = gc + gm + gy + gk + g0 + gr + gg + gb;
          grad_stop_type_arr.push("("+val+")");
        };
        valu = {
          "angle": color_target.angle,
          "gradient": color_target.gradient, /// gradient object
          "hilite_angle": color_target.hiliteAngle,
          "hilite_length": color_target.hiliteLength,
          "length": color_target.length,
          "matrix": color_target.matrix,
          "origin": color_target.origin,
          "stops_type": grad_stop_type_arr.join("") /// array of each gradient-stops color typename
        };
        break;
      case "PatternColor": 
        valu = {
          "matrix": color_target.matrix,
          "pattern": color_target.pattern, /// pattern object
          "reflect": color_target.reflect,
          "reflect_angle": color_target.reflectAngle,
          "rotation": color_target.rotation,
          "scale_factor": color_target.scaleFactor,
          "shear_angle": color_target.shearAngle,
          "shear_axis": color_target.shearAxis,
          "shift_angle": color_target.shiftAngle,
          "shift_distance": color_target.shiftDistance
        }
        break;
      case "NoColor":
        valu = {}; 
        break;
      default: ; break;
    }
  }
  else {
    valu = {};
  }

  var result = [color_target.typename, valu];
  return result
}
