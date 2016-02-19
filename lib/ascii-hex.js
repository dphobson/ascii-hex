const CompositeDisposable = require("atom").CompositeDisposable;

module.exports = {
  activate: function() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
      "ascii-hex:asciiToHex": this.convertToHex.bind(null),
      "ascii-hex:hexToAscii": this.convertToAscii.bind(null)
      })
    );
  },
  convertToHex: function(n) {
    var activeEditor = atom.workspace.getActiveTextEditor();

    if (activeEditor == null)
      return;

    var selection = activeEditor.getSelectedText();

    if (selection.length == 0)
      return;

    var asciiData = selection.toString();

    var result = [];
  	for (var n = 0, l = asciiData.length; n < l; n ++)
      result.push(Number(asciiData.charCodeAt(n)).toString(16));

//  	console.log("result " + result);

    activeEditor.insertText(result.join(''));
  },
  convertToAscii: function(n) {
    var activeEditor = atom.workspace.getActiveTextEditor();

    if (activeEditor == null)
      return;

    var selection = activeEditor.getSelectedText();

      if (selection.length == 0)
        return;

    var hexData = selection.toString();
    var result = '';

    for (var i = 0; i < hexData.length; i += 2)
        result += String.fromCharCode(parseInt(hexData.substr(i, 2), 16));

//  	console.log("result " + result);

    activeEditor.insertText(result);
  }
};
