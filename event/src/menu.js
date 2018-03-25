function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create some radio items.
function radioOnClick(info, tab) {
  console.log("radio item " + info.menuItemId +
              " was clicked (previous checked state was "  +
              info.wasChecked + ")");
}

// Create some checkbox items.
function checkboxOnClick(info, tab) {
  console.log(JSON.stringify(info));
  console.log("checkbox item " + info.menuItemId +
              " was clicked, state is now: " + info.checked +
              "(previous state was " + info.wasChecked + ")");

}

export const setupMenu = () => {
  // Create one test item for each context type.
  var contexts = ["selection","link"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "onclick": genericOnClick});
    console.log("'" + context + "' item:" + id);
  }


  // Create a parent item and two children.
  var parent = chrome.contextMenus.create({"title": "Match Number"});
  var child1 = chrome.contextMenus.create(
    {"title": "3", "parentId": parent, "onclick": checkboxOnClick});
  var child2 = chrome.contextMenus.create(
    {"title": "5", "parentId": parent, "onclick": checkboxOnClick});
  var child3 = chrome.contextMenus.create(
      {"title": "10", "parentId": parent, "onclick": checkboxOnClick});

  var radio1 = chrome.contextMenus.create({"title": "Go to review page", "type": "radio",
                                           "onclick":radioOnClick});
  console.log("radio1:" + radio1);



  var checkbox1 = chrome.contextMenus.create(
    {"title": "Active", "type": "checkbox", "onclick":checkboxOnClick});


  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  console.log("About to try creating an invalid item - an error about " +
              "item 999 should show up");
  chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
  });
}
