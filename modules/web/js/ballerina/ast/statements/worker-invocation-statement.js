/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import _ from 'lodash';
import Statement from './statement';
import BallerinaASTFactory from './../../ast/ballerina-ast-factory';
import FragmentUtils from './../../utils/fragment-utils';

/**
 * Class to represent a worker invocation statement in ballerina.
 */
class WorkerInvocationStatement extends Statement {
    /**
     * Constructor for WorkerInvocationStatement
     * @param {object} args - constructor arguments for WorkerInvocationStatement
     * @constructor
     */
    constructor(args) {
        super('WorkerInvocationStatement');
        this._source = _.get(args, 'source');
        this._destination = _.get(args, 'destination');
        this._expressionList = _.get(args, 'expressionList', []);
        this._invokeStatement = _.get(args, 'invokeStatement', 'm1 -> workerName');
        this._workerName = _.get(args, 'workerName', 'workerName');
        this.whiteSpace.defaultDescriptor.regions = {
            0: '',
            1: ' ',
            2: ' ',
            3: '',
            4: '\n'
        };
    }

    /**
     * Set the source worker
     * @param {ASTNode} source - source worker
     * @returns {void}
     */
    setSource(source) {
        this._source = source;
    }

    /**
     * Get the source worker
     * @returns {ASTNode} - source worker
     */
    getSource() {
        return this._source;
    }

    /**
     * Set Destination Worker
     * @param {ASTNode} destination - destination worker
     * @returns {void}
     */
    setDestination(destination) {
        this._destination = destination;
    }

    /**
     * Get the destination worker
     * @returns {ASTNode} - destination worker
     */
    getDestination() {
        return this._destination;
    }

    /**
     * Set Worker name
     * @param {string} workerName - worker name
     * @returns {void}
     */
    setWorkerName(workerName) {
        this._workerName = workerName;
    }

    /**
     * Get the worker name
     * @returns {string} - worker name
     */
    getWorkerName() {
        return this._workerName;
    }

    /**
     * Add the expression to the expression list
     * @param {expression} expression - expression to be added to the expression list
     * @returns {void}
     */
    addToExpressionList(expression) {
        this._expressionList.push(expression);
    }

    /**
     * Get the statement String
     * @returns {string} statement string
     * @override
     */
    getStatementString() {
        let statementStr = '';
        for (let itr = 0; itr < this._expressionList.length; itr++) {
            if (BallerinaASTFactory.isExpression(this.getExpressionList()[itr])) {
                statementStr += this.getExpressionList()[itr].getExpressionString();
            } else if (BallerinaASTFactory.isStatement(this.getExpressionList()[itr])) {
                statementStr += this.getExpressionList()[itr].getStatementString();
            }

            if (itr !== this._expressionList.length - 1) {
                statementStr += ',';
            }
        }
        statementStr += ((!_.isNil(_.last(this.getExpressionList()))
                            && _.last(this.getExpressionList()).whiteSpace.useDefault)
                          ? this.getWSRegion(1) : '' );
        statementStr += '->' + this.getWSRegion(2) 
                + this.getWorkerName() + this.getWSRegion(3);

        return statementStr;
    }

    /**
     * Set the statement string
     * @param {string} statementString - statement string from which the action invocation is set
     * @param {function} callback - callback function
     * @override
     */
    setStatementFromString(statementString, callback) {
        const fragment = FragmentUtils.createStatementFragment(statementString + ';');
        const parsedJson = FragmentUtils.parseFragment(fragment);

        if ((!_.has(parsedJson, 'error') || !_.has(parsedJson, 'syntax_errors'))
            && _.isEqual(parsedJson.type, 'worker_invocation_statement')) {
            this.initFromJson(parsedJson);

            // Manually firing the tree-modified event here.
            // TODO: need a proper fix to avoid breaking the undo-redo
            this.trigger('tree-modified', {
                origin: this,
                type: 'custom',
                title: 'Modify Worker Invoke Statement',
                context: this,
            });

            if (_.isFunction(callback)) {
                callback({ isValid: true });
            }
        } else if (_.isFunction(callback)) {
            callback({ isValid: false, response: parsedJson });
        }
    }

    /**
     * Define what type of nodes that this node can be added as a child.
     * @param {ASTNode} node - Parent node that this node becoming a child of.
     * @return {boolean} true|false.
     */
    canBeAChildOf(node) {
        return this.getFactory().isResourceDefinition(node)
            || this.getFactory().isFunctionDefinition(node)
            || this.getFactory().isWorkerDeclaration(node)
            || this.getFactory().isConnectorAction(node)
            || this.getFactory().isStatement(node);
    }

    /**
     * initialize AssignmentStatement from json object
     * @param {Object} jsonNode to initialize from
     * @returns {void}
     */
    initFromJson(jsonNode) {
        const workerName = jsonNode.worker_name; const self = this;
        const expressionList = jsonNode.expression_list;
        this.getExpressionList().length = 0;

        for (let itr = 0; itr < expressionList.length; itr++) {
            const expressionNode = BallerinaASTFactory.createFromJson(expressionList[itr].expression[0]);
            expressionNode.initFromJson(expressionList[itr].expression[0]);
            self.addToExpressionList(expressionNode);
        }

        let workerInstance;
        if (!_.isNil(this.getParent())) {
            workerInstance = _.find(this.getParent().getChildren(), (child) => {
                return self.getFactory().isWorkerDeclaration(child)
                    && !child.isDefaultWorker() && child.getWorkerName() === workerName;
            });
        }

        this.setDestination(workerInstance);
        this.setWorkerName(workerName);
    }

    /**
     * Whether the message draw to the target worker is allowed
     * @param {ASTNode} target - target worker. This can be worker, resource function or a connector action
     * @return {boolean} - whether message can be drawn to the target
     */
    messageDrawTargetAllowed(target) {
        return this.getFactory().isWorkerDeclaration(target)
            || this.getFactory().isResourceDefinition(target)
            || this.getFactory().isFunctionDefinition(target)
            || this.getFactory().isConnectorAction(target);
    }

    /**
     * Get the expression List
     * @returns {Array} expressionList
     */
    getExpressionList() {
        return this._expressionList;
    }
}

export default WorkerInvocationStatement;

