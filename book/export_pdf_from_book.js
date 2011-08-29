// export pdf from book

var book_obj = app.books[0];
export_pdf_per_n (book_obj, "[高品質印刷]", 6);

/**
 * export pdf each?
 * 
 * @param {Object} book_obj Book object
 * @param {String} preset_name PDF Preset name
 * @param {Number} indd_per_pdf Export each n indd
 */
function export_pdf_per_n (book_obj, preset_name, indd_per_pdf) {
  var bookcont_obj = book_obj.bookContents;
  if (indd_per_pdf === undefined) {indd_per_pdf = bookcont_obj.length};
  var sliced_arr = split_get_start_end(bookcont_obj.everyItem().index, indd_per_pdf);

  for (var sli=0, sliL=sliced_arr.length; sli < sliL ; sli++) {
    book_obj.exportFile(
      File(book_obj.fullName.toString()+"_"+sliced_arr[sli].join('-')+".pdf"),
      false,
      app.pdfExportPresets.item(preset_name),
      bookcont_obj.itemByRange(sliced_arr[sli][0], sliced_arr[sli][1])
      );
  };
}

/**
 * @param {Array} array [1,2,3,4,5,6,7,8.....]
 * @param {Number} per Slice each n 
 * @returns {Array} Array of Array 
 */
function split_get_start_end (array, per) {
  var arr = [];
  var result = [];
  for (var i=0, iL=Math.ceil(array.length/per); i < iL ; i++) {
    arr.push(array.slice(i*per, (i+1)*per));
  };
  for (var j=0; j < arr.length; j++) {
    result.push([arr[j][0],arr[j][arr[j].length-1]]);
  };
  return result; // [ [start,end],[start,end],,,,]
}