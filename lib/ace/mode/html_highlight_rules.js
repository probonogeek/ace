/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {

var oop = require("pilot/oop");
var CssHighlightRules = require("ace/mode/css_highlight_rules").CssHighlightRules;
var JavaScriptHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var HtmlHighlightRules = function() {

    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used

    this.$rules = {
        start : [ {
            token : "text",
            regex : "<\\!\\[CDATA\\[",
            next : "cdata"
        }, {
            token : "xml_pe",
            regex : "<\\?.*?\\?>"
        }, {
            token : "comment",
            regex : "<\\!--",
            next : "comment"
        }, {
            token : "keyword",
            regex : "<script",
            next : "script"
        }, {
            token : "keyword",
            regex : "<style",
            next : "css"
        }, {
            token : "keyword", // opening tag
            regex : "<\\/?[-_a-zA-Z0-9:]+",
            next : "tag"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "text",
            regex : "[^<]+"
        } ],

        script : [ {
            token : "keyword",
            regex : ">",
            next : "js-start"
        }, {
            token : "type",
            regex : "[-_a-zA-Z0-9:]+="
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        } ],

        css : [ {
            token : "keyword",
            regex : ">",
            next : "css-start"
        }, {
            token : "type",
            regex : "[-_a-zA-Z0-9:]+="
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        } ],

        tag : [ {
            token : "keyword",
            regex : ">",
            next : "start"
        }, {
            token : "type",
            regex : "[-_a-zA-Z0-9:]+="
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        } ],

        cdata : [ {
            token : "text",
            regex : "\\]\\]>",
            next : "start"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "text",
            regex : ".+"
        } ],

        comment : [ {
            token : "comment",
            regex : ".*?-->",
            next : "start"
        }, {
            token : "comment",
            regex : ".+"
        } ]
    };

    var jsRules = new JavaScriptHighlightRules().getRules();
    this.addRules(jsRules, "js-");
    this.$rules["js-start"].unshift({
        token: "comment",
        regex: "\\/\\/.*(?=<\\/script>)",
        next: "tag"
    }, {
        token: "keyword",
        regex: "<\\/script",
        next: "tag"
    });

    var cssRules = new CssHighlightRules().getRules();
    this.addRules(cssRules, "css-");
    this.$rules["css-start"].unshift({
        token: "keyword",
        regex: "<\\/style",
        next: "tag"
    });
};

oop.inherits(HtmlHighlightRules, TextHighlightRules);

exports.HtmlHighlightRules = HtmlHighlightRules;
});
