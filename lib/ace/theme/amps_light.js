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

    var dom = require("pilot/dom");

    var cssText = ".ace-amps-light .ace_editor {\
  border: 2px solid rgb(159, 159, 159);\
}\
\
.ace-amps-light .ace_editor.ace_focus {\
  border: 2px solid #327fbd;\
}\
\
.ace-amps-light .ace_gutter {\
  width: 50px;\
  background: #EEE8D6;\
  color: #93A1A1;\
  overflow : hidden;\
}\
\
.ace-amps-light .ace_gutter-layer {\
  width: 100%;\
  text-align: right;\
}\
\
.ace-amps-light .ace_gutter-layer .ace_gutter-cell {\
  padding-right: 6px;\
}\
\
.ace-amps-light .ace_print_margin {\
  width: 1px;\
  background: #EEE8D6;\
}\
\
.ace-amps-light .ace_scroller {\
  background-color: #FDF6E3;\
}\
\
.ace-amps-light .ace_text-layer {\
  cursor: text;\
  color: #839496;\
}\
\
.ace-amps-light .ace_marker-layer .ace_active_line {\
  background-color: #EEE8D6;\
}\
\
.ace-amps-light .ace_cursor {\
  border-left: 2px solid #000000;\
}\
\
.ace-amps-light .ace_cursor.ace_overwrite {\
  border-left: 0px;\
  border-bottom: 1px solid #000000;\
}\
 \
.ace-amps-light .ace_marker-layer .ace_selection {\
  background: rgb(181, 213, 255);\
}\
\
.ace-amps-light .ace_marker-layer .ace_step {\
  background: rgb(198, 219, 174);\
}\
\
.ace-amps-light .ace_marker-layer .ace_bracket {\
  margin: -1px 0 0 -1px;\
  border: 1px solid #BFBFBF;\
}\
\
.ace-amps-light .ace_invisible {\
  color: rgba(255, 255, 255, 0.25);\
}\
\
\
\
\
\
\
\.ace-amps-light .ace_bracket.ace_output {\
  color: #879900;\
}\
\
\.ace-amps-light .ace_bracket.ace_directive {\
  color: #B58800;\
}\
\
.ace-amps-light .ace_keyword {\
}\
\
.ace-amps-light .ace_operator {\
  color: #DC312E;\
}\
\
.ace-amps-light .ace_constant {\
  color: #CB4915;\
}\
\
.ace-amps-light .ace_string {\
  color: #29A197;\
}\
\
.ace-amps-light .ace_function {\
  color: #D33584;\
}\
\
.ace-amps-light .ace_comment {\
  font-style:italic;\
}\
\
.ace-amps-light .ace_variable {\
  color:#6C71C4;\
}\
\
.ace-amps-light .ace_type {\
  color:#268DD2;\
}\
\.ace-amps-light .ace_class {\
  color:#B58800;\
}";

    // import CSS once
    dom.importCssString(cssText);

    exports.cssClass = "ace-amps-light";
});