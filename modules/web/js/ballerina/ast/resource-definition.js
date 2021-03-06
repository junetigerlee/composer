
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
import _ from 'lodash';
import log from 'log';
import ASTNode from './node';
import CommonUtils from '../utils/common-utils';
import BallerinaASTFactory from './../ast/ballerina-ast-factory';

/**
 * Constructor for ResourceDefinition
 * @param {Object} args - The arguments to create the ServiceDefinition
 * @param {string} [args.resourceName=newResource] - Service name
 * @constructor
 */
class ResourceDefinition extends ASTNode {
    constructor(args) {
        // TODO: All the types should be referred from the global constants
        super('ResourceDefinition');
        this._resourceName = _.get(args, 'resourceName');

        this.BallerinaASTFactory = this.getFactory();
        this.whiteSpace.defaultDescriptor.regions = {
            0: ' ',
            1: ' ',
            2: '',
            3: ' ',
            4: '\n',
            5: '\n',
        };
    }

    setResourceName(resourceName, options) {
        if (!_.isNil(resourceName)) {
            this.setAttribute('_resourceName', resourceName, options);
        } else {
            log.error('Invalid Resource name [' + resourceName + '] Provided');
            throw 'Invalid Resource name [' + resourceName + '] Provided';
        }
    }

    getVariableDefinitionStatements() {
        const variableDefinitionStatements = [];
        const self = this;

        _.forEach(this.getChildren(), (child) => {
            if (self.getFactory().isVariableDefinitionStatement(child)) {
                variableDefinitionStatements.push(child);
            }
        });
        return variableDefinitionStatements;
    }

    /**
     * Get the namespace declaration statements.
     * @return {ASTNode[]} namespace declaration statements
     * */
    getNamespaceDeclarationStatements() {
        return this.filterChildren(this.getFactory().isNamespaceDeclarationStatement).slice(0);
    }

    getArguments() {
        return this.getArgumentParameterDefinitionHolder().getChildren();
    }

    getResourceName() {
        return this._resourceName;
    }

    /**
     * Adds new variable declaration.
     */
    addVariableDeclaration(newVariableDeclaration) {
        const self = this;
        // Get the index of the last variable declaration.
        let index = _.findLastIndex(this.getChildren(), (child) => {
            return self.getFactory().isVariableDeclaration(child);
        });

        // index = -1 when there are not any variable declarations, hence get the index for connector
        // declarations.
        if (index === -1) {
            index = _.findLastIndex(this.getChildren(), (child) => {
                return self.getFactory().isConnectorDeclaration(child);
            });
        }

        this.addChild(newVariableDeclaration, index + 1);
    }

    /**
     * Adds new variable declaration.
     */
    removeVariableDeclaration(variableDeclarationIdentifier) {
        const self = this;
        // Removing the variable from the children.
        const variableDeclarationChild = _.find(this.getChildren(), (child) => {
            return self.getFactory().isVariableDeclaration(child)
                && child.getIdentifier() === variableDeclarationIdentifier;
        });
        this.removeChild(variableDeclarationChild);
    }

    /**
     * Returns the list of parameters as a string separated by commas.
     * @return {string} - Parameters as string.
     */
    getParametersAsString() {
        let paramsAsString = '';
        const params = this.getArguments();

        _.forEach(params, (parameter, index) => {
            if (index != 0) {
                paramsAsString += ((parameter.whiteSpace.useDefault) ? ', ' 
                            : (',' + parameter.getWSRegion(0)));
            }
            paramsAsString += parameter.getParameterDefinitionAsString();
        });

        return paramsAsString;
    }

    /**
     * Adds new parameter to a resource.
     * @param {string|undefined} annotationType - The type of the annotation. Example: @PathParam.
     * @param {string|undefined} annotationText - The value inside the annotation.
     * @param {string} parameterType - The type of the parameter. Example : string, int.
     * @param {string} parameterIdentifier - Identifier for the parameter.
     */
    addParameter(annotationType, annotationText, parameterType, parameterIdentifier) {
        // Check if already parameter exists with same identifier.
        const identifierAlreadyExists = _.findIndex(this.getParameters(), (parameter) => {
            return parameter.getName() === parameterIdentifier;
        }) !== -1;

        // If parameter with the same identifier exists, then throw an error. Else create the new parameter.
        if (identifierAlreadyExists) {
            const errorString = "A resource parameter with identifier '" + parameterIdentifier + "' already exists.";
            log.error(errorString);
            throw errorString;
        } else {
            // Creating resource parameter
            const newParameter = this.getFactory().createResourceParameter();
            newParameter.setAnnotationType(annotationType);
            newParameter.setAnnotationText(annotationText);
            newParameter.setType(parameterType);
            newParameter.setName(parameterIdentifier);

            const self = this;

            // Get the index of the last resource parameter declaration.
            const index = _.findLastIndex(this.getChildren(), (child) => {
                return self.getFactory().isResourceParameter(child);
            });

            this.addChild(newParameter, index + 1);
        }
    }

    /**
     * Removes a parameter from the resource definition.
     * @param {string} modelID - The id of the parameter model.
     */
    removeParameter(modelID) {
        const self = this;
        // Deleting the variable from the children.
        const resourceParameter = _.find(this.getChildren(), (child) => {
            return self.getFactory().isResourceParameter(child) && child.id === modelID;
        });

        this.removeChild(resourceParameter);
    }

    resourceParent(parent) {
        if (!_.isUndefined(parent)) {
            this.parent = parent;
        } else {
            return this.parent;
        }
    }

    getConnectionDeclarations() {
        const connectorDeclaration = [];
        const self = this;

        _.forEach(this.getChildren(), (child) => {
            if (self.getFactory().isConnectorDeclaration(child)) {
                connectorDeclaration.push(child);
            }
        });
        return _.sortBy(connectorDeclaration, [function (connectorDeclaration) {
            return connectorDeclaration.getConnectorVariable();
        }]);
    }

    getWorkerDeclarations() {
        const workerDeclarations = [];
        const self = this;

        _.forEach(this.getChildren(), (child) => {
            if (self.getFactory().isWorkerDeclaration(child)) {
                workerDeclarations.push(child);
            }
        });
        return _.sortBy(workerDeclarations, [function (workerDeclaration) {
            return workerDeclaration.getWorkerName();
        }]);
    }

    getArgumentParameterDefinitionHolder() {
        let argParamDefHolder = this.findChild(this.getFactory().isArgumentParameterDefinitionHolder);
        if (_.isUndefined(argParamDefHolder)) {
            argParamDefHolder = this.getFactory().createArgumentParameterDefinitionHolder();
            this.addChild(argParamDefHolder, undefined, true);
        }
        return argParamDefHolder;
    }

    /**
     * Validates possible immediate child types.
     * @override
     * @param node
     * @return {boolean}
     */
    canBeParentOf(node) {
        return this.getFactory().isConnectorDeclaration(node)
            || this.getFactory().isVariableDeclaration(node)
            || this.getFactory().isWorkerDeclaration(node)
            || this.getFactory().isStatement(node);
    }

    /**
     * initialize ResourceDefinition from json object
     * @param {Object} jsonNode - to initialize from
     * @param {string} jsonNode.resource_name - Name of the resource definition
     * @param {Object[]} jsonNode.annotations - Annotations of the resource definition
     * @param {string} jsonNode.annotations.annotation_name - The annotation value
     * @param {string} jsonNode.annotations.annotation_value - The text of the annotation.
     * @param {Object[]} jsonNode.children - Children elements of the resource definition.
     */
    initFromJson(jsonNode) {
        this.setResourceName(jsonNode.resource_name, { doSilently: true });
        const self = this;
        _.each(jsonNode.children, (childNode) => {
            let child;
            let childNodeTemp;
            if (childNode.type === 'variable_definition_statement' && !_.isNil(childNode.children[1]) && childNode.children[1].type === 'connector_init_expr') {
                child = self.getFactory().createConnectorDeclaration();
                childNodeTemp = childNode;
            } else {
                child = self.getFactory().createFromJson(childNode);
                childNodeTemp = childNode;
            }
            self.addChild(child);
            child.initFromJson(childNodeTemp);
        });
    }

    /**
     * Override the addChild method for ordering the child elements
     * @param {ASTNode} child
     * @param {number|undefined} index
     */
    addChild(child, index, ignoreTreeModifiedEvent, ignoreChildAddedEvent, generateId) {
        if (!BallerinaASTFactory.isWorkerDeclaration(child)) {
            const firstWorkerIndex = _.findIndex(
                this.getChildren(), child => BallerinaASTFactory.isWorkerDeclaration(child));

            if (firstWorkerIndex > -1 && _.isNil(index)) {
                index = firstWorkerIndex;
            }
        }
        Object.getPrototypeOf(this.constructor.prototype)
        .addChild.call(this, child, index, ignoreTreeModifiedEvent, ignoreChildAddedEvent, generateId);
    }

    /**
     * @inheritDoc
     * @override
     */
    generateUniqueIdentifiers() {
        CommonUtils.generateUniqueIdentifier({
            node: this,
            attributes: [{
                defaultValue: 'Resource',
                setter: this.setResourceName,
                getter: this.getResourceName,
                parents: [{
                    // service definition
                    node: this.parent,
                    getChildrenFunc: this.parent.getResourceDefinitions,
                    getter: this.getResourceName,
                }],
            }],
        });
    }

    /**
     * Get the connector by name
     * @param {string} connectorName - name of the connector
     * @return {ConnectorDeclaration} - Connector declaration with the given connector name
     */
    getConnectorByName(connectorName) {
        const factory = this.getFactory();
        const connectorReference = _.find(this.getChildren(), (child) => {
            let connectorVariableName;
            if (factory.isAssignmentStatement(child) && factory.isConnectorInitExpression(child.getChildren()[1])) {
                const variableReferenceList = [];

                _.forEach(child.getChildren()[0].getChildren(), (variableRef) => {
                    variableReferenceList.push(variableRef.getExpressionString());
                });

                connectorVariableName = (_.join(variableReferenceList, ',')).trim();
            } else if (factory.isConnectorDeclaration(child)) {
                connectorVariableName = child.getConnectorVariable();
            }

            return connectorVariableName === connectorName;
        });

        return !_.isNil(connectorReference) ? connectorReference : this.getParent().getConnectorByName(connectorName);
    }

    /**
     * Get all the connector references in the immediate scope
     * @return {ConnectorDeclaration[]} connectorReferences
     */
    getConnectorsInImmediateScope() {
        const factory = this.getFactory();
        const connectorReferences = _.filter(this.getChildren(), (child) => {
            return factory.isConnectorDeclaration(child);
        });

        return !_.isEmpty(connectorReferences) ? connectorReferences : this.getParent().getConnectorsInImmediateScope();
    }

    /**
     * Gets the @http:Path{value: '/abc'} annotation attachment AST.
     * @param {boolean} ifNotExist - whether the path annotation exist or not
     * @return {AnnotationAttachment|undefined} - annotation attachment
     */
    getPathAnnotation(ifNotExist = false) {
        let pathAnnotation;
        _.forEach(this.getChildrenOfType(this.getFactory().isAnnotationAttachment), (annotationAST) => {
            if (annotationAST.getFullPackageName().toLowerCase() === 'ballerina.net.http' &&
                annotationAST.getPackageName().toLowerCase() === 'http' &&
                annotationAST.getName() === 'Path') {
                pathAnnotation = annotationAST;
            }
        });
        // if path annotation is not define we will create one with default behaviour.
        if (_.isNil(pathAnnotation) && ifNotExist) {
            // Creating path annotation.
            pathAnnotation = BallerinaASTFactory.createAnnotationAttachment({
                fullPackageName: 'ballerina.net.http',
                packageName: 'http',
                name: 'Path',
            });

            const annotationAttributeValue = BallerinaASTFactory.createAnnotationAttributeValue();
            annotationAttributeValue.addChild(BallerinaASTFactory.createBValue({
                type: 'string',
                stringValue: this.getResourceName(),
            }));

            const annotationAttribute = BallerinaASTFactory.createAnnotationAttribute({
                key: 'value',
            });
            annotationAttribute.addChild(annotationAttributeValue);
            pathAnnotation.addChild(annotationAttribute);
            this.addChild(pathAnnotation, 1);
        }

        return pathAnnotation;
    }

    /**
     * Gets the path value in the @http:Path annotation.
     *
     * @param {boolean} [ifNotExist=false] Creates if path annotation doesnt exists.
     * @returns {string} The path value.
     * @memberof ResourceDefinition
     */
    getPathAnnotationValue(ifNotExist = false) {
        const pathAnnotationAttachment = this.getPathAnnotation(ifNotExist);
        if (pathAnnotationAttachment) {
            const annotationAttribute = pathAnnotationAttachment.getChildren()[0];
            const annotationAttributeValue = annotationAttribute.getValue();
            const bValue = annotationAttributeValue.getChildren()[0];
            return bValue.getStringValue();
        } else {
            return undefined;
        }
    }

    /**
     * Gets the @http:GET{} annotation AST
     * @return {Annotation|undefined} - Annotation AST model
     */
    getHttpMethodAnnotation() {
        let httpMethodAnnotation;
        _.forEach(this.getChildrenOfType(this.getFactory().isAnnotationAttachment), (annotationAST) => {
            if (annotationAST.isHttpMethod()) {
                httpMethodAnnotation = annotationAST;
            }
        });

        // Creating GET http method annotation.
        if (_.isUndefined(httpMethodAnnotation)) {
            httpMethodAnnotation = BallerinaASTFactory.createAnnotationAttachment({
                fullPackageName: 'ballerina.net.http',
                packageName: 'http',
                name: 'GET',
            });
            this.addChild(httpMethodAnnotation, 0);
        }

        return httpMethodAnnotation;
    }
}

export default ResourceDefinition;
