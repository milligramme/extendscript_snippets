app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

var book_dest = "~/Desktop/test.indb";

var target_f = Folder.selectDialog("indd folder");
if (target_f) {
  var target_f_path = target_f.fsName;
  var indd_file_list = File(target_f_path).getFiles(
    function (file){ return /^[^\.]+\.indd$/i.test(file.name);}
    );
  add_to_book_w_autopagenate (book_dest, indd_file_list, true);
};
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

/**
 * indd add to book, and pagenate?
 * 
 * @param {String} book_dest file FilePath of Book Object
 * @param {Array} indd_file_list Array of indd
 * @param {Boolean} pagenate If true, Do Automatic Pagenation
 */
function add_to_book_w_autopagenate (book_dest, indd_file_list, pagenate) {
  // var book_dest = "~/Desktop/test.indb";
  var book_name = book_dest.split('/').pop();

  var book_obj = app.books.item(book_name) === null ? app.books.add(File(book_dest)) : app.books.item(book_name);

  with (book_obj){
    automaticDocumentConversion = false;
    automaticPagination = pagenate ? true : false;
    insertBlankPage = false;
    mergeIdenticalLayers = true;
    repaginationOption = RepaginateOption.NEXT_PAGE;
  }

  for (var i=0, iL=indd_file_list.length; i < iL ; i++) {
    book_obj.bookContents.add(File(indd_file_list[i].fullName), -1);
  };
  if (pagenate) {
    var bookcont_obj = book_obj.bookContents;
    for (var bci=1, bciL=bookcont_obj.length; bci < bciL ; bci++) {
      var doc = app.open(File(bookcont_obj[bci].fullName), false);
      var section_obj = doc.sections;
      for (var sci=0, sciL=section_obj.length; sci < sciL ; sci++) {
        section_obj[sci].continueNumbering = true;
      };
      doc.close(SaveOptions.yes);
    };
    book_obj.repaginate();
  };

  // book_obj is not yet saved
  // if you want, do below
  // book_obj.save();
  // book_obj.close(SaveOptions.yes);
}
