/*
*  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing,
*  software distributed under the License is distributed on an
*  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*  KIND, either express or implied.  See the License for the
*  specific language governing permissions and limitations
*  under the License.
*/

package org.ballerinalang.composer.service.workspace.langserver.util.resolvers.parsercontext;

import org.ballerinalang.composer.service.workspace.langserver.SymbolInfo;
import org.ballerinalang.composer.service.workspace.langserver.dto.CompletionItem;
import org.ballerinalang.composer.service.workspace.langserver.util.filters.PackageActionAndFunctionFilter;
import org.ballerinalang.composer.service.workspace.langserver.util.resolvers.AbstractItemResolver;
import org.ballerinalang.composer.service.workspace.langserver.util.resolvers.ItemResolverConstants;
import org.ballerinalang.composer.service.workspace.suggetions.SuggestionsFilterDataModel;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Parser rule based variable definition statement context resolver
 */
public class ParserRuleVariableDefinitionStatementContextResolver extends AbstractItemResolver {
    @Override
    public ArrayList<CompletionItem> resolveItems(SuggestionsFilterDataModel dataModel, ArrayList<SymbolInfo> symbols,
                                                  HashMap<Class, AbstractItemResolver> resolvers) {

        // Here we specifically need to check whether the statement is function invocation,
        // action invocation or worker invocation
        if (isActionOrFunctionInvocationStatement(dataModel)) {
            PackageActionAndFunctionFilter actionAndFunctionFilter = new PackageActionAndFunctionFilter();
            return actionAndFunctionFilter
                    .getCompletionItems(actionAndFunctionFilter.filterItems(dataModel, symbols, null));
        } else {
            // Add the create keyword
            CompletionItem createKeyword = new CompletionItem();
            createKeyword.setInsertText("create ");
            createKeyword.setLabel("create");
            createKeyword.setDetail(ItemResolverConstants.KEYWORD_TYPE);
            createKeyword.setSortText(ItemResolverConstants.PRIORITY_7);

            ArrayList<CompletionItem> completionItems = new ArrayList<>();
            populateCompletionItemList(symbols, completionItems);
            completionItems.add(createKeyword);
            return completionItems;
        }
    }
}
