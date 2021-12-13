function undo(docID) {
      var doc = document.getElementById(docID)
      var undos = doc.quill.history.stack.undo.length;
      for (var i = 0; i < undos; i++) {
        doc.quill.history.undo();
      }
    }
