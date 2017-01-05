/*
 * IBM Confidential
 * OCO Source Materials
 * IBM Concerto - Blockchain Solution Framework
 * Copyright IBM Corp. 2016
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has
 * been deposited with the U.S. Copyright Office.
 */

'use strict';

require('chai').should();
const ModelManager = require('../../lib/modelmanager');
const GoLangVisitor = require('../../lib/codegen/fromcto/golang/golangvisitor');
const FileWriter = require('../../lib/codegen/filewriter');

const fs = require('fs');
const path = require('path');
const sinon = require('sinon');

describe('GoLangVisitor', function(){

    let mockFileWriter;

    beforeEach(() => {
        mockFileWriter = sinon.createStubInstance(FileWriter);
    });

    describe('#visit', function() {
        it('should generate Go code', function() {

            const carleaseModel = fs.readFileSync(path.resolve(__dirname, '../data/model/carlease.cto'), 'utf8');
            const concertoModel = fs.readFileSync(path.resolve(__dirname, '../data/model/concerto.cto'), 'utf8');

            // create and populate the ModelManager with a model file
            let modelManager = new ModelManager();
            modelManager.should.not.be.null;
            modelManager.clearModelFiles();
            modelManager.addModelFiles([carleaseModel,concertoModel]);

            let visitor = new GoLangVisitor();
            let parameters = {};
            parameters.fileWriter = mockFileWriter;
            modelManager.accept(visitor, parameters);

            sinon.assert.calledWith(mockFileWriter.openFile, 'concerto.go');
            sinon.assert.calledWith(mockFileWriter.openFile, 'main.go');
            sinon.assert.calledWith(mockFileWriter.openFile, 'orgacme.go');
        });
    });
});
