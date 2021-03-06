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

/**
 * A module representing the factory for Ballerina AST
 */
import _ from 'lodash';
import ballerinaAstRoot from './ballerina-ast-root';
import serviceDefinition from './service-definition';
import functionDefinition from './function-definition';
import connectorDefinition from './connector-definition';
import resourceDefinition from './resource-definition';
import workerDeclaration from './worker-declaration';
import statement from './statements/statement';
import conditionalStatement from './statements/conditional-statement';
import connectorDeclaration from './connector-declaration';
import expression from './expressions/expression';
import ifElseStatement from './statements/if-else-statement';
import ifStatement from './statements/if-statement';
import elseStatement from './statements/else-statement';
import elseIfStatement from './statements/else-if-statement';
import tryCatchStatement from './statements/trycatch-statement';
import tryStatement from './statements/try-statement';
import catchStatement from './statements/catch-statement';
import finallyStatement from './statements/finally-statement';
import replyStatement from './statements/reply-statement';
import whileStatement from './statements/while-statement';
import returnStatement from './statements/return-statement';
import typeDefinition from './type-definition';
import typeElement from './type-element';
import variableDeclaration from './variable-declaration';
import packageDefinition from './package-definition';
import importDeclaration from './import-declaration';
import resourceParameter from './resource-parameter';
import assignmentStatement from './statements/assignment-statement';
import functionInvocationStatement from './statements/function-invocation-statement';
import functionInvocationExpression from './expressions/function-invocation-expression';
import SimpleVariableReferenceExpression from './expressions/simple-variable-reference-expression';
import actionInvocationStatement from './statements/action-invocation-statement';
import actionInvocationExpression from './expressions/action-invocation-expression';
import returnType from './return-type';
import typeName from './type-name';
import argument from './argument';
import backTickExpression from './expressions/back-tick-expression';
import basicLiteralExpression from './expressions/basic-literal-expression';
import lambdaFunctionExpression from './expressions/lambda-expression';
import nullLiteralExpression from './expressions/null-literal-expression';
import instanceCreationExpression from './expressions/instance-creation-expression';
import thenBody from './then-body';
import indexBasedVarRefExpression from './expressions/index-based-variable-reference-expression';
import keyValueExpression from './expressions/key-value-expression';
import binaryExpression from './expressions/binary-expression';
import unaryExpression from './expressions/unary-expression';
import connectorAction from './connector-action';
import structDefinition from './struct-definition';
import constantDefinition from './constant-definition';
import globalVariableDefinition from './global-variable-definition';
import variableDefinitionStatement from './statements/variable-definition-statement';
import workerInvocationStatement from './statements/worker-invocation-statement';
import referenceTypeInitExpression from './expressions/reference-type-init-expression';
import arrayInitExpression from './expressions/array-init-expression';
import workerReplyStatement from './statements/worker-reply-statement';
import structType from './struct-type';
import fieldBasedVarRefExpression from './expressions/field-based-variable-reference-expression';
import typeCastExpression from './expressions/type-cast-expression';
import typeConversionExpression from './expressions/type-conversion-expression';
import variableDefinition from './variable-definition';
import breakStatement from './statements/break-statement';
import throwStatement from './statements/throw-statement';
import commentStatement from './statements/comment-statement';
import annotationDefinition from './annotation-definition';
import annotationAttributeDefinition from './annotation-attribute-definition';
import parameterDefinition from './parameter-definition';
import argumentParameterDefinitionHolder from './argument-parameter-definition-holder';
import returnParameterDefinitionHolder from './return-parameter-definition-holder';
import AnnotationAttachment from './annotations/annotation-attachment';
import AnnotationAttribute from './annotations/annotation-attribute';
import AnnotationAttributeValue from './annotations/annotation-attribute-value';
import transformStatement from './statements/transform-statement';
import forkJoinStatement from './statements/fork-join-statement';
import timeoutStatement from './statements/timeout-statement';
import joinStatement from './statements/join-statement';
import transactionAbortedStatement from './statements/transaction-aborted-statement';
import transactionStatement from './statements/transaction-statement';
import abortedStatement from './statements/aborted-statement';
import abortStatement from './statements/abort-statement';
import committedStatement from './statements/committed-statement';
import continueStatement from './statements/continue-statement';
import connectorInitExpression from './expressions/connector-init-expression';
import simpleTypeName from './simple-type-name';
import VariableReferenceList from './variable-reference-list';
import BValue from './b-value';
import NamespaceDeclarationStatement from './statements/namespace-declaration-statement';
import NamespaceDeclaration from './namespace-declaration';
import XMLQNameExpression from './expressions/xml-qname-expression';
import XMLAttributeReferenceExpression from './expressions/xml-attribute-reference-expression';

/**
 * @class BallerinaASTFactory
 * @lends BallerinaASTFactory
 */
const BallerinaASTFactory = {};

/**
 * creates BallerinaASTRoot
 * @param args
 */
BallerinaASTFactory.createBallerinaAstRoot = function (args) {
    return new ballerinaAstRoot(args);
};

/**
 * creates SimpleTypeName
 * @param args
 */
BallerinaASTFactory.createSimpleTypeName = function (args) {
    return new simpleTypeName(args);
};

/**
 * creates ServiceDefinition
 * @param args
 * @param setDefaults - if this is set to true, default values will be set to the serviceDefinition
 */
BallerinaASTFactory.createServiceDefinition = function (args, setDefaults) {
    return new serviceDefinition(args);
};

/**
 * creates AnnotationDefinition.
 * @param args
 * */
BallerinaASTFactory.createAnnotationDefinition = function (args) {
    return new annotationDefinition(args);
};

/**
 * creates Annotation Attribute Definition.
 * @param args
 * */
BallerinaASTFactory.createAnnotationAttributeDefinition = function (args) {
    return new annotationAttributeDefinition(args);
};

/**
 * creates FunctionDefinition
 * @param args
 */
BallerinaASTFactory.createFunctionDefinition = function (args) {
    return new functionDefinition(args);
};

/**
 * creates ConnectorDefinition
 * @param args
 */
BallerinaASTFactory.createConnectorDefinition = function (args) {
    return new connectorDefinition(args);
};

/**
 * creates WorkerDeclaration
 * @param args
 */
BallerinaASTFactory.createWorkerDeclaration = function (args) {
    return new workerDeclaration(args);
};

/**
 * creates Statement
 * @param args
 */
BallerinaASTFactory.createStatement = function (args) {
    return new statement(args);
};

/**
 * creates TypeDefinition
 * @param args
 */
BallerinaASTFactory.createTypeDefinition = function (args) {
    return new typeDefinition(args);
};

/**
 * creates TypeElement
 * @param args
 */
BallerinaASTFactory.createTypeElement = function (args) {
    return new typeElement(args);
};

/**
 * creates structDefinition
 * @param {Object} args - object for structDefinition creation
 * @returns {StructDefinition}
 */
BallerinaASTFactory.createStructDefinition = function (args) {
    return new structDefinition(args);
};

/**
 * creates keyValueExpression
 * @param {Object} args - object for keyValueExpression creation
 * @returns {KeyValueExpression}
 */
BallerinaASTFactory.createKeyValueExpression = function (args) {
    return new keyValueExpression(args);
};

/**
 * creates ReferenceTypeInitExpression
 * @param {Object} args - object for ReferenceTypeInitExpression creation
 * @returns {ReferenceTypeInitExpression}
 */
BallerinaASTFactory.createReferenceTypeInitExpression = function (args) {
    return new referenceTypeInitExpression(args);
};

/**
 * creates ArrayInitExpression
 * @param {Object} args - object for ArrayInitExpression creation
 * @returns {ArrayInitExpression}
 */
BallerinaASTFactory.createArrayInitExpression = function (args) {
    return new arrayInitExpression(args);
};

/**
 * create VariableDeclaration
 * @param args - object for variableDeclaration creation
 * @returns {VariableDeclaration}
 */
BallerinaASTFactory.createVariableDeclaration = function (args) {
    return new variableDeclaration(args);
};

/**
 * create VariableDefinition
 * @param args
 */
BallerinaASTFactory.createVariableDefinition = function (args) {
    return new variableDefinition(args);
};

/**
 * create ConditionalStatement
 * @param args
 */
BallerinaASTFactory.createConditionalStatement = function (args) {
    return new conditionalStatement(args);
};

/**
 * create ConnectorDeclaration
 * @param args
 */
BallerinaASTFactory.createConnectorDeclaration = function (args) {
    return new connectorDeclaration(args);
};

/**
 * creates Expression
 * @param args
 */
BallerinaASTFactory.createExpression = function (args) {
    return new expression(args);
};

BallerinaASTFactory.createActionInvocationStatement = function (args) {
    return new actionInvocationStatement(args);
};

BallerinaASTFactory.createActionInvocationExpression = function (args) {
    return new actionInvocationExpression(args);
};

/**
 * creates a connector action
 * @param args
 * @return {ConnectorAction} Connector Action
 */
BallerinaASTFactory.createConnectorAction = function (args) {
    return new connectorAction(args);
};

/**
 * creates If-Else Statement
 * @param args
 */
BallerinaASTFactory.createIfElseStatement = function (args) {
    return new ifElseStatement(args);
};

/**
 * creates If Statement
 * @param args
 */
BallerinaASTFactory.createIfStatement = function (args) {
    return new ifStatement(args);
};

/**
 * creates Else-If Statement
 * @param args
 */
BallerinaASTFactory.createElseIfStatement = function (args) {
    return new elseIfStatement(args);
};

/**
 * creates Else Statement
 * @param args
 */
BallerinaASTFactory.createElseStatement = function (args) {
    return new elseStatement(args);
};

/**
 * creates TryCatchStatement
 * @param args
 */
BallerinaASTFactory.createTryCatchStatement = function (args) {
    return new tryCatchStatement(args);
};

/**
 * creates TryStatement
 * @param args
 */
BallerinaASTFactory.createTryStatement = function (args) {
    return new tryStatement(args);
};

/**
 * creates CatchStatement
 * @param args
 */
BallerinaASTFactory.createCatchStatement = function (args) {
    return new catchStatement(args);
};

/**
 * creates FinallyStatement
 * @param args
 */
BallerinaASTFactory.createFinallyStatement = function (args) {
    return new finallyStatement(args);
};

/**
 * creates Assignment
 * @param args
 */
BallerinaASTFactory.createAssignment = function (args) {
    return new assignment(args);
};

/**
 * creates AssignmentStatement
 * @param {Object} args
 * @returns {AssignmentStatement}
 */
BallerinaASTFactory.createAssignmentStatement = function (args) {
    return new assignmentStatement(args);
};

/**
 * creates AssignmentStatement
 * @param {Object} args
 * @returns {AssignmentStatement}
 */
BallerinaASTFactory.createTransformStatement = function (args) {
    return new transformStatement(args);
};

BallerinaASTFactory.createForkJoinStatement = function (args) {
    return new forkJoinStatement(args);
};

BallerinaASTFactory.createJoinStatement = function (args) {
    return new joinStatement(args);
};

BallerinaASTFactory.createTimeoutStatement = function (args) {
    return new timeoutStatement(args);
};

/**
 * Creates Variable Definition Statement
 * @param {Object} [args]
 * @returns {VariableDefinitionStatement}
 */
BallerinaASTFactory.createVariableDefinitionStatement = function (args) {
    return new variableDefinitionStatement(args);
};

/**
 * creates ReplyStatement
 * @param args
 */
BallerinaASTFactory.createReplyStatement = function (args) {
    return new replyStatement(args);
};

/**
 * creates FunctionInvocationStatement
 * @param args
 */
BallerinaASTFactory.createFunctionInvocationStatement = function (args) {
    return new functionInvocationStatement(args);
};

/**
 * creates FunctionInvocationExpression
 * @param {Object} args
 * @returns {FunctionInvocationExpression}
 */
BallerinaASTFactory.createFunctionInvocationExpression = function (args) {
    return new functionInvocationExpression(args);
};

/**
 * creates SimpleVariableReferenceExpression
 * @param {Object} args
 * @returns {SimpleVariableReferenceExpression}
 */
BallerinaASTFactory.createSimpleVariableReferenceExpression = function (args) {
    return new SimpleVariableReferenceExpression(args);
};

/**
 * creates ReturnStatement
 * @param args
 */
BallerinaASTFactory.createReturnStatement = function (args) {
    return new returnStatement(args);
};

/**
 * creates FieldBasedVarRefExpression
 * @param args
 */
BallerinaASTFactory.createFieldBasedVarRefExpression = function (args) {
    return new fieldBasedVarRefExpression(args);
};

/**
 * creates TypeCastExpression
 * @param args
 */
BallerinaASTFactory.createTypeCastExpression = function (args) {
    return new typeCastExpression(args);
};

/**
 * creates TypeConversionExpression
 * @param args
 */
BallerinaASTFactory.createTypeConversionExpression = function (args) {
    return new typeConversionExpression(args);
};

/**
 * creates WorkerInvocationStatement
 * @param args
 */
BallerinaASTFactory.createWorkerInvocationStatement = function (args) {
    return new workerInvocationStatement(args);
};

/**
 * creates WorkerReplyStatement
 * @param args
 */
BallerinaASTFactory.createWorkerReplyStatement = function (args) {
    return new workerReplyStatement(args);
};

/**
 * creates WhileStatement
 * @param args
 */
BallerinaASTFactory.createWhileStatement = function (args) {
    return new whileStatement(args);
};

/**
 * creates BreakStatement
 */
BallerinaASTFactory.createBreakStatement = function () {
    return new breakStatement();
};

/**
 * creates ResourceDefinition
 * @param args
 */
BallerinaASTFactory.createResourceDefinition = function (args) {
    return new resourceDefinition(args);
};

/**
 * creates PackageDefinition
 * @param args
 * @returns {PackageDefinition}
 */
BallerinaASTFactory.createPackageDefinition = function (args) {
    return new packageDefinition(args);
};

/**
 * creates ImportDeclaration
 * @param args
 * @returns {ImportDeclaration}
 */
BallerinaASTFactory.createImportDeclaration = function (args) {
    return new importDeclaration(args);
};

/**
 * creates ResourceParameter
 * @param args
 * @returns {ResourceParameter}
 */
BallerinaASTFactory.createResourceParameter = function (args) {
    return new resourceParameter(args);
};

/**
 * creates StructType
 * @param args
 * @returns {StructType}
 */
BallerinaASTFactory.createStructType= function (args) {
    return new structType(args);
};

/**
 * creates Argument
 * @param {Object} [args] - The arguments to create the Argument
 * @param {string} [args.type] - Type of the argument
 * @param {string} [args.identifier] - Identifier of the argument
 * @returns {Argument}
 */
BallerinaASTFactory.createArgument = function (args) {
    return new argument(args);
};

/**
 * creates ReturnType
 * @param args
 * @returns {ReturnType}
 */
BallerinaASTFactory.createReturnType = function (args) {
    return new returnType(args);
};

/**
 * creates TypeName
 * @param args
 * @returns {TypeName}
 */
BallerinaASTFactory.createTypeName = function (args) {
    return new typeName(args);
};

/**
 * creates BackTickExpression
 * @param {Object} args
 * @returns {backTickExpression}
 */
BallerinaASTFactory.createBackTickExpression = function (args) {
    return new backTickExpression(args);
};

/**
 * creates BasicLiteralExpression
 * @param args
 * @returns {basicLiteralExpression}
 */
BallerinaASTFactory.createBasicLiteralExpression = function (args) {
    return new basicLiteralExpression(args);
};

/**
 * creates BasicLiteralExpression
 * @param args
 * @returns {LambdaExpression}
 */
BallerinaASTFactory.createLambdaExpression = function (args) {
    return new lambdaFunctionExpression(args);
};

/**
 * creates NullLiteralExpression
 * @param args
 * @returns {nullLiteralExpression}
 */
BallerinaASTFactory.createNullLiteralExpression = function (args) {
    return new nullLiteralExpression(args);
};

/**
 * creates VariableReferenceList
 * @param {Object} args
 * @returns {VariableReferenceList}
 */
BallerinaASTFactory.createVariableReferenceList = function (args) {
    return new VariableReferenceList(args);
};

/**
 * creates InstanceCreationExpression
 * @param {Object} args - Arguments for creating a new instance creation.
 * @param {Object} args.typeName - Type of the new instance creation.
 * @returns {InstanceCreationExpression} - New instance creation node.
 */
BallerinaASTFactory.createInstanceCreationExpression = function (args) {
    return new instanceCreationExpression(args);
};

/**
 * creates ThenBody
 * @param {Object} args - Arguments for creating a new instance creation.
 * @returns {ThenBody}
 */
BallerinaASTFactory.createThenBody = function (args) {
    return new thenBody(args);
};

/**
 * creates BinaryExpression
 * @param {Object} args - Arguments for creating a new instance creation.
 * @returns {BinaryExpression}
 */
BallerinaASTFactory.createBinaryExpression = function (args) {
    return new binaryExpression(args);
};

/**
 * Create Unary Expression
 * @param {Object} args - Arguments for the creating new expression creation
 * @return {UnaryExpression}
 * */
BallerinaASTFactory.createUnaryExpression = function (args) {
    return new unaryExpression(args);
};

/**
 * Create ConnectorInitExpression
 * @param {Object} args - Arguments for the creating new expression creation
 * @return {ConnectorInitExpression}
 * */
BallerinaASTFactory.createConnectorInitExpression = function (args) {
    return new connectorInitExpression(args);
};

/**
 * creates IndexBasedVarRefExpression
 * @param {Object} args - Arguments for creating a new instance creation.
 * @returns {IndexBasedVarRefExpression}
 */
BallerinaASTFactory.createIndexBasedVarRefExpression = function (args) {
    return new indexBasedVarRefExpression(args);
};

/**
 * creates ConstantDefinition
 * @param {Object} args - Arguments for creating a new constant definition.
 * @returns {ConstantDefinition}
 */
BallerinaASTFactory.createConstantDefinition = function (args) {
    return new constantDefinition(args);
};

/**
 * creates a GlobalVariableDefinition instance
 * @param {Object} args - Arguments for creating a new constant definition.
 * @returns {globalVariableDefinition}
 */
BallerinaASTFactory.createGlobalVariableDefinition = function (args) {
    return new globalVariableDefinition(args);
};

/**
 * creates ThrowStatement
 * @param {Object} args - Arguments for creating a new throw statement.
 * @returns {ThrowStatement}
 */
BallerinaASTFactory.createThrowStatement = function (args) {
    return new throwStatement(args);
};

/**
 * creates CommentStatement
 * @param {Object} args - Arguments for creating a new comment statement.
 * @returns {CommentStatement}
 */
BallerinaASTFactory.createCommentStatement = function (args) {
    return new commentStatement(args);
};

/**
 * creates TransformStatement
 * @param {Object} args - Arguments for creating a new transform statement.
 * @returns {TransformStatement}
 */
BallerinaASTFactory.createTransformStatement = function (args) {
    return new transformStatement(args);
};

/**
 * creates {@link AnnotationAttachment}
 * @param  {Object} args arguments for creating a new annotation.
 * @return {AnnotationAttachment}      new annotation object.
 */
BallerinaASTFactory.createAnnotationAttachment = function (args) {
    return new AnnotationAttachment(args);
};

/**
 * creates {@link AnnotationAttribute}
 * @param  {Object} args arguments for creating a new annotation attribute.
 * @return {AnnotationAttribute} new annotation attribute object.
 */
BallerinaASTFactory.createAnnotationAttribute = function (args) {
    return new AnnotationAttribute(args);
};

/**
 * Creates a {@link AnnotationAttributeValue}
 * @param {Object} args Arguments for creating a new annotation attribute value.
 * @return {AnnotationAttributeValue}
 */
BallerinaASTFactory.createAnnotationAttributeValue = (args) => {
    return new AnnotationAttributeValue(args);
};

/**
 * creates ParameterDefinition
 * @param {Object} args - Arguments for creating a new parameter definition.
 * @returns {ParameterDefinition}
 */
BallerinaASTFactory.createParameterDefinition = function (args) {
    return new parameterDefinition(args);
};

BallerinaASTFactory.createArgumentParameterDefinitionHolder = function (args) {
    return new argumentParameterDefinitionHolder();
};

BallerinaASTFactory.createReturnParameterDefinitionHolder = function (args) {
    return new returnParameterDefinitionHolder();
};

/**
 * Create {@link TransactionAbortedStatement}
 * @param {object} args - Argument to create the transaction aborted statement.
 * @return {TransactionAbortedStatement} new TransactionAborted Statement.
 * */
BallerinaASTFactory.createTransactionAbortedStatement = function (args) {
    return new transactionAbortedStatement(args);
};

/**
 * Create {@link TransactionStatement}
 * @param {object} args - Argument to create the transaction statement.
 * @return {TransactionStatement} new Transaction Statement.
 * */
BallerinaASTFactory.createTransactionStatement = function (args) {
    return new transactionStatement();
};

/**
 * Create {@link AbortedStatement}
 * @param {object} args - Argument to create the Aborted statement.
 * @return {AbortedStatement} new Aborted Statement.
 * */
BallerinaASTFactory.createAbortedStatement = function (args) {
    return new abortedStatement();
};

/**
 * Create {@link CommittedStatement}
 * @param {object} args - Arguments to create the committed statement.
 * @return {CommittedStatement} new Committed Statement.
 * */
BallerinaASTFactory.createCommittedStatement = function (args) {
    return new committedStatement();
};

/**
 * Create {@link }
 * @param {object} args - Arguments to create the continue statement.
 * @return {} new Committed Statement.
 * */
BallerinaASTFactory.createContinueStatement = function (args) {
    return new continueStatement();
};

/**
 * Create {@link AbortStatement}
 * @param {object} args - Arguments to create the Abort Statement.
 * @return {AbortStatement} new Abort Statement.
 * */
BallerinaASTFactory.createAbortStatement = function (args) {
    return new abortStatement();
};

/**
 * Creates new {@link BValue}.
 * @param {Object} Arguments for creating a bvalue object.
 * @return {Bvalue} new Bvalue
 */
BallerinaASTFactory.createBValue = (args) => {
    return new BValue(args);
};

/**
 * Create new {@link NamespaceDeclarationStatement}
 * @param {object} args - arguments for creating a namespace declaration object.
 * @return {NamespaceDeclarationStatement} new NamespaceDeclarationStatement.
 * */
BallerinaASTFactory.createNamespaceDeclarationStatement = (args) => {
    return new NamespaceDeclarationStatement(args);
};

/**
 * Create new {@link NamespaceDeclaration}
 * @param {object} args - arguments for creating a namespace declaration.
 * @return {NamespaceDeclaration} new NamespaceDeclaration.
 * */
BallerinaASTFactory.createNamespaceDeclaration = (args) => {
    return new NamespaceDeclaration(args);
};

/**
 * Create new {@link XMLQNameExpression}
 * @param {object} args - arguments for the creating a XML QName expression.
 * @return {XMLQNameExpression} new XMLQNameExpression.
 * */
BallerinaASTFactory.createXMLQNameExpression = (args) => {
    return new XMLQNameExpression(args);
};

/**
 * Create new {@link XMLAttributeReferenceExpression}
 * @return {XMLAttributeReferenceExpression} new XMLAttributeReferenceExpression.
 * */
BallerinaASTFactory.createXMLAttributeReferenceExpression = () => {
    return new XMLAttributeReferenceExpression();
};

/**
 * instanceof check for BallerinaAstRoot
 * @param {Object} child
 * @returns {boolean}
 */
BallerinaASTFactory.isBallerinaAstRoot = function (child) {
    return child instanceof ballerinaAstRoot;
};

/**
 * instanceof check for SimpleTypeName
 * @param {Object} child
 * @returns {boolean}
 */
BallerinaASTFactory.isSimpleTypeName = function (child) {
    return child instanceof simpleTypeName;
};

/**
 * instanceof check for ServiceDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isServiceDefinition = function (child) {
    return child instanceof serviceDefinition;
};

/**
 * instanceof check for FunctionDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isFunctionDefinition = function (child) {
    return child instanceof functionDefinition;
};

/**
 * instanceof check for ConnectorDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConnectorDefinition = function (child) {
    return child instanceof connectorDefinition;
};

/**
 * instanceof check for WorkerDeclaration
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isWorkerDeclaration = function (child) {
    return child instanceof workerDeclaration;
};

/**
 * instanceof check for WorkerInvocationStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isWorkerInvocationStatement = function (child) {
    return child instanceof workerInvocationStatement;
};

/**
 * instanceof check for JoinStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isJoinStatement = function (child) {
    return child instanceof joinStatement;
};

/**
 * instanceof check for ForkJoinStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isForkJoinStatement = function (child) {
    return child instanceof forkJoinStatement;
};

/**
 * instanceof check for ForkTimeoutStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTimeoutStatement = function (child) {
    return child instanceof timeoutStatement;
};

/**
 * instanceof check for WorkerReplyStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isWorkerReplyStatement = function (child) {
    return child instanceof workerReplyStatement;
};

/**
 * instanceof check for Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isStatement = function (child) {
    return child instanceof statement;
};

/**
 * instanceof check for while Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isWhileStatement = function (child) {
    return child instanceof whileStatement;
};

/**
 * instanceof check for break Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isBreakStatement = function (child) {
    return child instanceof breakStatement;
};

/**
 * instanceof check for TypeConverterDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeConverterDefinition = function (child) {
    return child instanceof typeConverterDefinition;
};

/**
 * instanceof check for TypeDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeDefinition = function (child) {
    return child instanceof typeDefinition;
};

/**
 * instanceof check for TypeElement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeElement = function (child) {
    return child instanceof typeElement;
};

/**
 * instanceof check for StructDefinition
 * @param {ASTNode} child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isStructDefinition = function (child) {
    return child instanceof structDefinition;
};

/**
 * is VariableDeclaration
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isVariableDeclaration = function (child) {
    return child instanceof variableDeclaration;
};

/**
 * is ReferenceTypeInitExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReferenceTypeInitiExpression = function (child) {
    return child instanceof referenceTypeInitExpression;
};


/**
 * is StructType
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isStructType = function (child) {
    return child instanceof structType;
};

/**
 * is ConditionalStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConditionalStatement = function (child) {
    return child instanceof conditionalStatement;
};

/**
 * is ConnectorDeclaration
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConnectorDeclaration = function (child) {
    return child instanceof connectorDeclaration;
};

/**
 * instanceof check for Expression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isExpression = function (child) {
    return child instanceof expression;
};

/**
 * instanceof check for KeyValueExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isKeyValueExpression= function (child) {
    return child instanceof keyValueExpression;
};

/**
 * instanceof check for ReferenceTypeInitExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReferenceTypeInitExpression = function (child) {
    return child instanceof referenceTypeInitExpression;
};

/**
 * instanceof check for FieldBasedVarRefExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isFieldBasedVarRefExpression = function (child) {
    return child instanceof fieldBasedVarRefExpression;
};

/**
 * instanceof check for VariableReferenceList
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isVariableReferenceList = function (child) {
    return child instanceof VariableReferenceList;
};

/**
 * instanceof check for TypeCastExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeCastExpression = function (child) {
    return child instanceof typeCastExpression;
};

/**
 * instanceof check for TypeConversionExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeConversionExpression = function (child) {
    return child instanceof typeConversionExpression;
};

/**
 * instanceof check for If-Else Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isIfElseStatement = function (child) {
    return child instanceof ifElseStatement;
};

/**
 * instanceof check for If Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isIfStatement = function (child) {
    return child instanceof ifStatement;
};

/**
 * instanceof check for Else Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isElseStatement = function (child) {
    return child instanceof elseStatement;
};

/**
 * instanceof check for ElseIf Statement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isElseIfStatement = function (child) {
    return child instanceof elseIfStatement;
};

/**
 * instanceof check for TryCatchStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTryCatchStatement = function (child) {
    return child instanceof tryCatchStatement;
};

/**
 * instanceof check for TryStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTryStatement = function (child) {
    return child instanceof tryStatement;
};

/**
 * instanceof check for CatchStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isCatchStatement = function (child) {
    return child instanceof catchStatement;
};

/**
 * instanceof check for FinallyStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isFinallyStatement = function (child) {
    return child instanceof finallyStatement;
};

/**
 * instanceof check for ReplyStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReplyStatement = function (child) {
    return child instanceof replyStatement;
};

/**
 * instanceof check for ReturnStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReturnStatement = function (child) {
    return child instanceof returnStatement;
};

/**
 * instanceof check for ResourceDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isResourceDefinition = function (child) {
    return child instanceof resourceDefinition;
};

/**
 * instanceof check for PackageDefinition
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isPackageDefinition = function (child) {
    return child instanceof packageDefinition;
};

/**
 * instanceof check for ImportDeclaration
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isImportDeclaration = function (child) {
    return child instanceof importDeclaration;
};

/**
 * instanceof check for ResourceParameter.
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isResourceParameter = function (child) {
    return child instanceof resourceParameter;
};

/**
 * instanceof check for ActionInvocationStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isActionInvocationStatement = function (child) {
    return child instanceof actionInvocationStatement;
};

/**
 * instanceof check for TransformStatement
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTransformStatement = function (child) {
    return child instanceof transformStatement;
};

/**
 * instanceof check for ActionInvocationExpression
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isActionInvocationExpression = function (child) {
    return child instanceof actionInvocationExpression;
};

/**
 * instanceof check for Argument
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isArgument = function (child) {
    return child instanceof argument;
};

/**
 * instanceof check for ReturnType
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReturnType = function (child) {
    return child instanceof returnType;
};

/**
 * instanceof check for TypeName
 * @param child - Object for instanceof check
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isTypeName = function (child) {
    return child instanceof typeName;
};

/**
 * instanceof check for BackTickExpression
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isBackTickExpression = function (child) {
    return child instanceof backTickExpression;
};

/**
 * instanceof check for Assignment Statement
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isAssignmentStatement = function (child) {
    return child instanceof assignmentStatement;
};

/**
 * instanceof check for Assignment Statement
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isTransformStatement = function (child) {
    return child instanceof transformStatement;
};


/**
 * instanceof check for BasicLiteralExpression
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isBasicLiteralExpression = function (child) {
    return child instanceof basicLiteralExpression;
};

/**
 * instanceof check for LambdaExpression
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isLambdaExpression = function (child) {
    return child instanceof lambdaFunctionExpression;
};

/**
 * instanceof check for NullLiteralExpression
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isNullLiteralExpression = function (child) {
    return child instanceof nullLiteralExpression;
};

/**
 * instanceof check for SimpleVariableReferenceExpression
 * @param node
 * @returns {boolean}
 */
BallerinaASTFactory.isSimpleVariableReferenceExpression = function (node) {
    return node instanceof SimpleVariableReferenceExpression;
};

/**
 * instanceof check for VariableDefinition
 * @param child
 * @returns {boolean}
 */
BallerinaASTFactory.isVariableDefinition = function (child) {
    return child instanceof variableDefinition;
};

/**
 * instanceof check for InstanceCreationExpression
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - True if node is an instance creation, else false.
 */
BallerinaASTFactory.isInstanceCreationExpression = function (child) {
    return child instanceof instanceCreationExpression;
};

/**
 * instanceof check for ThenBody
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isThenBody = function (child) {
    return child instanceof thenBody;
};

/**
 * instanceof check for binaryExpression
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isBinaryExpression = function (child) {
    return child instanceof binaryExpression;
};

/**
 * instanceof check for ConnectorInitExpression
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConnectorInitExpression = function (child) {
    return child instanceof connectorInitExpression;
};

/**
 * instanceof check for IndexBasedVarRefExpression
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isIndexBasedVarRefExpression = function (child) {
    return child instanceof indexBasedVarRefExpression;
};

/**
 * instanceof check for functionInvocationExpression
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isFunctionInvocationExpression = function (child) {
    return child instanceof functionInvocationExpression;
};

/**
 * instanceof check for functionInvocationStatement
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isFunctionInvocationStatement = function (child) {
    return child instanceof functionInvocationStatement;
};

/**
 * instanceof check for connectorAction
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConnectorAction = function (child) {
    return child instanceof connectorAction;
};

/**
 * instanceof check for constantDefinition
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isConstantDefinition = function (child) {
    return child instanceof constantDefinition;
};

/**
 * instanceof check for globalVariableDefinition
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isGlobalVariableDefinition = function (child) {
    return child instanceof globalVariableDefinition;
};

/**
 * instanceof check for Annotation definition.
 * @param {ASTNode} child - The ast node.
 * @return {boolean} - true if same type, else false
 * */
BallerinaASTFactory.isAnnotationDefinition = function (child) {
    return child instanceof annotationDefinition;
};

/**
 * instanceof check for Annotation Attribute Definition.
 * @param {ASTNode} child - The ast node.
 * @return {boolean} - true if same type, else false
 * */
BallerinaASTFactory.isAnnotationAttributeDefinition = function (child) {
    return child instanceof annotationAttributeDefinition;
};

/**
 * instanceof check for variableDefinitionStatement
 * @param {ASTNode} child - The ast node.
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isVariableDefinitionStatement = function (child) {
    return child instanceof variableDefinitionStatement;
};

/**
 * instanceof check for throwStatement
 * @param {ASTNode} child - The ast node
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isThrowStatement = function (child) {
    return child instanceof throwStatement;
};

/**
 * instanceof check for commentStatement
 * @param {ASTNode} child - The ast node
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isCommentStatement = function (child) {
    return child instanceof commentStatement;
};

/**
 * instanceof check for annotation attachment ast node.
 * @param  {ASTNode} child The ast node
 * @return {Boolean} true if same type, else false
 */
BallerinaASTFactory.isAnnotationAttachment = (child) => {
    return child instanceof AnnotationAttachment;
};

/**
 * instanceof check for annotation attribute ast node.
 * @param  {ASTNode} child The ast node
 * @return {Boolean} true if same type, else false
 */
BallerinaASTFactory.isAnnotationAttribute = (child) => {
    return child instanceof AnnotationAttribute;
};

/**
 * instanceof check for AnnotationAttributeValue ast node.
 * @param  {ASTNode}  child The ast node
 * @return {Boolean}  true if same type, else false
 */
BallerinaASTFactory.isAnnotationAttributeValue = function (child) {
    return child instanceof AnnotationAttributeValue;
};

/**
 * instanceof check for ParameterDefinition
 * @param {ASTNode} child - The ast node
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isParameterDefinition = function (child) {
    return child instanceof parameterDefinition;
};

/**
 * instanceof check for ArgumentParameterDefinitionHolder
 * @param {ASTNode} child - The ast node
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isArgumentParameterDefinitionHolder = function (child) {
    return child instanceof argumentParameterDefinitionHolder;
};

/**
 * instanceof check for ReturnParameterDefinitionHolder
 * @param {ASTNode} child - The ast node
 * @returns {boolean} - true if same type, else false
 */
BallerinaASTFactory.isReturnParameterDefinitionHolder = function (child) {
    return child instanceof returnParameterDefinitionHolder;
};

/**
 * instanceof check for the TransactionAbortedStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isTransactionAbortedStatement = function (child) {
    return child instanceof transactionAbortedStatement;
};

/**
 * instanceof check for the TransactionStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isTransactionStatement = function (child) {
    return child instanceof transactionStatement;
};

/**
 * instanceof check for the AbortedStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isAbortedStatement = function (child) {
    return child instanceof abortedStatement;
};

/**
 * instanceof check for the AbortStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isAbortStatement = function (child) {
    return child instanceof abortStatement;
};

/**
 * instanceof check for the CommittedStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isCommittedStatement = function (child) {
    return child instanceof committedStatement;
};

/**
 * instanceof check for the ContinueStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isContinueStatement = function (child) {
    return child instanceof continueStatement;
};

/**
 * instanceof check for the BValue.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 */
BallerinaASTFactory.isBValue = (child) => {
    return child instanceof BValue;
};

/**
 * instanceof check for the NamespaceDeclarationStatement.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if same type, else false.
 * */
BallerinaASTFactory.isNamespaceDeclarationStatement = (child) => {
    return child instanceof NamespaceDeclarationStatement;
};

/**
 * instanceof check for the NamespaceDeclaration.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if the same type, else false.
 * */
BallerinaASTFactory.isNamespaceDeclaration = (child) => {
    return child instanceof NamespaceDeclaration;
};

/**
 * instanceof check for the XMLQNameExpression.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if the same type, else false.
 * */
BallerinaASTFactory.isXMLQNameExpression = (child) => {
    return child instanceof XMLQNameExpression;
};

/**
 * instanceof check for the XMLAttributeReferenceExpression.
 * @param {ASTNode} child - the ast node.
 * @return {boolean} - true if the same typ, else false
 * */
BallerinaASTFactory.isXMLAttributeReferenceExpression = (child) => {
    return child instanceof XMLAttributeReferenceExpression;
};

BallerinaASTFactory.createFromJson = function (jsonNode) {
    let node;
    const nodeType = jsonNode.type;

    switch (nodeType) {
        case 'simple_type_name':
            node = BallerinaASTFactory.createSimpleTypeName();
            break;
        case 'package':
            node = BallerinaASTFactory.createPackageDefinition();
            break;
        case 'import':
            node = BallerinaASTFactory.createImportDeclaration();
            break;
        case 'annotation_attachment':
            node = BallerinaASTFactory.createAnnotationAttachment();
            break;
        case 'annotation_attribute':
            node = BallerinaASTFactory.createAnnotationAttribute();
            break;
        case 'annotation_attribute_value':
            node = BallerinaASTFactory.createAnnotationAttributeValue();
            break;
        case 'service_definition':
            node = BallerinaASTFactory.createServiceDefinition();
            break;
        case 'annotation_definition':
            node = BallerinaASTFactory.createAnnotationDefinition();
            break;
        case 'function_definition':
            node = BallerinaASTFactory.createFunctionDefinition();
            break;
        case 'connector_definition':
            node = BallerinaASTFactory.createConnectorDefinition();
            break;
        case 'type_definition':
            node = BallerinaASTFactory.createTypeDefinition();
            break;
        case 'resource_definition':
            node = BallerinaASTFactory.createResourceDefinition();
            break;
        case 'connector_declaration':
            node = BallerinaASTFactory.createConnectorDeclaration();
            break;
        case 'variable_definition':
            node = BallerinaASTFactory.createVariableDefinition();
            break;
        case 'variable_definition_statement':
            node = BallerinaASTFactory.createVariableDefinitionStatement();
            break;
        case 'argument_declaration':
            node = BallerinaASTFactory.createResourceParameter();
            break;
        case 'reply_statement':
            node = BallerinaASTFactory.createReplyStatement();
            break;
        case 'return_statement':
            node = BallerinaASTFactory.createReturnStatement();
            break;
        case 'return_type':
            node = BallerinaASTFactory.createReturnType();
            break;
        case 'return_argument':
            node = BallerinaASTFactory.createArgument();
            break;
        case 'type_name':
            node = BallerinaASTFactory.createTypeName();
            break;
        case 'function_invocation_statement':
            node = BallerinaASTFactory.createFunctionInvocationStatement();
            break;
        case 'function_invocation_expression':
            node = BallerinaASTFactory.createFunctionInvocationExpression();
            break;
        case 'simple_variable_reference_expression':
            node = BallerinaASTFactory.createSimpleVariableReferenceExpression();
            break;
        case 'action_invocation_expression':
            node = BallerinaASTFactory.createActionInvocationExpression();
            break;
        case 'assignment_statement':
            node = BallerinaASTFactory.createAssignmentStatement();
            break;
        case 'back_tick_expression':
            node = BallerinaASTFactory.createBackTickExpression();
            break;
        case 'while_statement' :
            node = BallerinaASTFactory.createWhileStatement();
            break;
        case 'break_statement' :
            node = BallerinaASTFactory.createBreakStatement();
            break;
        case 'basic_literal_expression' :
            node = BallerinaASTFactory.createBasicLiteralExpression();
            break;
        case 'lambda_function_expression' :
        node = BallerinaASTFactory.createLambdaExpression();
        break;
    case 'null_literal_expression' :
            node = BallerinaASTFactory.createNullLiteralExpression();
            break;
        case 'variable_reference_list':
            node = BallerinaASTFactory.createVariableReferenceList();
            break;
        case 'if_else_statement' :
            node = BallerinaASTFactory.createIfElseStatement();
            break;
        case 'if_statement' :
            node = BallerinaASTFactory.createIfStatement();
            break;
        case 'else_if_statement' :
            node = BallerinaASTFactory.createElseIfStatement();
            break;
        case 'else_statement' :
            node = BallerinaASTFactory.createElseStatement();
            break;
        case 'instance_creation_expression':
            node = BallerinaASTFactory.createInstanceCreationExpression();
            break;
        case 'then_body':
            node = BallerinaASTFactory.createThenBody();
            break;
        case 'equal_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '==' });
            break;
        case 'greater_than_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '>' });
            break;
        case 'add_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '+' });
            break;
        case 'multiplication_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '*' });
            break;
        case 'division_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '/' });
            break;
        case 'mod_expression' :
            node = BallerinaASTFactory.createBinaryExpression({ operator: '%' });
            break;
        case 'and_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '&&' });
            break;
        case 'subtract_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '-' });
            break;
        case 'or_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '||' });
            break;
        case 'greater_equal_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '>=' });
            break;
        case 'less_than_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '<' });
            break;
        case 'less_equal_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '<=' });
            break;
        case 'not_equal_expression':
            node = BallerinaASTFactory.createBinaryExpression({ operator: '!=' });
            break;
        case 'unary_expression':
            node = BallerinaASTFactory.createUnaryExpression({ operator: jsonNode.operator });
            break;
        case 'connector_init_expr':
            node = BallerinaASTFactory.createConnectorInitExpression();
            break;
        case 'index_based_variable_reference_expression':
            node = BallerinaASTFactory.createIndexBasedVarRefExpression();
            break;
        case 'connector':
            node = BallerinaASTFactory.createConnectorDefinition();
            break;
        case 'action_definition':
            node = BallerinaASTFactory.createConnectorAction();
            break;
        case 'constant_definition':
            node = BallerinaASTFactory.createConstantDefinition();
            break;
        case 'global_variable_definition':
            node = BallerinaASTFactory.createGlobalVariableDefinition();
            break;
        case 'struct_definition':
            node = BallerinaASTFactory.createStructDefinition();
            break;
        case 'key_value_expression':
            node = BallerinaASTFactory.createKeyValueExpression();
            break;
        case 'type_cast_expression':
            node = BallerinaASTFactory.createTypeCastExpression();
            break;
        case 'type_conversion_expression':
            node = BallerinaASTFactory.createTypeConversionExpression();
            break;
        case 'field_based_variable_reference_expression':
            node = BallerinaASTFactory.createFieldBasedVarRefExpression();
            break;
        case 'reference_type_init_expression':
            node = BallerinaASTFactory.createReferenceTypeInitExpression();
            break;
        case 'array_init_expression':
            node = BallerinaASTFactory.createArrayInitExpression();
            break;
        case 'action_invocation_statement':
            node = BallerinaASTFactory.createActionInvocationStatement();
            break;
        case 'worker':
            node = BallerinaASTFactory.createWorkerDeclaration();
            break;
        case 'worker_invocation_statement':
            node = BallerinaASTFactory.createWorkerInvocationStatement();
            break;
        case 'worker_reply_statement':
            node = BallerinaASTFactory.createWorkerReplyStatement();
            break;
        case 'try_catch_statement':
            node = BallerinaASTFactory.createTryCatchStatement();
            break;
        case 'try_block':
            node = BallerinaASTFactory.createTryStatement();
            break;
        case 'catch_block':
            node = BallerinaASTFactory.createCatchStatement();
            break;
        case 'finally_block':
            node = BallerinaASTFactory.createFinallyStatement();
            break;
        case 'throw_statement':
            node = BallerinaASTFactory.createThrowStatement();
            break;
        case 'comment_statement':
            node = BallerinaASTFactory.createCommentStatement();
            break;
        case 'annotation_attribute_definition':
            node = BallerinaASTFactory.createAnnotationAttributeDefinition();
            break;
        case 'parameter_definition':
            node = BallerinaASTFactory.createParameterDefinition();
            break;
        case 'argument_parameter_definitions':
            node = BallerinaASTFactory.createArgumentParameterDefinitionHolder();
            break;
        case 'return_parameter_definitions':
            node = BallerinaASTFactory.createReturnParameterDefinitionHolder();
            break;
        case 'transform_statement':
            node = BallerinaASTFactory.createTransformStatement();
            break;
        case 'fork_join_statement':
            node = BallerinaASTFactory.createForkJoinStatement();
            break;
        case 'join_statement':
            node = BallerinaASTFactory.createJoinStatement();
            break;
        case 'timeout_statement':
            node = BallerinaASTFactory.createTimeoutStatement();
            break;
        case 'transaction_aborted_statement':
            node = BallerinaASTFactory.createTransactionAbortedStatement();
            break;
        case 'transaction_statement':
            node = BallerinaASTFactory.createTransactionStatement();
            break;
        case 'aborted_statement':
            node = BallerinaASTFactory.createAbortedStatement();
            break;
        case 'abort_statement':
            node = BallerinaASTFactory.createAbortStatement();
            break;
        case 'committed_statement':
            node = BallerinaASTFactory.createCommittedStatement();
            break;
        case 'continue_statement':
            node = BallerinaASTFactory.createContinueStatement();
            break;
        case 'bvalue':
            node = BallerinaASTFactory.createBValue();
            break;
        case 'namespace_declaration_statement':
            node = BallerinaASTFactory.createNamespaceDeclarationStatement();
            break;
        case 'namespace_declaration':
            node = BallerinaASTFactory.createNamespaceDeclaration();
            break;
        case 'xml_qname_expression':
            node = BallerinaASTFactory.createXMLQNameExpression();
            break;
        case 'xml_attribute_ref_expression':
            node = BallerinaASTFactory.createXMLAttributeReferenceExpression();
            break;
        default:
            throw new Error('Unknown node definition for ' + jsonNode.type);
    }

    node.setLineNumber(jsonNode.line_number, { doSilently: true });
    if (jsonNode.is_identifier_literal) {
        node.setIsIdentifierLiteral(jsonNode.is_identifier_literal, { doSilently: true });
    }

    if (!_.isNil(jsonNode.whitespace_descriptor)) {
        node.setWhiteSpaceDescriptor(jsonNode.whitespace_descriptor);
    }
    node.whiteSpace.useDefault = false;
    return node;
};

export default BallerinaASTFactory;
