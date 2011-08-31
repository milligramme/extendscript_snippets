/**
 * display setting memo
 */
var wins = app.layoutWindows;
var display_set = app.displaySettings;

// OPTIMIZED
if (wins[0].viewDisplaySetting === ViewDisplaySettings.OPTIMIZED){
  with (display_set[0]){
    greekBelow = 20;
  }
}
var bk0 = {raster:1917284985, // TagRaster.GRAY_OUT
 vector:1917284985, // TagVector.GRAY_OUT
 transparency:1330005536, //TagTransparency.OFF
 antialiasing:false,
 greekBelow:7,
};

// TYPICAL
if (wins[0].viewDisplaySetting === ViewDisplaySettings.TYPICAL){
  with (display_set[1]){
    greekBelow = 5;
    antialiasing = false;
  }
}
var bk1 = {raster:1917874808, // TagRaster.PROXY
 vector:1917874808, // TagVector.PROXY
 transparency:1481663597, // TagTransparency.MEDIUM_QUALITY
 antialiasing:true,
 greekBelow:7,
};

// HIGH_QUALITY
if (wins[0].viewDisplaySetting === ViewDisplaySettings.HIGH_QUALITY){
  display_set[2].greekBelow = 1;
}
var bk2 = {raster:1917348177, // TagRaster.HIGH_RESOLUDION
 vector:1917348177, // TagVector.HIGH_RESOLUDION
 transparency:1346922866, //TagTransparency.HIGH_QUALITY
 antialiasing:true,
 greekBelow:7,
};

// RESTORE
var bk_arr = [bk0, bk1, bk2];
for (var dsi=0, dsiL=display_set.length; dsi < dsiL ; dsi++) {
  display_set[dsi].properties = bk_arr[dsi];
};