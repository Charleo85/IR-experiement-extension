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

export const setupMenu = (dispatch) => {
  // Create one test item for each context type.
  var contexts = ["selection","link"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "onclick": genericOnClick});
    // console.log("'" + context + "' item:" + id);
  }

  const selectModel = (model) => () => {
    dispatch({
      type: 'UPDATE_MODEL',
      payload: {
        model
      }
    })
  }

  // Create a parent item and two children.
  var parent1 = chrome.contextMenus.create({"title": "Match Algorithm"});
  var child1_1 = chrome.contextMenus.create(
    {"title": "keyword", "parentId": parent1, "type": "radio", "onclick": selectModel('keyword')});
  var child1_2 = chrome.contextMenus.create(
    {"title": "HTMM", "parentId": parent1,  "type": "radio", "onclick": selectModel('HTMM')});


  // Create a parent item and two children.
  var parent2 = chrome.contextMenus.create({"title": "Match Number"});
  var child2_1 = chrome.contextMenus.create(
    {"title": "3", "parentId": parent2, "type": "radio", "onclick": checkboxOnClick});
  var child2_2 = chrome.contextMenus.create(
    {"title": "5", "parentId": parent2, "type": "radio", "onclick": checkboxOnClick});
  var child2_3 = chrome.contextMenus.create(
      {"title": "10", "parentId": parent2, "type": "radio", "onclick": checkboxOnClick});

  var radio1 = chrome.contextMenus.create({"title": "Go to review page", "type": "checkbox",
                                           "onclick":radioOnClick});
  // console.log("radio1:" + radio1);



  var checkbox1 = chrome.contextMenus.create(
    {"title": "Active", "type": "checkbox", "onclick":checkboxOnClick});


  // // Intentionally create an invalid item, to show off error checking in the
  // // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //             "item 999 should show up");
  // chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
}
