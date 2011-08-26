#target "Illustrator"
doc = app.documents[0];
sel = doc.selection;

p_point = sel[0].pathPoints;
for (var pi=0, piL=p_point.length; pi < piL ; pi++) {
  $.writeln(p_point[pi].leftDirection);
  $.writeln(p_point[pi].anchor);
  $.writeln(p_point[pi].rightDirection);
  if (p_point[pi].pointType == PointType.CORNER){
    p_point[pi].pointType = PointType.SMOOTH
  }
};