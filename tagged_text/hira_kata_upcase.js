/**
 * @param {Array} arr Array of InDesign Tagged Text
 * @returns {String} InDesign Tagged Text 
 */
function hira_kata_upcase (arr) {
  var a_arr = arr;
  var c_arr = [];
  for (var ai=0, aiL=a_arr.length; ai < aiL ; ai++) {
    b_arr = a_arr[ai].replace(/>/g,">\n").split('\n');
    for (var bi=0, biL=b_arr.length; bi < biL ; bi++) {
      // replace rubystrings
      if (b_arr[bi].match(/<cRubyString:[ぁ-ー]+?>/) !== null){
        b_arr[bi] = b_arr[bi]
        .replace(/ぁ/g,'あ')
        .replace(/ぃ/g,'い')
        .replace(/ぅ/g,'う')
        .replace(/ぇ/g,'え')
        .replace(/ぉ/g,'お')
        .replace(/っ/g,'つ')
        .replace(/ゃ/g,'や')
        .replace(/ゅ/g,'ゆ')
        .replace(/ょ/g,'よ')
        .replace(/ァ/g,'ア')
        .replace(/ィ/g,'イ')
        .replace(/ゥ/g,'ウ')
        .replace(/ェ/g,'エ')
        .replace(/ォ/g,'オ')
        .replace(/ッ/g,'ツ')
        .replace(/ャ/g,'ヤ')
        .replace(/ュ/g,'ユ')
        .replace(/ョ/g,'ヨ');
      }
    };
    // reconstruct tagged text
    c_arr.push(b_arr.join(''));
  };
  var src = c_arr.join('\n');
  return src
}