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
var lang = require("pilot/lang");
var CssHighlightRules = require("ace/mode/css_highlight_rules").CssHighlightRules;
var JavaScriptHighlightRules = require("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var LiquidHighlightRules = function() {

    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used

    var builtinDirectives = lang.arrayToMap(
        ("list|endlist|for|endfor|fill|wrap|endwrap|cache|if|endif|iflist|endiflist|else|elsif|unless|assign|capture|endcapture|case|endcase|cycle").split("|")
    );

    var builtinVariables = lang.arrayToMap(
        ("site|website_folder|content_item|content|wrapper|widget|this").split("|")
    );

    var base_liquid_directive = [
        {
          token : "constant",
          regex: "\\b(?:folder|request|widget|snippet|script|form|wrapper)\\:"
        }, {
          token : "operator",
          regex : "==|=|!=|<=|>=|<|>|\\b(?:in|with|as|and|or)\\b"
        }, {
          token : function(value) {
            if (builtinDirectives.hasOwnProperty(value))
                return "keyword";
            else if (builtinVariables.hasOwnProperty(value))
                return "constant";
            else
                return "variable";
          },
          regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        }
    ];

    var liquid_directive = lang.copyArray( base_liquid_directive );
    liquid_directive.unshift({
        token : "bracket.directive",
        regex : "%}}?",
        next : "start"
    });

    var js_liquid_directive = lang.copyArray( base_liquid_directive );
    js_liquid_directive.unshift({
        token : "bracket.directive",
        regex : "%}}?",
        next : "js-start"
    });

    var css_liquid_directive = lang.copyArray( base_liquid_directive );
    css_liquid_directive.unshift({
        token : "bracket.directive",
        regex : "%}}?",
        next : "css-start"
    });

    var tag_liquid_directive = lang.copyArray( base_liquid_directive );
    tag_liquid_directive.unshift({
        token : "bracket.directive",
        regex : "%}}?",
        next : "tag"
    });

    var base_liquid_output = [
        {
          token : function(value) {
            if (builtinVariables.hasOwnProperty(value))
                return "constant";
            else
                return "variable";
          },
          regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        }
    ];

    var liquid_output = lang.copyArray( base_liquid_directive );
    liquid_output.unshift({
        token : "bracket.output",
        regex : "}}}?",
        next : "start"
    });

    var js_liquid_output = lang.copyArray( base_liquid_directive );
    js_liquid_output.unshift({
        token : "bracket.output",
        regex : "}}}?",
        next : "js-start"
    });

    var css_liquid_output = lang.copyArray( base_liquid_directive );
    css_liquid_output.unshift({
        token : "bracket.output",
        regex : "}}}?",
        next : "css-start"
    });

    var tag_liquid_output = lang.copyArray( base_liquid_directive );
    tag_liquid_output.unshift({
        token : "bracket.output",
        regex : "}}}?",
        next : "tag"
    });

    this.$rules = {
        start : [ {
            token : "bracket.directive",
            regex : "{?{%",
            next : "liquid_directive"
        }, {
            token : "bracket.output",
            regex : "{?{{",
            next : "liquid_output"
        },

        // start rules copied from html_highlight_rules
        {
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
            regex : "[^<{]+"
        }],

        liquid_output : liquid_output,
        liquid_directive : liquid_directive,

        // state rules from html_highlight_rules
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

        js_liquid_output : js_liquid_output,
        js_liquid_directive : js_liquid_directive,

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

        css_liquid_output : css_liquid_output,
        css_liquid_directive : css_liquid_directive,

        tag : [ {
            token : "keyword",
            regex : ">",
            next : "start"
        },{
            token : "bracket.directive",
            regex : "{?{%",
            next : "tag_liquid_directive"
        }, {
            token : "bracket.output",
            regex : "{{{?",
            next : "tag_liquid_output"
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

        tag_liquid_output : tag_liquid_output,
        tag_liquid_directive : tag_liquid_directive,

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
    }, {
        token : "bracket.directive",
        regex : "{?{%",
        next : "js_liquid_directive"
    }, {
        token : "bracket.output",
        regex : "{?{{",
        next : "js_liquid_output"
    });

    var cssRules = new CssHighlightRules().getRules();
    this.addRules(cssRules, "css-");
    this.$rules["css-start"].unshift({
        token: "keyword",
        regex: "<\\/style",
        next: "tag"
    }, {
        token : "bracket.directive",
        regex : "{?{%",
        next : "css_liquid_directive"
    }, {
        token : "bracket.output",
        regex : "{?{{",
        next : "css_liquid_output"
    });

};

oop.inherits(LiquidHighlightRules, TextHighlightRules);

exports.LiquidHighlightRules = LiquidHighlightRules;
});
