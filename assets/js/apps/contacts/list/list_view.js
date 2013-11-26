/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp.List", function(List, ContactsManager, Backbone, Marionette, $, _) {

	List.Layout = Marionette.Layout.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel",

		triggers: {
			"click button.js-new": "contact:new"
		},

		events: {
			"submit #filter-form": "filterContacts"
		},

		filterContacts: function(e) {
			e.preventDefault();
			var criterion = this.$(".js-filter-criterion").val();
			this.trigger("contacts:filter", criterion);
		}

	});

	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightName",
			"click td a.js-show": "showClicked",
			"click td a.js-edit": "editClicked",
			"click button.js-delete": "deleteClicked"
		},

		remove: function() {
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		},

		highlightName: function(e) {
			e.preventDefault();
			this.$el.toggleClass('warning');
			this.trigger("contact:highlight", this.model);
		},

		showClicked: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:show", this.model);
		},

		editClicked: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:edit", this.model);
		},

		deleteClicked: function(e) {
			e.stopPropagation();
			this.trigger("contact:delete", this.model);
		},

		flash: function(cssClass) {
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function() {
				setTimeout(function() {
					$view.toggleClass(cssClass);
				}, 500);
			});
		}

	});

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
		itemView: List.Contact,
		itemViewContainer: "tbody",

		initialize: function() {
			this.listenTo(this.collection, "reset", function() {
				this.appendHtml = function(collectionView, itemView, index) {
					collectionView.$el.append(itemView.el);
				};
			});
		},

		onCompositeCollectionRendered: function() {
			this.appendHtml = function(collectionView, itemView, index) {
				collectionView.$el.prepend(itemView.el);
			};
		}

		//onItemviewContactDelete: function() {
		//	this.$el.fadeOut(1000, function() {
		//		$(this).fadeIn(1000);
		//	});
		//}
	});

});