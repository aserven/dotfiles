this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

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

this["Handlebars"]["templates"]["item_collection_selector_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_collection_selector_list_folder, 'item_collection_selector_list_folder', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  buffer += "<option value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"collection\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n";
  stack1 = helpers.each.call(depth0, depth0.folders, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Handlebars"]["templates"]["item_collection_selector_list_folder"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<option value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-collection-id=\"";
  if (stack1 = helpers.collection_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.collection_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-folder-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"folder\">&nbsp;&nbsp;-&nbsp;&nbsp;";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_environment_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<option value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"environment\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_test_run_request_result"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"test\" data-result-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-test-name=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"label label-test-result-";
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
    + " -\n                <span class=\"pass-count\">";
  if (stack1 = helpers.passCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.passCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> |\n                <span class=\"fail-count\">";
  if (stack1 = helpers.failCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.failCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n            </div>\n        ";
  return buffer;
  }

  buffer += "<div id=\"test-run-request-result-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"test-run-request-result\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"meta clearfix\">\n        <div class=\"left\">\n            <div class=\"name\">\n                ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            </div>\n            <div class=\"url\">\n                ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.limitLineWidth || depth0.limitLineWidth),stack1 ? stack1.call(depth0, depth0.url, 60, options) : helperMissing.call(depth0, "limitLineWidth", depth0.url, 60, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </div>\n        </div>\n        <div class=\"right\">\n            <div class=\"status-code\">\n                <span class=\"code\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.responseCode),stack1 == null || stack1 === false ? stack1 : stack1.code)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                <span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.responseCode),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            <div class=\"time\">\n                ";
  if (stack2 = helpers.time) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.time; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "ms\n            </div>\n        </div>\n    </div>\n    <div class=\"tests clearfix\" data-result-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-test-run-id=\"";
  if (stack2 = helpers.testRunId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.testRunId; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n        <div class=\"tests-wrapper\">\n        ";
  stack2 = helpers.each.call(depth0, depth0.testsArray, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n        <div class=\"test-view-more\" data-result-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-test-run-id=\"";
  if (stack2 = helpers.testRunId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.testRunId; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n            <img src=\"img/test-detail.png\"/>\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["item_test_run_sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"test-run-folder-name\">/"
    + escapeExpression(((stack1 = ((stack1 = depth0.folder),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"test-run-environment-name\">\n                <strong>Environment</strong> "
    + escapeExpression(((stack1 = ((stack1 = depth0.environment),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            </div>\n            ";
  return buffer;
  }

  buffer += "<li id=\"sidebar-test-run-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"sidebar-test-run clearfix\">    \n    <div class=\"test-run\" data-test-run-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <a data-test-run-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            <div>\n                <span class=\"test-run-collection-name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.collection),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  stack2 = helpers['if'].call(depth0, depth0.folder, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </div>\n            ";
  stack2 = helpers['if'].call(depth0, depth0.environment, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            <div class=\"test-run-time\">            \n                ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\n            </div>\n        </a>\n    </div>\n    <div class=\"test-run-actions\">\n        <a data-test-run-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"test-run-actions-download\">\n            <span class=\"icon-download\"></span>\n        </a>\n        <a data-test-run-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"test-run-actions-delete\">\n            <span class=\"icon-delete\"></span>\n        </a>\n    </div>\n</li>";
  return buffer;
  });

this["Handlebars"]["templates"]["message_helper_card_newman"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"helper-card helper-card-verysmall clearfix\">\n	<div class=\"helper-card-icon\">\n		<span class=\"icon-newman\">\n		</span>\n		<h4 class=\"pull-right\">&nbsp;&nbsp;Newman</h4>\n	</div>\n	<span class=\"pull-right icon-delete newman-helper-close\"></span>\n	<div class=\"helper-card-message-wrapper\">\n		<div class=\"helper-card-message\">\n			Run your collections from the command line using Postman's companion utility!\n		</div>\n		<div class=\"helper-card-links\">\n			<a href=\"https://github.com/postmanlabs/newman/\" target=\"_blank\" class=\"external-link\" id=\"newman-helper-link\">Get Newman!</a>\n		</div>\n	</div>\n</div>";
  });

this["Handlebars"]["templates"]["message_no_test_runs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"empty-message\">\n    You haven't run any tests yet. Previous tests will show up here so that you\n    can review and compare statistics.\n</div>";
  });

this["Handlebars"]["templates"]["message_test_run_added"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"alert alert-block\">\n    <a class=\"close\" data-dismiss=\"alert\">×</a>\n    <h4 class=\"alert-heading\">It worked!</h4>\n    The test run data has been added.\n</div>";
  });

this["Handlebars"]["templates"]["preview_runs_overview_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.test_run_stats_overview, 'test_run_stats_overview', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["sidebar_test_run_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.item_test_run_sidebar, 'item_test_run_sidebar', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["test_grid_request_meta"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"meta clearfix\">\n    <div class=\"left\">\n        <div class=\"name\">\n            ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n        <div class=\"url\">\n            ";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n    </div>\n</div>\n\n<div class=\"test-row-filter radio-buttons clearfix\" data-toggle=\"buttons-radio\">\n    <a data-filter=\"all\" class=\"active\">All</a>\n    <a data-filter=\"pass\">Passed</a>\n    <a data-filter=\"fail\">Failed</a>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_grid_request_tests_head"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n	  	<th>\n		    "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n	    </th>\n		";
  return buffer;
  }

  buffer += "<thead>\n	<tr>\n		<th>#</th>		\n		";
  stack1 = helpers.each.call(depth0, depth0.keys, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "			\n	</tr>\n</thead>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_grid_request_tests_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n	    "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n	  ";
  return buffer;
  }

  buffer += "<tr>\n	<td>#</td>\n	<td>\n	  ";
  stack1 = helpers.each.call(depth0, depth0.keys, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	\n	</td>\n</tr>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_grid_request_tests_rows"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<tr data-result=\"";
  if (stack1 = helpers.result) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.result; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n	<td>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>	\n	  ";
  stack2 = helpers.each.call(depth0, depth0.tests, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "		\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<td>\n	  	";
  stack1 = helpers['if'].call(depth0, depth0.value, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    	</td>\n	  ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "\n	    	<img src=\"img/dot-green.png\"/>\n    	";
  }

function program5(depth0,data) {
  
  
  return "\n    		<img src=\"img/dot-red.png\"/>\n	    ";
  }

  stack1 = helpers.each.call(depth0, depth0.tests, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Handlebars"]["templates"]["test_run_stats_overview"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n		<div class=\"test-run-stats-timestamp\" title=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\">\n		";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\n		</div>\n	";
  return buffer;
  }

  buffer += "<div id=\"test-run-stats-overview-";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"test-run-stats-overview\">\n	";
  stack1 = helpers['if'].call(depth0, depth0.showTime, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div class=\"test-run-stats-pass-percentage\">\n		<div class=\"test-run-stats-pass-success\">\n		</div>\n	</div>\n	<div class=\"results-container clearfix\">\n		<div class=\"left\">\n			<span class=\"pass-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.count),stack1 == null || stack1 === false ? stack1 : stack1.passed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> passed, \n			<span class=\"fail-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.count),stack1 == null || stack1 === false ? stack1 : stack1.failed)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> failed\n		</div>\n		<div class=\"right\">\n			";
  if (stack2 = helpers.averageResponseTime) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.averageResponseTime; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "ms\n		</div>\n	</div>	\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_run_stats_viewer_header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"test-run-folder-name\">/"
    + escapeExpression(((stack1 = ((stack1 = depth0.folder),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"test-run-environment-name\">\n            <strong>Environment</strong> "
    + escapeExpression(((stack1 = ((stack1 = depth0.environment),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"test-run-stats-viewer-header clearfix\">\n    <div class=\"left\">\n        <div>\n            <span class=\"test-run-collection-name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.collection),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  stack2 = helpers['if'].call(depth0, depth0.folder, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n        ";
  stack2 = helpers['if'].call(depth0, depth0.environment, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"right\">\n        <div class=\"test-run-time\" title=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\">\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["test_run_target"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"test-run-folder-name\">/"
    + escapeExpression(((stack1 = ((stack1 = depth0.folder),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"test-run-environment-name\">\n        <strong>Environment</strong> "
    + escapeExpression(((stack1 = ((stack1 = depth0.environment),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n    ";
  return buffer;
  }

  buffer += "<div class=\"test-run-progress-content\">\n    <div>\n        <span class=\"test-run-collection-name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.collection),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  stack2 = helpers['if'].call(depth0, depth0.folder, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n\n    ";
  stack2 = helpers['if'].call(depth0, depth0.environment, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    <div class=\"test-run-time\">\n    ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatTime || depth0.formatTime),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatTime", depth0.timestamp, options)))
    + "\n    </div>\n\n    <div id=\"test-run-progress-content-loader\" class=\"loader\">\n        <span class=\"icon-preloader\"></span>\n    </div>\n</div>";
  return buffer;
  });

this["Handlebars"]["templates"]["tests"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"test\" data-result-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <span class=\"label label-test-result-";
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
    + " -\n        Passed: <span class=\"pass-count\">";
  if (stack1 = helpers.passCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.passCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>, \n        Failed: <span class=\"fail-count\">";
  if (stack1 = helpers.failCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.failCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.testsArray, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });