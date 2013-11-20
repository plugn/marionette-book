ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

  List.Controller = {
    listContacts: function() {
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List.Contacts({
        collection: contacts
      });

      contactsListView.on("itemview:contact:show", function(childView, model) {
        console.log("Received itemview:contact:show event on model: ", model);
        ContactManager.ContactsApp.Show.Controller.showContact(model);
      });

      contactsListView.on("itemview:contact:delete", function(childView, model) {
      	contacts.remove(model);
      });

      contactsListView.on("itemview:contact:highlight", function(childView, model) {
      	console.log("highlighting toggled on model: ", model);
      });

      ContactManager.mainRegion.show(contactsListView);
    }
  }

});