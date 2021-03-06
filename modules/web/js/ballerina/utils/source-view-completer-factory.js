/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import _ from 'lodash';
/**
 * Class to represent source view completer factory
 */
class CompleterFactory {
    /**
     * Constructor for completer factory
     * @constructor
     */
    constructor() {
        this.variable_dec = /([a-z])+ .*/i;
        this.package_dec = /([a-z0-9])+:.*/i;
    }

    /**
     * Return the Source view completer
     * @param {object} langserverController - language server controller
     * @return {*[]} - array
     */
    getSourceViewCompleter(langserverController, fileData) {
        return [{
            getCompletions: (editor, session, pos, prefix, callback) => {
                const completions = [];
                const cursorPosition = editor.getCursorPosition();
                const options = {
                    textDocument: editor.getValue(),
                    position: {
                        line: cursorPosition.row + 1,
                        character: cursorPosition.column,
                    },
                    fileName: fileData.fileName,
                    filePath: fileData.filePath,
                    packageName: fileData.packageName,
                };
                langserverController.getCompletions(options, (response) => {
                    const sortedArr = _.orderBy(response.result, ['sortText'], ['desc']);
                    let score = sortedArr.length;
                    sortedArr.map((completionItem) => {
                        completions.push(
                            {
                                caption: completionItem.label,
                                snippet: completionItem.insertText,
                                meta: completionItem.detail,
                                score: 100 + (score || 0),
                            });
                        score--;
                    });
                    callback(null, completions);
                });
            },
        }];
    }
}

export default CompleterFactory;
