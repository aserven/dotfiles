this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["banner_sync_launched"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"sync-launched-banner-cta-button fill-button\" id=\"sync-launched-banner-cta-buy\">\n          <a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">Buy ($5 /user /mo)</a>\n        </div>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <div class=\"sync-launched-banner-cta-button\" id=\"sync-launched-banner-cta-learn-more\">\n          <a href=\"https://www.getpostman.com/plans/cloud-basic\" target=\"_blank\">Learn more</a>\n        </div>\n      ";
  }

  buffer += "<div id=\"sync-launched-banner\">\n  <div id=\"sync-launched-banner-column-1\">\n    <div id=\"sync-launched-banner-graphic\">\n    </div>\n  </div>\n  <div id=\"sync-launched-banner-column-2\">\n    <div class=\"sync-launched-banner-heading\">Postman Cloud Launched!</div>\n    <div class=\"sync-launched-banner-content\">\n      Thank you for being part of Team Sync Beta. Collaborate smoothly with your team while working with APIs and organized collections.\n    </div>\n    <div class=\"sync-launched-banner-cta\">\n      ";
  stack1 = helpers['if'].call(depth0, depth0.admin, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"sync-launched-banner-close icon-delete\"></div>\n  </div>\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["broadcasts"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_broadcast, 'item_broadcast', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  });

this["Handlebars"]["templates"]["collection_overview_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    ";
  options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n        <div id=\"mainview-collection-icons\" class=\"overview-actions\">\n    ";
  }

function program4(depth0,data) {
  
  
  return "\n        <div id=\"mainview-collection-icons\" class=\"overview-actions collection-editable-false\">\n    ";
  }

function program6(depth0,data) {
  
  
  return "\n        <div id=\"mainview-collection-icons\" class=\"overview-actions\">\n";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li>\n            <a data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                rel=\"tooltip\"\n                   data-original-title=\"Unsubscribe from collection\"\n                   data-placement=\"bottom\"data-toggle=\"modal\"\n                class=\"collection-actions-unsubscribe collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner=\"";
  if (stack1 = helpers.owner) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.owner; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"icon-collection-delete-circle action-icon\"></span>\n            </a>\n        </li>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                rel=\"tooltip\"\n               data-original-title=\"Delete collection\"\n               data-placement=\"bottom\"\n                class=\"collection-actions-delete collection-action\"\n                data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-shared=\"";
  if (stack1 = helpers.sharedWithTeam) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sharedWithTeam; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"icon-collection-delete-circle action-icon\"></span>\n            </a>\n        </li>\n        ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"collection-overview-viewdocs\">\n    <a target=\"_blank\" href=\"";
  if (stack1 = helpers.docsLink) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.docsLink; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"view-docs-link-browser external-link\">View Documentation</a>\n</div>\n";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"collection-overview-lastmodified\">\n        Modified ";
  if (stack1 = helpers.lastUpdatedAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastUpdatedAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    </div>\n";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    <span class=\"label label-info\" rel=\"tooltip\" data-original-title=\"You have subscribed to this collection\" data-placement=\"bottom\">subscribed</span>\n    ";
  options = {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + "\n    ";
  return buffer;
  }

function program19(depth0,data) {
  
  
  return "\n        <span class=\"label label-important\" rel=\"tooltip\" data-original-title=\"You cannot edit this collection\" data-placement=\"bottom\">read only</span>\n    ";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.sharedWithTeam, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n        <span class=\"label label-success\" rel=\"tooltip\" data-original-title=\"You have shared this collection with your team\" data-placement=\"bottom\">shared</span>\n        ";
  options = {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n            "
    + "\n        ";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n            <span class=\"label label-important\" rel=\"tooltip\" data-original-title=\"Subscribers cannot edit this collection\" data-placement=\"bottom\">read only</span>\n        ";
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_overview_folder, 'item_collection_overview_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_overview_request, 'item_collection_overview_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <ul class=\"clearfix\">    \n        <li><btn class=\"main-action-button collection-action-mainview overview-run-collection\" data-collection-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Run</btn></li>\n\n        <li><a\n            data-placement=\"bottom\"\n            rel=\"tooltip\" data-original-title=\"Edit collection\"\n            ref=\"#modal-edit-collection\" data-toggle=\"modal\"\n            class=\"collection-actions-edit collection-action-mainview\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-collection-edit\"></span></a></li>\n\n        <li><a rel=\"tooltip\"\n           data-original-title=\"Duplicate collection\"\n           data-placement=\"bottom\"\n           class=\"collection-action-duplicate collection-action-mainview\"\n           data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-collection-duplicate-circle\"></span></a></li>\n\n        <li><a\n            data-placement=\"bottom\"\n            rel=\"tooltip\" data-original-title=\"Share collection\"\n            class=\"collection-actions-share collection-action-mainview\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-collection-share\"></span></a></li>\n\n        <li>\n            <a data-placement=\"bottom\"\n            rel=\"tooltip\"\n            data-original-title=\"Download collection\"\n            data-placement=\"bottom\"\n                class=\"collection-actions-download collection-action\"\n                data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"icon-collection-download-circle action-icon\"></span>\n            </a>\n        </li>\n\n        <li>\n            <a rel=\"tooltip\"\n            data-original-title=\"Add new folder\"\n            data-placement=\"bottom\" ref=\"#modal-add-folder\"\n                data-toggle=\"modal\" class=\"collection-actions-add-folder\"\n            data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"icon-collection-add-folder action-icon\"></span>\n            </a>\n        </li>\n\n\n        ";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n\n</div>\n\n<div id=\"main-view-toprow\">\n    <h4 id=\"collection-overview-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-inputclass=\"input-large\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, depth0.docsLink, {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, depth0.lastUpdatedAt, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"collection-overview-ownership-status\">\n";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(21, program21, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<p id=\"collection-overview-description\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"textarea\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n<div class=\"overview-children\">\n";
  stack1 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["collection_selector_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_selector_list, 'item_collection_selector_list', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["collection_sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_folder, 'item_collection_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_sidebar_request, 'item_collection_sidebar_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Handlebars"]["templates"]["collection_sidebar_folders"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_folder, 'item_collection_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["Handlebars"]["templates"]["collection_sidebar_requests"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_sidebar_request, 'item_collection_sidebar_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["conflict_resolver_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr id=\"conflictRow-";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.model_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"conflictRow\" data-showrow=\"";
  if (stack1 = helpers.showRow) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.showRow; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td width=\"15%\">";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td width=\"15%\">";
  if (stack1 = helpers.nameOrId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nameOrId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td width=\"15%\">";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td>\n        <label class=\"radio\">\n            <input type=\"radio\" name=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.model_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.model_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-server\" value=\"";
  if (stack1 = helpers.serverValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.serverValue; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-conflict-id=\"";
  if (stack1 = helpers.conflictId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.conflictId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-which-change=\"server\" data-local-action=\"";
  if (stack1 = helpers.localAction) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.localAction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-remote-action=\"";
  if (stack1 = helpers.remoteAction) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.remoteAction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-model=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-model-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-key=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (stack1 = helpers.serverValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.serverValue; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </label>\n    </td>\n    <td>\n        <label class=\"radio\">\n            <input type=\"radio\" name=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.model_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.model_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-local\" value=\"";
  if (stack1 = helpers.localValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.localValue; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-conflict-id=\"";
  if (stack1 = helpers.conflictId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.conflictId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-which-change=\"local\" data-local-action=\"";
  if (stack1 = helpers.localAction) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.localAction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-remote-action=\"";
  if (stack1 = helpers.remoteAction) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.remoteAction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-model=\"";
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.model; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-model-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-key=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" checked> ";
  if (stack1 = helpers.localValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.localValue; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </label>\n    </td>\n</tr>";
  return buffer;
  });

this["Handlebars"]["templates"]["directory_collections"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["Handlebars"]["templates"]["environment_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_environment_list, 'item_environment_list', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["environment_quicklook"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_environment_quicklook, 'item_environment_quicklook', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["environment_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_environment_selector, 'item_environment_selector', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["environment_selector_actions"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li id=\"manage-cookies-modal-wrapper\"><a href=\"#modal-cookies\" data-toggle=\"modal\" data-keyboard=\"true\">Manage cookies</a></li>\n<li><a href=\"#modal-environments\" data-toggle=\"modal\" data-keyboard=\"true\">Manage environments</a></li>\n<li class=\"divider\"></li>\n<li><a class=\"environment-list-item-noenvironment\" >No environment</a></li>";
  });

this["Handlebars"]["templates"]["folder_overview_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    ";
  options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n        <div id=\"mainview-folder-icons\" class=\"overview-actions\">\n    ";
  }

function program4(depth0,data) {
  
  
  return "\n        <div id=\"mainview-folder-icons\" class=\"collection-editable-false overview-actions\">\n    ";
  }

function program6(depth0,data) {
  
  
  return "\n    <div id=\"mainview-folder-icons\" class=\"overview-actions\">\n";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a\n                    data-placement=\"bottom\"\n                    rel=\"tooltip\" data-original-title=\"Edit folder\"\n                    ref=\"#modal-edit-folder\" data-toggle=\"modal\"\n                    class=\"folder-actions-edit folder-action-mainview\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <span class=\"icon-collection-edit\"></span></a></li>\n        <li><a\n                    data-placement=\"bottom\"\n                    rel=\"tooltip\" data-original-title=\"Duplicate folder\"\n                    ref=\"#modal-duplicate-folder\" data-toggle=\"modal\"\n                    class=\"folder-actions-duplicate folder-action-mainview\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <span class=\"icon-collection-duplicate-circle\"></span></a></li>\n\n        <li><a\n                    data-placement=\"bottom\"\n                    rel=\"tooltip\" data-original-title=\"Delete folder\"\n                    ref=\"#modal-delete-folder\" data-toggle=\"modal\"\n                    class=\"folder-actions-delete folder-action-mainview\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <span class=\"icon-collection-delete-circle\"></span></a></li>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_overview_request, 'item_collection_overview_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <ul class=\"clearfix\">    \n        <li><btn class=\"main-action-button folder-action-mainview overview-run-folder\" data-collection-id=\"";
  if (stack1 = helpers.collectionId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collectionId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-folder-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Run</btn></li>\n           \n       ";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </ul>\n    \n</div>\n\n<div id=\"main-view-toprow\" class=\"collection-overview-breadcrumb\">\n    <button class=\"tertiary-action-button back-button\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-collection-id=\"";
  if (stack2 = helpers.collectionId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.collectionId; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n        <span class=\"icon-back-indicator\"></span>\n    </button>\n    <span class=\"folder-breadcrumb\">\n        <h4 id=\"folder-overview-name\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-inputclass=\"input-large\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</h4>\n    </span>\n</div>\n\n<p id=\"folder-overview-description\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-type=\"textarea\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n\n<div class=\"overview-children\">\n";
  stack2 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["header_preset_dropdown"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_header_preset_dropdown, 'item_header_preset_dropdown', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = self.invokePartial(partials.item_manage_header_preset_dropdown, 'item_manage_header_preset_dropdown', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li class=\"divider\"></li>\n";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Handlebars"]["templates"]["header_preset_empty_dropdown"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials.item_manage_header_preset_dropdown, 'item_manage_header_preset_dropdown', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li class=\"divider\"></li>\n";
  stack1 = self.invokePartial(partials.item_empty_header_preset_dropdown, 'item_empty_header_preset_dropdown', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Handlebars"]["templates"]["header_preset_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_header_preset_list, 'item_header_preset_list', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["history_sidebar_requests"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_history_sidebar_request, 'item_history_sidebar_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["item_broadcast"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"broadcast\">\n<div>";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a class=\"folder-head-actions-opener\" data-toggle=\"dropdown\">\n                      <span class=\"icon-collections-more\"></span>\n                    </a>\n\n                      <ul class=\"dropdown-menu folder-head-actions-menu pull-right\">\n                      <li><a\n                         data-placement=\"bottom\"\n                         ref=\"#modal-edit-folder\" data-toggle=\"modal\"\n                         class=\"folder-actions-edit folder-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                          <span class=\"icon-mini-edit action-icon\"></span><span class=\"action-title\">Edit</span></a></li>\n\n                          <li><a data-placement=\"bottom\"\n                         data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"folder-actions-duplicate folder-action\">\n                          <span class=\"icon-collection-duplicate action-icon\"></span> <span class=\"action-title\">Duplicate</span></a></li>\n                      </a>\n\n                          <li><a\n                         data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                         data-placement=\"bottom\"\n                         href=\"#modal-delete-folder\" data-toggle=\"modal\"\n                         class=\"folder-actions-delete folder-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                          <span class=\"icon-collection-delete action-icon\"></span><span class=\"action-title\">Delete</span></a></li>\n                       </ul>\n\n                  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = self.invokePartial(partials.item_collection_sidebar_request, 'item_collection_sidebar_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }

  buffer += "  <li id=\"folder-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"folder clearfix droppable-on-collection\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <div class=\"folder-head sidebar-item-head clearfix\">\n            <div class=\"folder-head-icon\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">              \n              <span class=\"icon-folder\"></span>\n            </div>            \n            <div class=\"folder-head-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">                \n                <div class=\"folder-actual-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                  ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n                </div>\n            </div>\n            <div class=\"folder-head-actions-wrapper\">\n              <div class=\"folder-head-actions dropdown\">\n                  ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              </div>\n            </div>\n        </div>\n        <ul id=\"folder-requests-";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"folder-requests\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n            ";
  stack2 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n    </li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_overview_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"folder-actions-wrapper\">\n            <ul class=\"folder-actions\">\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Edit folder\"\n                        ref=\"#modal-edit-folder\" data-toggle=\"modal\"\n                        class=\"folder-actions-edit folder-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-mini-edit\"></span>\n                    </a>\n                </li>\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Duplicate folder\"\n                        ref=\"#modal-duplicate-folder\" data-toggle=\"modal\"\n                        class=\"folder-actions-duplicate folder-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-collection-duplicate\"></span>\n                    </a>\n                </li>\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Delete folder\"\n                        ref=\"#modal-delete-folder\" data-toggle=\"modal\"\n                        class=\"folder-actions-delete folder-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-collection-delete\"></span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = self.invokePartial(partials.item_collection_overview_request, 'item_collection_overview_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }

  buffer += "<div class=\"collection-overview-folder-wrapper\" id=\"collection-overview-folder-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"overview-folder-head\" data-folder-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <div class=\"icon-folder\"></div>\n        <div class=\"folder-name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"overview-folder-detail\">\n        <div class=\"overview-folder-description\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n        \n        <div class=\"overview-folder-requests\">\n            ";
  stack2 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_overview_request"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"request-actions-wrapper\">\n            <ul class=\"request-actions\">\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Edit request\"\n                        class=\"request-actions-edit request-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-mini-edit\"></span>\n                    </a>\n                </li>\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Duplicate request\"\n                        class=\"request-actions-duplicate request-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-collection-duplicate\"></span>\n                    </a>\n                </li>\n                <li><a data-placement=\"bottom\"\n                        rel=\"tooltip\" data-original-title=\"Delete request\"\n                        class=\"request-actions-delete request-action-mainview-inline\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-collection-delete\"></span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"collection-overview-request-wrapper\" id=\"collection-overview-request-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"overview-request-head\">\n        <div class=\"label sidebar-label-method label-method-";
  if (stack1 = helpers.method) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.method; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.abbreviate || depth0.abbreviate),stack1 ? stack1.call(depth0, depth0.method, options) : helperMissing.call(depth0, "abbreviate", depth0.method, options)))
    + "</div>\n        <div class=\"request-name\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n        ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"active-only overview-request-description\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n\n    <div class=\"active-only clearfix\" id=\"overview-request-actions\">\n        <span class=\"text-action-button overview-open-request-in-builder\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">Open in builder</span>\n        <!-- <span class=\"btn-group overview-open-request-more\">\n            <button class=\"tertiary-action-button dropdown-toggle\" data-toggle=\"dropdown\">More <span class=\"icon-more\"></span></button>\n            <ul class=\"dropdown-menu\">\n                <li> <a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-edit request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Edit request\">\n                    <span class=\"icon-collection-edit\"></span> Edit request\n                </a></li>\n                <li><a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-duplicate request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Duplicate request\">\n                    <span class=\"icon-collection-copy\"></span> Duplicate request</a></li>\n                <li><a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-delete request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Delete request\">\n                    <span class=\"icon-collection-delete\"></span> Delete request\n                </a></li>\n            </ul>\n        </span> -->\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_selector_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, stack2, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <option value=\"add-request-option-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-owner=\"";
  if (stack1 = helpers.owner) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.owner; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"collection\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n    ";
  stack1 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.item_collection_selector_list_folder, 'item_collection_selector_list_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditableItem || depth0.ifEditableItem),stack1 ? stack1.call(depth0, depth0.write, depth0.owner, options) : helperMissing.call(depth0, "ifEditableItem", depth0.write, depth0.owner, options));
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["item_collection_selector_list_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<option value=\"add-request-option-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-id=\"";
  if (stack1 = helpers.collection_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collection_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-owner=\"";
  if (stack1 = helpers.collection_owner) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collection_owner; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-folder-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"folder\">";
  if (stack1 = helpers.collection_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collection_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " / ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_sidebar_head"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "filter-hook-subscribed ";
  options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "filter-hook-editable";
  }

function program4(depth0,data) {
  
  
  return "filter-hook-readonly";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, depth0.sharedWithTeam, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " filter-hook-editable";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "filter-hook-shared";
  }

function program9(depth0,data) {
  
  
  return "filter-hook-unshared";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                ";
  options = {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "\n                <div class=\"sidebar-collection-head-meta\">\n                    <span class=\"sidebar-nonhover label\">editable</span>\n                </div>\n                ";
  }

function program14(depth0,data) {
  
  
  return "\n                <div class=\"sidebar-collection-head-meta\">\n                    <span class=\"sidebar-nonhover label\">read-only</span>\n                </div>\n                ";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, depth0.sharedWithTeam, {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "\n                <div class=\"sidebar-collection-head-meta\">\n                    <span class=\"sidebar-nonhover label\">shared</span>\n                </div>\n                ";
  }

function program19(depth0,data) {
  
  var stack1, stack2, options;
  options = {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  }
function program20(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program22(depth0,data) {
  
  
  return " collection-editable-false";
  }

function program24(depth0,data) {
  
  
  return "\n                        ";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li><a  data-placement=\"bottom\"\n                                class=\"collection-actions-share collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-share-mini action-icon\"></span>\n                                <span class=\"action-title\">Share</span>\n                            </a>\n                        </li>\n                        ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li>\n                            <a data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                                data-placement=\"bottom\" data-toggle=\"modal\"\n                                class=\"collection-actions-unsubscribe collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner=\"";
  if (stack1 = helpers.owner) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.owner; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-delete action-icon\"></span>\n                                <span class=\"action-title\">Unsubscribe</span>\n                            </a>\n                        </li>\n                        ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li><a data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                                data-placement=\"bottom\"\n                                class=\"collection-actions-delete collection-action\"\n                                data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-shared=\"";
  if (stack1 = helpers.sharedWithTeam) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sharedWithTeam; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-delete action-icon\"></span>\n                                <span class=\"action-title\">Delete</span>\n                            </a>\n                        </li>\n                        ";
  return buffer;
  }

  buffer += "<li id=\"collection-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-collection\n";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <div class=\"sidebar-collection-head sidebar-item-head clearfix\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n\n        <div class=\"sidebar-collection-head-icon\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-collection\"></span>\n        </div>\n    \n        <div class=\"sidebar-collection-head-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <div class=\"sidebar-collection-head-cname\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </div>\n            <div class=\"sidebar-collection-head-meta\">\n                <!-- TODO -->\n                <!-- Last updated at doesn't seem to be available in subscribed collections -->\n                <span class=\"sidebar-collection-head-item-time\">";
  if (stack1 = helpers.lastUpdatedAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastUpdatedAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " at ";
  if (stack1 = helpers.lastUpdatedAt2) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastUpdatedAt2; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                <span class=\"sidebar-nonhover anish-dot\"></span>\n                <span class=\"sidebar-collection-head-item-count\">\n                    <span class=\"collection-request-count\">";
  if (stack1 = helpers.requestCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.requestCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                    <span class=\"sidebar-collection-head-item-count-type\">";
  if (stack1 = helpers.requestCountLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.requestCountLabel; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                </span>\n            </div>\n            \n            ";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(16, program16, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n\n        <div class=\"collection-head-actions\">\n            <a class=\"collection-head-actions-opener\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"icon-collection-expand\"></span>\n            </a>\n            <span class=\"sidebar-collection-head-quick-actions dropdown collection-more-menu-opener\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <a data-placement=\"bottom\" data-toggle=\"dropdown\"\n                       class=\"dropdown-toggle collection-actions-more collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"icon-collections-more\"></span>\n                    </a>\n                    <ul class=\"dropdown-menu pull-right collection-head-actions-menu ";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <li class=\"readonly-wrapper\">\n                            <a  data-placement=\"bottom\"\n                                ref=\"#modal-edit-collection\" data-toggle=\"modal\"\n                                class=\"collection-actions-edit collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                                data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-mini-edit action-icon\"></span>\n                                <span class=\"action-title\">Edit</span>\n                            </a>\n                        </li>\n                        <li class=\"readonly-wrapper\">\n                            <a  data-placement=\"bottom\" ref=\"#modal-add-folder\"\n                                data-toggle=\"modal\" class=\"collection-actions-add-folder\"\n                            data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-add-folder-mini action-icon\"></span>\n                                <span class=\"action-title\">Add Folder</span>\n                            </a>\n                        </li>\n                        ";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        <li>\n                            <a class=\"collection-actions-duplicate collection-action\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-duplicate action-icon\"></span>\n                                <span class=\"action-title\">Duplicate</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a data-placement=\"bottom\"\n                                class=\"collection-actions-download collection-action\"\n                                data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <span class=\"icon-collection-download action-icon\"></span>\n                                <span class=\"action-title\">Download</span>\n                            </a>\n                        </li>\n                        ";
  stack1 = helpers['if'].call(depth0, depth0.subscribed, {hash:{},inverse:self.program(30, program30, data),fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n            </span>\n        </div>\n    </div>\n    <div id=\"collection-children-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"collection-children\">\n      <div id=\"collection-children-empty-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"collection-children-empty\">\n          ";
  stack1 = self.invokePartial(partials.item_empty_collection_sidebar, 'item_empty_collection_sidebar', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n      <ul id=\"folders-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"folders\"></ul>\n      <ul id=\"collection-requests-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-collection-requests\"></ul>\n    </div>\n</li>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_sidebar_request"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li><a  data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"request-actions-edit request-action\"\n                        data-placement=\"bottom\">\n                        <span class=\"icon-mini-edit action-icon\"></span><span class=\"action-title\">Edit</span>\n                    </a></li>\n                    <li><a  data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"request-actions-duplicate request-action\"\n                        data-placement=\"bottom\">\n                        <span class=\"icon-collection-duplicate action-icon\"></span><span class=\"action-title\">Duplicate</span></a>\n                    </li>\n                    <li><a  data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"request-actions-delete request-action\"  data-placement=\"bottom\">\n                        <span class=\"icon-collection-delete action-icon\"></span><span class=\"action-title\">Delete</span>\n                    </a></li>\n                ";
  return buffer;
  }

  buffer += "\n    <li id=\"sidebar-request-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-collection-request sidebar-request droppable-on-collection clearfix\">\n        <div class=\"request-head-icon\">\n            <span class=\"label label-method sidebar-label-method label-method-";
  if (stack1 = helpers.method) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.method; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.abbreviate || depth0.abbreviate),stack1 ? stack1.call(depth0, depth0.method, options) : helperMissing.call(depth0, "abbreviate", depth0.method, options)))
    + "\n            </span>\n\n        </div>\n\n        <div class=\"request request-actions-load sidebar-item-head\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n            <span class=\"request-name collection-request-name\">\n                ";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n            </span>\n        </div>\n\n        <div class=\"request-actions-wrapper\">\n            <div class=\"request-actions dropdown\">\n                <a class=\"request-head-actions-opener\" data-toggle=\"dropdown\">\n                    <span class=\"icon-collections-more\"></span>\n                </a>\n                <ul class=\"dropdown-menu request-actions-menu pull-right\">\n                ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </ul>\n            </div>\n        </div>\n    </li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_directory_collection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"directory-collection-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"directory-collection\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<a class=\"directory-collection-action-view\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n	<p class=\"user_name\">";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n	<p class=\"updated_at\"><strong>";
  if (stack1 = helpers.updated_at_formatted) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.updated_at_formatted; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong></p>\n	<div class=\"description\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	<p class=\"count_requests\"><strong>";
  if (stack1 = helpers.count_requests) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count_requests; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> endpoints</p>\n	<a class=\"btn btn-primary btn-small directory-collection-action-download\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-link-id=\"";
  if (stack1 = helpers.link_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Download</a>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_editor_standard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["Handlebars"]["templates"]["item_empty_collection_sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"collection-empty-text\">Add requests to this collection and create folders to organize them</span>\n";
  });

this["Handlebars"]["templates"]["item_empty_header_preset_dropdown"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li><a>No presets added</a></li>";
  });

this["Handlebars"]["templates"]["item_environment_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr>\n    <td>\n        <a  class=\"environment-action-edit\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n    </td>\n    <td class=\"environment-actions\">\n        <a\n           rel=\"tooltip\" data-original-title=\"Duplicate environment\"\n           data-placement=\"bottom\"\n           class=\"environment-action-duplicate icon-transparent-action-button-small\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n           <span class=\"icon-copy\"></span></a>\n        <a\n           rel=\"tooltip\" data-original-title=\"Download environment\"\n           data-placement=\"bottom\"\n           class=\"environment-action-download icon-transparent-action-button-small\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-download\"></span></a>\n        <a\n           data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n           rel=\"tooltip\" data-original-title=\"Delete environment\" data-placement=\"bottom\"\n           class=\"environment-action-delete icon-transparent-action-button-small\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-delete\"></span></a>\n    </td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.id, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_environment_quicklook"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n    <span class=\"key\">";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> →\n    <span class=\"value\">";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</li>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_environment_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a  class=\"environment-list-item\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_header_preset_dropdown"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a class=\"header-preset-dropdown-item\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_header_preset_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n    <td>\n        <a  class=\"header-preset-action-edit\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n    </td>\n    <td style=\"width: 22px;\">\n        <a\n           data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n           rel=\"tooltip\" data-original-title=\"Delete header preset\" data-placement=\"bottom\"\n           class=\"header-preset-action-delete\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-delete\"></span>\n    </td>\n</tr>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_history_sidebar_dategroup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li id=\"history-datelabel-";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"history-sidebar-datelabel history-datelabel\" data-date-label=\"";
  if (stack1 = helpers.dateLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dateLabel; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-timestamp=\"";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.dateLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dateLabel; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n<ul class=\"history-sidebar-dategroup history-datelabel\" data-date-label=\"";
  if (stack1 = helpers.dateLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dateLabel; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-timestamp=\"";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timestamp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n</ul>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_history_sidebar_request"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li id=\"sidebar-request-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-history-request sidebar-request clearfix\" data-date-label=\"";
  if (stack1 = helpers.dateLabel) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dateLabel; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-request-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"history-request-icon\">\n        <span\n            class=\"label sidebar-label-method label-method-";
  if (stack1 = helpers.method) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.method; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.abbreviate || depth0.abbreviate),stack1 ? stack1.call(depth0, depth0.method, options) : helperMissing.call(depth0, "abbreviate", depth0.method, options)))
    + "</span>\n    </div>\n    <div class=\"request\" data-request-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">        \n        <span class=\"request-name history-request-name\">\n            ";
  if (stack2 = helpers.url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n        </span>\n    </div>\n\n    <div class=\"history-request-actions-wrapper\">\n        <div class=\"history-request-actions\">\n            <a data-request-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"request-actions-delete\">\n                <span class=\"icon-delete\"></span>\n            </a>\n        </div>\n    </div>    \n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_logger_drivesync"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<span class=\"item-logger-time\">";
  if (stack1 = helpers.time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n	<span class=\"item-logger-message\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_manage_header_preset_dropdown"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li><a id=\"headers-keyvaleditor-actions-manage-presets\">Manage presets</a></li>";
  });

this["Handlebars"]["templates"]["item_oauth2_access_token"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"oauth2-access-token-container clearfix\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<div class=\"oauth2-access-token-name-container\">\n		<a class=\"oauth2-access-token-name oauth2-access-token-actions-load\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n		data-original-title=\"Click to add to request\"\n		data-placement=\"top\"\n		rel=\"tooltip\" >";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n	<div class=\"oauth2-access-token-actions\">\n		<a rel=\"tooltip\" data-original-title=\"Delete\"\n		   data-placement=\"bottom\" data-toggle=\"modal\"\n		   class=\"oauth2-access-token-actions-delete\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n		    <img src=\"img/delete.png\" style=\"vertical-align: middle;\"/></a>\n	</div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_oauth2_token_data"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n    <span class=\"key\">";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> →\n    <span class=\"value\">";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</li>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_prscript_snippet"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"prscript-snippet\">\n	<a id=\"snippet-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_response_code"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"response-code\" data-placement=\"bottom\" data-original-title=\"";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.code; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-content=\"";
  if (stack1 = helpers.detail) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.detail; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n     rel=\"popover\"><span class=\"label\">Status</span>\n    <div class=\"data\">";
  if (stack1 = helpers.code) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.code; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_response_cookie"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n    <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>";
  if (stack1 = helpers.domain) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.domain; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>";
  if (stack1 = helpers.path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.path; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>";
  if (stack1 = helpers.expires) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.expires; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td>";
  if (stack1 = helpers.httpOnly) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.httpOnly; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td>";
  if (stack1 = helpers.secure) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.secure; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n</tr>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_response_header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.link_to_hyperlink || depth0.link_to_hyperlink),stack1 ? stack1.call(depth0, depth0.value, options) : helperMissing.call(depth0, "link_to_hyperlink", depth0.value, options)))
    + "\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

  buffer += "<li class=\"response-header clearfix\">\n    <div class=\"response-header-name\" data-placement=\"right\" data-original-title=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n         data-content=\"";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n         data-trigger=\"hover\"\n         rel=\"popover\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " &rarr;</div>\n    <div class=\"response-header-value\">\n        ";
  stack1 = helpers['if'].call(depth0, depth0.isLink, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_response_test"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"response-test clearfix response-test-color-";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<div class=\"test\">\n        <span class=\"label label-test-result-";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> ";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    </div>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_sample_response"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"sample-response-actions\">\n		<a rel=\"tooltip\" data-original-title=\"Delete\"\n		   data-placement=\"bottom\" data-toggle=\"modal\"\n		   class=\"sample-response-actions-delete\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n		    <span class=\"icon-delete\"></span></a>\n	</div>\n	";
  return buffer;
  }

  buffer += "<div class=\"sample-response-container clearfix\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<div class=\"sample-response-name-container\">\n		<a class=\"sample-response-name sample-response-actions-load\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n	";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_sidebar_environment_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-default right-sidebar-env-panel\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"panel-heading\" role=\"tab\" data-toggle=\"collapse\" href=\"#collapse-sidebar-envs-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" aria-expanded=\"true\" aria-controls=\"collapse-sidebar-envs-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <h4 class=\"panel-title\">\n            <a href=\"#collapse-sidebar-envs-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-env-name-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </a>\n        </h4>\n    </div>\n    <div id=\"collapse-sidebar-envs-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel collapse\" role=\"tabpanel\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <span class=\"editable-name sidebar-env-name-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"text\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        <br>\n        <div id=\"sidebar-environment-keyvaleditor-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"right-sidebar-kveditor\">\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_sidebar_presets_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-default right-sidebar-presets-panel\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"panel-heading\" role=\"tab\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse-sidebar-presets-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" aria-expanded=\"true\" aria-controls=\"collapse-sidebar-presets-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <h4 class=\"panel-title\">\n            <a href=\"#collapse-sidebar-presets-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-presets-name-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </a>\n        </h4>\n    </div>\n    <div id=\"collapse-sidebar-presets-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"panel collapse\" role=\"tabpanel\">\n        <span class=\"editable-name sidebar-presets-name-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"text\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        <br>\n        <div id=\"sidebar-presets-keyvaleditor-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"right-sidebar-kveditor\">\n        </div>\n        <a class=\"btn sidebar-presets-save-values\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Save</a>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_tcp_reader_target"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<option value=\"";
  if (stack1 = helpers.proxy_target_value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.proxy_target_value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "_";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_team_directory_collection_card"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <span class=\"team-directory-collection-editable\">\n                      ";
  stack1 = helpers['if'].call(depth0, depth0.userWrite, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  </span>\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n                          you can edit\n                      ";
  }

function program4(depth0,data) {
  
  
  return "\n                          you can view\n                      ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"subscribe-button team-directory-collection-action-subscribe\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <div class=\"checkbox\"></div>\n                <div class=\"subscribe-button-text\">Subscribe</div>\n            </div>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, depth0.isOwn, {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\n                <div><span>Your collection</span></div>\n            ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"subscribe-button subscribed team-directory-collection-action-unsubscribe\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <div class=\"checkbox\"></div>\n                    <div class=\"subscribe-button-text\">Unsubscribe</div>\n                </div>\n            ";
  return buffer;
  }

  buffer += "<div id=\"team-directory-collection-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"team-directory-collection\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"team-directory-collection-head clearfix\">\n        <div class=\"team-directory-collection-head-icon\">\n            <span class=\"icon-collection\"></span>\n        </div>\n        <div class=\"team-directory-collection-details-wrapper\">\n            <div class=\"team-directory-collection-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n            <div class=\"team-directory-collection-meta clearfix\">\n                <span class=\"team-directory-collection-username\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                ";
  stack2 = helpers.unless.call(depth0, depth0.isOwn, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"team-directory-collection-body\">\n        <div class=\"description\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n    </div>\n\n    <div class=\"team-directory-collection-footer\">\n        <!-- Hiding updated at details right now -->\n        <!-- <div class=\"updated-at\"><strong>";
  if (stack2 = helpers.updated_at_formatted) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.updated_at_formatted; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</strong></div> -->\n        ";
  stack2 = helpers['if'].call(depth0, depth0.canSubscribeTo, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_team_directory_collection_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = self.invokePartial(partials.item_team_directory_collection_request, 'item_team_directory_collection_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }

  buffer += "<div class=\"collection-overview-folder-wrapper\" id=\"collection-overview-folder-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"overview-folder-head\" data-folder-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <div class=\"icon-folder\"></div>\n        <div class=\"folder-name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    </div>\n    <div class=\"overview-folder-detail\">\n        <div class=\"overview-folder-description\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n        \n        <div class=\"overview-folder-requests\">\n            ";
  stack1 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_team_directory_collection_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class=\"team-directory-collection-permissions\">\n              ";
  stack1 = helpers['if'].call(depth0, depth0.userWrite, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </div>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n                  <span class=\"editable\">you can edit</span>\n              ";
  }

function program4(depth0,data) {
  
  
  return "\n                  <span class=\"read-only\">you can view</span>\n              ";
  }

function program6(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "docs-link-hidden";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"subscribe-button team-directory-collection-action-subscribe\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <div class=\"checkbox\"></div>\n                <div class=\"subscribe-button-text\">Subscribe</div>\n            </div>\n        ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, depth0.isOwn, {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "\n                <div><span>Your collection</span></div>\n            ";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"subscribe-button subscribed team-directory-collection-action-unsubscribe\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-owner-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <div class=\"checkbox\"></div>\n                    <div class=\"subscribe-button-text\">Unsubscribe</div>\n                </div>\n            ";
  return buffer;
  }

  buffer += "<div id=\"team-directory-collection-list-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"team-directory-collection-list\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"team-directory-collection-icon\">\n        <span class=\"icon-collection\"></span>\n    </div>\n    <div class=\"team-directory-collection-name-meta\">\n        <div class=\"team-directory-collection-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n        <div class=\"team-directory-collection-meta\">\n            <span class=\"team-directory-collection-request-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.requests),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralize || depth0.pluralize),stack1 ? stack1.call(depth0, ((stack1 = depth0.requests),stack1 == null || stack1 === false ? stack1 : stack1.length), "request", "requests", options) : helperMissing.call(depth0, "pluralize", ((stack1 = depth0.requests),stack1 == null || stack1 === false ? stack1 : stack1.length), "request", "requests", options)))
    + "</span>\n            <span class=\"anish-dot\"></span>\n            <span class=\"team-directory-collection-subscribers-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.subscribers),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralize || depth0.pluralize),stack1 ? stack1.call(depth0, ((stack1 = depth0.subscribers),stack1 == null || stack1 === false ? stack1 : stack1.length), "subscriber", "subscribers", options) : helperMissing.call(depth0, "pluralize", ((stack1 = depth0.subscribers),stack1 == null || stack1 === false ? stack1 : stack1.length), "subscriber", "subscribers", options)))
    + "</span>\n        </div>\n    </div>\n    <div class=\"team-directory-collection-body\">\n        <div class=\"team-directory-collection-description\">\n            ";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"team-directory-collection-owner\">\n        <div class=\"team-directory-collection-username\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  stack2 = helpers.unless.call(depth0, depth0.isOwn, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"team-directory-collection-time-docs\">\n        <div class=\"team-directory-collection-updated-time\">";
  if (stack2 = helpers.lastUpdatedAt) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.lastUpdatedAt; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " at ";
  if (stack2 = helpers.lastUpdatedAt2) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.lastUpdatedAt2; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n        <div class=\"team-directory-collection-docs ";
  stack2 = helpers['if'].call(depth0, depth0.docsLinkShown, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"><a href=\"";
  if (stack2 = helpers.docsLink) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.docsLink; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"external-link view-docs-link-library\" target=\"_blank\">View Documentation</a></div>\n    </div>\n    <div class=\"team-directory-collection-actions\">\n        ";
  stack2 = helpers['if'].call(depth0, depth0.canSubscribeTo, {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["item_team_directory_collection_request"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"collection-overview-request-wrapper\" id=\"collection-overview-request-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"overview-request-head\">\n        <div class=\"label sidebar-label-method label-method-";
  if (stack1 = helpers.method) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.method; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.abbreviate || depth0.abbreviate),stack1 ? stack1.call(depth0, depth0.method, options) : helperMissing.call(depth0, "abbreviate", depth0.method, options)))
    + "</div>\n        <div class=\"request-name\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n    </div>\n    \n    <div class=\"active-only overview-request-description\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n\n    "
    + "\n        "
    + "\n        <!-- <span class=\"btn-group overview-open-request-more\">\n            <button class=\"tertiary-action-button dropdown-toggle\" data-toggle=\"dropdown\">More <span class=\"icon-more\"></span></button>\n            <ul class=\"dropdown-menu\">\n                <li> <a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-edit request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Edit request\">\n                    <span class=\"icon-collection-edit\"></span> Edit request\n                </a></li>\n                <li><a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-duplicate request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Duplicate request\">\n                    <span class=\"icon-collection-copy\"></span> Duplicate request</a></li>\n                <li><a data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"overview-request-actions-delete request-action\" data-placement=\"bottom\" rel=\"tooltip\" data-original-title=\"Delete request\">\n                    <span class=\"icon-collection-delete\"></span> Delete request\n                </a></li>\n            </ul>\n        </span> -->\n    "
    + "\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_test_snippet"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"test-snippet\">\n	<a id=\"snippet-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_user_collections"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n        <span class=\"label label-success\">Public</span>\n        ";
  }

  buffer += "<tr>\n    <td>\n        <span class=\"user-collection-action-edit\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        ";
  stack1 = helpers['if'].call(depth0, depth0.is_public, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <br/>\n        <span class=\"user-collection-link\">";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span><br/>\n        <span class=\"user-collection-updated-at\">Last updated on ";
  if (stack1 = helpers.updated_at_formatted) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.updated_at_formatted; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </td>\n    <td style=\"width: 100px;\">\n        <a\n           data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n           rel=\"tooltip\" data-original-title=\"Download collection\" data-placement=\"bottom\"\n           class=\"user-collection-action-download icon-transparent-action-button-small\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-remote-id=\"";
  if (stack1 = helpers.remote_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.remote_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-download\"></span></a>\n        <a\n           data-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n           rel=\"tooltip\" data-original-title=\"Delete collection\" data-placement=\"bottom\"\n           class=\"user-collection-action-delete icon-transparent-action-button-small\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"icon-delete\"></span></a>\n    </td>\n</tr>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["message_collection_added"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-block\">\n    <a class=\"close\" data-dismiss=\"alert\">×</a>\n    <h4 class=\"alert-heading\">It worked!</h4>\n    The collection ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " has been ";
  if (stack1 = helpers.action) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.action; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ".\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["message_environment_added"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-block\">\n    <a class=\"close\" data-dismiss=\"alert\">×</a>\n    <h4 class=\"alert-heading\">It worked!</h4>\n    The environment ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " has been ";
  if (stack1 = helpers.action) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.action; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ".\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["message_helper_card_install_interceptor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"helper-card helper-card-small clearfix\">\n	<div class=\"helper-card-icon\">\n		<span class=\"icon-interceptor-large\">\n		</span>\n	</div>\n	<div class=\"helper-card-message-wrapper\">\n		<div class=\"helper-card-message\">\n			Install the free Interceptor extension to send and receive cookies. After installing, you'll need to enable the Interceptor using the icon on the top navigation bar.\n		</div>\n\n		<div class=\"helper-card-main-action-wrapper\">\n			<a class=\"helper-card-main-action\" href=\"https://chrome.google.com/webstore/detail/";
  if (stack1 = helpers.interceptor_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.interceptor_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">\n				Install\n			</a>\n		</div>\n	</div>\n</div>\n\n<div class=\"helper-card-links\">\n	<a href=\"\">Learn more about Interceptor</a>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["message_helper_card_jetpacks_small"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"helper-card helper-card-small clearfix\">\n	<div class=\"helper-card-icon\">\n		<span class=\"icon-jetpacks-large\">\n		</span>\n	</div>\n	<div class=\"helper-card-message-wrapper\">\n		<div class=\"helper-card-message\">\n			Upgrade to Jetpacks for writing tests, running pre-request scripts\n			and the Collection Runner. Just $9.99 for a single license\n		</div>\n\n		<div class=\"helper-card-main-action-wrapper\">\n			<a class=\"helper-card-main-action\" href=\"https://www.getpostman.com/buy/jetpacks?key=collection-runner\" target=\"_blank\">\n				Buy\n			</a>\n			<a class=\"helper-card-secondary-action\" href=\"https://www.getpostman.com/docs/jetpacks_for_teams\" target=\"_blank\">\n				Team License\n			</a>\n		</div>\n	</div>\n</div>\n\n<div class=\"helper-card-links\">\n	<ul>\n		<li><a href=\"https://www.getpostman.com/features#jetpacks\" target=\"_blank\">Learn more about Jetpacks</a></li>\n		<li><a href=\"https://www.getpostman.com/docs/jetpacks_intro\" target=\"_blank\">View documentation</a></li>\n	</ul>\n</div>";
  });

this["Handlebars"]["templates"]["message_no_collection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"empty-message\">\n    You haven't created any collections yet. Collections let you group requests together for quick access.\n</div>";
  });

this["Handlebars"]["templates"]["message_no_history"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"empty-message\">\n    Nothing in your history yet. Requests that you send through Postman are automatically saved here.\n</div>";
  });

this["Handlebars"]["templates"]["message_request_added"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-block\">\n    <a class=\"close\" data-dismiss=\"alert\">×</a>\n    <h4 class=\"alert-heading\">It worked!</h4>\n    The request ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " has been ";
  if (stack1 = helpers.action) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.action; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ".\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["message_test_run_added"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"alert alert-block\">\n    <a class=\"close\" data-dismiss=\"alert\">×</a>\n    <h4 class=\"alert-heading\">It worked!</h4>\n    The test run data has been added.\n</div>";
  });

this["Handlebars"]["templates"]["oauth2_access_tokens"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_oauth2_access_token, 'item_oauth2_access_token', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["oauth2_data"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_environment_quicklook, 'item_environment_quicklook', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["onboarding_popover"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='onboarding-content clearfix'>\n	<div class='onboarding-column-1'>\n		<span class='icon-onboarding'></span>\n	</div>\n	<div class='onboarding-column-2'>\n		<span class='onboarding-title'>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n		<span class='onboarding-text'>";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n		<button class='onboarding-dismiss main-action-button' data-id='";
  if (stack1 = helpers.tooltip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tooltip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'>GOT IT</button>\n	</div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["prscript_snippets_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_prscript_snippet, 'item_prscript_snippet', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["purchase_message_collection_runner"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"request-tests-purchase-message\">\n	<div class=\"buy-header\">\n	    <a class=\"btn btn-medium try-jetpacks btn-upgrade\">Try for 30 days</a> \n	    <a class=\"btn btn-medium btn-success buy-jetpacks btn-upgrade\">Buy ($9.99)</a> \n	    <h3 id=\"jetpacks-about-header\">Get Jetpacks for Postman!</h3>\n	</div>\n\n	<div class=\"iap-content-features clearfix\">\n		<p class=\"header-description\">\n		    You need the Jetpacks upgrade to access the collection runner and write tests. Jetpacks give you\n		    some awesome capabilities within Postman:\n		</p>\n\n	    <div class=\"iap-content-feature clearfix\">                \n	        <div class=\"iap-content-feature-image\">\n	            <img src=\"img/purchases/cr-1.png\"/>\n	        </div>\n	        <div class=\"iap-content-feature-meta clearfix\">\n	            <div class=\"iap-content-feature-header\">\n	                Quick and easy tests\n	            </div>\n	            <div class=\"iap-content-feature-description\">\n	                Write and run tests in Javascript using the test editor within Postman. Tests are run every time you send a request in Postman. Set environment and global variables for even more control.\n	            </div>\n	        </div>\n	    </div>\n\n	    <div class=\"iap-content-feature clearfix\">\n	        <div class=\"iap-content-feature-image\">\n	            <img src=\"img/purchases/cr-2.png\"/>\n	        </div>\n	        <div class=\"iap-content-feature-meta clearfix\">\n	            <div class=\"iap-content-feature-header\">\n	                Run collections, analyze results\n	            </div>                \n	            <div class=\"iap-content-feature-description\">\n	                Execute all requests in a collection or a folder in one go. Chain requests using variables to test precise flows. Postman stores all your runs so you can analyze them later.\n	            </div>\n	        </div>\n	    </div>\n\n	    <div class=\"iap-content-feature clearfix\">\n	        <div class=\"iap-content-feature-image\">\n	            <img src=\"img/purchases/cr-3.png\"/>\n	        </div>\n	        <div class=\"iap-content-feature-meta clearfix\">\n	            <div class=\"iap-content-feature-header\">\n	                Multiple tests, no changes required\n	            </div>                \n	            <div class=\"iap-content-feature-description\">\n	                Run multiple iterations using data values from a CSV or a JSON file. Postman displays aggregate results and also lets you pinpoint which iteration failed and why.\n	            </div>\n	        </div>\n	    </div>\n\n	    <p class=\"header-description\">\n	        All this available for only $9.99 with free upgrades for life. Check out the \n	        <a href=\"https://www.getpostman.com/docs/jetpacks_intro\" target=\"_blank\">documentation</a>\n	        to get the most out of Jetpacks. You can also find an overview of basic features on the \n	        <a href=\"http://blog.getpostman.com/index.php/2014/01/16/ridiculously-easy-api-testing-introducing-jetpacks-for-postman/\" target=\"_blank\">Postman blog.</a>\n	    </p>\n	</div>\n</div>";
  });

this["Handlebars"]["templates"]["response_cookies"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_response_cookie, 'item_response_cookie', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["response_headers"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_response_header, 'item_response_header', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["response_tests"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_response_test, 'item_response_test', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["sample_responses"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_sample_response, 'item_sample_response', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["sidebar_environment_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_sidebar_environment_list, 'item_sidebar_environment_list', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["sidebar_preset_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"panel-group\" id=\"right-sidebar-presets-accordion\" class=\"right-sidebar-aaccordion\" role=\"tablist\" aria-multiselectable=\"true\">\n    ";
  stack1 = self.invokePartial(partials.item_sidebar_presets_list, 'item_sidebar_presets_list', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["syncstatus_item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <span class=\"syncnotif-entity\">";
  if (stack1 = helpers.entity) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entity; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                <span class=\"syncnotif-entity-name\">\"";
  if (stack1 = helpers.entityName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"</span>";
  stack1 = helpers['if'].call(depth0, depth0.user, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " by <span class=\"syncnotif-user\">";
  if (stack1 = helpers.user) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

  buffer += "<li id=\"syncstatus-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-syncsatus\">\n    <div class=\"sidebar-syncstatus-head\">\n        <span class=\"label label-method-";
  if (stack1 = helpers.method) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.method; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.verb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.verb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        ";
  stack1 = helpers['if'].call(depth0, depth0.entity, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</li>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["team_directory_collection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <div class=\"collection-overview-meta\">\n            <span class=\"collection-overview-last-modified label\">";
  if (stack1 = helpers.lastUpdatedAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastUpdatedAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            <span class=\"anish-dot\"></span>\n            <span class=\"collection-overview-request-count label\">";
  if (stack1 = helpers.requestCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.requestCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralize || depth0.pluralize),stack1 ? stack1.call(depth0, depth0.requestCount, "request", "requests", options) : helperMissing.call(depth0, "pluralize", depth0.requestCount, "request", "requests", options)))
    + "</span>\n        </div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <span class=\"label label-warning\" rel=\"tooltip\" data-original-title=\"You can edit this collection\" data-placement=\"bottom\">you can edit</span>\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n        <span class=\"label label-important\" rel=\"tooltip\" data-original-title=\"You cannot edit this collection\" data-placement=\"bottom\">you can view</span>\n    ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.item_team_directory_collection_folder, 'item_team_directory_collection_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.item_team_directory_collection_request, 'item_team_directory_collection_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "\n\n<div class=\"team-directory-collection-meta\">\n    <div id=\"main-view-toprow\">\n        <h4 id=\"collection-overview-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-inputclass=\"input-large\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n    </div>\n\n    ";
  stack1 = helpers['if'].call(depth0, depth0.lastUpdatedAt, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"collection-overview-ownership-status\">\n        <span class=\"collection-overview-owner label\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"anish-dot\"></span>\n    ";
  options = {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.ifEditable || depth0.ifEditable),stack1 ? stack1.call(depth0, depth0.write, options) : helperMissing.call(depth0, "ifEditable", depth0.write, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <p class=\"collection-description\" data-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-type=\"textarea\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n\n</div>\n<div class=\"team-directory-collection-contents\">\n    <div class=\"team-directory-collection-close\">\n        <span class=\"icon-delete\"></span>\n    </div>\n    <div class=\"overview-children\">\n    ";
  stack2 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  stack2 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["team_directory_collection_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_team_directory_collection_request, 'item_team_directory_collection_request', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "\n<div class=\"team-directory-collection-close\">\n    <span class=\"icon-delete\"></span>\n</div>\n\n<div id=\"main-view-toprow\" class=\"collection-overview-breadcrumb\">\n    <button class=\"tertiary-action-button back-button\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-id=\"";
  if (stack1 = helpers.collectionId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collectionId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <span class=\"icon-back-indicator\"></span>\n    </button>\n    <span class=\"folder-breadcrumb\">\n        <h4 id=\"folder-overview-name\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-inputclass=\"input-large\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n    </span>\n</div>\n\n<p class=\"team_directory-folder-description\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"textarea\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n\n<div class=\"overview-children\">\n";
  stack1 = helpers.each.call(depth0, depth0.requests, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"test-results\" data-placement=\"bottom\" data-original-title=\"Tests: ";
  if (stack1 = helpers.success) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.success; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.total) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.total; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-content=\"";
  if (stack1 = helpers.data) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.data; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n     rel=\"popover\"><span class=\"label\">Tests: ";
  if (stack1 = helpers.success) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.success; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.total) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.total; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</div>\n";
  return buffer;
  });

this["Handlebars"]["templates"]["test_snippets_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_test_snippet, 'item_test_snippet', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["user_collections_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_user_collections, 'item_user_collections', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["version_1-0-1"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>There is a shiny new dark theme available for Postman v1.0!</p>\n\n<p>Choose one of the options below to select your theme.</p>\n\n<div class=\"theme-chooser clearfix\">\n	<div class=\"theme-option-light theme-option\">\n		<a><img src=\"img/light-theme-thumb.png\" data-theme=\"light\" class=\"theme-thumbnail selected-theme-thumb\"></a>\n	</div>\n	<div class=\"theme-option-dark\">\n		<a><img src=\"img/dark-theme-thumb.png\" data-theme=\"dark\" class=\"theme-thumbnail\"></a>\n	</div>\n</div>\n\n<p>To change or select the theme later, go to the <strong>Settings > Theme </strong> tab.</p>";
  });

this["Handlebars"]["templates"]["version_readonly"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>Postman Sync now has support for read-only collections!</p>\n\n<p>Any collections that you've already shared are editable by your team's members.\n	You can change this by opening the collection share dialog, and checking the \"Read only\" option.</p>\n\n<p>Please ensure all team members are on version 2.0.0.46 of the app before attempting to make any collections read-only. They can go to chrome://extensions, enable \"Developer Mode\", and click \"Update extensions now\".</p>\n\n<p>Documentation for the read-only feature can be found at:<br>\nhttps://beta.getpostman.com/docs/sync_overview</p>\n\n\n<div class=\"update-notif-readonly-preview clearfix\">\n	<div class=\"\">\n		<a><img src=\"img/update-readonly.png\" data-theme=\"light\"></a>\n	</div>\n</div>\n";
  });

this["Handlebars"]["templates"]["base_eula"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<br>\n<img class=\"eula-logo\" src=\"img/postman_logo.png\">\n<div class=\"eula-heading\">We're gaining momentum</div>\n\n<div class=\"eula-sub-heading\">...and updating our policies</div>\n<br>\n\n<p class=\"eula-main-text\">\n    Postman is growing quickly. In order to align to our\n    upcoming product features we’re making some\n    carefully considered changes to our policies and\n    terms of use. We appreciate you taking the time\n    to read through them and, should you need more\n    information, we’re always around.<br>\n    Read the <a id=\"base-eula-link\" target=\"_blank\" href=\"";
  if (stack1 = helpers.baseEula) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseEula; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">EULA</a>.\n    If you have activated Jetpacks, you must also agree to the <a id=\"jetpacks-eula-link\" target=\"_blank\" href=\"";
  if (stack1 = helpers.jetpacksEula) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.jetpacksEula; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Jetpacks addendum</a>.\n</p>\n\n<button class=\"eula-agree-button\" id=\"base-eula-accept\">\n    Agree and continue\n</button>\n\n<p class=\"eula-footnote\">\n    By continuing you agree to the new policies listed above for your use of\n    Postman after March 1, 2015. Learn more about your alternatives here.\n</p>";
  return buffer;
  });

this["Handlebars"]["templates"]["sync_eula"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<img class=\"eula-logo\" src=\"img/sync_logo.png\">\n<div class=\"eula-heading\">Introducing Sync!</div>\n\n<p class=\"eula-main-text\">\n    Postman 3.0 includes <a href=\"";
  if (stack1 = helpers.syncDocs) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.syncDocs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" id=\"sync-docs-link\">Sync</a>, which backs up your Postman Collections and Environments instantly, while making them available on other systems where you are using Postman.\n    Your data is stored and transferred securely on our servers. And all of this is available for FREE!<br>\n    <br>\n    To start using Sync, you must read and agree to the <a target=\"_blank\" href=\"";
  if (stack1 = helpers.syncTerms) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.syncTerms; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"sync-toc-link\">Sync Terms and Conditions</a> and the <a target=\"_blank\" href=\"";
  if (stack1 = helpers.syncEulas) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.syncEulas; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"sync-eula-link\">EULA</a>\n</p>\n\n<button class=\"eula-agree-button sync-eula\" id=\"sync-eula-accept\">\n    Start using Sync!\n</button>\n<button class=\"eula-agree-button sync-eula\" id=\"sign-up-for-sync\">\n    Sign Up!\n</button>\n<br><br>\n<p class=\"eula-main-text\">\n    <a class=\"sync-eula\" id=\"sync-eula-reject\">\n        No thanks, not right now.\n    </a><br>\n    You can enable Sync later by clicking the ‘Sync’ icon on the top bar.<br><br>\n    <a href=\"http://blog.getpostman.com/?p=482&preview=1&_ppp=ee75e56a7e\" target=\"_blank\">Read the blog post here!</a>\n</p>";
  return buffer;
  });