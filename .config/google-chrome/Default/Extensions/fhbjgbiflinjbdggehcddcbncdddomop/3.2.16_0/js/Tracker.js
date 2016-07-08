var Tracker = Backbone.Model.extend({
	defaults: function() {
		return {
		}
	},

	initialize: function() {
		pm.mediator.once("onTrialStart", this.onTrialStart, this);
		pm.mediator.once("onTrialEnd", this.onTrialEnd, this);
		pm.mediator.on("onStartPurchase", this.onStartPurchase, this);

		//for collection_runner events
		pm.appWindow.trigger("registerInternalEvent", "test_runner_event", this.onAddTestRunnerEvent, this);
	},

	onAddTestRunnerEvent: function(event) {
		this.trackEvent(event.category, event.action, event.label, event.value);
	},

	onStartPurchase: function() {
		if (tracker) {
			this.trackEvent('test_runner', 'collection_runner', 'buy');
		}
	},

	onTrialStart: function() {
		if (tracker) {
			this.trackEvent('test_runner', 'collection_runner', 'trial_start');
		}
	},

	onTrialEnd: function() {
		if (tracker) {
			console.log("trial_end event fired");
			this.trackEvent('test_runner', 'collection_runner', 'trial_end');
		}
	},

	sendAppView: function(url) {
		var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
		if (analyticsEnabled) {
			if(window.hasOwnProperty("tracker")) {
				//chrome
				tracker.sendAppView(url);
			}
			else if(window.hasOwnProperty("electronTracker")) {
				//electron
				electronTracker.screenView(url);
			}
		}
	},

	trackEvent: function(category, action, label, value) {
		//if this is the collection runner
		if(!pm["syncManager"]) {
			pm.appWindow.sendMessageWrapper({
				id: pm.appWindow.get("id"),
				event: "test_runner_event",
				object: {
					category: category,
					action: action,
					label: label,
					value: value
				}
			});
			return;
		}

		this.forceTrackEvent(category, action, label, value);
	},

	forceTrackEvent: function(category, action, label, value) {
		var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
		if (analyticsEnabled) {
			if(window.tracker) {
				if(value) {
					tracker.sendEvent(category, action, label, value);
				}
				else if(label) {
					tracker.sendEvent(category, action, label);
				}
				else {
					tracker.sendEvent(category, action);
				}
			}
			else if(window.electronTracker) {
				if(value) {
					electronTracker.event(category, action, label, value);
				}
				else if(label) {
					electronTracker.event(category, action, label);
				}
				else {
					electronTracker.event(category, action);
				}
			}
		}
	}
});

module.exports = Tracker;
