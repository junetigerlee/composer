/**
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import AbstractStatementSourceGenVisitor from './abstract-statement-source-gen-visitor';
import StatementVisitorFactory from './statement-visitor-factory';

/**
 * Source Generation visitor for try catch statement
 */
class TryCatchStatementVisitor extends AbstractStatementSourceGenVisitor {

    /**
     * Can visit check for the Try Cathc statement
     * @return {boolean} true|false - check whether the Try Catch statement can be visited
     */
    canVisitTryCatchStatement() {
        return true;
    }

    /**
     * Begin visit fot the Try Catch Statement
     * @param {TryCatchStatement} statement - Try Catch statement ASTNode
     */
    beginVisitTryCatchStatement(statement) {
        if (statement.whiteSpace.useDefault) {
            this.currentPrecedingIndentation = this.getCurrentPrecedingIndentation();
            this.replaceCurrentPrecedingIndentation(this.getIndentation());
        }
        // Calculate the line number
        const lineNumber = this.getTotalNumberOfLinesInSource() + 1;
        statement.setLineNumber(lineNumber, { doSilently: true });
    }

    /**
     * Visit the Try Statement
     * @param {TryStatement} statement - Try Statement ASTNode
     */
    visitTryStatement(statement) {
        const statementVisitorFactory = new StatementVisitorFactory();
        const statementVisitor = statementVisitorFactory.getStatementVisitor(statement, this);
        statement.accept(statementVisitor);
    }

    /**
     * Visit the Catch Statement
     * @param {CatchStatement} statement - Catch Statement ASTNode
     */
    visitCatchStatement(statement) {
        const statementVisitorFactory = new StatementVisitorFactory();
        const statementVisitor = statementVisitorFactory.getStatementVisitor(statement, this);
        statement.accept(statementVisitor);
    }

    /**
     * Visit the Finally Statement
     * @param {FinallyStatement} statement - Finally Statement ASTNode
     */
    visitFinallyStatement(statement) {
        const statementVisitorFactory = new StatementVisitorFactory();
        const statementVisitor = statementVisitorFactory.getStatementVisitor(statement, this);
        statement.accept(statementVisitor);
    }

    /**
     * End visit fot the Try Catch Statement
     * @param {TryCatchStatement} statement - Try Catch statement ASTNode
     */
    endVisitTryCatchStatement(statement) {
        this.appendSource((statement.whiteSpace.useDefault)
          ? this.currentPrecedingIndentation : '');
        this.getParent().appendSource(this.getGeneratedSource());
    }
}

export default TryCatchStatementVisitor;
