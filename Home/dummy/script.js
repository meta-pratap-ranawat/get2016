
Ciel.Process.ProcessDesign.CreateJob = {};

Ciel.Process.ProcessDesign.CreateJob.newJobId = "00000" // fake jobId used to denote a new Job
Ciel.Process.ProcessDesign.CreateJob.jobId = Ciel.Process.ProcessDesign.CreateJob.newJobId;

var myDiagramModalInputTable;
var myDiagramModalOutputTable;
var canvas;
var isCanvasReadOnly = false;
var recordTableName = '';
var recordPageNumber = 0;
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $("#file-output-tab").click(function () {
        $('#help-icon-purge-file-modal').tooltip('hide');
    });
    $("#joinStepAccordion").on('show.bs.collapse', function () {
        $('#help-icon-purge-file-modal1').tooltip('hide');
    });
    myDiagramModalInputTable = Ciel.Process.ProcessDesign.CreateJob.CreateCanvas("myDiagramForModalInputTableDiv");
    myDiagramModalOutputTable = Ciel.Process.ProcessDesign.CreateJob.CreateCanvas("myDiagramForModalOutputTableDiv");

    var tool = myDiagramModalInputTable.toolManager.linkingTool;
    tool.isValidFrom = function (fromnode, fromport) {

        if (fromnode.data.LOGICALCOLUMNNAME === "All") {

            return false;
        }
        return true;

    }
    tool.isValidTo = function (tonode, toport) {

        if (tonode.data.LOGICALCOLUMNNAME === "All") {

            return false;
        }
        return true;

    }

    tool.isValidLink = function (fromnode, fromport, tonode, toport) {
        var shortCheck = false;
        if (fromnode.containingGroup === tonode.containingGroup) {
            return false;
        }

        fromnode.containingGroup.findExternalNodesConnected().each(function (node) {
            if (node.containingGroup === tonode.containingGroup && fromnode.findLinksBetween(tonode, null, null).count == 0) {
                shortCheck = true;
            }
        });


        if (shortCheck) {
            return true;
        }
        else {
            var queue = [];
            queue.push(fromnode.containingGroup);
            var visitedNode = [];
            var visitedLink = [];
            visitedNode[fromnode.containingGroup] = true;
            var paths = [];

            while (queue.length) {
                var vertex = queue.shift();
                vertex.findExternalLinksConnected().each(function (edge) {

                    if (typeof visitedLink[edge] === "undefined") {
                        visitedLink[edge] = true;
                        var node = (vertex === edge.fromNode.containingGroup) ? edge.toNode.containingGroup : edge.fromNode.containingGroup;

                        if (typeof visitedNode[node] === "undefined") {
                            queue.push(node);
                            visitedNode[node] = true;
                        }

                        paths[edge] = vertex;
                    }
                });
            }

            if (typeof visitedNode[tonode.containingGroup] === "undefined") {
                return true;
            } else {
                return false;
            }
        }
    }

    var toolForOutput = myDiagramModalOutputTable.toolManager.linkingTool;
    toolForOutput.isValidFrom = function (fromnode, fromport) {

        if (fromnode.containingGroup.data.LOGICALTABLENAME !== "Selected Column") {
            return false;
        }
        return true;

    }

    myDiagramModalOutputTable.addDiagramListener("LinkDrawn", function (e) {
        var link = e.subject;
        var diagram = e.diagram;
        var linkData = link.data;
        var fromnode = e.diagram.findNodeForKey(link.data.from);
        if (fromnode.findNodesOutOf().count > 1 || fromnode.findNodesInto().count > 1) {
            e.diagram.model.removeLinkData(link.data)
        }
        var tonode = e.diagram.findNodeForKey(link.data.to);
        if (tonode.findNodesOutOf().count > 1 || tonode.findNodesInto().count > 1) {
            e.diagram.model.removeLinkData(link.data)
        }

        if (link.fromNode.data.columntype !== link.toNode.data.columntype) {
            //changing the link color;
            diagram.startTransaction("set link");
            diagram.model.setDataProperty(linkData, "color", "#FF0000");
            diagram.commitTransaction("set link");
        } else {
            diagram.startTransaction("set link");
            diagram.model.setDataProperty(linkData, "color", "gray");
            diagram.commitTransaction("set link");
        }
    });

    myDiagramModalInputTable.addDiagramListener("LinkDrawn", function (e) {
        var link = e.subject;
        var diagram = e.diagram;
        var linkData = link.data;
        var fromNode = diagram.findNodeForKey(linkData.from);
        var toNode = diagram.findNodeForKey(linkData.to);
        var fromNodeGroup = fromNode.data.group;
        var toNodeGroup = toNode.data.group;
        var updateLink = true;


        if (link.fromNode.data.columntype !== link.toNode.data.columntype) {
            //changing the link color;
            diagram.startTransaction("set link");
            diagram.model.setDataProperty(linkData, "color", "#FF0000");
            diagram.commitTransaction("set link");
        } else {
            diagram.startTransaction("set link");
            diagram.model.setDataProperty(linkData, "color", "gray");
            diagram.commitTransaction("set link");
        }
        if (typeof link.data.relationType === "undefined") {
            diagram.startTransaction("set link");
            diagram.model.setDataProperty(link.data, "checked1", false);
            diagram.model.setDataProperty(link.data, "checked2", true);
            diagram.model.setDataProperty(link.data, "checked3", false);
            diagram.commitTransaction("set link");
        }


        myDiagramModalInputTable.links.each(function (storedLink) {

            if (updateLink && storedLink.data !== null && ((diagram.findNodeForKey(storedLink.data.from).data.group === fromNodeGroup &&
                diagram.findNodeForKey(storedLink.data.to).data.group === toNodeGroup) ||
                (diagram.findNodeForKey(storedLink.data.from).data.group === toNodeGroup &&
                diagram.findNodeForKey(storedLink.data.to).data.group === fromNodeGroup))) {
                var relationType = storedLink.data.toolTipText;
                var res, re, r;
                if (typeof relationType !== "undefined") {
                    var partIndex = relationType.indexOf(":");
                    res = relationType.substr(0, partIndex);
                } else {
                    res = "InnerJoin";
                }


                diagram.startTransaction("set link");
                diagram.model.setDataProperty(linkData, "relationType", res);
                diagram.model.setDataProperty(linkData, "checked1", storedLink.data.checked1);
                diagram.model.setDataProperty(linkData, "checked2", storedLink.data.checked2);
                diagram.model.setDataProperty(linkData, "checked3", storedLink.data.checked3);

                if ((diagram.findNodeForKey(storedLink.data.from).data.group === toNodeGroup &&
                diagram.findNodeForKey(storedLink.data.to).data.group === fromNodeGroup)) {
                    diagram.model.setDataProperty(linkData, "toolTipText",
                    (res + ": " + diagram.findNodeForKey(toNodeGroup).data.LOGICALTABLENAME + "." + toNode.data.LOGICALCOLUMNNAME + " = " + diagram.findNodeForKey(fromNodeGroup).data.LOGICALTABLENAME + "." + fromNode.data.LOGICALCOLUMNNAME));
                    diagram.model.setDataProperty(linkData, "to", fromNode.data.key);
                    diagram.model.setDataProperty(linkData, "from", toNode.data.key);
                } else {
                    diagram.model.setDataProperty(linkData, "toolTipText",
                    (res + ": " + diagram.findNodeForKey(fromNodeGroup).data.LOGICALTABLENAME + "." + fromNode.data.LOGICALCOLUMNNAME + " = " + diagram.findNodeForKey(toNodeGroup).data.LOGICALTABLENAME + "." + toNode.data.LOGICALCOLUMNNAME));
                }

                if (storedLink.fromNode.containingGroup.location.x > storedLink.toNode.containingGroup.location.x) {
                    diagram.model.setDataProperty(linkData, "angle", 180);
                } else {
                    diagram.model.setDataProperty(linkData, "angle", 0);
                }

                diagram.commitTransaction("set link");
                updateLink = false;
            }

        });


        if (Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, link.fromNode.containingGroup.data) == -1) {
            currentStep.data.inputTablesByOrder.push(link.fromNode.containingGroup.data);
        }
        if (Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, link.toNode.containingGroup.data) == -1) {
            currentStep.data.inputTablesByOrder.push(link.toNode.containingGroup.data);
        }

        if (typeof currentStep.data.relationExpression[link.fromNode.containingGroup.data.LOGICALTABLENAME + link.toNode.containingGroup.data.LOGICALTABLENAME] === "undefined") {
            currentStep.data.relationExpression[link.fromNode.containingGroup.data.LOGICALTABLENAME + link.toNode.containingGroup.data.LOGICALTABLENAME] = [];
        }
        currentStep.data.relationExpression[link.fromNode.containingGroup.data.LOGICALTABLENAME + link.toNode.containingGroup.data.LOGICALTABLENAME].push(link.data);

    });
    myDiagramModalInputTable.addDiagramListener("SelectionDeleting", function (e) {

        var link = e.subject;
        e.subject.each(function (link) {

            if (!(link instanceof go.Link)) {
                return;
            }

            if (link.fromNode.containingGroup.findExternalLinksConnected().count === 1) {
                currentStep.data.inputTablesByOrder.splice(Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, link.fromNode.containingGroup.data), 1);
            }
            if (link.toNode.containingGroup.findExternalLinksConnected().count === 1) {
                currentStep.data.inputTablesByOrder.splice(Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, link.toNode.containingGroup.data), 1);
            }
            var keyMapping = link.fromNode.containingGroup.data.LOGICALTABLENAME + link.toNode.containingGroup.data.LOGICALTABLENAME;
            if (typeof currentStep.data.relationExpression[keyMapping] !== "undefined") {
                currentStep.data.relationExpression[keyMapping].splice(currentStep.data.relationExpression[keyMapping].indexOf(link.data), 1);
            }


        });
    });

    myDiagramModalInputTable.addDiagramListener("SelectionMoved", function (e) {

        e.subject.each(function (node) {
            if (node instanceof go.Group && node.findExternalLinksConnected().count != 0) {
                node.findExternalLinksConnected().each(function (link) {
                    e.diagram.startTransaction("setAngle");
                    if (link.fromNode.containingGroup.location.x > link.toNode.containingGroup.location.x) {
                        e.diagram.model.setDataProperty(link.data, "angle", 180);
                    } else {
                        e.diagram.model.setDataProperty(link.data, "angle", 0);
                    }
                    e.diagram.commitTransaction("setAngle");
                });
            }
        });
    });



    $("#collapseThree").on('show.bs.collapse', function () {
        myDiagramModalOutputTable.requestUpdate();
    });
    $("#canvasLeftPanel #jobComponentsButton").click(function () {
        $(".pageColumns").removeClass("hideLeft").addClass("showLeft");
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#canvasLeftPanel .innerContent .heading .closeMe").click(function () {
        $(".pageColumns").removeClass("showLeft").addClass("hideLeft")
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#canvasRightPanel #propertiesButton").click(function () {
        $(".pageColumns").removeClass("hideRight").addClass("showRight"),
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#canvasRightPanel .innerContent .heading .closeMe").click(function () {
        $(".pageColumns").removeClass("showRight").addClass("hideRight"),
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });

    $("#canvasRightPanel .innerContent").click(function () {
        $("#canvasRightPanel .readOnlyMode").hide(),
        $("#canvasRightPanel .editMode").show(),
        $(".pageColumns").addClass("editingRight"),
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });

    $("#canvasBottomPanel .panel-heading .minimize").click(function () { $(".pageColumns").addClass("minimizeBottom") })
    $("#canvasBottomPanel .panel-heading .maximize").click(function () { $(".pageColumns").removeClass("minimizeBottom").addClass("showBottom") })
    $("#canvasBottomPanel .panel-heading .closeMe").click(function () { $(".pageColumns").removeClass("showBottom").addClass("hideBottom") })
    $("#content").click(function () {
        $("#canvasRightPanel .editMode").hide(),
        $("#canvasRightPanel .readOnlyMode").show(),
        $(".pageColumns").removeClass("editingRight"),
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#canvasLeftPanel .leftContentTabs .nav-tabs").scrollingTabs()
    $('#file-modal').on('shown.bs.modal', function () {
        $('#file-input-tab').tab('show');
        $('#process-filemodal-input').removeClass('active').addClass('active');
        $('#process-filemodal-output').removeClass('active');
        $('#process-filemodal-mapping').removeClass('active');
    });
    $('#stepModal').on('hidden.bs.modal', function () {
        $('.panel-collapse.in').collapse('hide');
    });
    $('#file-modal').on('hide.bs.modal', function () {
        $('#file-input-tab').tab('show');
        $('#process-filemodal-input').removeClass('active').addClass('active');
        $('#process-filemodal-output').removeClass('active');
        $('#process-filemodal-mapping').removeClass('active');
        $("#file-modal .modal-body .panel-default .panel-body").scrollTop(0);
    });

    $('#table-modal').on('hide.bs.modal', function () {
        $('#table-prop-tab').tab('show');
        $('#process-tablemodal-general').removeClass('active').addClass('active');
        $('#process-tablemodal-columns').removeClass('active');
    });

    $('#show-script-modal').on('hide.bs.modal', function () {
        $("#yml-textarea").scrollTop(0);
    });

    $('#file-modal').on('hidden.bs.modal', function () {
        go.Diagram.prototype.doFocus.call(Ciel.Process.ProcessDesign.CreateJob.globalCanvas);
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });

    $('.nav-tabs a[href="#process-filemodal-mapping"]').on('show.bs.tab', function (event) {
        //load file columns' heading
        $('#process-filemodal-mapping .mapping-loader').show();
        $('#outputMapping').hide();
        Ciel.Process.ProcessDesign.CreateJob.loadFileColumns();
    });

    ko.revertibleObservable = function (initialValue) {
        var result = ko.observable(initialValue);
        result.forEditing = ko.observable(initialValue);
        result.commit = function () {
            var editValue = result.forEditing();
            if (editValue !== result()) {
                result(editValue);
            }
        };
        result.newValue = function () {
            return result.forEditing();
        }
        result.reset = function () {
            result.forEditing(result());
        };
        return result;
    };

    $("#save_mappings").on('click', function () {
        var isPurgeData = Ciel.Process.ProcessDesign.CreateJob.stepData.isPurgeData();
        var purgeByColumn = Ciel.Process.ProcessDesign.CreateJob.stepData.purgeByColumn();
        var purgeOperator = Ciel.Process.ProcessDesign.CreateJob.stepData.purgeOperator();
        var purgeValue = Ciel.Process.ProcessDesign.CreateJob.stepData.purgeValue();
        var colType = Ciel.Process.ProcessDesign.CreateJob.stepData.colType;
        var colSize = Ciel.Process.ProcessDesign.CreateJob.stepData.colSize;

        if (purgeValue != undefined) {

            purgeValue = purgeValue.trim();
            if (!Ciel.Process.ProcessDesign.CreateJob.IsValidPurgeValue(purgeValue, colType, colSize)) return;
        }

        currentStep.data.modalOutputTablesMapping = JSON.parse(myDiagramModalOutputTable.model.toJSON());
        currentStep.data.modalInputTablesMapping = JSON.parse(myDiagramModalInputTable.model.toJSON());
        var modalOutputTable = {};
        var currentStepOutputTable;
        currentStep.findNodesOutOf().each(function (n) {
            if (n.data.category == "Table") {
                currentStepOutputTable = n.data;
            }
        });
        var isFirstTable = true;
        myDiagramModalInputTable.links.each(function (n) {
            if (isFirstTable) {
                currentStep.data.fromTable = n.fromNode.containingGroup.data.LOGICALTABLENAME;
                isFirstTable = false;
            }
        });

        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (node.data.LOGICALTABLENAME != "Selected Column")) {
                modalOutputTable = node.data;
            }
        });

        var isValidMappings = true;
        myDiagramModalInputTable.links.each(function (link) {
            if (link.data.color === "#FF0000") {
                isValidMappings = false;
            }
        });

        myDiagramModalOutputTable.links.each(function (link) {
            if (link.data.color === "#FF0000") {
                isValidMappings = false;
            }
        });
        var tables=[];
        myDiagramModalInputTable.nodes.each(function (node) {
            if (node.data.category === "Table") {
                tables.push(node);
            }
        });

        currentStep.data.inputTablesByOrder = [];
        var traversal = new Array(tables.length);
        for (var i = 0; i < tables.length; i++) {
            traversal[i] = [];
            traversal[i].push(tables[i].data);    //1 index 0

            var connectedTables = [];
            var DFS = function (parent) {
                if (parent.findExternalNodesConnected().count !== 0) {
                    parent.findExternalNodesConnected().each(function (child) {
                        if ((Ciel.Process.ProcessDesign.CreateJob.isHasNode(connectedTables, child.containingGroup.data) == -1)) {
                            connectedTables.push(child.containingGroup.data);
                            DFS(child.containingGroup);
                        }
                    });
                }
            }
            if ((Ciel.Process.ProcessDesign.CreateJob.isHasNode(connectedTables, tables[i].data) == -1)) {
                connectedTables.push(tables[i].data);
                DFS(tables[i]);
            }

            traversal[i].push([]);      //2 traversal index [i, 1]
            traversal[i].push("not visited");       //3   traversal[i][2]
            traversal[i][1] = connectedTables;//2
            for (j = 0; j < traversal[i][1].length; j++) {
                if ((Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, traversal[i][1][j]) == -1)) {
                    currentStep.data.inputTablesByOrder.push(traversal[i][1][j]);
                }
            }

        }

        /*
        myDiagramModalInputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (Ciel.Process.ProcessDesign.CreateJob.isHasNode(currentStep.data.inputTablesByOrder, node.data) == -1)) {
                currentStep.data.inputTablesByOrder.push(node.data);
            }
        }); */

        currentStep.data.fromQuery = "From " + currentStep.data.inputTablesByOrder[0].LOGICALTABLENAME;
        currentStep.data.whereClause = [];  // make a set of strings

        for (i = 1; i < currentStep.data.inputTablesByOrder.length; i++) {
            var j = i;

            var expressions = "";
            var hasLink = false;
            var relationType;
            var joinIs;

            while (--j > -1) {
                var links = currentStep.data.relationExpression[currentStep.data.inputTablesByOrder[j].LOGICALTABLENAME + currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME];

                if (typeof links === "undefined" || (typeof links !== "undefined" && links.length === 0)) {
                    links = currentStep.data.relationExpression[currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + currentStep.data.inputTablesByOrder[j].LOGICALTABLENAME];
                }

                if (typeof links !== "undefined" && links.length !== 0) {
                    for (k = 0; k < links.length; k++) {

                        relationType = links[k].toolTipText;
                        var partIndex = relationType.indexOf(":");
                        var expression = relationType.substr((partIndex + 2), relationType.length);
                        
                        if (currentStep.data.inputTablesByOrder[j].key === myDiagramModalInputTable.model.findNodeDataForKey(links[k].from).group) {
                            joinIs = Ciel.Process.ProcessDesign.CreateJob.getRelationType(links[k]);
                        } else {
                            joinIs = Ciel.Process.ProcessDesign.CreateJob.getRelationType({
                                checked1: links[k].checked3,
                                checked2: links[k].checked2,
                                checked3: links[k].checked1
                            });
                        }

    
                        if (k == 0) {
                            expressions += expression;
                        }
                        else {
                            expressions += " AND " + expression;
                        }

                        if (joinIs.toLowerCase() == "leftouter" && currentStep.data.whereClause.indexOf(currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].to).data.LOGICALCOLUMNNAME) == -1) {
                            currentStep.data.whereClause.push(currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].to).data.LOGICALCOLUMNNAME);
                            joinIs="LEFT JOIN";
                        }
                        else {
                            if (joinIs.toLowerCase() == "rightouter" && currentStep.data.whereClause.indexOf(currentStep.data.inputTablesByOrder[i - 1].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].from).data.LOGICALCOLUMNNAME) == -1) {
                                currentStep.data.whereClause.push(currentStep.data.inputTablesByOrder[i - 1].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].from).data.LOGICALCOLUMNNAME);
                                joinIs="RIGHT JOIN";
                            }
                            else {
                                if (joinIs.toLowerCase() == "fullouter" && currentStep.data.whereClause.indexOf(currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].to).data.LOGICALCOLUMNNAME) == -1
                                    && currentStep.data.whereClause.indexOf(currentStep.data.inputTablesByOrder[i - 1].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].from).data.LOGICALCOLUMNNAME) == -1) {
                                    currentStep.data.whereClause.push(currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].to).data.LOGICALCOLUMNNAME);
                                    currentStep.data.whereClause.push(currentStep.data.inputTablesByOrder[i - 1].LOGICALTABLENAME + "." + myDiagramModalInputTable.findNodeForKey(links[k].from).data.LOGICALCOLUMNNAME);
                                    joinIs="FULL JOIN";
                                }
                            }
                        }
                    }
                    hasLink = true;
                }
            }

            if (hasLink) {
                currentStep.data.fromQuery += "\n " + joinIs + " " + currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + " On ";
            }
            else {
                currentStep.data.fromQuery += "\n CROSS JOIN " + currentStep.data.inputTablesByOrder[i].LOGICALTABLENAME + " ";
            }

            currentStep.data.fromQuery += expressions;
        }

        var whereClause = currentStep.data.whereClause;
        currentStep.data.fromQuery += "\n WHERE ";

        for (i = 0; i < whereClause.length; i++) {
            currentStep.data.fromQuery += whereClause[i] + " IS NULL";
            if (i != (whereClause.length - 1)) {
                currentStep.data.fromQuery += " AND ";
            }
        }

        if (!isValidMappings) {
            alert("There are invalid mappings present in Joins or Column mappings.");
            canvas.startTransaction("setColor");
            canvas.model.setDataProperty(currentStep.data, "color", "#FF0000");
            canvas.model.setDataProperty(currentStep.data, "toolTipText", "Please check configuration for this step.");
            canvas.commitTransaction("setColor");
        } else {
            if (currentStep.data.color === "#FF0000") {
                canvas.startTransaction("setColor");
                canvas.model.setDataProperty(currentStep.data, "color", "#00A9C9");
                canvas.model.setDataProperty(currentStep.data, "toolTipText", "Join");
                canvas.commitTransaction("setColor");
            }
        }

        // adding mappings in order of tables
        currentStep.data.mappings = [];         // 3# mappings
        var linksHash = {};
        myDiagramModalInputTable.links.each(function (link) {

            var relationType = link.data.toolTipText;
            var partIndex = relationType.indexOf(":");
            var res = relationType.substr(0, partIndex);
            var expression = relationType.substr((partIndex + 2), relationType.length);
            currentStep.data.mappings.push({
                joinType: res,
                fromTable: link.fromNode.containingGroup.data.LOGICALTABLENAME,
                toTable: link.toNode.containingGroup.data.LOGICALTABLENAME,
                joinExpression: expression
            });

        });

        var modalInputTables = myDiagramModalInputTable.model.nodeDataArray;
        var inputTables = [];
        for (i = 0; i < modalInputTables.length; i++) {

            if (modalInputTables[i].category == "Table") {
                inputTables.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(JSON.parse(JSON.stringify(modalInputTables[i]))));
            }
        }
        currentStep.data["inputTables"] = inputTables;          //1# inputTable to currentStep

        var outputTable = Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(JSON.parse(JSON.stringify(modalOutputTable)));
        var Fields = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Column", group: outputTable.key });
        outputTable.Fields = [];
        for (i = 0; i < Fields.length; i++) {
            
            outputTable.Fields.push({
                COLUMNNAME: Fields[i].LOGICALCOLUMNNAME.substr(Fields[i].LOGICALCOLUMNNAME.indexOf(".") + 1, Fields[i].LOGICALCOLUMNNAME.length),
                COLUMNSIZE: Fields[i].columnsize,
                COLUMNTYPE: Fields[i].columntype,
                FunctionID: Fields[i].functionid,
                TableName: outputTable.LOGICALTABLENAME,
                TimeTableName: Fields[i].timetablename,
                LOGICALCOLUMNNAME: Fields[i].LOGICALCOLUMNNAME
            });
        }
        outputTable.isGroup = false;
        outputTable.from = currentStep.data.key;
        currentStep.data["outputTable"] = outputTable;            // 2# outputTable from currentStep

        currentStep.data.ColumnMappings = [];                    // 4# column mappings
        var modalOutputMappings = myDiagramModalOutputTable.model.linkDataArray;

        for (i = 0; i < modalOutputMappings.length; i++) {

            currentStep.data.ColumnMappings.push({
                sourceColumnName: myDiagramModalOutputTable.findNodeForKey(modalOutputMappings[i].from).data.LOGICALCOLUMNNAME,
                targetColumnName: myDiagramModalOutputTable.findNodeForKey(myDiagramModalOutputTable.findNodeForKey(modalOutputMappings[i].to).data.group).data.LOGICALTABLENAME + "." +
                                       myDiagramModalOutputTable.findNodeForKey(modalOutputMappings[i].to).data.LOGICALCOLUMNNAME
            });
        }

        canvas.startTransaction("save table");
        var model = canvas.model;
        if (((typeof currentStepOutputTable) !== "undefined")) {
            var linkToRemove;
            canvas.links.each(function (link) {           //getting links to remove
                if (link.data.from == currentStep.data.key &&
                    link.data.to == currentStepOutputTable.key) {
                    linkToRemove = link.data;
                }
            });
            model.removeLinkData(linkToRemove);
            outputTable.key = currentStepOutputTable.key;
            outputTable.loc = currentStepOutputTable.loc;
            model.removeNodeData(currentStepOutputTable);
        }
        else {
            // outputTable.loc =cure
        }
        model.addNodeData(outputTable);
        if (typeof outputTable.LOGICALTABLENAME !== "undefined" &&  outputTable.TABLETYPE !== "Existing") {
            
            var newTable;
           // if (outputTable.IsTemporary) {
                newTable = Ciel.Process.ProcessDesign.CreateJob.tempTablesHandle.indexOf(outputTable);
                var table = Ciel.Process.ProcessDesign.CreateJob.tempTablesHandle.getTempTablesList()[newTable];
                table.Fields = outputTable.Fields;
           /* }
            else {
                newTable = Ciel.Process.ProcessDesign.CreateJob.newTablesHandle.indexOf(outputTable);
                var table = Ciel.Process.ProcessDesign.CreateJob.newTablesHandle.getNewTablesList()[newTable];
                table.Fields = outputTable.Fields;
            } */
            
            //canvas.commitTransaction("save table");

            
        }
        canvas.commitTransaction("save table");

        canvas.startTransaction("add link");
        model.addLinkData({
            from: currentStep.data.key,
            to: outputTable.key
        });
        canvas.commitTransaction("add link");


        canvas.startTransaction("purge");
        canvas.model.setDataProperty(currentStep.data, "IsPurgeData", isPurgeData);
        canvas.model.setDataProperty(currentStep.data, "PurgeByColumn", purgeByColumn);
        canvas.model.setDataProperty(currentStep.data, "PurgeOperator", purgeOperator);
        canvas.model.setDataProperty(currentStep.data, "PurgeValue", purgeValue);
        canvas.commitTransaction("purge");

        $('#stepModal').modal('hide');
    });

    Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();

    $(window).resize(function () {
        Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();
    });


    $('#dataviewer').scroll(function () {
        var div = $(this);
        if (div[0].scrollHeight - div.scrollTop() - 46 <= div.height()) {
            recordPageNumber = recordPageNumber + 1;
            Ciel.Process.ProcessDesign.CreateJob.ShowTableData(recordTableName, recordPageNumber, false);
        }

    });
});
function execute() {
    $(".pageColumns").removeClass("hideBottom minimizeBottom").addClass("showBottom");
}
(function (ns) {
    ns.stepData;
    var filesPalette;
    var stepsPalette;
    var tablesPalette;
    var currentGroup;
    var executeDragOver = false;
    var lightText = 'whitesmoke';
    var goJs = go.GraphObject.make;  // for conciseness in defining templates   
    var objPropertiesPanelVM;
    var objshowDataViewModel;
    var modelData;
    var quickSave = false;
    var clearCanvas = false;

    var FileAttributeEnum = {
        ROW_SEPARATOR: "1",
        COL_SEPARATOR: "2",
        QUOTATION: "3",
        HEAD_ROWS: "4",
        TRAILING_ROWS: "5",
        COL_HEADING_IN_FIRST_ROW: "6"
    }

    var TableTypeEnum = {
        New: "New",
        Existing: "Existing"
    }

    ns.AppLanguageData = []; //holds language data for app

    self.ColumnDataTypes = [
      { Name: 'String - Fixed Length (Without Unicode)', Size: '1', IsEditable: true, reg: '^(0*2000|0*[1-9]|0*[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 2000!" },
      { Name: 'String - Fixed Length (With Unicode)', Size: '1', IsEditable: true, reg: '^(0*2000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 2000!" },
      { Name: 'String - Dynamic length (Without Unicode)', Size: '4000', IsEditable: true, reg: '^(0*4000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1-3][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 4000!" },
      { Name: 'String - Dynamic length (With Unicode)', Size: '4000', IsEditable: true, reg: '^(0*4000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1-3][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 4000!" },
      { Name: 'number', Size: '18,0', IsEditable: true, reg: '^([1-9]|[1-2][0-9]|[3][0-8])(,)([0-9]|[0-2][0-9]|[3][0-8])$', errMessage: "Size should be in format p,s with p in range 1 - 38 and s in range 0 - 38!" },
      { Name: 'date', Size: "", IsEditable: false, reg: '^$' },
      { Name: 'time', Size: "", IsEditable: false, reg: '^$' },
      { Name: 'CLOB', Size: "", IsEditable: false, reg: '^$' },
      { Name: 'BLOB', Size: "", IsEditable: false, reg: '^$' }
    ];

    ns.ColumnDataTypes2 = {
        1: { Name: 'String - Fixed Length (Without Unicode)', Size: '1', IsEditable: true, reg: '^(0*2000|0*[1-9]|0*[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 2000!" },
        2: { Name: 'String - Fixed Length (With Unicode)', Size: '1', IsEditable: true, reg: '^(0*2000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 2000!" },
        3: { Name: 'String - Dynamic length (Without Unicode)', Size: '4000', IsEditable: true, reg: '^(0*4000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1-3][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 4000!" },
        4: { Name: 'String - Dynamic length (With Unicode)', Size: '4000', IsEditable: true, reg: '^(0*4000|0*[1-9]|[1-9][0-9]|0*[1-9][0-9][0-9]|0*[1-3][0-9][0-9][0-9])$', errMessage: "Size should be in range 1 - 4000!" },
        5: { Name: 'number', Size: '18,0', IsEditable: true, reg: '^([1-9]|[1-2][0-9]|[3][0-8])(,)([0-9]|[0-2][0-9]|[3][0-8])$', errMessage: "Size should be in format p,s with p in range 1 - 38 and s in range 0 - 38!" },
        6: { Name: 'date', Size: "", IsEditable: false, reg: '^$' },
        7: { Name: 'time', Size: "", IsEditable: false, reg: '^$' },
        8: { Name: 'CLOB', Size: "", IsEditable: false, reg: '^$' },
        9: { Name: 'BLOB', Size: "", IsEditable: false, reg: '^$' }
    };

    var getWindowHeight = function () {
        var wHeight = 0;
        if (typeof (window.innerHeight) == 'number') {
            wHeight = window.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            wHeight = document.documentElement.clientHeight;
        } else if (document.body && document.body.clientHeight) {
            wHeight = document.body.clientHeight;
        }
        return wHeight;
    }

    ns.setPaletteHeight = function () {
        var windowHeight = getWindowHeight();
        $('#filesPaletteDiv').css("height", (windowHeight - 250));
        $('#stepsPaletteDiv').css("height", (windowHeight - 250));
        $('#tablesPaletteDiv').css("height", (windowHeight - 250));
        $('#canvasDiv').css("height", (windowHeight - 150));
    }

    ns.loadFileColumns = function () {
        $('#colheader-errorresult').hide();

        if (modelData.selectedOutputTableID() == null) {
            $('#process-filemodal-mapping .mapping-loader').hide();
            $('#outputMapping').show();
            return;
        }
        var nodeData = modelData.node.data;
        var fileInfo = {};
        switch (nodeData.FILETYPE.toUpperCase()) {
            case "CSV":
            case "TXT":
                fileInfo.FileType = nodeData.FILETYPE;
                fileInfo.FilePath = nodeData.FILEPATH;
                $.each(modelData.File().FileAttributes(), function (index, attr) {
                    switch (attr.FILEATTRIBUTEID()) {
                        case FileAttributeEnum.COL_SEPARATOR:
                            fileInfo.ColumnSeparator = attr.FILEATTRIBUTEVALUE();
                            break;
                        case FileAttributeEnum.ROW_SEPARATOR:
                            fileInfo.RowSeparator = attr.FILEATTRIBUTEVALUE();
                            break;
                        case FileAttributeEnum.HEAD_ROWS:
                            fileInfo.HeaderRows = attr.FILEATTRIBUTEVALUE();
                            break;
                        case FileAttributeEnum.QUOTATION:
                            fileInfo.QuotationsMark = attr.FILEATTRIBUTEVALUE();
                            break;
                    }
                });
                break;

            case "XLSX":
            case "XLS":
                fileInfo = {
                    'FileType': nodeData.FILETYPE,
                    'FilePath': nodeData.FILEPATH
                }
                break;
        }

        Ciel.Process.Api.GetFileColumns(fileInfo, function (result, status, xhr) {
            switch (xhr.status) {
                case CONST_HTTPSTATUS_OK:
                    var columnsList = xhr.responseJSON.columnsList;
                    var isColumnHeadingPresent;
                    $.each(modelData.File().FileAttributes(), function (index, attr) {
                        if (attr.FILEATTRIBUTEID() === FileAttributeEnum.COL_HEADING_IN_FIRST_ROW) {
                            isColumnHeadingPresent = (attr.FILEATTRIBUTEVALUE() === "1" || attr.FILEATTRIBUTEVALUE() === true);
                            return false;
                        }
                    });
                    if (isColumnHeadingPresent === true) {
                        modelData.fileColumns(columnsList);
                    }
                    else {
                        var tempCols = [];
                        for (var i = 0; i < columnsList.length; i++) {
                            var obj = columnsList[i];
                            var cm = NewFileColumnModel();
                            cm.id = obj.id;
                            cm.columnName = 'Column ' + (i + 1);
                            cm.seqNo = obj.seqNo;
                            tempCols.push(cm);
                        }
                        modelData.fileColumns(tempCols);
                    }
                    break;

                case CONST_HTTPSTATUS_UNFINISH:
                    modelData.fileColumns([]);
                    $('#colheader-errorresult').show();
                    break;
            }

            $('#process-filemodal-mapping .mapping-loader').hide();
            $('#outputMapping').show();
        });
    }

    var laneResizingTool = function () {
        go.ResizingTool.call(this);
    }

    go.Diagram.inherit(laneResizingTool, go.ResizingTool);

    laneResizingTool.prototype.resize = function (newr) {
        currentGroup = this.adornedObject.part;
        go.ResizingTool.prototype.resize.call(this, newr);
        relayoutDiagram();  // now that the lane has changed size, layout the pool again
    };

    var relayoutDiagram = function () {
        canvas.layout.invalidateLayout();
        canvas.layoutDiagram();
    }

    var groupLayout = function () {
        go.GridLayout.call(this);
    }

    go.Diagram.inherit(groupLayout, go.Layout);

    groupLayout.prototype.doLayout = function (coll) {
        var diagram = this.diagram;
        diagram.startTransaction("GroupLayout");
        var lane = this.group;
        if (currentGroup != null)
        { lane = currentGroup; }
        if (lane !== null) {
            // make sure all of the Group Shapes are big enough
            if (!(lane instanceof go.Group)) return;

            var shape = lane.resizeObject;
            if (shape !== null) {  // change the desiredSize to be big enough in both directions
                var sz = computeLaneSize(lane);
                shape.width = (!isNaN(shape.width)) ? Math.max(shape.width, sz.width) : sz.width;
                shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
            }
        }
        go.Layout.prototype.doLayout.call(this, coll);
        diagram.commitTransaction("GroupLayout");
    };

    var shapeStyle = function () {
        return [
          {
              portId: "",
              cursor: "pointer",
          }
        ];
    }

    var makePort = function (name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        var shape;

        if (name == "T") {


            return goJs(go.Panel, { row: 0, column: 1 },
                    goJs(go.Panel, "Vertical",
                          goJs(go.Shape, "TriangleUp",
                                 {
                                     stroke: null, strokeWidth: 1,
                                     desiredSize: new go.Size(20, 10),
                                     fill: "transparent",
                                     portId: name,
                                     fromLinkable: output, toLinkable: input, cursor: "pointer",
                                     fromSpot: spot, toSpot: spot,
                                 }

                             ),
                           goJs(go.Shape, "Rectangle",
                                 {

                                     stroke: null, strokeWidth: 0,
                                     desiredSize: new go.Size(20, 10),
                                     margin: new go.Margin(0, 0, 0, 0),
                                     fill: "transparent",
                                     alignment: go.Spot.Top, alignmentFocus: go.Spot.Top,
                                     alignmentFocus: go.Spot.Top.opposite(),// align the port on the main Shape
                                     fromSpot: spot, toSpot: spot,
                                     fromLinkable: output, toLinkable: input, cursor: "pointer"
                                 }

                             )

                    )  // end itemTemplate
                 )


        } else if (name == "R") {

            return goJs(go.Panel, { row: 1, column: 2 },
                   goJs(go.Panel, "Horizontal",
                           goJs(go.Shape, "Rectangle",
                                {

                                    stroke: null, strokeWidth: 0,
                                    desiredSize: new go.Size(10, 20),
                                    fill: "transparent",
                                    portId: name,
                                    fromSpot: spot, toSpot: spot,
                                    fromLinkable: output, toLinkable: input, cursor: "pointer",
                                    toMaxLinks: 1,
                                    fromMaxLinks: 1
                                }

                            ),
                         goJs(go.Shape, "TriangleRight",
                                {
                                    stroke: null, strokeWidth: 1,
                                    desiredSize: new go.Size(10, 20),
                                    margin: new go.Margin(0, 0, 0, 0),
                                    fill: "transparent",
                                    alignment: go.Spot.Top, alignmentFocus: go.Spot.Top,
                                    alignmentFocus: go.Spot.Top.opposite(),// align the port on the main Shape
                                    portId: name,
                                    fromSpot: spot, toSpot: spot,
                                    fromLinkable: output, toLinkable: input, cursor: "pointer",
                                    toMaxLinks: 1,
                                    fromMaxLinks: 1
                                }

                            )
                   )  // end itemTemplate
                )

        } else if (name == "L") {

            return goJs(go.Panel, { row: 1, column: 0 },
            goJs(go.Panel, "Horizontal",
                   goJs(go.Shape, "TriangleLeft",
                         {
                             stroke: null, strokeWidth: 1,
                             desiredSize: new go.Size(10, 20),
                             fill: "transparent",
                             portId: name,
                             fromSpot: spot, toSpot: spot,
                             fromLinkable: output, toLinkable: input, cursor: "pointer",
                             toMaxLinks: 1,
                             fromMaxLinks: 1
                         }
                     ),
                       goJs(go.Shape, "Rectangle",
                         {
                             stroke: null, strokeWidth: 0,
                             desiredSize: new go.Size(10, 20),
                             margin: new go.Margin(0, 0, 0, 0),
                             fill: "transparent",
                             alignment: go.Spot.Top, alignmentFocus: go.Spot.Top,
                             alignmentFocus: go.Spot.Top.opposite(),// align the port on the main Shape
                             fromSpot: spot, toSpot: spot,
                             fromLinkable: output, toLinkable: input, cursor: "pointer",
                             toMaxLinks: 1,
                             fromMaxLinks: 1
                         }
                     )
            )  // end itemTemplate
         )

        } else {
            return goJs(go.Panel, { row: 2, column: 1 },
                   goJs(go.Panel, "Vertical",
                           goJs(go.Shape, "Rectangle",
                                {

                                    stroke: null, strokeWidth: 0,
                                    desiredSize: new go.Size(20, 10),

                                    fill: "transparent",
                                    fromSpot: spot, toSpot: spot,
                                    fromLinkable: output, toLinkable: input, cursor: "pointer"
                                }
                            ),
                          goJs(go.Shape, "TriangleDown",
                                {
                                    stroke: null, strokeWidth: 1,
                                    desiredSize: new go.Size(20, 10),
                                    margin: new go.Margin(0, 0, 0, 0),
                                    fill: "transparent",
                                    alignment: go.Spot.Top, alignmentFocus: go.Spot.Top,
                                    alignmentFocus: go.Spot.Top.opposite(),// align the port on the main Shape
                                    portId: name,
                                    fromSpot: spot, toSpot: spot,
                                    fromLinkable: output, toLinkable: input, cursor: "pointer"
                                }
                            )
                   )  // end itemTemplate
                )
        }

    }

    var finishDrop = function (e, grp) {
        var ok = (grp !== null
                  ? grp.addMembers(grp.diagram.selection, true)
                  : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok) e.diagram.currentTool.doCancel();
    }

    var showPorts = function (node, show) {

        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        node.ports.each(function (port) {
            if (port.portId != "") {

                port.stroke = (show ? "Gray" : null);
            }
        });
    }

    var fileNodeDoubleClicked = function (e, obj) {
        if (isCanvasReadOnly === false) {
            modelData.updateModel(obj, tablesPalette);
            //ko.applyBindings(fileNodeModel);
            $("#file-modal").modal('show');
        }
    }

    var fileNodeClicked = function (e, obj) {
        if (isCanvasReadOnly) {
            if ((obj.part.data.category.toLowerCase() === "table" && !obj.part.data.IsTemporary) || (obj.part.data.category.toLowerCase() === "filewithtable" && !obj.part.data.IsOutputTableTemporary)) {
                var tableName;
                if (obj.part.data.category.toLowerCase() === "filewithtable") {
                    tableName = obj.part.data.OutputTableName;
                }
                else {
                    tableName = obj.part.data.LOGICALTABLENAME
                }
                recordTableName = tableName;

                $("#gridContainer").dxDataGrid('instance').option('showColumnHeaders', true);
                Ciel.Process.ProcessDesign.CreateJob.ShowTableData(tableName, 0, true);
                $(".pageColumns").removeClass("hideBottom minimizeBottom").addClass("showBottom")
            }
            else if ((obj.part.data.category.toLowerCase() === "table" && obj.part.data.IsTemporary) || (obj.part.data.category.toLowerCase() === "filewithtable" && obj.part.data.IsOutputTableTemporary)) {
                objshowDataViewModel.UpdateData([], true);
                $("#gridContainer").dxDataGrid('instance').option('showColumnHeaders', false);
                $('.panel-body').find('.mapper-loader').hide();
                $(".pageColumns").removeClass("hideBottom minimizeBottom").addClass("showBottom");
            }
        }
        else {
            $(".pageColumns").removeClass("hideRight").addClass("showRight"),
             Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
        }

        //obj.part.data.fileToTableObj = fileToTableObj;
    }

    //var columnMapping = function (sourceColumnName, targetColumnName, targetColumnType, targetColumnSize, func, isColumnSizeEditable) {
    //    var self = this;
    //    self.sourceColumnName = ko.observable(sourceColumnName);
    //    self.targetColumnName = ko.observable(targetColumnName);
    //    self.targetColumnType = ko.observable(targetColumnType);
    //    self.targetColumnSize = ko.observable(targetColumnSize);
    //    self.isColumnSizeEditable = ko.observable(isColumnSizeEditable);
    //    self.LANGCD = ko.observable();
    //    self.LANGNM = ko.observable();
    //    self.MultiLangs = ko.observableArray([]);

    //    self.targetColumnName.subscribe(function (newValue) {
    //        var colsArr = func();
    //        if (colsArr != null) {

    //            var result = ko.utils.arrayFilter(colsArr, function (item) {
    //                return item.LOGICALCOLUMNNAME() == newValue;
    //            });

    //            if (result && result.length > 0) {
    //                self.targetColumnType(result[0].COLUMNTYPE());
    //                self.targetColumnSize(result[0].COLUMNSIZE());
    //            }
    //            else {
    //                self.targetColumnType(undefined);
    //            }
    //        }
    //    });

    //    self.dataTypeChange = function (newValue, event) {
    //        if (!(event.originalEvent == null)) {
    //            for (var dt in ns.ColumnDataTypes2) {
    //                if (ns.ColumnDataTypes2[dt].Name == newValue.targetColumnType()) {
    //                    self.targetColumnSize(ns.ColumnDataTypes2[dt].Size);
    //                    self.isColumnSizeEditable(ns.ColumnDataTypes2[dt].IsEditable);
    //                    break;
    //                }
    //            }
    //        }
    //    }
    //};

    //var fileColumn = function (id, name, seqNo) {
    //    var self = this;
    //    self.id = id;
    //    self.columnName = name;
    //    self.seqNo = seqNo
    //}

    //var fileAttribute = function (attributeName, attributeType, attributeValue, isReadOnly, attributeID) {
    //    var self = this;
    //    self.attributeName = attributeName;
    //    self.attributeType = attributeType;

    //    if (self.attributeType == "number") {
    //        self.attributeValue = ko.observable(attributeValue).extend({ numeric: 0 });
    //    }
    //    else if (self.attributeType == "boolean") {
    //        //If AttributeType is boolean then convert its value to boolean
    //        self.attributeValue = ko.observable(attributeValue === "1" || attributeValue === true);
    //    }
    //    else {
    //        self.attributeValue = ko.observable(attributeValue);
    //    }

    //    self.isReadOnly = isReadOnly;
    //    self.attributeID = attributeID;

    //    self.attributeValue.subscribe(function (newValue) {
    //        if (self.attributeID === FileAttributeEnum.COL_SEPARATOR || self.attributeID === FileAttributeEnum.ROW_SEPARATOR || self.attributeID === FileAttributeEnum.COL_HEADING_IN_FIRST_ROW || self.attributeID === FileAttributeEnum.HEAD_ROWS || self.attributeID === FileAttributeEnum.QUOTATION) {
    //            modelData.removeAllMapppings();
    //        }
    //    });
    //}

    var outputTableColumn = function (columnId, columnName, columnType, columnSize, isUsed) {
        var self = this;
        self.columnId = columnId;
        self.columnName = columnName;
        self.columnType = columnType;
        self.columnSize = columnSize;
        self.isUsed = isUsed;
    }

    var outputTable = function (tableName, columns, isDisabled, isTemporary, TempID) {
        var self = this;
        self.tableName = tableName;
        self.columns = ko.observableArray(columns);
        self.disable = ko.observable(isDisabled);
        self.isTemporary = isTemporary;
        self.TempID = TempID;
    }

    var init = function () {

        canvas =
          goJs(go.Diagram, "canvasDiv",
            {
                padding: 0,
                scrollMode: go.Diagram.InfiniteScroll,
                initialPosition: new go.Point(0, 0),
                initialDocumentSpot: go.Spot.Center,
                initialViewportSpot: go.Spot.Center,
                initialContentAlignment: go.Spot.Center,
                resizingTool: new laneResizingTool(),
                //layout: goJs(groupLayout),
                isReadOnly: isCanvasReadOnly,
                mouseDragOver: function (e) {
                    if (executeDragOver) {
                        executeDragOver = false;
                        var nodeCount = 0;
                        var it = myDiagram.toolManager.draggingTool.draggingParts.iterator;
                        while (it.next()) {
                            if (nodeCount > 0) {
                                var node = it.value;
                                node.containingGroup.collapseSubGraph();
                            }
                            nodeCount++;
                        }
                    }
                },
                externalObjectsDropped: function (e) {
                    canvas.commandHandler.expandSubGraph();
                    canvas.zoomToFit();
                    e.subject.each(function (node) {
                        node.opacity = 1;
                        if (node.data.category === "File") {
                            modelData.updateModel(node, tablesPalette);
                            $("#file-modal").modal('show');
                        }
                        else if (node.data.category === "Table" && node.data.TABLETYPE === TableTypeEnum.New) {
                            node.data.TempID = ns.tempTablesHandle.generateNewID();
                            ns.tempTablesHandle.addTableToList(JSON.parse(JSON.stringify(node.data)));
                        }
                    });
                },
                allowDrop: true,
                mouseDrop: function (e) { finishDrop(e, null); },
                "animationManager.duration": 600,
                "undoManager.isEnabled": true,
                "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue", category: "OfNodes" },
                "linkingTool.isUnconnectedLinkValid": false,
                "relinkingTool.isUnconnectedLinkValid": false,
                "linkingTool.linkValidation": function (from, fromport, to, toport, link) {
                    if (from.data.category === to.data.category) {
                        return false;
                    }

                    if (from.data.category === "FileWithTable" && to.data.category !== "Step") {
                        return false;
                    }

                    if (from.findLinksBetween(to, null, null).count == 1) {
                        return false;
                    }
                    if (from.data.category === "Step") {
                        if (from.findNodesOutOf().count === 1) {
                            return false;
                        }
                        else {
                            if (from.findNodesOutOf().count === 0 && to.data.category !== "Table") {
                                return false;
                            }
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            });

        canvas.addDiagramListener("LinkDrawn", function (e) {
            var link = e.subject;
            var diagram = e.diagram;
            var stepModalInputTables;
            var fromNode = diagram.findNodeForKey(link.data.from);
            var toNode = diagram.findNodeForKey(link.data.to);

            if (fromNode.data.category != "File") {
                diagram.startTransaction("addData");
                diagram.model.setDataProperty(fromNode.data, "to", toNode.data.key);
                diagram.commitTransaction("addData");
            }
            if (toNode.data.category != "Step" && toNode.data.category != "File") {
                diagram.model.setDataProperty(toNode.data, "from", fromNode.data.key);
            }
            if (toNode.data.category == "Step" && (typeof toNode.data.modalInputTablesMapping) !== "undefined") {
                stepModalInputTables = JSON.parse(JSON.stringify(toNode.data.modalInputTablesMapping));
                var lastkey = stepModalInputTables.nodeDataArray[stepModalInputTables.nodeDataArray.length - 1].key;
                var lastGroupKey = stepModalInputTables.nodeDataArray[stepModalInputTables.nodeDataArray.length - 1].group;
                var lastGroupLoc = "";
                for (i = 0; i < stepModalInputTables.nodeDataArray.length; i++) {
                    if (stepModalInputTables.nodeDataArray[i].category === "Table" && stepModalInputTables.nodeDataArray[i].key === lastGroupKey) {
                        lastGroupLoc = stepModalInputTables.nodeDataArray[i].loc;
                    }
                }
               
                var newTable;
                if (fromNode.data.category == "FileWithTable") {
                        fromNode.data.OutputTable.key = fromNode.data.key;
                        fromNode.data.OutputTable.from = fromNode.data.key;
                        fromNode.data.OutputTable.to = fromNode.data.to;
                        newTable = JSON.parse(JSON.stringify(fromNode.data.OutputTable));
                } else {
                    newTable = JSON.parse(JSON.stringify(fromNode.data));
                }

                newTable.key = parseInt(lastkey - 1);
                var loc = go.Point.parse(lastGroupLoc);
                loc.x += 500;
                //newTable.loc = go.Point.stringify(loc);
                nodeDataArray = Ciel.Process.ProcessDesign.CreateJob.getTablesInGroupFormat(newTable);
                nodeDataArray[0].loc = go.Point.stringify(loc);
                Array.prototype.push.apply(stepModalInputTables.nodeDataArray, nodeDataArray);
                diagram.startTransaction("addingTable");
                diagram.model.setDataProperty(toNode.data, "modalInputTablesMapping", stepModalInputTables);
                diagram.commitTransaction("addingTable");
            }


        });

        canvas.addDiagramListener("SelectionDeleting", function (e) {
            var diagram = e.diagram;
            e.subject.each(function (node) {
                if (node.type.Ob !== "Link") {
                    node.findNodesConnected().each(function (n) {
                        diagram.startTransaction("deleteTable");
                        if (n.data.category === "Step" && n.data.text === "Join") {
                            diagram.model.setDataProperty(n.data, "modalOutputTablesMapping", undefined);
                            diagram.model.setDataProperty(n.data, "modalInputTablesMapping", undefined);
                            diagram.model.setDataProperty(n.data, "IsPurgeData", undefined);
                            diagram.model.setDataProperty(n.data, "PurgeByColumn", undefined);
                            diagram.model.setDataProperty(n.data, "PurgeOperator", undefined);
                            diagram.model.setDataProperty(n.data, "PurgeValue", undefined);
                            diagram.model.setDataProperty(n.data, "color", "#FF0000");
                            diagram.model.setDataProperty(n.data, "toolTipText", "Please check configuration for this step.");
                        }

                        diagram.commitTransaction("deleteTable");
                    });
                } else {
                    if (node.toNode.data.category === "Step" && node.toNode.data.text === "Join") {
                        diagram.startTransaction("deleteTable");
                        diagram.model.setDataProperty(node.toNode.data, "modalOutputTablesMapping", undefined);
                        diagram.model.setDataProperty(node.toNode.data, "modalInputTablesMapping", undefined);
                        diagram.model.setDataProperty(node.toNode.data, "IsPurgeData", undefined);
                        diagram.model.setDataProperty(node.toNode.data, "PurgeByColumn", undefined);
                        diagram.model.setDataProperty(node.toNode.data, "PurgeOperator", undefined);
                        diagram.model.setDataProperty(node.toNode.data, "PurgeValue", undefined);
                        diagram.model.setDataProperty(node.data, "color", "#FF0000");
                        diagram.model.setDataProperty(node.data, "toolTipText", "Please check configuration for this step.");
                        diagram.commitTransaction("deleteTable");
                    }

                    if (node.fromNode.data.category === "Step" && node.fromNode.data.text === "Join") {
                        diagram.startTransaction("deleteTable");
                        diagram.model.setDataProperty(node.fromNode.data, "modalOutputTablesMapping", undefined);
                        diagram.model.setDataProperty(node.fromNode.data, "modalInputTablesMapping", undefined);
                        diagram.model.setDataProperty(node.fromNode.data, "IsPurgeData", undefined);
                        diagram.model.setDataProperty(node.fromNode.data, "PurgeByColumn", undefined);
                        diagram.model.setDataProperty(node.fromNode.data, "PurgeOperator", undefined);
                        diagram.model.setDataProperty(node.fromNode.data, "PurgeValue", undefined);
                        diagram.model.setDataProperty(node.data, "color", "#FF0000");
                        diagram.model.setDataProperty(node.data, "toolTipText", "Please check configuration for this step.");
                        diagram.commitTransaction("deleteTable");
                    }
                }
            });
        });

        canvas.addDiagramListener("SelectionDeleted", function (e) {
            var diagram = e.diagram;
            e.subject.each(function (node) {
                if ((node.data.category === "Table" || node.data.category === "FileWithTable") && !(node.data.TempID == null)) {
                    ns.tempTablesHandle.checkAndDeleteUnusedTable(node.data);
                }
            });
        });

        ns.globalCanvas = canvas;
        canvas.model.copiesArrays = true;
        canvas.model.copiesArrayObjects = true;
        canvas.model.modelData.jobAttributes = {};
        canvas.grid.visible = true;
        canvas.grid =
        goJs(go.Panel, go.Panel.Grid,
          { gridCellSize: new go.Size(20, 20) },
          goJs(go.Shape, "LineH", { stroke: "#efefef" }),
          goJs(go.Shape, "LineV", { stroke: "#efefef" }));


        //context menu change start

        var cxTool = myDiagramModalInputTable.toolManager.contextMenuTool;
        var cxElement = document.getElementById("contextMenu");

        cxElement.addEventListener("contextmenu", function (e) {
            this.focus();
            e.preventDefault();
            return false;
        }, false);

        cxElement.addEventListener("blur", function (e) {
            cxTool.stopTool();
            if (cxTool.canStart()) {
                e.diagram.currentTool = cxTool;
                cxTool.doMouseUp();
            }
        }, false);

        cxElement.tabIndex = "1";
        var contextMenuE = {};
        cxTool.showContextMenu = function (contextmenu, obj) {
            var diagram = this.diagram;
            contextMenuE.diagram = this.diagram;
            contextMenuE.obj = obj;
            if (diagram === null) return;
            if (contextmenu !== this.currentContextMenu) {
                this.hideContextMenu();
            }

            var cmd = diagram.commandHandler;
            var objExists = obj !== null;
            if (objExists && obj instanceof go.Link) {
                var leftTableName = obj.fromNode.containingGroup.data.LOGICALTABLENAME;
                if (leftTableName.length > 10) {
                    leftTableName = leftTableName.substring(0, 9) + "...";
                }
                $("#leftTable").text(leftTableName);
                $("#leftTable").attr('title', obj.fromNode.containingGroup.data.LOGICALTABLENAME);
                var rightTableName = obj.toNode.containingGroup.data.LOGICALTABLENAME;
                if (rightTableName.length > 10) {
                    rightTableName = rightTableName.substring(0, 9) + "...";
                }
                $("#rightTable").text(rightTableName);
                $("#rightTable").attr('title', obj.toNode.containingGroup.data.LOGICALTABLENAME);
                $("#checkbox1").prop('checked', ((typeof obj.data.checked1) === "undefined") ? false : obj.data.checked1);
                $("#checkbox2").prop('checked', ((typeof obj.data.checked2) === "undefined") ? true : obj.data.checked2);
                if ((typeof obj.data.checked2) === "undefined") {
                    diagram.startTransaction("setCheck");
                    diagram.model.setDataProperty(obj.data, "checked2", true);
                    diagram.commitTransaction("setCheck");
                }

                $("#checkbox3").prop('checked', ((typeof obj.data.checked3) === "undefined") ? false : obj.data.checked3);
                var newSource = Ciel.Process.ProcessDesign.CreateJob.getRelationType(obj.data);
                $("#contextMenuImg").attr("src", (CONFIG_APP_BASEURL + "/Areas/Process/Images/" + newSource.replace(' ', '') + ".png"));
                $("#leftTableColumn").text(obj.fromNode.data.LOGICALCOLUMNNAME);
                var eid = document.getElementById("equalityCondition");
                if (typeof obj.data.equalityCondition === "undefined") {
                    eid.selectedIndex = 0;
                    diagram.startTransaction("setEqulityCondition");
                    diagram.model.setDataProperty(obj.data, "equalityCondition", $("#equalityCondition option:selected").text().trim());
                    diagram.commitTransaction("setEqulityCondition");

                } else {
                    for (var i = 0; i < eid.options.length; ++i) {
                        if (eid.options[i].text.trim() === obj.data.equalityCondition.trim()) {
                            eid.selectedIndex = i;
                        }
                    }
                }


                $("#rightTableColumn").text(obj.toNode.data.LOGICALCOLUMNNAME);
            }
            cxElement.style.display = "block";
            var mousePt = diagram.lastInput.viewPoint;
            cxElement.style.left = mousePt.x + "px";
            cxElement.style.top = mousePt.y + "px";
            this.currentContextMenu = contextmenu;
        }

        $("#checkbox1").click(function () {
            contextMenuE.obj.data.checked1 = this.checked;
            Ciel.Process.ProcessDesign.CreateJob.updateRelation(contextMenuE, contextMenuE.obj);
        });
        $("#checkbox2").click(function () {
            contextMenuE.obj.data.checked2 = this.checked;
            Ciel.Process.ProcessDesign.CreateJob.updateRelation(contextMenuE, contextMenuE.obj);
        });
        $("#checkbox3").click(function () {
            contextMenuE.obj.data.checked3 = this.checked;
            Ciel.Process.ProcessDesign.CreateJob.updateRelation(contextMenuE, contextMenuE.obj);
        });
        $("#equalityCondition").on('change', function () {
            Ciel.Process.ProcessDesign.CreateJob.updateRelation(contextMenuE, contextMenuE.obj);
        });

        cxTool.hideContextMenu = function () {
            if (this.currentContextMenu === null) return;
            cxElement.style.display = "none";
            this.currentContextMenu = null;
        }

        //context menu change ends




        canvas.addDiagramListener("Modified", function (e) {
            canvasModifiedHandler(e);
        });

        ns.updateDiagram = function () {
            canvas.requestUpdate();
            filesPalette.requestUpdate();
            tablesPalette.requestUpdate();
            stepsPalette.requestUpdate();
        }

        var customText = document.getElementById("customTextEditor");
        customText.onActivate = function () {
            customText.style.visibility = "";
            var startingValue = customText.textEditingTool.textBlock.text;

            var children = customText.children
            var l = children.length;
            for (var i = 0; i < l; i++) {
                var child = children[i];
                if (child instanceof HTMLTextAreaElement) {
                    child.value = startingValue;
                }
            }

            customText.value = function () {
                var children = customText.children
                var l = children.length;
                for (var i = 0; i < l; i++) {
                    var child = children[i];
                    if (child instanceof HTMLTextAreaElement) {
                        return child.value;
                    }
                }
                return children[0].value;
            }

            customText.addEventListener("keydown", function (e) {
                var keynum = e.which;
                var tool = customText.textEditingTool;
                if (tool === null) return;
                if (keynum == 13) { // Accept on Enter
                    tool.acceptText(go.TextEditingTool.Enter);
                    return;
                } else if (keynum == 9) { // Accept on Tab
                    tool.acceptText(go.TextEditingTool.Tab);
                    e.preventDefault();
                    return false;
                } else if (keynum === 27) { // Cancel on Esc
                    tool.doCancel();
                    if (tool.diagram) tool.diagram.focus();
                }
            }, false);

            var loc = customText.textEditingTool.textBlock.getDocumentPoint(go.Spot.TopLeft);
            var pos = canvas.transformDocToView(loc);
            customText.style.left = pos.x + "px";
            customText.style.top = pos.y + "px";
        }

        function nodeStyle() {
            return [
              // The Node.location comes from the "loc" property of the node data,
              // converted by the Point.parse static method.
              // If the Node.location is changed, it updates the "loc" property of the node data,
              // converting back using the Point.stringify static method.
              new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
              {
                  resizable: true,
                  resizeObjectName: 'shape',
                  reshapable: true,
                  locationSpot: go.Spot.Center,
                  //doubleClick: function () { $('#myModal').modal('show'); },
                  // the Node.location is at the center of each node
                  //resizeObjectName: 'shape',
                  //locationSpot: go.Spot.Center,
                  //isShadowed: true,
                  //shadowColor: "#888",
                  // handle mouse enter/leave events to show/hide the ports
                  mouseEnter: function (e, obj) { showPorts(obj.part, true); },
                  mouseLeave: function (e, obj) { showPorts(obj.part, false); }
              }
            ];
        }

        function fileCompareFunction(a, b) {
            var at = a.data.FILENAME.toLowerCase();
            var bt = b.data.FILENAME.toLowerCase();
            if (at < bt) return -1;
            if (at > bt) return 1;
            return 0;
        }

        function tableCompareFunction(a, b) {
            var at = a.data.LOGICALTABLENAME.toLowerCase();
            var bt = b.data.LOGICALTABLENAME.toLowerCase();
            if (at === RES_PRC00008.toLowerCase()) return -1;
            if (bt === RES_PRC00008.toLowerCase()) return 1;
            if (at < bt) return -1;
            if (at > bt) return 1;
            return 0;
        }


        // initialize the filesPalette that is on the left side of the page
        filesPalette =
          goJs(go.Palette, "filesPaletteDiv",  // must name or refer to the DIV HTML element
            {
                "animationManager.duration": 1,
                initialScale: 0.6,
                model: new go.GraphLinksModel(),
                positionComputation: function computeIntegralPosition(diagram, pt) { // to scroll to end using the scrollbar
                    return new go.Point(Math.ceil(pt.x), Math.ceil(pt.y));
                },
                layout: goJs(go.GridLayout, { comparer: fileCompareFunction }) // to order the files in palette acording to FileName
            });
        filesPalette.toolManager.hoverDelay = 100;
        filesPalette.maxSelectionCount = 1;

        stepsPalette =
          goJs(go.Palette, "stepsPaletteDiv",  // must name or refer to the DIV HTML element
            {
                "animationManager.duration": 1,
                initialScale: 0.6,
                model: new go.GraphLinksModel(),
                positionComputation: function computeIntegralPosition(diagram, pt) { // to scroll to end using the scrollbar
                    return new go.Point(Math.ceil(pt.x), Math.ceil(pt.y));
                }
            });
        stepsPalette.toolManager.hoverDelay = 100;
        stepsPalette.maxSelectionCount = 1;

        // initialize the tables Palette that is on the left side of the page
        tablesPalette =
          goJs(go.Palette, "tablesPaletteDiv",  // must name or refer to the DIV HTML element
            {
                "animationManager.duration": 1,
                initialScale: 0.6,
                model: new go.GraphLinksModel(),
                positionComputation: function computeIntegralPosition(diagram, pt) { // to scroll to end using the scrollbar
                    return new go.Point(Math.ceil(pt.x), Math.ceil(pt.y));
                },
                layout: goJs(go.GridLayout, { comparer: tableCompareFunction }) // to order the tables in palette acording to WorkspaceTableName
            });
        tablesPalette.toolManager.hoverDelay = 100;
        tablesPalette.maxSelectionCount = 1;

        //Create node template for files palette
        filesPalette.nodeTemplate =
                 goJs(go.Node, "Auto",
                    goJs(go.Shape, "Rectangle", shapeStyle(),
                       {
                           fill: goJs(go.Brush, "Linear", { 0.0: "rgb(217, 217, 217)", 1.0: "rgb(242, 242, 242)" }),
                           stroke: "black",
                           minSize: new go.Size(310, 50),
                           strokeWidth: 0.5,
                           margin: new go.Margin(0, 0, 0, 0)
                       }),
                       goJs(go.Panel, "Horizontal",
                           goJs(go.Panel, "Horizontal",
                           { desiredSize: new go.Size(120, 50) },
                             goJs(go.TextBlock,
                               {
                                   row: 0,
                                   column: 0,
                                   font: "14pt Arial, Arial, sans-serif",
                                   stroke: "black",
                                   margin: 2,
                                   overflow: go.TextBlock.OverflowEllipsis,
                                   maxSize: new go.Size(120, NaN),
                                   editable: false,
                                   isMultiline: false,
                                   maxLines: 1
                               },
                               new go.Binding("text", "FILENAME"))),
                               goJs(go.Shape, "LineV",
                               {
                                   stroke: "gray",
                                   desiredSize: new go.Size(2, 40),
                                   margin: 4
                               }), {
                                   toolTip:  // define a tooltip for each node that displays the color as text
                                   goJs(go.Adornment, "Auto",
                                     goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                                     goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                                       new go.Binding("text", "FILENAME"))
                                   )  // end of Adornment
                               },
                               goJs(go.Panel, "Horizontal",
                               { desiredSize: new go.Size(170, 50) },
                                goJs(go.TextBlock, "Description",
                               {
                                   row: 1,
                                   column: 0, font: "14pt Arial, Arial, sans-serif", stroke: lightText,
                                   isMultiline: false,
                                   stroke: "black",
                                   overflow: go.TextBlock.OverflowEllipsis,
                                   editable: false,
                                   maxSize: new go.Size(165, NaN),
                                   maxLines: 1,
                                   margin: 2
                               },
                               new go.Binding('text', "FILEPATH")), {
                                   toolTip:  // define a tooltip for each node that displays the color as text
                                   goJs(go.Adornment, "Auto",
                                     goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                                     goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                                       new go.Binding("text", "FILEPATH"))
                                   )  // end of Adornment
                               })
                   ));

        //Create node template for tables palette
        tablesPalette.nodeTemplate =
                 goJs(go.Node, "Auto",
                    goJs(go.Shape, "Rectangle", shapeStyle(),
                       {
                           fill: goJs(go.Brush, "Linear", { 0.0: "rgb(217, 217, 217)", 1.0: "rgb(242, 242, 242)" }),
                           stroke: "black",
                           minSize: new go.Size(310, 50),
                           strokeWidth: 0.5,
                           margin: new go.Margin(0, 0, 0, 0)
                       }),
                       goJs(go.Panel, "Horizontal",
                           goJs(go.Panel, "Horizontal",
                           { desiredSize: new go.Size(290, 50) },
                             goJs(go.TextBlock,
                               {
                                   row: 0,
                                   column: 0,
                                   font: "14pt Arial, Arial, sans-serif",
                                   stroke: "black",
                                   margin: 10,
                                   overflow: go.TextBlock.OverflowEllipsis,
                                   maxSize: new go.Size(290, NaN),
                                   editable: false,
                                   isMultiline: false,
                                   maxLines: 1
                               },
                               new go.Binding("text", "LOGICALTABLENAME")),
                               {
                                   toolTip:  // define a tooltip for each node that displays the color as text
                                    goJs(go.Adornment, "Auto",
                                      goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                                      goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                                        new go.Binding("text", "LOGICALTABLENAME"))
                                    ),  // end of Adornment
                               })
                   ));

        stepsPalette.nodeTemplate =
   goJs(go.Node, "Auto",
      goJs(go.Shape, "Rectangle", shapeStyle(),
         {
             fill: goJs(go.Brush, "Linear", { 0.0: "rgb(217, 217, 217)", 1.0: "rgb(242, 242, 242)" }),
             stroke: "black",
             minSize: new go.Size(310, 50),
             strokeWidth: 0.5,
             margin: new go.Margin(0, 0, 0, 0)
         }),
         goJs(go.Panel, "Horizontal",
             goJs(go.Panel, "Horizontal",
             { desiredSize: new go.Size(290, 50) },
               goJs(go.TextBlock,
                 {
                     row: 0,
                     column: 0,
                     font: "14pt Arial, Arial, sans-serif",
                     stroke: "black",
                     margin: 10,
                     overflow: go.TextBlock.OverflowEllipsis,
                     maxSize: new go.Size(290, NaN),
                     editable: false,
                     isMultiline: false,
                     maxLines: 1
                 },
                 new go.Binding("text", "text")),
                 {
                     toolTip:  // define a tooltip for each node that displays the color as text
                      goJs(go.Adornment, "Auto",
                        goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                        goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                          new go.Binding("text", "text"))
                      ),  // end of Adornment
                 })
     ));


        canvas.nodeTemplateMap.add("File",
            goJs(go.Node, "Auto", nodeStyle(),
                { resizeObjectName: 'shape' },
                { click: fileNodeClicked, doubleClick: fileNodeDoubleClicked, selectionChanged: objPropertiesPanelVM.updatePropertiesPanel },
                goJs(go.Shape, "Rectangle",
                {
                    fill: "transparent", stroke: null,
                    minSize: new go.Size(20, 20),
                    stretch: go.GraphObject.fill,
                }),
                goJs(go.Shape,
                {
                    name: "shape",
                    geometryString: "F M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z",
                    minSize: new go.Size(20, 20),
                    desiredSize: new go.Size(120, 120),
                    stroke: "#7db2e0",
                    fill: goJs(go.Brush, "Linear", { 0.0: "#7db2e0", 1.0: "#c1daf0", start: go.Spot.Left, end: go.Spot.Right })
                },
                new go.Binding('width').makeTwoWay(),
                new go.Binding('height').makeTwoWay())
              //  makePort("T", go.Spot.Top, true, true),
              //  makePort("L", go.Spot.Left, true, true),
              //  makePort("R", go.Spot.Right, true, true),
              //  makePort("B", go.Spot.Bottom, true, true)
        ));



        canvas.nodeTemplateMap.add("FileWithTable",
          goJs(go.Node, "Table", nodeStyle(),
          {
              click: fileNodeClicked, selectionChanged: objPropertiesPanelVM.updatePropertiesPanel,
              selectionAdorned: false, doubleClick: fileNodeDoubleClicked,//selection
              selectionChanged: objPropertiesPanelVM.updatePropertiesPanel,
          },
          goJs(go.Picture, shapeStyle(),
          { row: 1, column: 1, name: "shape", desiredSize: new go.Size(120, 120), minSize: new go.Size(20, 20) }, {
              source: CONFIG_APP_BASEURL + "/Areas/Process/Images/databasetable.png"
          },
           new go.Binding('width').makeTwoWay(),
              new go.Binding('height').makeTwoWay()),
                goJs(go.TextBlock, {
                    row: 0, column: 1,
                    margin: 5,
                    editable: true,
                    wrap: go.TextBlock.WrapFit,
                    font: "bold 13px sans-serif",
                    opacity: 0.75,
                    stroke: "#404040",
                    visible: false
                },
             new go.Binding("text", "from").makeTwoWay()),
           goJs(go.TextBlock, {
               row: 0, column: 1,
               margin: 5,
               editable: true,
               wrap: go.TextBlock.WrapFit,
               font: "bold 13px sans-serif",
               opacity: 0.75,
               stroke: "#404040",
               visible: false
           },
             new go.Binding("text", "to").makeTwoWay()),
               makePort("T", go.Spot.Top, true, false),
             makePort("L", go.Spot.Left, true, false),
             makePort("R", go.Spot.Right, true, false),
             makePort("B", go.Spot.Bottom, true, false)
      ));

        canvas.nodeTemplateMap.add("Table",
             goJs(go.Node, "Table", nodeStyle(), {
                 click: fileNodeClicked, selectionChanged: objPropertiesPanelVM.updatePropertiesPanel,
                 selectionAdorned: false,//selection
             },


                goJs(go.Shape, "DividedProcess", shapeStyle(),
                   { row: 1, column: 1, name: "shape", minSize: new go.Size(150, 100), fill: "#FFFFFF", stroke: "#6bb300", strokeWidth: 3, cursor: "move" }, //DC3C00
                    new go.Binding('width').makeTwoWay(),
                   new go.Binding('height').makeTwoWay()),

                goJs(go.Panel, "Table",
                   { row: 1, column: 1 },
                 goJs(go.TextBlock, "Table",
                   {
                       row: 0, column: 0, font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "#000000", maxSize: new go.Size(120, NaN), cursor: "move"
                   },
                   new go.Binding("text", "LOGICALTABLENAME")),
                    goJs(go.TextBlock, "Description",
                   {
                       row: 1, column: 0,
                       margin: 10,
                       font: "8pt Helvetica, Arial, sans-serif", stroke: "#000000",
                       isMultiline: true,
                       overflow: go.TextBlock.OverflowEllipsis,
                       editable: true,
                       maxSize: new go.Size(120, NaN),
                       maxLines: 2,
                       cursor: "text",
                       textEditor: customText
                   },
                   new go.Binding('text', "description").makeTwoWay())
                   ),
                goJs(go.TextBlock, {
                    row: 0, column: 1,
                    margin: 5,
                    editable: true,
                    wrap: go.TextBlock.WrapFit,
                    font: "bold 13px sans-serif",
                    opacity: 0.75,
                    stroke: "#404040",
                    visible: false
                },
                 new go.Binding("text", "from").makeTwoWay()),
               goJs(go.TextBlock, {
                   row: 0, column: 1,
                   margin: 5,
                   editable: true,
                   wrap: go.TextBlock.WrapFit,
                   font: "bold 13px sans-serif",
                   opacity: 0.75,
                   stroke: "#404040",
                   visible: false
               },
             new go.Binding("text", "to").makeTwoWay()),

               makePort("T", go.Spot.Top, true, true),
               makePort("L", go.Spot.Left, true, true),
               makePort("R", go.Spot.Right, true, true),
               makePort("B", go.Spot.Bottom, true, true)
             ));

        canvas.nodeTemplateMap.add("Step",  // the default category
            goJs(go.Node, "Table", nodeStyle(),
                  {
                      doubleClick: stepClicked,
                      selectionAdorned: false,
                      toolTip:  // define a tooltip for each node that displays the color as text
                             goJs(go.Adornment, "Auto",
                               goJs(go.Shape, { fill: "#FFFFCC" }),
                                goJs(go.TextBlock, "Join", { margin: 4 },
                               new go.Binding("text", "toolTipText").makeTwoWay())
                             ),
                  },
               goJs(go.Shape, "SquareArrow", shapeStyle(),
                  {
                      row: 1, column: 1, name: "shape", fill: "#FFFFFF", stroke: "#00A9C9", minSize: new go.Size(160, 70), cursor: "move", strokeWidth: 4
                  },
                 new go.Binding('width').makeTwoWay(),
                 new go.Binding('height').makeTwoWay(),
                 new go.Binding("stroke", "color").makeTwoWay()),

              // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
              goJs(go.Panel, "Table",
                 {
                     row: 1, column: 1,
                 },
                goJs(go.TextBlock, "Table",
				 {
				     row: 0, column: 0, font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "#000000", maxSize: new go.Size(120, NaN), cursor: "move"
				 },
					 new go.Binding("text")),
					  goJs(go.TextBlock, "Description",
                  {
                      row: 1,
                      column: 0, font: "8pt Helvetica, Arial, sans-serif", stroke: "#000000",
                      isMultiline: true,
                      overflow: go.TextBlock.OverflowEllipsis,
                      editable: true,
                      maxSize: new go.Size(80, NaN),
                      maxLines: 2,
                      textEditor: customText,
                      cursor: "text"
                  },


                  new go.Binding('text', "description").makeTwoWay())
              ),
              //// four named ports, one on each side:
             // makePort("T", go.Spot.Top, false, false),
              makePort("L", go.Spot.Left, false, true),
              makePort("R", go.Spot.Right, true, false)
             // makePort("B", go.Spot.Bottom, false, false)

     ));
        //Load nodes in the palette
        loadTableNodes(tablesPalette);
        loadFileNodes(filesPalette);
        loadStepNodes(stepsPalette);

        $('#refresh-palette').on('click', function () {
            var currentTab = $('#left-tab-contents').find('.tab-pane.active').prop('id');

            switch (currentTab) {
                case "files":
                    loadFileNodes(filesPalette);
                    break;
                case "steps":
                    loadStepNodes(stepsPalette);
                    break;
                case "tables":
                    loadTableNodes(tablesPalette);
                    break;
            }
        });
    }

    var loadStepNodes = function (palette) {
        var step = { text: 'Join', category: 'Step' };
        palette.model.nodeDataArray = [step];
    }
    var loadFileNodes = function (palette) {
        $('#filesPaletteDiv').siblings('.palette-loader').show();
        $('#filesPaletteDiv').hide();
        Ciel.Process.Api.GetFileNodes(function (nodedata) {
            palette.model.nodeDataArray = nodedata;
            $('#filesPaletteDiv').show();
            $('#filesPaletteDiv').siblings(".palette-loader").hide();
        });
    }

    var loadTableNodes = function (palette) {
        $('#tablesPaletteDiv').siblings('.palette-loader').show();
        $('#tablesPaletteDiv').hide();
        Ciel.Process.Api.GetTableNodes(function (nodedata) {
            palette.model.nodeDataArray = nodedata;
            $('#tablesPaletteDiv').show();
            $('#tablesPaletteDiv').siblings(".palette-loader").hide();
        });
    }

    var field = function (COLUMNID, COLUMNNAME, COLUMNTYPE, COLUMNSIZE) {
        var self = this;
        self.COLUMNID = COLUMNID;
        self.COLUMNNAME = ko.observable(COLUMNNAME);
        self.COLUMNTYPE = ko.observable(COLUMNTYPE);
        self.COLUMNSIZE = ko.observable(COLUMNSIZE);
        self.isColumnSizeEditable = ko.computed(function () {
            var colsArr = ColumnDataTypes;
            var isEditable;
            //if (tableData.EditMode()) {
            $(colsArr).each(function (index, dataType) {
                if (dataType.Name == self.COLUMNTYPE()) {
                    isEditable = dataType.IsEditable;
                    return false;
                }
            });
            //}
            return isEditable;
        });

        self.COLUMNTYPE.subscribe(function (newValue) {
            var colsArr = ColumnDataTypes;
            //if (tableData.EditMode()) {
            $(colsArr).each(function (index, dataType) {
                if (dataType.Name == newValue) {
                    self.COLUMNSIZE(dataType.Size);
                    return false;
                }
            });
            //}
        });
    }

    var tableModel = function () {
        var self = this;
        self.node = {};
        self.TableTypeEnum = TableTypeEnum;
        self.EditMode = ko.observable(false);
        self.Table = ko.observable();
        self.ErrorList = ko.observableArray([]);
        self.Datatypes = (function () {
            var dt = [];
            for (var x in ns.ColumnDataTypes2) {
                dt.push(ns.ColumnDataTypes2[x].Name);
            }
            return dt;
        })();
        //self.TableName = ko.observable('');
        //self.TableType = ko.observable('');
        //self.IsTemporary = ko.observable(false);
        //self.Fields = ko.observableArray([]);

        self.ErrorList.subscribe(function (newValue) {
            if (self.ErrorList().length <= 0) {
                $("#table-modal .error-div").css('display', 'none');
            }
            else {
                $("#table-modal .error-div").css('display', 'block');
            }
        });

        self.colTypeChange = function (newValue, event) {
            //if (event.originalEvent != undefined) {
            //    if (event.originalEvent.isTrusted) {
            if (newValue.isColumnSizeEditable == null) {
                newValue.isColumnSizeEditable = ko.observable();
            }

            for (var dt in ns.ColumnDataTypes2) {
                if (ns.ColumnDataTypes2[dt].Name == newValue.COLUMNTYPE()) {
                    newValue.isColumnSizeEditable(ns.ColumnDataTypes2[dt].IsEditable);
                    newValue.COLUMNSIZE(ns.ColumnDataTypes2[dt].Size);
                    break;
                }
            }


            //    }
            //}
        };

        self.UpdateTableModel = function (node) {
            self.node = node;
            self.ErrorList(JSON.parse(JSON.stringify(node.data.ErrorList)));
            if (node.data.TABLETYPE === TableTypeEnum.New) {
               
                self.Table(ko.mapping.fromJS(node.data));
                self.Table().LANGCD(Ciel.CurrentLang);
                self.EditMode(true);
                if (self.Table().MultiLangs().length === 0) {
                    $(ns.AppLanguageData).each(function (i, item) {
                        if (item.LANGCD != Ciel.CurrentLang) {
                            var m = NewTableNodeModel();
                            m.LANGCD = item.LANGCD;
                            m.LANGNM = item.LANGNM;

                            self.Table().MultiLangs.push(ko.mapping.fromJS(m));
                        }
                        else {
                            self.Table().LANGNM(item.LANGNM);
                        }
                    });
                }
            }
            else {
                self.EditMode(false);
                self.Table(ko.mapping.fromJS(node.data));
            }
        }


        self.saveTableData = function () {
            if (self.EditMode()) {
                self.validateTable();
                var isValid = true;
                if (self.Table().Fields().length <= 0) {
                    isValid = false;
                    self.addError('Table cannot be created without columns');
                }
                else if ($("#table-modal .tab-content .has-error").length > 0) {
                    isValid = false;
                    self.addError('One or more validations failed');
                }

                var colNameArr = [];
                $(self.Table().Fields()).each(function (idx, item) {
                    if (!(item.LOGICALCOLUMNNAME() == null)) {
                        colNameArr.push(item.LOGICALCOLUMNNAME());
                    }
                    $(item.MultiLangs()).each(function (idx, ml) {
                        if (!(ml.LOGICALCOLUMNNAME() == null)) {
                            colNameArr.push(ml.LOGICALCOLUMNNAME());
                        }
                    });
                });

                $.each(colNameArr, function (idx, colName) {
                    if (colNameArr.indexOf(colName) != idx || colNameArr.indexOf(colName, idx + 1) != -1) {
                        isValid = false;
                        self.addError('Column names should be unique');
                    }
                });

                var tbl = ns.tempTablesHandle.getTableByLogicalName(self.Table().LOGICALTABLENAME());
                if (tbl != null && tbl.TempID !== self.Table().TempID()) {
                    isValid = false;
                    self.addError('A table with this name is already created in the job.');
                }

                if (!isValid) {
                    self.addError('One or more validations failed');
                    return
                }

                self.ErrorList([]);
                var updatedTable = ko.toJS(self.Table());

                self.node.diagram.model.startTransaction("set table properties");
                for (var prop in updatedTable) {
                    if (prop !== "category") {
                        self.node.diagram.model.setDataProperty(self.node.data, prop, updatedTable[prop] === undefined ? null : updatedTable[prop]);
                    }
                }
                self.node.diagram.model.commitTransaction("set table properties");

                //update data in temp tables list
                ns.tempTablesHandle.updateTableInList(self.node.data);

                objPropertiesPanelVM.updatePropertiesPanel(self.node);
                $('#table-modal').modal('hide');
            }
            else {
                $('#table-modal').modal('hide');
            }

        }

        self.addColumn = function () {
            var col = ko.mapping.fromJS(NewTableColumnModel());
            col.COLUMNTYPE(ns.ColumnDataTypes2[4].Name);
            col.COLUMNSIZE(ns.ColumnDataTypes2[4].Size);
            col.LANGCD(Ciel.CurrentLang);
            col.isColumnSizeEditable = ko.observable(ns.ColumnDataTypes2[4].IsEditable);
                       
            //col.COLUMNTYPE.subscribe(self.updateColSize);

            $(ns.AppLanguageData).each(function (i, item) {
                if (item.LANGCD != Ciel.CurrentLang) {
                    var m = NewTableColumnModel();
                    m.LANGCD = item.LANGCD;
                    m.LANGNM = item.LANGNM;

                    col.MultiLangs.push(ko.mapping.fromJS(m));
                }
                else
                {
                    col.LANGNM(item.LANGNM);
                }
            });
            self.Table().Fields.push(col);
        }

        self.removeColumn = function (column) {
            self.Table().Fields.remove(column);
        };

        self.removeError = function (item, event) {
            //$(event.target).closest('.tag').remove();
            self.ErrorList.splice(self.ErrorList.indexOf(item), 1)
        }

        self.addError = function (err) {
            if (self.ErrorList.indexOf(err) === -1) {
                self.ErrorList.push(err);
            }
        }

        self.closeModal = function () {
            var ele = $('#table-name');
            if (ele.closest("div").hasClass("has-error")) {
                ele.closest("div").removeClass("has-error");
                ele.css('border-color', '');
                ele.tooltip("destroy");
            }
            $("#table-modal .error-div").css('display', 'none');
            $('#table-modal').modal('hide');
        }

        self.validateTable = function () {
            var reg = '[.,",\')]'
            var regex = new RegExp(reg);

            var ele = $('#input-LOGICALTABLENAME-' + Ciel.CurrentLang + ' input');
            if (ele.val() == "") {
                ele.closest("div").addClass("has-error");
                ele.addClass("error-element");
                ele.css('border-color', 'red');
                title = 'Table Name cannot be empty!';
                var options = {
                    placement: ele.data('placement') || 'top'
                }
                ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
            }
            else {
                if (Ciel.CurrentLang !== 'en') {
                    var tableElementML = $('#input-LOGICALTABLENAME-en input');
                    if (tableElementML.val() == "") {
                        ele.closest("div").addClass("has-error");
                        tableElementML.closest("div").addClass("has-error");
                        tableElementML.addClass("error-element");
                        tableElementML.css('border-color', 'red');
                        title = 'Need to provide english name for this table!';
                        var options = {
                            placement: ele.data('placement') || 'top'
                        }
                        ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                    }
                    else if (tableElementML.val().match(regex) || tableElementML.val().length > 25) {
                        ele.closest("div").addClass("has-error");
                        tableElementML.closest("div").addClass("has-error");
                        tableElementML.addClass("error-element");
                        tableElementML.css('border-color', 'red');
                        title = 'Please provide valid name in english!';
                        var options = {
                            placement: ele.data('placement') || 'top'
                        }
                        ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                    }
                    else {
                        if (tableElementML.closest("div").hasClass("has-error")) {
                            tableElementML.closest("div").removeClass("has-error");
                            tableElementML.removeClass("error-element");
                            tableElementML.css('border-color', '');
                        }
                    }
                }
                else {
                    if (ele.val().match(regex) || ele.val().length > 25) {
                        ele.closest("div").addClass("has-error");
                        ele.addClass("error-element");
                        ele.css('border-color', 'red');
                        title = 'Please provide valid name in english!';
                        var options = {
                            placement: ele.data('placement') || 'top'
                        }
                        ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                    }
                    else if (ele.closest("div").hasClass("has-error")) {
                        ele.closest("div").removeClass("has-error");
                        ele.removeClass("error-element");
                        ele.css('border-color', '');
                        ele.tooltip("destroy");
                    }

                }

            }

            //-----validate columns
            $("#tableFields tbody tr").each(function (idx, item) {
                //validate column name
                ele = $('#input-LOGICALCOLUMNNAME-' + idx + '-' + Ciel.CurrentLang + ' input');
                if (ele.val() == "") {
                    ele.closest("div").addClass("has-error");
                    ele.addClass("error-element");
                    ele.css('border-color', 'red');
                    title = 'Field Name cannot be empty!';
                    var options = {
                        placement: ele.data('placement') || 'top'
                    }
                    ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                }
                else {
                    if (ele.closest("div").hasClass("has-error")) {
                        ele.closest("div").removeClass("has-error");
                        ele.removeClass("error-element");
                        ele.css('border-color', '');
                        ele.tooltip("destroy");
                    }

                    if (Ciel.CurrentLang !== 'en') {
                        var tableElementML = $('#input-LOGICALCOLUMNNAME-' + idx + '-en input');
                        if (tableElementML.val() == "") {
                            ele.closest("div").addClass("has-error");
                            tableElementML.closest("div").addClass("has-error");
                            tableElementML.addClass("error-element");
                            tableElementML.css('border-color', 'red');
                            title = 'Need to provide english name for this field!';
                            var options = {
                                placement: ele.data('placement') || 'top'
                            }
                            ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                        }
                        else {
                            if (tableElementML.closest("div").hasClass("has-error")) {
                                tableElementML.closest("div").removeClass("has-error");
                                tableElementML.removeClass("error-element");
                                tableElementML.css('border-color', '');
                            }
                        }
                    }
                }

                var regex;
                var errMessage = "";
                for (var x in ns.ColumnDataTypes2) {
                    if (ns.ColumnDataTypes2[x].Name === $(item).find('.columntype').val()) {
                        regex = new RegExp(ns.ColumnDataTypes2[x].reg);
                        errMessage = ns.ColumnDataTypes2[x].errMessage;
                        break;
                    }
                }

                var element = $(item).find('.columnsize');

                if (!element.val().match(regex) && regex != '/^$/') {
                    element.parents("td").addClass("has-error");
                    element.css('border-color', 'red');
                    title = errMessage;
                    var options = {
                        placement: element.data('placement') || 'bottom'
                    }
                    element.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                }
                else {
                    if (element.parents("td").hasClass("has-error")) {
                        element.parents("td").removeClass("has-error");
                        element.css('border-color', '');
                        element.tooltip("destroy");
                    }
                }
            });



            //$("#tableFields tbody .columnname").each(function (idx, item) {
            //    if ($(item).parents("td").hasClass("has-error")) {
            //        $(item).parents("td").removeClass("has-error");
            //        $(item).css('border-color', '');
            //        $(item).tooltip("destroy");
            //    }
            //    if ($(item).val() === "") {
            //        $(item).parents("td").addClass("has-error");
            //        $(item).css('border-color', 'red');
            //        title = 'Column Name cannot be empty! ';
            //        var options = {
            //            placement: $(item).data('placement') || 'bottom'
            //        }
            //        $(item).attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
            //    }
            //    else if (colNameArr.indexOf($(item).val()) != idx || colNameArr.indexOf($(item).val(), idx + 1) != -1) {
            //        $(item).parents("td").addClass("has-error");
            //        $(item).css('border-color', 'red');
            //        title = 'Column Name should be unique! ';
            //        var options = {
            //            placement: $(item).data('placement') || 'bottom'
            //        }
            //        $(item).attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
            //    }
            //});

        }
    }

    var stepModel = function () {
        var self = this;
        self.finalOutputTablename = ko.observable();
        self.selectedOutputTableName = ko.observable();
        self.newOutputTableName = ko.observable();
        self.OutputTableType = ko.observable();
        self.isTempTable = ko.observable(true);
        self.TableTypeEnum = TableTypeEnum;
        self.outputTables = ko.observableArray([]);
        self.isPurgeData = ko.observable(false);
        self.purgeByColumn = ko.observable();
        self.purgeOperator = ko.observable();
        self.purgeValue = ko.observable();
        self.operatorList = ko.observableArray(['=', '<>', '>', '<', '>=', '<=']);
        self.colType = '';
        self.colSize = '';
        self.purgeByColumn.subscribe(function (newValue) {
            self.purgeValue("");
            self.purgeOperator("");
            self.colType = '';
            self.colSize = '';
            self.operatorList(['=', '<>', '>', '<', '>=', '<=']);

            if (newValue == undefined) {
                $('#help-icon-purge-file-modal1').attr('data-original-title', '').tooltip('hide');
            }

            var selectedTable = $('#existingTable option:selected').val();
            var tables = tablesPalette.model.nodeDataArray;

            var table = tables.find(function (obj) {
                return obj.LOGICALTABLENAME === selectedTable;
            });

            var field;
            if (table) {
                field = table.Fields.find(function (obj) {
                    return obj.COLUMNNAME === newValue;
                });

                if (field) {
                    self.colType = field.COLUMNTYPE;
                    self.colSize = field.COLUMNSIZE;
                    var message = GetPurgeValidationMessages(field.COLUMNTYPE, field.COLUMNSIZE);
                    if (ns.GetDataType(self.colType) === 'string') {
                        self.operatorList(['=', '<>']);
                    }
                    $('#help-icon-purge-file-modal1').attr('data-original-title', message).tooltip('show');

                }
            }
        });


        //self.newOutputTableName.subscribe(function (newValue) {
        //    if (newValue !== "" && myDiagramModalOutputTable.model.nodeDataArray.length) {
        //        self.finalOutputTablename(self.newOutputTableName());
        //        myDiagramModalOutputTable.startTransaction("change table name");

        //        var newTable = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Table", TableType: "New" })
        //        myDiagramModalOutputTable.model.setDataProperty(newTable[0], "WorkspaceTableName", self.finalOutputTablename());
        //        var columnList = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Column", group: newTable[0].key })
        //        if (columnList.length) {
        //            $.each(columnList, function (index, column) {
        //                myDiagramModalOutputTable.model.setDataProperty(column, "columnname", self.finalOutputTablename() + '.' + column.columnname.split('.')[1]);
        //            });
        //        }
        //        myDiagramModalOutputTable.commitTransaction("change table name");
        //        myDiagramModalOutputTable.requestUpdate();
        //    }
        //});

        //self.isTempTable.subscribe(function (newValue) {
        //    if (true) {
        //        var newTable = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Table", TableType: "New" });
        //        ns.newTablesHandle.removeTableFromList(newTable);
        //        if(ns.tempTablesHandle.getTableByID(newTable.TempID)===null) {
        //            ns.tempTablesHandle.addTableToList(newTable);
        //        }
                
        //    }
        //    else {
        //        ns.tempTablesHandle.removeTableFromList(newTable);
        //        if (ns.newTablesHandle.getTableByID(newTable.TempID) === null) {
        //            ns.newTablesHandle.addTableToList(newTable);
        //        }
        //    }
        //});

        self.resetData = function () {
            self.purgeValue("");
            self.purgeByColumn("");
            self.purgeOperator("");
        }

        self.outputTableChange = function (newValue, event) {
            if (event.originalEvent != undefined) {
                if (event.originalEvent.isTrusted) {
                    if (newValue.selectedOutputTableName() === "New Table") {
                        self.OutputTableType(TableTypeEnum.New)

                    }
                    else {
                        self.OutputTableType(TableTypeEnum.Existing)
                        self.newOutputTableName('');
                        self.isTempTable(false);
                    }
                    existingTableChange(newValue.selectedOutputTableName());
                    if (newValue.selectedOutputTableName()==="New Table")
                    {
                        self.newOutputTableName(newValue.selectedOutputTableName())
                        }
                    self.isPurgeData(false);
                    self.purgeValue("");
                    self.purgeOperator("");
                }
            }
        };

        /* column list of selected Table */
        self.getColumnsByTableName = ko.computed(function () {
            var result = ko.utils.arrayFilter(self.outputTables(), function (item) {
                return item.tableName == self.selectedOutputTableName();
            });

            if (result && result.length > 0 && result[0].columns().length > 0) {

                return result[0].columns();
            }
            return [];
        }, this);

        self.updateModel = function (node, tablesPaletteIn) {
            var tables = tablesPaletteIn.model.nodeDataArray;
            self.node = node;
            self.outputTables([]);

            for (var i = 0; i < tables.length; i++) {
                if (tables[i].LOGICALTABLENAME !== "New Table") {
                    var columns = [];
                    for (j = 0; j < tables[i].Fields.length; j++) {
                        columns.push(new outputTableColumn(tables[i].Fields[j].COLUMNID, tables[i].Fields[j].COLUMNNAME, tables[i].Fields[j].COLUMNTYPE, false));
                    }
                    self.outputTables.push(new outputTable(tables[i].LOGICALTABLENAME, columns, false, tables[i].TableType === "Temporary"));
                }
            }
        }

        self.updateModelForPurge = function (node, tablesPaletteIn) {
            self.isPurgeData(node.data.IsPurgeData);
            self.purgeByColumn(node.data.PurgeByColumn);
            self.purgeOperator(node.data.PurgeOperator);
            self.purgeValue(node.data.PurgeValue);
        }
    }

    var newFileModel = function () {
        var self = this;
        self.node = {};
        self.OutputTable = ko.observable(ko.mapping.fromJS(NewTableNodeModel()));
        self.File = ko.observable(ko.mapping.fromJS(NewFileNodeModel()));
        self.TableTypeEnum = TableTypeEnum;
        self.FileAttributeEnum = FileAttributeEnum;
        self.Datatypes = (function () {
            var dt = [];
            for (var x in ns.ColumnDataTypes2) {
                dt.push(ns.ColumnDataTypes2[x].Name);
            }
            return dt;
        })();
        self.selectedOutputTableID = ko.observable();
        self.fileColumns = ko.observableArray([]);
        self.outputTables = ko.observableArray([]);
     
        //self.isPurgeData = ko.observable(false);
        //self.purgeByColumn = ko.observable();
        //self.purgeOperator = ko.observable();
        //self.purgeValue = ko.observable();
        //self.isColumnHeadingPresent = ko.observable();
        self.ErrorList = ko.observableArray([]);
        self.operatorList = ko.observableArray(['=', '<>', '>', '<', '>=', '<=']);
        self.colType = '';
        self.colSize = '';

        self.fileColumns.subscribe(function () {
            if (self.File().ColumnMappings().length == 0 && self.OutputTable().TABLETYPE() == TableTypeEnum.New) {
                var tempArr = [];
                $(self.fileColumns()).each(function (index, item) {
                    var cm = self.getColumnMapping(item.columnName, item.columnName, ns.ColumnDataTypes2[4].Name, ns.ColumnDataTypes2[4].Size, true);
                    $(ns.AppLanguageData).each(function (i, item) {
                        if (item.LANGCD != Ciel.CurrentLang) {
                            var m = self.getColumnMapping("", "", "", "", self.OutputTable().Fields, false);
                            m.LANGCD(item.LANGCD);
                            m.LANGNM(item.LANGNM);

                            cm.MultiLangs.push(m);
                        }
                        else {
                            cm.LANGCD(item.LANGCD);
                            cm.LANGNM(item.LANGNM);
                        }
                    });
                    tempArr.push(cm);
                });
                self.File().ColumnMappings(tempArr);
            }
        });

        self.purgeByColumnSubscribe = function (newValue) {
            self.File().PurgeValue("");
            self.File().PurgeOperator("");
            self.colType = '';
            self.colSize = '';
            self.operatorList(['=', '<>', '>', '<', '>=', '<=']);

            if (newValue == undefined) {
                $('#help-icon-purge-file-modal').attr('data-original-title', '').tooltip('hide');
            }

            //var selectedTable = $('#out-table-select option:selected').val();
            //var tables = tablesPalette.model.nodeDataArray;

            //var table = tables.find(function (obj) {
            //    return obj.WorkspaceTableName === selectedTable;
            //});

            var table = ko.toJS(self.OutputTable());

            var field;
            if (table) {
                field = table.Fields.find(function (obj) {
                    return obj.LOGICALCOLUMNNAME === newValue;
                });

                if (field) {
                    self.colType = field.COLUMNTYPE;
                    self.colSize = field.COLUMNSIZE;
                    var message = GetPurgeValidationMessages(field.COLUMNTYPE, field.COLUMNSIZE);
                    if (ns.GetDataType(self.colType) === 'string') {
                        self.operatorList(['=', '<>']);
                    }
                    $('#help-icon-purge-file-modal').attr('data-original-title', message).tooltip('show');
                }
            }
        }

        self.resetData = function () {
            self.File().PurgeValue("");
            self.File().PurgeByColumn("");
            self.File().PurgeOperator("");
        }

        self.outputTableChange = function (newValue, event) {
            if (event.originalEvent != undefined) {
                if (event.originalEvent.isTrusted) {
                    self.File().IsPurgeData(false);
                    self.File().PurgeValue("");
                    self.File().PurgeOperator("");
                }
            }
        };

        self.selectedOutputTableID.subscribe(function (newValue) {
            self.removeAllMapppings();
            if (newValue == null) {
                self.OutputTable(ko.mapping.fromJS(NewTableNodeModel()));
            }
            else if (newValue === "00000") {
                //self.isNewOutputTable(true);
                self.OutputTable(ko.mapping.fromJS(NewTableNodeModel()));
                self.OutputTable().WORKSPACETABLEID("00000");
                self.OutputTable().TABLETYPE(TableTypeEnum.New);
                self.OutputTable().IsTemporary(true);
                $(ns.AppLanguageData).each(function (i, item) {
                    if (item.LANGCD != Ciel.CurrentLang) {
                        var m = NewTableNodeModel();
                        m.LANGCD = item.LANGCD;
                        m.LANGNM = item.LANGNM;

                        self.OutputTable().MultiLangs.push(ko.mapping.fromJS(m));
                    }
                    else {
                        self.OutputTable().LANGCD(item.LANGCD);
                        self.OutputTable().LANGNM(item.LANGNM);
                    }
                });
                //self.OutputTableType(TableTypeEnum.New);
                //self.isTempTable(true);
            }
            else {
                var ele = $('#out-table-name-text');
                if (ele.closest("div").hasClass("has-error")) {
                    ele.closest("div").removeClass("has-error");
                    ele.css('border-color', '');
                    ele.tooltip("destroy");
                }
                //self.isTempTable(false);
                //self.OutputTableType(TableTypeEnum.Existing);
                $.each(self.outputTables(), function (index, value) {
                    if (value.WORKSPACETABLEID === newValue) {
                        self.OutputTable(ko.mapping.fromJS(value));
                    }
                });
            }
        });

        self.getColumnMapping = function (sourceColumnName, targetColumnName, targetColumnType, targetColumnSize, isColumnSizeEditable) {
            var cm = ko.mapping.fromJS(NewColumnMappingModel());
            cm.sourceColumnName(sourceColumnName);
            cm.targetColumnName(targetColumnName);
            cm.targetColumnType(targetColumnType);
            cm.targetColumnSize(targetColumnSize);
            cm.isColumnSizeEditable(isColumnSizeEditable);
            return cm;
        }

        self.targetColumnNameChange = function (newValue) {
            var colsArr = self.OutputTable().Fields;
            if (colsArr != null) {

                var result = ko.utils.arrayFilter(colsArr(), function (item) {
                    return item.LOGICALCOLUMNNAME() == newValue.targetColumnName();
                });

                if (result && result.length > 0) {
                    newValue.targetColumnType(result[0].COLUMNTYPE());
                    newValue.targetColumnSize(result[0].COLUMNSIZE());
                }
                else {
                    newValue.targetColumnType(undefined);
                }
            }
        }

        self.dataTypeChange = function (newValue, event) {
            if (!(event.originalEvent == null)) {
                for (var dt in ns.ColumnDataTypes2) {
                    if (ns.ColumnDataTypes2[dt].Name == newValue.targetColumnType()) {
                        newValue.targetColumnSize(ns.ColumnDataTypes2[dt].Size);
                        newValue.isColumnSizeEditable(ns.ColumnDataTypes2[dt].IsEditable);
                        break;
                    }
                }
            }
        }

        self.removeMapping = function (mapping) {
            self.File().ColumnMappings.remove(mapping);
        };

        self.removeAllMapppings = function () {
            self.File().ColumnMappings.removeAll();
        };

        self.addMapping = function (data, event) {
            var match = ko.utils.arrayFirst(self.File().ColumnMappings(), function (item) {
                return data.columnName === item.sourceColumnName();
            });

            if (!match) {
                if (self.OutputTable().TABLETYPE() === TableTypeEnum.New) {
                    var cm = self.getColumnMapping(data.columnName, data.columnName, ns.ColumnDataTypes2[4].Name, ns.ColumnDataTypes2[4].Size, true);
                    $(ns.AppLanguageData).each(function (i, item) {
                        if (item.LANGCD != Ciel.CurrentLang) {
                            var m = self.getColumnMapping("", "", "", "", false);
                            m.LANGCD(item.LANGCD);
                            m.LANGNM(item.LANGNM);

                            cm.MultiLangs.push(m);
                        }
                        else {
                            cm.LANGCD(item.LANGCD);
                            cm.LANGNM(item.LANGNM);
                        }
                    });
                    self.File().ColumnMappings.push(cm);
                }
                else {
                    var cm = ko.mapping.fromJS(NewColumnMappingModel());
                    self.File().ColumnMappings.push(cm);
                    cm.sourceColumnName(data.columnName);
                    cm.targetColumnType('');
                    cm.targetColumnSize('');
                    cm.targetColumnName('');
                    cm.isColumnSizeEditable(false);
                }
            }
        };

        self.ErrorList.subscribe(function (newValue) {
            if (self.ErrorList().length <= 0) {
                $("#file-modal .error-div").css('display', 'none');
            }
            else {
                $("#file-modal .error-div").css('display', 'block');
            }
        });

        self.removeError = function (item, event) {
            //$(event.target).closest('.tag').remove();
            self.ErrorList.splice(self.ErrorList.indexOf(item), 1)
        }

        self.addError = function (err) {
            if (self.ErrorList.indexOf(err) === -1) {
                self.ErrorList.push(err);
            }
        }

        self.closeModal = function () {
            $("#file-modal .tab-content .has-error").each(function (idx, item) {
                $(item).removeClass("has-error");
                var ele = $(item).find('.error-element');
                ele.removeClass("error-element");
                ele.css('border-color', '');
                ele.tooltip("destroy");
            });
            self.ErrorList([]);
            $("#file-modal .error-div").css('display', 'none');
            $('#file-modal').modal('hide');
        }
           
        self.setOptionDisableColumn = function (option, item) {
            if (item)
                ko.applyBindingsToNode(option, { disable: item.isUsed }, item);
        };

        //self.createTableModel = function (node, tablesPaletteIn) {
        //    var table = node.data;
        //    ko.applyBindings(table, $('#Table_model')[0]);
        //}

        self.updateModel = function (node, tablesPaletteIn) {
            var tables = tablesPaletteIn.model.nodeDataArray;
            self.node = node;
            self.outputTables([]);
            var tempOutputTables = [];
            for (var i = 0; i < tables.length; i++) {
                tempOutputTables.push(JSON.parse(JSON.stringify(tables[i])));
            }

            self.outputTables(tempOutputTables.sort(function (a, b) {
                var at = a.LOGICALTABLENAME.toLowerCase();
                var bt = b.LOGICALTABLENAME.toLowerCase();
                if (at === RES_PRC00008.toLowerCase()) return -1;
                if (bt === RES_PRC00008.toLowerCase()) return 1;
                if (at < bt) return -1;
                if (at > bt) return 1;
                return 0;
            }));

            self.selectedOutputTableID(node.data.OutputTable.WORKSPACETABLEID);

            self.File(ko.mapping.fromJS(node.data));
            self.OutputTable(self.File().OutputTable);
            self.addFileAttributeValidation();
            if (!(node.data.ErrorList == null)) self.ErrorList(JSON.parse(JSON.stringify(node.data.ErrorList)));

            self.File().PurgeByColumn.subscribe(self.purgeByColumnSubscribe);

            //self.isPurgeData(node.data.IsPurgeData);
            //self.purgeByColumn(node.data.PurgeByColumn);
            //self.purgeOperator(node.data.PurgeOperator);
            //self.purgeValue(node.data.PurgeValue);
        }

        self.saveProperties = function () {
            var vm = ko.dataFor($('#file-modal')[0]);
            var node = vm.node;
            if (self.OutputTable().TABLETYPE() === TableTypeEnum.New) {
                
                self.validateNewTable();
                var sourceCols = self.File().ColumnMappings().map(function (item) { return item.sourceColumnName() });
				for	(idx = 0; idx < sourceCols.length; idx++){
					if(sourceCols.indexOf(sourceCols[idx]) !== idx ){
					    self.addError('A source column cannot have more than one mapping!');
						return;
					}
				}
				
                if ($("#file-modal .tab-content .has-error").length > 0) {
                    self.addError('One or more validations failed');
                    return;
                }
                else {
                    var idx = self.ErrorList.indexOf('One or more validations failed');
                    if (idx > -1) self.ErrorList.splice(idx, 1);

                    //ns.loadFileColumns();
                }
            }

            if (self.File().PurgeValue() != undefined) {
                var purgeVal = self.File().PurgeValue().trim();

                if (!ns.IsValidPurgeValue(purgeVal, vm.colType, vm.colSize)) return;
            }

            if (!(self.File().ColumnMappings == null)) {

                var valueArr = self.File().ColumnMappings().map(function (item) { return item.targetColumnName() });
                var isDuplicate = valueArr.some(function (item, idx) {
                    return valueArr.indexOf(item) != idx
                });

                if (isDuplicate) {
                    alert("One Destination Column cannot be mapped to multiple Source Columns!");
                    return false;
                }
            }


            if (self.OutputTable().WORKSPACETABLEID() == null) {
                node.diagram.model.setDataProperty(node.data, "TempID", "");
                canvas.model.setCategoryForNodeData(node.data, "File");
            }
            else if (self.OutputTable().TABLETYPE() === TableTypeEnum.New) {
                var tbl = ns.tempTablesHandle.getTableByLogicalName(self.OutputTable().LOGICALTABLENAME());
                if (tbl != null && tbl.TempID !== self.OutputTable().TempID()) {
                    self.addError('A table with this name is already created in the job.');
                    return;
                }

                var newTableFields = [];
                //self.node.data["ColumnMappings"] = [];
                if (!(self.File().ColumnMappings == null)) {
                    $.each(self.File().ColumnMappings(), function (index, value) {
                        //tempColumnMappings.push(ko.toJS(value));
                        var col = NewTableColumnModel();
                        col.COLUMNID = "";
                        col.LOGICALCOLUMNNAME = value.targetColumnName();
                        col.COLUMNTYPE = value.targetColumnType();
                        col.COLUMNSIZE = value.targetColumnSize();
                        col.LANGCD = value.LANGCD();
                        col.LANGNM = value.LANGNM();
                        $(value.MultiLangs()).each(function (i, ml) {
                            var colML = NewTableColumnModel();
                            colML.COLUMNID = "";
                            colML.LOGICALCOLUMNNAME = ml.targetColumnName();
                            colML.LANGCD = ml.LANGCD();
                            colML.LANGNM = ml.LANGNM();
                            col.MultiLangs.push(colML);
                        });
                        newTableFields.push(col);
                    });
                    self.OutputTable().Fields(newTableFields);
                }

                if (self.OutputTable().TempID() == null) {
                    self.OutputTable().TempID(ns.tempTablesHandle.generateNewID());
                    ns.tempTablesHandle.addTableToList(ko.toJS(self.OutputTable()));
                    if (!(node.data.OutputTable == null) && !(node.data.OutputTable.TempID == null)) {
                        ns.tempTablesHandle.checkAndDeleteUnusedTable(node.data.OutputTable);
                    }
                }
                else {
                    ns.tempTablesHandle.updateTableInList(ko.toJS(self.OutputTable()));
                }

                canvas.model.setCategoryForNodeData(node.data, "FileWithTable");
            }
            else {
                node.diagram.model.setDataProperty(node.data, "TempID", "");
                if (!(node.data.OutputTable == null) && !(node.data.OutputTable.TempID == null)) {
                    ns.tempTablesHandle.checkAndDeleteUnusedTable(node.data.OutputTable);
                }
                canvas.model.setCategoryForNodeData(node.data, "FileWithTable");
            }


            self.File().OutputTable = self.OutputTable();

            var updatedFile = ko.toJS(self.File());
            node.diagram.model.startTransaction("set file properties");
            for (var prop in updatedFile) {
                if (prop !== "category") {
                    node.diagram.model.setDataProperty(node.data, prop, updatedFile[prop] === undefined ? null : updatedFile[prop]);
                }
            }
            //node.diagram.model.setDataProperty(node.data, "IsPurgeData", self.isPurgeData());
            //node.diagram.model.setDataProperty(node.data, "PurgeByColumn", self.purgeByColumn());
            //node.diagram.model.setDataProperty(node.data, "PurgeOperator", self.purgeOperator());
            //node.diagram.model.setDataProperty(node.data, "PurgeValue", self.purgeValue());
            node.diagram.model.commitTransaction("set file properties");
            objPropertiesPanelVM.updatePropertiesPanel(node);
            self.OutputTable(ko.mapping.fromJS(NewTableNodeModel()));
            self.File(ko.mapping.fromJS(NewFileNodeModel()));
            //$("#file-modal").modal('hide');
            self.closeModal();
            delete vm.node;
        }

        self.addFileAttributeValidation = function () {
            $.each(self.File().FileAttributes(), function (idx, attr) {
                if (attr.FILEATTRIBUTETYPE() == "number") {
                    attr.FILEATTRIBUTEVALUE = attr.FILEATTRIBUTEVALUE.extend({ numeric: 0 });
                }
                else if (attr.FILEATTRIBUTETYPE() == "boolean") {
                    //If AttributeType is boolean then convert its value to boolean
                    attr.FILEATTRIBUTEVALUE(attr.FILEATTRIBUTEVALUE() === "1" || attr.FILEATTRIBUTEVALUE() === true);
                }

                attr.FILEATTRIBUTEVALUE.subscribe(function (newValue) {
                    if (this.FILEATTRIBUTEID() === FileAttributeEnum.COL_SEPARATOR || this.FILEATTRIBUTEID() === FileAttributeEnum.ROW_SEPARATOR || this.FILEATTRIBUTEID() === FileAttributeEnum.COL_HEADING_IN_FIRST_ROW || this.FILEATTRIBUTEID() === FileAttributeEnum.HEAD_ROWS || this.FILEATTRIBUTEID() === FileAttributeEnum.QUOTATION) {
                        self.removeAllMapppings();
                    }
                }, attr);
            });
        }

        self.validateNewTable = function () {
            var ele = $('#input-LOGICALTABLENAME-file-' + Ciel.CurrentLang + ' input');
            if (ele.val() == "") {
                ele.closest("div").addClass("has-error");
                ele.addClass("error-element");
                ele.css('border-color', 'red');
                title = 'Table Name cannot be empty!';
                var options = {
                    placement: ele.data('placement') || 'top'
                }
                ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
            }
            else {
                if (ele.closest("div").hasClass("has-error")) {
                    ele.closest("div").removeClass("has-error");
                    ele.removeClass("error-element");
                    ele.css('border-color', '');
                    ele.tooltip("destroy");
                }

                if (Ciel.CurrentLang !== 'en') {
                    var tableElementML = $('#input-LOGICALTABLENAME-file-en input');
                    if (tableElementML.val() == "") {
                        ele.closest("div").addClass("has-error");
                        tableElementML.closest("div").addClass("has-error");
                        tableElementML.addClass("error-element");
                        tableElementML.css('border-color', 'red');
                        title = 'Need to provide english name for this table!';
                        var options = {
                            placement: ele.data('placement') || 'top'
                        }
                        ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                    }
                    else {
                        if (tableElementML.closest("div").hasClass("has-error")) {
                            tableElementML.closest("div").removeClass("has-error");
                            tableElementML.removeClass("error-element");
                            tableElementML.css('border-color', '');

                        }
                    }
                }
            }

            //-----validate columns
            var colNameArr = [];
            $("#process-filemodal-mapping .columnsMapping tbody tr").each(function (idx, item) {
                //validate column name
                ele = $('#input-targetColumnName-file-' + idx + '-' + Ciel.CurrentLang + ' input');
                if (ele.val() == "") {
                    ele.closest("div").addClass("has-error");
                    ele.addClass("error-element");
                    ele.css('border-color', 'red');
                    title = 'Field Name cannot be empty!';
                    var options = {
                        placement: ele.data('placement') || 'top'
                    }
                    ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                }
                else {
                    if (ele.closest("div").hasClass("has-error")) {
                        ele.closest("div").removeClass("has-error");
                        ele.removeClass("error-element");
                        ele.css('border-color', '');
                        ele.tooltip("destroy");
                    }

                    if (Ciel.CurrentLang !== 'en') {
                        var tableElementML = $('#input-targetColumnName-file-' + idx + '-en input');
                        if (tableElementML.val() == "") {
                            ele.closest("div").addClass("has-error");
                            tableElementML.closest("div").addClass("has-error");
                            tableElementML.addClass("error-element");
                            tableElementML.css('border-color', 'red');
                            title = 'Need to provide english name for this field!';
                            var options = {
                                placement: ele.data('placement') || 'top'
                            }
                            ele.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                        }
                        else {
                            if (tableElementML.closest("div").hasClass("has-error")) {
                                tableElementML.closest("div").removeClass("has-error");
                                tableElementML.removeClass("error-element");
                                tableElementML.css('border-color', '');
                            }
                        }
                    }
                }

                var regex;
                var errMessage = "";
                for (var x in ns.ColumnDataTypes2) {
                    if (ns.ColumnDataTypes2[x].Name === $(item).find('.destination-column-type .edit').val()) {
                        regex = new RegExp(ns.ColumnDataTypes2[x].reg);
                        errMessage = ns.ColumnDataTypes2[x].errMessage;
                        break;
                    }
                }

                var element = $(item).find('.destination-column-size .edit');

                if (!element.val().match(regex) && regex != '/^$/') {
                    element.closest("td").addClass("has-error");
                    element.addClass("error-element");
                    element.css('border-color', 'red');
                    title = errMessage;
                    var options = {
                        placement: element.data('placement') || 'bottom'
                    }
                    element.attr("title", title).tooltip(options).tooltip('fixTitle').tooltip('show');
                }
                else {
                    if (element.closest("td").hasClass("has-error")) {
                        element.closest("td").removeClass("has-error");
                        element.removeClass("error-element");
                        element.css('border-color', '');
                        element.tooltip("destroy");
                    }
                }
            });
        }
    }

    function GetPurgeValidationMessages(colType, colSize) {
        var message = '';
        switch (ns.GetDataType(colType)) {
            case 'string':
                //self.operatorList(['=', '<>']);
                message = 'The selected field is of type <b>' + colType + '(' + colSize + ').</b><br/>The purge data value is required and takes at the most ' + colSize + ' character(s) with out dots(.)';
                break;
            case 'number':
                var res = colSize.split(',');
                var scale = parseInt(res[1].trim(), 10);
                var precision = parseInt(res[0].trim(), 10) - scale;
                message = 'The selected field is of type <b>' + colType + '(' + colSize + ').</b><br/>The purge data value is required and takes at the most ' + precision + ' digits before and ' + scale + ' digits after decimal.';
                break;
            case 'date':
                message = 'The selected field is of type <b>' + colType + '.</b><br/>The purge data value is required and it must a valid date in the format YYYY/MM/DD.';
                break;
        }
        return message;
    }

    //Model used for properties in the PropertiesPanel
    function PropertiesPanelAttribute(node, container, updatableAttributeName, displayName, attributeValue, attributeType, additionalData, attributeID) {
        var self = this;
        self.DisplayName = displayName;
        self.AttributeID = attributeID;
        self.AttributeType = attributeType;
        //self.oldValue = '';
        if (self.AttributeType == "boolean") {
            //If AttributeType is boolean then convert its value to boolean
            self.AttributeValue = ko.observable(attributeValue === "1" || attributeValue === true);
        }
        else if (self.AttributeType == "number") {
            self.AttributeValue = ko.observable(attributeValue).extend({ numeric: 0 });
        }
        else {
            self.AttributeValue = ko.observable(attributeValue);
        }
        self.AdditionalData = additionalData;
        self.UpdatableAttributeName = updatableAttributeName; // If updatableAttributeName is null then the property will be read only

        self.AttributeValue.subscribe(function (newValue) {
            if (self.UpdatableAttributeName == null) return;
            if (node) {
                node.diagram.model.startTransaction("properties pane");
                node.diagram.model.setDataProperty(container, self.UpdatableAttributeName, newValue);
                node.diagram.model.commitTransaction("properties pane");
                if (node.category === "File" || node.category === "FileWithTable") {
                    if (self.AttributeID === FileAttributeEnum.COL_SEPARATOR || self.AttributeID === FileAttributeEnum.ROW_SEPARATOR || self.AttributeID === FileAttributeEnum.COL_HEADING_IN_FIRST_ROW || self.AttributeID === FileAttributeEnum.HEAD_ROWS || self.AttributeID === FileAttributeEnum.QUOTATION) {
                        node.data.ColumnMappings = [];
                    }
                }
                else if (node.category === "Table") {
                    if (self.UpdatableAttributeName === "IsTemporary") {
                        ns.tempTablesHandle.updateTableInList(node.data);
                    }
                }
                node.updateTargetBindings();
            }
            else {
                jobViewModel[self.UpdatableAttributeName].forEditing(newValue);
                ns.okJob(jobViewModel, self.UpdatableAttributeName, true);
            }
        });

        //self.AttributeValue.subscribe(function (oldValue) {
        //    console.log(oldValue);
        //    self.oldValue = oldValue;
        //}, self, "beforeChange");
      
        self.modalOpen = function (data, event) {
            if (data.AdditionalData === 'File') {
                modelData.updateModel(node, tablesPalette);
                $("#file-modal").modal('show');
            }
            else if (data.AdditionalData === 'Job') {
                quickSave = false;
                showJobProperties();
            }
            else if (data.AdditionalData === 'Table') {
                quickSave = false;
                tableData.UpdateTableModel(node);
                $("#table-modal").modal('show');
            }
        }
    }

    var showJobProperties = function () {
        canvas.clearSelection();
        $('#job-addedit-modal-errorresult').empty();
        showJobModal();
    }

    function PropertiesPanelViewModel() {
        var self = this;
        // Editable data
        self.attributes = ko.observableArray([]);

        //updates the Properties panel when a node is selected
        self.updatePropertiesPanel = function (node) {
            if (node == undefined) canvas.clearSelection();
            self.attributes([]);
            if (node && node.diagram.selection.count === 1) {

                if (node.category === "File" || node.category === "FileWithTable") {
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "File Name", node.data.FILENAME));
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "File Type", node.data.FILETYPE));
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "File Path", node.data.FILEPATH));
                    $.each(node.data.FileAttributes, function () {
                        self.attributes.push(new PropertiesPanelAttribute(node, this, "FILEATTRIBUTEVALUE", this.FILEATTRIBUTENAME, this.FILEATTRIBUTEVALUE, this.FILEATTRIBUTETYPE, this.FILEATTRIBUTEMASTERDATA, this.FILEATTRIBUTEID));
                    });
                    if (!(node.data.OutputTable.WORKSPACETABLEID == null)) {
                        self.attributes.push(new PropertiesPanelAttribute(node, node.data.OutputTable, null, "Output Table Name", node.data.OutputTable.LOGICALTABLENAME));
                        self.attributes.push(new PropertiesPanelAttribute(node, node.data.OutputTable, null, "Is Temporary", node.data.OutputTable.IsTemporary, "boolean"));
                    }
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, null, "Show File's Detailed Configuration", "hyperlink", "File"));
                }
                else if (node.category === "Table") {
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "Logical Table Name", node.data.LOGICALTABLENAME));
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "Physical Table Name", node.data.PHYSICALTABLENAME));
                    if (node.data.IsTemporary || ns.tempTablesHandle.indexOf(node.data) > -1) {
                        self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "Table Type", TableTypeEnum.New));
                        self.attributes.push(new PropertiesPanelAttribute(node, node.data, "IsTemporary", "Is Temporary", node.data.IsTemporary, "boolean"));
                    }
                    else {
                        self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, "Table Type", node.data.TABLETYPE));
                    }
                    self.attributes.push(new PropertiesPanelAttribute(node, node.data, null, null, "Show Table's Detailed Configuration", "hyperlink", "Table"));
                }
            }
            else if (canvas.selection.count === 0) {
                self.attributes.push(new PropertiesPanelAttribute(null, jobViewModel, "JOBNM", "Job Name", jobViewModel.JOBNM() === '' ? 'Untitled Job' : jobViewModel.JOBNM()));
                self.attributes.push(new PropertiesPanelAttribute(null, jobViewModel, "DESCNT", "Job Description", jobViewModel.DESCNT()));
                self.attributes.push(new PropertiesPanelAttribute(null, jobViewModel, null, "DateTime Created", jobViewModel.CREATEDATE()));
                self.attributes.push(new PropertiesPanelAttribute(null, jobViewModel, null, "DateTime Modified", jobViewModel.MODIFIEDDATE()));
                self.attributes.push(new PropertiesPanelAttribute(null, jobViewModel, null, null, "Show Job's Detailed Configuration", "hyperlink", "Job"));
            }
        };
    }

    function existingTableChange(newTable) {

        var tableName = "";
        var selectedColumnTable;
        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (node.data.LOGICALTABLENAME != "Selected Column") && (node.data.LOGICALTABLENAME != tableText)) {
                tableToRemoveByKey = node.data.key;
                tableName = node.data.LOGICALTABLENAME;
            }
            if (node.data.category == "Table" && node.data.LOGICALTABLENAME == "Selected Column") {
                selectedColumnTable = node.data;
            }
        });
        if (confirm('On changing the table selection all the mapping will be lost') === false) {

            ns.stepData.selectedOutputTableName(tableName);
            return;
        }
        var tableText = newTable;
        var columnsToRemoveByKey = [];
        var linksToRemove = [];
        var tableToRemoveByKey;

        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (node.data.LOGICALTABLENAME != "Selected Column") && (node.data.LOGICALTABLENAME != tableText)) {
                tableToRemoveByKey = node.data.key;
            }
        });

        if (tableToRemoveByKey == "undefined") return;          // if selected table is already exist

        myDiagramModalOutputTable.startTransaction("change table");
        var model = myDiagramModalOutputTable.model;
        myDiagramModalOutputTable.nodes.each(function (node) {          //getting columns to remove
            if (node.data.group == tableToRemoveByKey && node.data.category == "Column")
                columnsToRemoveByKey.push(node.data.key);
        });
        myDiagramModalOutputTable.links.each(function (link) {           //getting links to remove
            linksToRemove.push(link.data);

        });

        for (i = 0; i < linksToRemove.length; i++) {                    // removing links
            model.removeLinkData(linksToRemove[i]);
        }

        for (i = 0; i < columnsToRemoveByKey.length; i++) {                  // removing columns
            model.removeNodeData(model.findNodeDataForKey(columnsToRemoveByKey[i]));
        }
        model.removeNodeData(model.findNodeDataForKey(tableToRemoveByKey));     // removing table


        var numberOfTables = existingTable.length;
        for (i = 0; i < numberOfTables; i++) {

            if (existingTable[i].LOGICALTABLENAME == tableText) {
                existingTable[i].isGroup = true;
                var loc = go.Point.parse(selectedColumnTable.loc);
                loc.x += 500;
                existingTable[i].loc = go.Point.stringify(loc);
                if (existingTable[i].TableType === TableTypeEnum.New) {
                    existingTable[i].TempID = ns.newTablesHandle.generateNewID();
                    if (existingTable[i].IsTemporary) {
                        ns.tempTablesHandle.addTableToList(existingTable[i])
                    }
                    else {
                        ns.newTablesHandle.addTableToList(existingTable[i])
                    }
                }
                model.addNodeData(existingTable[i]);  // adding table
                var tableFields = existingTable[i].Fields;
                //if (tableText == "New Table") {
                //    var table = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Table", WorkspaceTableName: "Selected Column" });
                //    tableFields = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Column", group: table[0].key });
                //}


                for (j = 0; j < tableFields.length; j++) {         // adding columns
                    var newNodeColumn = {};
                    newNodeColumn.group = existingTable[i].key;
                    newNodeColumn.category = "Column";
                    newNodeColumn.LOGICALCOLUMNNAME = tableFields[j].LOGICALCOLUMNNAME === undefined ? tableText + '.' + tableFields[j].LOGICALCOLUMNNAME.split('.')[1] : tableFields[j].LOGICALCOLUMNNAME;
                    newNodeColumn.columnid =  tableFields[j].COLUMNID === undefined ? tableFields[j].columnid :"T" + i + "C" + j + "O" + tableFields[j].COLUMNID;
                    newNodeColumn.columntype = tableFields[j].COLUMNTYPE === undefined ? tableFields[j].columntype : tableFields[j].COLUMNTYPE;
                    model.addNodeData(newNodeColumn);

                    //if (tableText == "New Table") {
                    //    var groupKey = _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Table", WorkspaceTableName: "Selected Column" })[0].key;
                    //    model.addLinkData({
                    //        from: _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Column", group: groupKey, columnid: newNodeColumn.columnid })[0].key,
                    //        to: _.where(myDiagramModalOutputTable.model.nodeDataArray, { category: "Column", group: existingTable[i].key, columnid: newNodeColumn.columnid })[0].key,
                    //    });
                    //}
                }
            }
        }

        myDiagramModalOutputTable.model = model;
        myDiagramModalOutputTable.commitTransaction("change table");

    };

    $(function () {

        Ciel.Process.Api.GetLanguageData(ns, function (ns, langData) {
            ns.AppLanguageData = langData;
        });

        ko.extenders.numeric = function (target, precision) {
            //create a writable computed observable to intercept writes to our observable
            var result = ko.pureComputed({
                read: target,  //always return the original observables value
                write: function (newValue) {
                    var current = target(),
                        roundingMultiplier = Math.pow(10, precision),

                        newValueAsNum = (isNaN(newValue) || newValue < 0) ? target() : +newValue,
                        valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
                    if (newValue == "") {
                        target.notifySubscribers(target());
                    }
                        //only write if it changed
                    else if (valueToWrite !== current) {
                        target(valueToWrite);
                    } else {

                        //if the rounded value is the same, but a different value was written, force a notification for the current field
                        if (newValue !== current) {
                            target.notifySubscribers(valueToWrite);
                        }
                    }
                }
            }).extend({ notify: 'always' });

            //initialize with current value to make sure it is rounded appropriately
            result(target());

            //return the new computed observable
            return result;
        };

        objPropertiesPanelVM = new PropertiesPanelViewModel();
        ko.applyBindings(objPropertiesPanelVM, $('#propertyRead')[0]);
        ko.applyBindings(objPropertiesPanelVM, $('#propertyWrite')[0]);


        if (CURRENT_MODE && CURRENT_MODE === "r") {
            isCanvasReadOnly = true;
        }

        init();
        if (CURRENT_JOB_ID) {
            Ciel.Process.ProcessDesign.CreateJob.jobId = CURRENT_JOB_ID.toString();
            addNewJob();
        }
        else {
            addNewJob();
        }


        modelData = new newFileModel();
        ko.applyBindings(modelData, $('#file-modal')[0]);

        tableData = new tableModel();
        ko.applyBindings(tableData, $('#table-modal')[0]);
        objshowDataViewModel = new showDataViewModel();
        ko.applyBindings(objshowDataViewModel, $('#dataGrid')[0]);
        disableButtons();

        ns.stepData = new stepModel();
        ko.applyBindings(ns.stepData, $('#stepModal')[0]);

        $(window).bind('beforeunload', function () {
            if (canvas.isModified) {
                return "You are moving away from the Canvas Page. All the unsaved changes will be lost. Click 'Cancel' to return to the Canvas.";
            }
        });

    });

    var canvasModifiedHandler = function (e) {

        var btnSave = $("#btnSave");
        var btnNew = $("#btnNew");
        var idx = document.title.indexOf("*");
        if (canvas.isModified) {

            btnSave.removeClass('buttonDisabled').addClass('button').prop("disabled", false);
            btnNew.removeClass('buttonDisabled').addClass('button').prop("disabled", false);
            if (idx < 0) document.title += "*";

        } else {

            if (isNewJob()) {
                btnSave.removeClass('buttonDisabled').addClass('button').prop("disabled", false);
            }
            else {
                btnSave.removeClass('button').addClass('buttonDisabled').prop("disabled", true);
            }

            if (isCanvasEmpty()) {
                btnNew.removeClass('button').addClass('buttonDisabled').prop("disabled", true);
            }
            else {
                btnNew.removeClass('buttonDisabled').addClass('button').prop("disabled", false);
            }

            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    }

    var JobViewModel = function (JOBID, JOBNM, DESCNT, LANGCD, LANGNM, JOBJSON, CREATEDATE, MODIFIEDDATE, NEWDEFFLAG, MultiLangs) {

        var self = this;
        self.isCanvasDirty = ko.observable(false);
        self.JOBID = ko.revertibleObservable(JOBID);
        self.JOBNM = ko.revertibleObservable(JOBNM);
        self.DESCNT = ko.revertibleObservable(DESCNT);
        self.LANGCD = ko.revertibleObservable(LANGCD);
        self.LANGNM = ko.revertibleObservable(LANGNM);
        self.JOBJSON = ko.revertibleObservable(JOBJSON)
        self.CREATEDATE = ko.observable(CREATEDATE);
        self.MODIFIEDDATE = ko.observable(MODIFIEDDATE);
        self.NewDefFlag = ko.revertibleObservable(NEWDEFFLAG);
        self.MultiLangs = [];
        self.MultiLangs.push(MultiLangs);

        self.commit = function () {

            self.JOBID.commit();
            self.JOBNM.commit();
            self.DESCNT.commit();
            self.LANGCD.commit();
            self.LANGNM.commit();
            self.NewDefFlag.commit();
            self.JOBJSON.commit();

            self.MultiLangs[0].JOBID.commit();
            self.MultiLangs[0].JOBNM.commit();
            self.MultiLangs[0].DESCNT.commit();
            self.MultiLangs[0].LANGCD.commit();
            self.MultiLangs[0].LANGNM.commit();
            self.MultiLangs[0].JOBJSON.commit();
            self.MultiLangs[0].NewDefFlag.commit();
        };

        self.reset = function () {
            self.JOBID.reset();
            self.JOBNM.reset();
            self.DESCNT.reset();
            self.LANGCD.reset();
            self.LANGNM.reset();
            self.NewDefFlag.reset();
            self.JOBJSON.reset();

            self.MultiLangs[0].JOBID.reset();
            self.MultiLangs[0].JOBNM.reset();
            self.MultiLangs[0].DESCNT.reset();
            self.MultiLangs[0].LANGCD.reset();
            self.MultiLangs[0].LANGNM.reset();
            self.MultiLangs[0].JOBJSON.reset();
            self.MultiLangs[0].NewDefFlag.reset();
        };

        self.isCanvasDirty.subscribe(function (value) {
            canvasModifiedHandler(canvas);
        });
    }

    var JobViewModelSimple = function (JOBID, JOBNM, DESCNT, LANGCD, LANGNM, JOBJSON, CREATEDATE, MODIFIEDDATE, NEWDEFFLAG, MultiLangs) {
        var self = this;
        self.JOBID = JOBID;
        self.JOBNM = JOBNM;
        self.DESCNT = DESCNT;
        self.LANGCD = LANGCD;
        self.LANGNM = LANGNM;
        self.JOBJSON = JOBJSON;
        self.CREATEDATE = CREATEDATE;
        self.MODIFIEDDATE = MODIFIEDDATE;
        self.NewDefFlag = NEWDEFFLAG;
        self.MultiLangs = [];
        self.MultiLangs.push(MultiLangs);
        self.NewTables = [];
        self.GenerateYAMLFlag = false;
    }

    var jobViewModel;
    var revertJobName;
    var addNewJob = function () {

        Ciel.Process.Api.GetJobML(Ciel.Process.ProcessDesign.CreateJob.jobId, function (mldata) {
            $('#job-addedit-modal-errorresult').empty();

            var model = NewJobModel();
            model.MultiLangs = mldata;

            if (model.LANGCD.trim() == "") {
                model.LANGCD = Ciel.CurrentLang;
            }

            $('#input-JOBNM-MULTILANGS').hide();
            $('#input-DESCNT-MULTILANGS').hide();

            for (var i in model.MultiLangs) {
                if (model.MultiLangs[i].LANGCD == Ciel.CurrentLang) {
                    if (model.MultiLangs[i].JOBID.toString() != Ciel.Process.ProcessDesign.CreateJob.newJobId) {
                        model.JOBID = model.MultiLangs[i].JOBID.toString();
                        model.JOBNM = model.MultiLangs[i].JOBNM;
                        model.DESCNT = model.MultiLangs[i].DESCNT;
                        model.LANGCD = model.MultiLangs[i].LANGCD;
                        model.LANGNM = model.MultiLangs[i].LANGNM;
                        model.JOBJSON = model.MultiLangs[i].JOBJSON;
                        model.CREATEDATE = model.MultiLangs[i].CREATEDATE;
                        model.MODIFIEDDATE = model.MultiLangs[i].MODIFIEDDATE;
                        model.NewDefFlag = model.MultiLangs[i].NewDefFlag;

                        canvas.model = go.Model.fromJson(model.JOBJSON);
                    }
                    model.MultiLangs.splice(i, 1);
                }
            }
            jobViewModel = new JobViewModel(model.JOBID, model.JOBNM, model.DESCNT, model.LANGCD, model.LANGNM, model.JOBJSON, model.CREATEDATE, model.MODIFIEDDATE, model.NewDefFlag,
                new JobViewModel(model.MultiLangs[0].JOBID, model.MultiLangs[0].JOBNM, model.MultiLangs[0].DESCNT, model.MultiLangs[0].LANGCD, model.MultiLangs[0].LANGNM,
                model.MultiLangs[0].JOBJSON, model.MultiLangs[0].CREATEDATE, model.MultiLangs[0].MODIFIEDDATE, model.MultiLangs[0].NewDefFlag, []));

            revertJobName = jobViewModel.JOBNM();

            CielKoBind.BindSimple(jobViewModel, "job-addedit-modal");
            CielKoBind.BindSimple(jobViewModel, "canvasHeader");

            objPropertiesPanelVM.updatePropertiesPanel();

            canvasModifiedHandler(canvas);
        });
    }

    ns.cancelJob = function (data) {
        quickSave = false;
        data.reset();
    }

    ns.okJob = function (data, propertyToValidate, propertyEdit) {
        var newModelML = new JobViewModel(data.MultiLangs[0].JOBID.newValue(), data.MultiLangs[0].JOBNM.newValue(), data.MultiLangs[0].DESCNT.newValue(), data.MultiLangs[0].LANGCD.newValue(), data.MultiLangs[0].LANGNM.newValue(),
            data.MultiLangs[0].JOBJSON.newValue(), data.MultiLangs[0].CREATEDATE(), data.MultiLangs[0].MODIFIEDDATE(), data.MultiLangs[0].NewDefFlag, []);
        var newModel = new JobViewModel(data.JOBID.newValue(), data.JOBNM.newValue(), data.DESCNT.newValue(), data.LANGCD.newValue(), data.LANGNM.newValue(), data.JOBJSON.newValue(), data.CREATEDATE(), data.MODIFIEDDATE(), data.NewDefFlag, newModelML);

        if (validateJob(newModel, false, propertyToValidate)) {
            data.commit();
            $('#job-addedit-modal').modal('hide');
            canvas.clearSelection();
            objPropertiesPanelVM.updatePropertiesPanel();

            canvas.model.startTransaction("set job attributes");
            canvas.model.setDataProperty(canvas.model.modelData, "jobAttributes", ko.toJS(data));
            canvas.model.commitTransaction("set job attributes");
            data.isCanvasDirty(true);

            if ($('#save_job_config').text() == "Ok" || propertyEdit == true) {
                propertyEdit = false;
            }
            else {
                ns.saveJob(newModel);
            }
        }
        else {
            data.reset();
            objPropertiesPanelVM.updatePropertiesPanel();
        }
    }

    ns.newJobWithConfirmation = function (data) {
        var canvas = Ciel.Process.ProcessDesign.CreateJob.globalCanvas;
        if (canvas.isModified) {
            var jobName = data.JOBNM() === '' ? 'Untitled Job' : data.JOBNM();
            $('#confirm_body').text("The Job is not saved. Do you want to save the Job '" + jobName + "' ?");
            $('#new-job-confirm-modal').modal('show');
        }
        else {
            Ciel.Process.ProcessDesign.CreateJob.resetCanvas();
        }
    }

    ns.tempTablesHandle = {
        getTempTablesList: function () {
            if (canvas.model.modelData.tempTableList == null) {
                canvas.model.modelData.tempTableList = [];
            }
            return canvas.model.modelData.tempTableList;
        },
        addTableToList: function (tableData) {
            if (canvas.model.modelData.tempTableList == null) {
                canvas.model.modelData.tempTableList = [];
            }
            canvas.model.modelData.tempTableList.push(tableData);
        },
        removeTableFromList: function (tableData) {
            if (tableData.TempID == null) return false;
            var list = this.getTempTablesList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].TempID == tableData.TempID) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        updateTableInList: function (tableData) {
            var list = this.getTempTablesList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].TempID == tableData.TempID) {
                    var is_same = this.matchColumns(tableData.Fields, list[i].Fields);
                    list[i] = JSON.parse(JSON.stringify(tableData));
                    this.updateAllNodes(tableData, !is_same);
                    return;
                }
            }
        },
        updateAllNodes: function (tableData, clearMappings, currentNode) {
            $.each(canvas.model.nodeDataArray, function (index, nodeData) {
                if (!(nodeData === currentNode) && !(nodeData.TempID == null) && nodeData.TempID === tableData.TempID) {
                    if (nodeData.category === "FileWithTable") {
                        var tbl = JSON.parse(JSON.stringify(tableData));
                        canvas.startTransaction("updateNodes");
                        //canvas.model.setDataProperty(nodeData, "OutputTableName", tbl.WorkspaceTableName);
                        //canvas.model.setDataProperty(nodeData, "IsOutputTableTemporary", tbl.IsTemporary);
                        for (var prop in nodeData.OutputTable) {
                            if (prop !== "category") {
                                canvas.model.setDataProperty(nodeData.OutputTable, prop, tbl[prop] === undefined ? null : tbl[prop]);
                            }
                        }
                        if (clearMappings) {
                            canvas.model.setDataProperty(nodeData, "ColumnMappings", []);
                        }
                        canvas.commitTransaction("updateNodes");
                    }
                    else if (nodeData.category === "Table") {
                        var tbl = JSON.parse(JSON.stringify(tableData));
                        canvas.startTransaction("updateNodes");
                        canvas.model.setDataProperty(nodeData, "LOGICALTABLENAME", tbl.LOGICALTABLENAME);
                        canvas.model.setDataProperty(nodeData, "IsTemporary", tbl.IsTemporary);
                        canvas.model.setDataProperty(nodeData, "Fields", tbl.Fields);
                        canvas.commitTransaction("updateNodes");
                    }
                }



            });
            var node = canvas.findNodeForKey(tableData.key);
            node.findNodesConnected().each(function (node) {
                if (node.data.category == "Step" && node.data.text == "Join") {

                    console.log(node.data);
                    canvas.startTransaction("updateNodes");
                    canvas.model.setDataProperty(node.data, "modalInputTablesMapping", undefined);
                    canvas.model.setDataProperty(node.data, "modalOutputTablesMapping", undefined);
                    canvas.model.setDataProperty(node.data, "fromQuery", undefined);
                    canvas.model.setDataProperty(node.data, "color", "#FF0000");
                    canvas.commitTransaction("updateNodes");
                }
            });

        },
        matchColumns(arr1, arr2) {
            var is_same = (arr1.length == arr2.length) && arr2.every(function (element, index) {
                return (element.COLUMNNAME === arr1[index].COLUMNNAME && element.COLUMNSIZE === arr1[index].COLUMNSIZE && element.COLUMNTYPE === arr1[index].COLUMNTYPE);
            });

            return is_same;
        },
        indexOf: function (tableData) {
            if (tableData.TempID == null) return -1;
            var list = this.getTempTablesList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].TempID == tableData.TempID) {
                    return i;
                }
            }
            return -1;
        },
        getTableByID: function (TempID) {
            if (TempID == null) return -1;
            var list = this.getTempTablesList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].TempID == TempID) {
                    return list[i];
                }
            }
            return null;
        },
        getTableByLogicalName: function (tableName) {
            if (tableName == null) return null;
            var list = this.getTempTablesList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].LOGICALTABLENAME === tableName) {
                    return list[i];
                }
                for (var j = 0; j < list[i].MultiLangs.length; j++) {
                    if (!(list[i].MultiLangs[j].LOGICALTABLENAME === tableName)) {
                        return list[i];
                    }
                }
            }
            return null;
        },
        generateNewID: function () {
            if (canvas.model.modelData.NewComponentID == null) {
                canvas.model.modelData.NewComponentID = 0;
            }
            canvas.model.modelData.NewComponentID += 1;
            return "New_" + canvas.model.modelData.NewComponentID;
        },
        checkAndDeleteUnusedTable: function (tableData) {
            var found = false;

            $.each(canvas.model.nodeDataArray, function (index, nodeData) {
                if (!(nodeData.TempID == null) && nodeData.TempID === tableData.TempID) {
                    found = true;
                    return false;
                }
            });
            if (!found) {
                ns.tempTablesHandle.removeTableFromList(tableData);
            }
        },
        //if (newTablesList.length === 0) {
        //    ns.saveJob(data);
        //    return;
        //}
        validate: function (jobVM) {
            var tablesData = [];
            //$(this.newTablesList).each(function (index, value) {
            //    var tableData = value;
            //    //Validate new permanent tables
            //    tableData.ErrorList = [];
            //    if (tableData.Fields.length === 0) {
            //        tableData.ErrorList.push("Table cannot be created without columns");
            //    }
            //    tablesData.push(tableData);
            //});

            $(ns.tempTablesHandle.getTempTablesList()).each(function (index, tableData) {
                //Validate all temporary tables
                tableData.ErrorList = [];
                if (tableData.Fields.length === 0) {
                    tableData.ErrorList.push("Table cannot be created without columns");
                }
                tablesData.push(tableData);
            });

            jobVM.NewTables = tablesData;
        },

        SuccessHandler: function (savedTables) {
            //refresh tables palette
            loadTableNodes(tablesPalette);

            //clear error messages and new Tables list
            $(savedTables).each(function (index, tableData) {
                canvas.nodes.each(function (node) {
                    if (node.category === "Table" && node.data.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        node.findObject("shape").stroke = "#6bb300";
                        var tbl = JSON.parse(JSON.stringify(tableData));
                        //canvas.model.setDataProperty(node, "data", JSON.parse(JSON.stringify(tableData)));
                        for (var prop in tbl) {
                            if (prop !== "category") {
                                canvas.model.setDataProperty(node.data, prop, tbl[prop] === undefined ? null : tbl[prop]);
                            }
                        }
                        canvas.model.setDataProperty(node.data, "TempID", "");
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                    else if (node.category === "FileWithTable" && node.data.OutputTable.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        var picture = node.findObject("shape");
                        picture.source = CONFIG_APP_BASEURL + "/Areas/Process/Images/databasetable.png";
                        canvas.model.setDataProperty(node.data, "ErrorList", tableData.ErrorList);
                        canvas.model.setDataProperty(node.data, "OutputTable", JSON.parse(JSON.stringify(tableData)));
                        canvas.model.setDataProperty(node.data.OutputTable, "TempID", "");
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                });

            });

            //remove saved permanent tables from list
            $(savedTables).each(function (index, tableData) {
                ns.tempTablesHandle.removeTableFromList(tableData);
            });
            //this.newTablesList = [];

            //ns.saveJob(data);
        },

        FailedHandler: function (newTables, invalidTables) {
            Ciel.Util.GlobalAlert.showWarning('Cannot save job, validation failed for highlighted objects!');
            //TODO: optimize (change loops inside out and use break)
            $(newTables).each(function (index, tableData) {
                canvas.nodes.each(function (node) {
                    if (node.category === "Table" && node.data.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        node.findObject("shape").stroke = "#6bb300";
                        canvas.model.setDataProperty(node.data, "WorkspaceTableID", tableData.WorkspaceTableID);
                        canvas.model.setDataProperty(node.data, "Fields", tableData.Fields);
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                    else if (node.category === "FileWithTable" && node.data.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        var picture = node.findObject("shape");
                        picture.source = CONFIG_APP_BASEURL + "/Areas/Process/Images/databasetable.png";
                        canvas.model.setDataProperty(node.data, "ErrorList", tableData.ErrorList);
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                });
            });

            $(invalidTables).each(function (index, tableData) {
                canvas.nodes.each(function (node) {
                    if (node.category === "Table" && node.data.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        node.findObject("shape").stroke = "red";
                        canvas.model.setDataProperty(node.data, "ErrorList", tableData.ErrorList);
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                    else if (node.category === "FileWithTable" && node.data.TempID === tableData.TempID) {
                        canvas.startTransaction("updateNodes");
                        var picture = node.findObject("shape");
                        picture.source = CONFIG_APP_BASEURL + "/Areas/Process/Images/DatabaseTableError.png";
                        canvas.model.setDataProperty(node.data, "ErrorList", tableData.ErrorList);
                        node.updateTargetBindings();
                        canvas.commitTransaction("updateNodes");
                    }
                });
            });
        }
    }

    ns.saveJob = function (data) {
        var vmSave = new JobViewModelSimple(data.JOBID(), data.JOBNM(), data.DESCNT(), data.LANGCD(), data.LANGNM(), canvas.model.toJson(), data.CREATEDATE(), data.MODIFIEDDATE(), data.NewDefFlag(),
            new JobViewModelSimple(data.MultiLangs[0].JOBID(), data.MultiLangs[0].JOBNM(), data.MultiLangs[0].DESCNT(), data.MultiLangs[0].LANGCD(), data.MultiLangs[0].LANGNM(), data.MultiLangs[0].JOBJSON(),
            data.MultiLangs[0].CREATEDATE(), data.MultiLangs[0].MODIFIEDDATE(), data.MultiLangs[0].NewDefFlag(), []));

        vmSave.JOBID = Ciel.Process.ProcessDesign.CreateJob.jobId;
        vmSave.NewDefFlag = (vmSave.JOBID === Ciel.Process.ProcessDesign.CreateJob.newJobId);

        if (validateJob(vmSave, true)) {
            //validate tables
            ns.tempTablesHandle.validate(vmSave);

            $("#btnSave").removeClass('button').addClass('buttonDisabled').prop("disabled", true);

            Ciel.Process.Api.PostJob(vmSave, function (vmSave, newModel) {
                ns.tempTablesHandle.SuccessHandler(newModel.NewTables);

                revertJobName = jobViewModel.JOBNM();

                $('#job-addedit-modal-errorresult').empty(); //clear validation message
                Ciel.Process.ProcessDesign.CreateJob.jobId = newModel.JOBID;

                vmSave.GenerateYAMLFlag = true;
                vmSave.NewTables = [];
                vmSave.JOBID = Ciel.Process.ProcessDesign.CreateJob.jobId;
                vmSave.NewDefFlag = false;
                vmSave.JOBJSON = canvas.model.toJson();

                //Again save the job with updated updated json after IDs of new components are included in it
                Ciel.Process.Api.PostJob(vmSave, function (vmSave, newModel) {
                    jobViewModel.JOBID(newModel.JOBID);
                    jobViewModel.CREATEDATE(newModel.CREATEDATE);
                    jobViewModel.MODIFIEDDATE(newModel.MODIFIEDDATE);
                    jobViewModel.isCanvasDirty(false);
                    data.isCanvasDirty(false);
                    objPropertiesPanelVM.updatePropertiesPanel();
                    quickSave = false;
                    canvas.isModified = false;
                    if (clearCanvas) {
                        ns.resetCanvas();
                    }
                }, null);

            }, jobSaveWarningHandler);
        }
        else {
            quickSave = true;
            showJobModal();
        }
    }

    ns.showScript = function (data) {
        var vmSave = new JobViewModelSimple(data.JOBID(), data.JOBNM(), data.DESCNT(), data.LANGCD(), data.LANGNM(), canvas.model.toJson(), data.CREATEDATE(), data.MODIFIEDDATE(), data.NewDefFlag(),
            new JobViewModelSimple(data.MultiLangs[0].JOBID(), data.MultiLangs[0].JOBNM(), data.MultiLangs[0].DESCNT(), data.MultiLangs[0].LANGCD(), data.MultiLangs[0].LANGNM(), data.MultiLangs[0].JOBJSON(),
            data.MultiLangs[0].CREATEDATE(), data.MultiLangs[0].MODIFIEDDATE(), data.MultiLangs[0].NewDefFlag(), []));

        vmSave.JOBID = Ciel.Process.ProcessDesign.CreateJob.jobId;
        vmSave.NewDefFlag = (vmSave.JOBID === Ciel.Process.ProcessDesign.CreateJob.newJobId);

        //if (validateJob(vmSave, true)) {
        Ciel.Process.Api.GetJobYAML(vmSave, function (yaml) {
            $('#show-script-modal').find('.modal-body .yaml-container').html(yaml);
            $('.yaml-container').height(getWindowHeight() - 220);
            $('#show-script-modal').modal('show');
        });
        //}
    }

    showDataViewModel = function () {
        var self = this;
        self.myData = ko.observableArray([]);
        var recordArray = [];
        self.gridOptions = {
            dataSource: self.myData
        };
        self.UpdateData = function (datasource, isCleanRecords) {
            if (isCleanRecords) {
                recordArray = [];
                $('#dataviewer').scrollTop(0);
            }
            for (i = 0; i < datasource.length; i++) {
                recordArray.push(datasource[i]);
            }

            self.myData(recordArray);
        }
    }


    ns.ShowTableData = function (tableName, pageNumber, isCleanRecords) {
        $('.panel-body').find('.mapper-loader').show();
        Ciel.Process.Api.GetJobTableData(tableName, pageNumber, function (data) {
            objshowDataViewModel.UpdateData(JSON.parse(data).Table, isCleanRecords)
            $('.panel-body').find('.mapper-loader').hide();
        });
    }

    var jobSaveWarningHandler = function (originalVM, response) {
        ns.tempTablesHandle.FailedHandler(originalVM.NewTables, response.invalidModel.NewTables);
        canvasModifiedHandler(canvas);

        if (response.error[0].Messages.length > 0) {
            validateJob.inputErrorFunc(response.error);
        }
    }

    var validateJob = function (data, isHideTooltip, propertyToValidate) {

        if (isHideTooltip == undefined || isHideTooltip == null) isHideTooltip = false;

        function inputErrorFunc(err) {

            jobViewModel.JOBNM(revertJobName);
            objPropertiesPanelVM.updatePropertiesPanel();
            $('#save_job_config').text("Save");
            setTimeout(function () { $('#job-addedit-modal').modal('show'); }, 300);

            $('#job-addedit-modal-errorresult').empty();
            for (var i in err) {
                var haselement = $('#input-' + err[i].PropertyName).length > 0;

                var msg = "<ul>";
                if (err[i].PropertyName == "JOBREPEAT") {
                    for (var c in err[i].Messages) {
                        msg += "<li><font color=\"#ff0000\">" + err[i].Messages[c] + "</font></li>";
                        msg += "<br/>"
                    }
                }
                else {
                    if (!haselement) {
                        // msg += "<li><strong>" + err[i].PropertyName + "</strong></li>";
                    }
                    for (var c in err[i].Messages) {
                        msg += "<li>" + err[i].Messages[c] + "</li>";
                    }
                }
                msg += "</ul>";

                if (!haselement) {
                    $('#job-addedit-modal-errorresult').append(msg);
                }
                else {
                    $('#input-' + err[i].PropertyName).addClass("has-error");
                    $('#input-' + err[i].PropertyName + " > .form-control").tooltip({ html: true, title: msg, placement: 'right' }).tooltip('show');
                    if (isHideTooltip) {
                        $('#job-addedit-modal .form-control').tooltip('hide');
                    }
                    else {
                        setTimeout(function () {
                            $('#job-addedit-modal .form-control').tooltip('hide');
                        }, 3000);
                    }
                }
            }
        };

        function inputErrorFuncML(err, LANGCD) {
            for (var i in err) {
                var haselement = $('#input-' + err[i].PropertyName + '-' + LANGCD).length > 0;

                var msg = "<ul>";
                if (!haselement) {
                    msg += "<li><strong>" + err[i].PropertyName + "</strong></li>";
                }
                for (var c in err[i].Messages) {
                    msg += "<li>" + err[i].Messages[c] + "</li>";
                }
                msg += "</ul>";

                if (!haselement) {
                    $('#job-addedit-modal-errorresult').append(msg);
                } else {

                    $('#input-' + err[i].PropertyName + '-' + LANGCD).addClass("has-error");
                    $('#input-' + err[i].PropertyName + '-' + LANGCD + " > .form-control").tooltip({ html: true, title: msg, placement: 'right' }).tooltip('show');
                    setTimeout(function () {
                        $('#job-addedit-modal .form-control').tooltip('hide');
                    }, 3000);
                }
            }
        };

        validateJob.inputErrorFunc = inputErrorFunc;

        $('#job-addedit-modal .has-error').removeClass('has-error');
        //$('#job-addedit-modal .form-control').tooltip('destroy');

        var model = ko.toJS(data);

        // validation
        var err = NewJobValidation(model);
        if (err.length > 0) {
            if (propertyToValidate && $.type(propertyToValidate) === 'string') {
                var validationModel = err.filter(function (item) { return item.PropertyName === propertyToValidate });
                return !(validationModel && validationModel.length > 0);
            }
            else {
                inputErrorFunc(err);
                canvas.clearSelection();
                return false;
            }
        }

        for (var i in model.MultiLangs) {
            var mldata = model.MultiLangs[i];
            if (mldata == null || (mldata.JOBNM.trim() == "" && mldata.DESCNT.trim() == "")) {
                continue;
            }
            var clone = cloneObject(model);
            clone.LANGCD = mldata.LANGCD;
            clone.JOBNM = mldata.JOBNM;
            err = NewJobValidation(clone);
            if (err.length > 0) {
                inputErrorFuncML(err, mldata.LANGCD);
                canvas.clearSelection();
                return false;
            }
        }

        return true;
    }

    function stepClicked(e, obj) {
        if (isCanvasReadOnly) {
            return;
        }
        currentStep = obj.part;
        if (typeof currentStep.data.inputTablesByOrder === "undefined") {
            currentStep.data.inputTablesByOrder = [];
            currentStep.data.relationExpression = {};
        }


        function addTemplateForDiagram(MyDiagram, input) {
            MyDiagram.groupTemplateMap.add("Table", Ciel.Process.ProcessDesign.CreateJob.groupTemplateForTable());  // end Group and call to add to template Map
            if (input) {
                MyDiagram.nodeTemplateMap.add("Column", Ciel.Process.ProcessDesign.CreateJob.nodeTemplateForColumn());
            } else {
                MyDiagram.nodeTemplateMap.add("Column", Ciel.Process.ProcessDesign.CreateJob.nodeTemplateForColumnInOutputCanvas());
            }

        }

        existingTable = JSON.parse(JSON.stringify(tablesPalette.model.nodeDataArray));


        // temp location start # for loading/getting existingTable
        numberOfTables = existingTable.length;

        ns.stepData.updateModel(obj, tablesPalette);

        if (typeof currentStep.data.modalInputTablesMapping !== "undefined") {
            addTemplateForDiagram(myDiagramModalInputTable, true);

            myDiagramModalInputTable.linkTemplate = Ciel.Process.ProcessDesign.CreateJob.linkTemplateForRelationsMapping();

            //myDiagramModalInputTable.model = go.Model.fromJson(JSON.parse(JSON.stringify(currentStep.data.modalInputTablesMapping)));
            var inputMappingJsonString = ns.GetJsonString(currentStep.data.modalInputTablesMapping);
            myDiagramModalInputTable.model = go.Model.fromJson(JSON.parse(inputMappingJsonString));

            addTemplateForDiagram(myDiagramModalOutputTable, false);
            myDiagramModalOutputTable.linkTemplate = Ciel.Process.ProcessDesign.CreateJob.linkTemplateForMapping();

            //myDiagramModalOutputTable.model = go.Model.fromJson(JSON.parse(JSON.stringify(currentStep.data.modalOutputTablesMapping)));
            var outputMappingJsonString = ns.GetJsonString(currentStep.data.modalOutputTablesMapping);
            myDiagramModalOutputTable.model = go.Model.fromJson(JSON.parse(outputMappingJsonString));

            var tableName = "";
            myDiagramModalOutputTable.nodes.each(function (node) {
                if (node.data.category == "Table" && (node.data.LOGICALTABLENAME != "Selected Column")) {
                    tableName = node;
                }
            });
            if (tableName !== "") {
                if (tableName.data.IsTemporary || (tableName.data.TempID != null && ns.newTablesHandle.indexOf(tableName.data) > -1)) {
                    ns.stepData.selectedOutputTableName(RES_PRC00008);
                    ns.stepData.newOutputTableName(tableName.data.LOGICALTABLENAME);
                    ns.stepData.OutputTableType(TableTypeEnum.New);
                }
                else {
                    ns.stepData.selectedOutputTableName(tableName.data.LOGICALTABLENAME);
                    ns.stepData.OutputTableType(TableTypeEnum.Existing);
                }
            }
            
            //$("#existingTable").val(tableName);
            // ns.stepData.selectedOutputTableName(tableName);
        }
        else {

            /*input table start*/
            var tablesToCurrentStep = [];
            var lastKey = 0;
            var lastKey = myDiagramModalInputTable.model.nodeDataArray.length === 0 ? -1 : myDiagramModalInputTable.model.nodeDataArray[myDiagramModalInputTable.model.nodeDataArray.length - 1].key - 1;
            currentStep.data.inputTablesByOrder = [];
            currentStep.data.relationExpression = {};
            currentStep.findNodesInto().each(function (n) {
                if (n.data.category == "Table") {
                    tablesToCurrentStep.push(n.data);
                }
                else {
                    if (n.data.category == "FileWithTable") {
                                n.data.OutputTable.key = n.data.key;
                                n.data.OutputTable.from = n.data.key;
                                n.data.OutputTable.to = n.data.to;
                                tablesToCurrentStep.push(n.data.OutputTable);
                    }
                }
            });

            var TableInJson = [];
            var nodeDataArray = [];
            nodeDataArray = Ciel.Process.ProcessDesign.CreateJob.getTablesInGroupFormat(JSON.parse(JSON.stringify(tablesToCurrentStep)));

            var linkDataArray = [];

            addTemplateForDiagram(myDiagramModalInputTable, true);

            myDiagramModalInputTable.linkTemplate = Ciel.Process.ProcessDesign.CreateJob.linkTemplateForRelationsMapping();

            myDiagramModalInputTable.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

            var tablesFromCurrentStep = [];
            currentStep.findNodesOutOf().each(function (n) {
                if (n.data.category == "Table") {
                    tablesFromCurrentStep.push(n.data);
                }
            });


            TableInJson = [];
            nodeDataArray = [];
            /* #ltmctooc end */
            nodeDataArray.push({
                category: "Table",
                LOGICALTABLENAME: "Selected Column",
                isGroup: true
            });

            TableInJson = JSON.parse(JSON.stringify(tablesFromCurrentStep));
            if (TableInJson.length != 0) {

                nodeDataArray.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(TableInJson[0]));
                Array.prototype.push.apply(nodeDataArray, Ciel.Process.ProcessDesign.CreateJob.getColumnsFromTable(TableInJson[0], 0));
                //select.value = TableInJson[0].WorkspaceTableName;
                if (TableInJson[0].IsTemporary || (TableInJson[0].TempID != null && ns.newTablesHandle.indexOf(TableInJson[0]) > -1)) {
                    ns.stepData.selectedOutputTableName(RES_PRC00008);
                    ns.stepData.newOutputTableName(TableInJson[0].LOGICALTABLENAME);
                    ns.stepData.OutputTableType(TableTypeEnum.New);
                }
                else {
                    ns.stepData.selectedOutputTableName(TableInJson[0].LOGICALTABLENAME);
                    ns.stepData.OutputTableType(TableTypeEnum.Existing);
                }
                // ns.stepData.selectedOutputTableName(TableInJson[0].WorkspaceTableName);
            }
            else {
                ns.stepData.selectedOutputTableName('');
                ns.stepData.newOutputTableName('');
                ns.stepData.OutputTableType('');
            }

            linkDataArray = [];
            addTemplateForDiagram(myDiagramModalOutputTable, false);
            myDiagramModalOutputTable.linkTemplate = Ciel.Process.ProcessDesign.CreateJob.linkTemplateForMapping();
            myDiagramModalOutputTable.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
            if (TableInJson.length != 0) {
                myDiagramModalOutputTable.startTransaction("reposition output table");
                myDiagramModalOutputTable.model.setDataProperty(myDiagramModalOutputTable.model.nodeDataArray[1], "loc", "500 0");
                myDiagramModalOutputTable.commitTransaction("reposition output table");
            }

        }
        // temp location end

        numberOfTables = existingTable.length;
        ns.stepData.updateModelForPurge(obj, tablesPalette);

        $('#collapseOne').collapse('show');
        setTimeout(function () { $('#stepModal').modal('show'); }, 200); // let the accoridan's first panel finish its animation before modal show
    }

    ns.CreateCanvas = function (divID) {

        return goJs(go.Diagram, divID,  // must name or refer to the DIV HTML element
    {
        //doubleClick: showJobModal,
        initialContentAlignment: go.Spot.TopLeft,
        resizingTool: new laneResizingTool(),
        layout: goJs(groupLayout),
        mouseDragOver: function (e) {
            if (executeDragOver) {
                executeDragOver = false;
                var nodeCount = 0;
                var it = canvas.toolManager.draggingTool.draggingParts.iterator;
                while (it.next()) {
                    if (nodeCount > 0) {
                        var node = it.value;
                        node.containingGroup.collapseSubGraph();
                    }
                    nodeCount++;
                }
            }
        },
        ExternalObjectsDropped: function (e) {
            e.subject.each(function (node) {
                node.opacity = 1;
            });
            canvas.commandHandler.expandSubGraph();
            canvas.zoomToFit();
        },
        allowDrop: true,  // must be true to accept drops from the Palette
        // what to do when a drag-drop occurs in the Diagram's background
        mouseDrop: function (e) { finishDrop(e, null); },
        //"LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
        //"LinkRelinked": showLinkLabel,
        "animationManager.duration": 600, // slightly longer than default (600ms) animation
        "undoManager.isEnabled": true,  // enable undo & redo
        // allow Ctrl-G to call groupSelection()
        "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue", category: "Table" },
        "linkingTool.isUnconnectedLinkValid": false,
        "relinkingTool.isUnconnectedLinkValid": false,
        "linkingTool.linkValidation": function (from, fromPort, to, toPort, link) {

            if (from.findLinksBetween(to, null, null).count == 1) return false;
            return from.containingGroup !== to.containingGroup;
        },
        "commandHandler.canDeleteSelection": function () {
            var link = this.diagram.selection.first();
            if (link != null && link.part instanceof go.Link) {
                return true;
            } else {
                return false;
            }
        },
    });
    }

    function columnCompareFunction(a, b) {
        var at = a.data.LOGICALCOLUMNNAME.toLowerCase();
        var bt = b.data.LOGICALCOLUMNNAME.toLowerCase();
        if (at === 'all') {
            return -1;
        }
        if (at < bt) return -1;
        if (at > bt) return 1;
        return 0;
    }

    ns.groupTemplateForTable = function () {
        return goJs(go.Group, "Auto",
            {
                dragComputation: avoidNodeOverlap,
                background: "transparent",
                ungroupable: true,
                // highlight when dragging into the Group
                mouseDragEnter: function (e, grp, prev) { Ciel.Process.ProcessDesign.CreateJob.highlightGroup(e, grp, true); },
                mouseDragLeave: function (e, grp, next) { Ciel.Process.ProcessDesign.CreateJob.highlightGroup(e, grp, false); },
                computesBoundsAfterDrag: true,
                // when the selection is dropped into a Group, add the selected Parts into that Group;
                // if it fails, cancel the tool, rolling back any changes
                mouseDrop: Ciel.Process.ProcessDesign.CreateJob.finishDropForTable,
                //  allowDrop: false,
                handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                // Groups containing Nodes lay out their members vertically
                layout:
                  goJs(go.GridLayout,
                    {
                        wrappingColumn: 1, alignment: go.GridLayout.Position,
                        cellSize: new go.Size(0, 0), spacing: new go.Size(0, 0),
                        comparer: columnCompareFunction
                    })
            },
            new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            goJs(go.Shape, "Rectangle",
              { fill: null, stroke: "#ccc" }),
            goJs(go.Panel, "Vertical",  // title above Placeholder
              goJs(go.Panel, "Horizontal",  // button next to TextBlock
                { stretch: go.GraphObject.Horizontal, background: "#ccc" },
                goJs("SubGraphExpanderButton",
                  { alignment: go.Spot.Right, margin: 5 }),
                goJs(go.TextBlock,
                  {
                      alignment: go.Spot.Left,
                      editable: true,
                      margin: 5,
                      font: "bold 16px sans-serif",
                      opacity: 0.75,
                      stroke: "#404040"
                  },
                  new go.Binding("text", "LOGICALTABLENAME").makeTwoWay())
              ),  // end Horizontal Panel
              goJs(go.Placeholder,
                { padding: 6, alignment: go.Spot.TopLeft })
            )  // end Vertical Panel
          );
    }

    ns.nodeTemplateForColumn = function () {
        return goJs(go.Node, "Auto", Ciel.Process.ProcessDesign.CreateJob.nodeStyleForColumn(),
                          goJs(go.Shape, "Rectangle", shapeStyle(),
                              { fill: "transparent", stroke: null, },
                             new go.Binding("fill", "color")),
                         // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                         goJs(go.Panel, "Table",
                                     { defaultAlignment: go.Spot.TopCenter, name: "PANEL" },
                                      goJs(go.RowColumnDefinition, { column: 0, width: 8 }),
                                      goJs(go.RowColumnDefinition, { column: 1 }),
                                      goJs(go.RowColumnDefinition, { column: 2, width: 5 }),
                                     goJs(go.Panel, "Vertical",
                                  { row: 0, column: 1, margin: 5, defaultAlignment: go.Spot.TopCenter },
                                  goJs("CheckBox", "checked",
                                            { row: 0, column: 1, margin: 1 }, { "_buttonFillOver": "transparent", "_buttonStrokeOver": "black" },

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 13px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040"
                                      },
                                      new go.Binding("text", "LOGICALCOLUMNNAME").makeTwoWay()),

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 10px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040",
                                           visible: false
                                      },
                                      new go.Binding("text", "columntype").makeTwoWay()),

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 13px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040",
                                          visible: false
                                      },
                                      new go.Binding("text", "columnid").makeTwoWay()),

                                      { "_doClick": function (e, obj) { Ciel.Process.ProcessDesign.CreateJob.updatedColumnInTable(e, obj); } },
                                       new go.Binding("checked", "checked").makeTwoWay()
                                  ))),
                         //// four named ports, one on each side:

                          Ciel.Process.ProcessDesign.CreateJob.makePortForColumn("L", go.Spot.Left, true, true),
                          Ciel.Process.ProcessDesign.CreateJob.makePortForColumn("R", go.Spot.Right, true, true)
                       );
    }

    ns.nodeTemplateForColumnInOutputCanvas = function () {
        return goJs(go.Node, "Auto", Ciel.Process.ProcessDesign.CreateJob.nodeStyleForColumn(),
                          goJs(go.Shape, "Rectangle", shapeStyle(),
                              { fill: "transparent", stroke: null, },
                             new go.Binding("fill", "color")),
                         // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                         goJs(go.Panel, "Table",
                                     { defaultAlignment: go.Spot.TopCenter, name: "PANEL" },
                                      goJs(go.RowColumnDefinition, { column: 0, width: 8 }),
                                      goJs(go.RowColumnDefinition, { column: 1 }),
                                      goJs(go.RowColumnDefinition, { column: 2, width: 5 }),
                                     goJs(go.Panel, "Horizontal",
                                  { row: 0, column: 1, margin: 5, defaultAlignment: go.Spot.TopCenter },
                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 13px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040"
                                      },
                                      new go.Binding("text", "LOGICALCOLUMNNAME").makeTwoWay()),

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 10px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040",
                                          visible: false
                                      },
                                      new go.Binding("text", "columntype").makeTwoWay()),

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 13px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040",
                                          visible: false
                                      },
                                      new go.Binding("text", "columnid").makeTwoWay())
                                )),
                         //// four named ports, one on each side:

                          Ciel.Process.ProcessDesign.CreateJob.makePortForColumn("L", go.Spot.Left, true, true),
                          Ciel.Process.ProcessDesign.CreateJob.makePortForColumn("R", go.Spot.Right, true, true)
                       );
    }

    ns.linkTemplateForRelationsMapping = function () {

        return goJs(go.Link,  // the whole link panel
        {
            //routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4, fromShortLength: 10,
            relinkableFrom: false,
            relinkableTo: false,
            // reshapable: true,
            resegmentable: true,
            selectionAdorned: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
            contextMenu: goJs(go.Adornment)
        },
        new go.Binding("points").makeTwoWay(),
        goJs(go.Shape,  // the highlight shape, normally transparent
          { isPanelMain: true, strokeWidth: 2, stroke: "transparent", name: "HIGHLIGHT" }),
        goJs(go.Shape,  // the link path shape
          { isPanelMain: true, stroke: "gray", strokeWidth: 1 }, new go.Binding("stroke", "color").makeTwoWay()),
        //goJs(go.Shape,  // the arrowhead
        //  { toArrow: "standard", stroke: "gray", strokeWidth: 3, fill: "gray" }),
        goJs(go.Panel, "Auto",  // the link label, normally not visible
          { visible: true, name: "LABEL", segmentFraction: 0.5 },
          new go.Binding("visible", "visible").makeTwoWay(),
          goJs(go.Shape, "RoundedRectangle",  // the label shape
            { fill: "#f4f2f2", stroke: null }),
             goJs(go.Picture,
                      {
                          name: 'Picture',
                          desiredSize: new go.Size(20, 20),
                          source: CONFIG_APP_BASEURL + "/Areas/Process/Images/InnerJoin.png",
                          toolTip:  // define a tooltip for each node that displays the color as text
                            goJs(go.Adornment, "Auto",
                              goJs(go.Shape, { fill: "#FFFFCC" }),
                               goJs(go.TextBlock, new go.Binding("text", "", function (obj) {
                                   var relationType = "InnerJoin";
                                   return (relationType + ": "
                                       + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.from).data.group).data.LOGICALTABLENAME + "." +
                                       myDiagramModalInputTable.findNodeForKey(obj.from).data.LOGICALCOLUMNNAME + " = " +
                                       myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.to).data.group).data.LOGICALTABLENAME +
                                       "." + myDiagramModalInputTable.findNodeForKey(obj.to).data.LOGICALCOLUMNNAME);
                               }), { margin: 4 },
                              new go.Binding("text", "toolTipText"))
                            ),  // end of Adornment

                      },
                       new go.Binding("angle", "angle").makeTwoWay(),
                       new go.Binding("source", "relationType", Ciel.Process.ProcessDesign.CreateJob.getSourceForRelation).makeTwoWay())
        )
      );
    }






    // for output model only
    ns.linkTemplateForMapping = function () {
        return goJs(go.Link,  // the whole link panel
        {
            //routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
        },
        new go.Binding("points").makeTwoWay(),
        goJs(go.Shape,  // the highlight shape, normally transparent
          { isPanelMain: true, strokeWidth: 2, stroke: "transparent", name: "HIGHLIGHT" }),
        goJs(go.Shape,  // the link path shape
          { isPanelMain: true, stroke: "gray", strokeWidth: 1 }, new go.Binding("stroke", "color").makeTwoWay())
        //goJs(go.Shape,  // the arrowhead
        //  { toArrow: "none", stroke: "gray", strokeWidth: 3, fill: "gray" })
      );
    }

    ns.finishDropForTable = function (e, grp) {
        var ok = (grp !== null
                  ? (e.diagram.currentTool.doCancel())
                  : e.diagram.currentTool.doCancel());
        if (!ok) e.diagram.currentTool.doCancel();
    }


    ns.makePortForColumn = function (name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        var shape;
        if (name == "T") {
            shape = "TriangleUp";
            width = 20;
            height = 10;
        } else if (name == "R") {
            shape = "TriangleRight";
            width = 10;
            height = 15;
        } else if (name == "L") {
            shape = "TriangleLeft";
            width = 10;
            height = 15;
        } else {
            shape = "TriangleDown";
            width = 20;
            height = 10;
        }

        return goJs(go.Shape, shape,
                 {

                     fill: "transparent",
                     stroke: null,  // this is changed to "white" in the showPorts function
                     desiredSize: new go.Size(width, height),
                     alignment: spot, alignmentFocus: spot,
                     alignmentFocus: spot.opposite(),// align the port on the main Shape
                     portId: name,  // declare this object to be a "port"
                     fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                     fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                     cursor: "pointer",// show a different cursor to indicate potential link point
                     fromMaxLinks: 1,
                     toMaxLinks: 1,

                 })
    }

    ns.UpdateColumnInOutputNewTable = function (columnNode, columnName) {

        var newTable = _.where(myDiagramModalOutputTable.model.nodeDataArray, { TableType: "New", category: "Table" });
        var newNodeColumn = {};
        if (newTable.length) {
            newNodeColumn.group = key;
            newNodeColumn.category = "Column";
            newNodeColumn.LOGICALCOLUMNNAME = newTable[0].LOGICALTABLENAME + "." + columnName;
            newNodeColumn.columnid = columnNode.columnid;
            newNodeColumn.columntype = columnNode.columntype;
            return newNodeColumn;
        }
    }

    ns.updatedColumnInTable = function (e, obj) {
        var key;
        var key2;
        var outputModel = myDiagramModalOutputTable.model;
        if (e.diagram.model == outputModel) {
            return;
        }
        var inputModel = myDiagramModalInputTable.model;
        var selectedColumn = obj.part.data;
        if (selectedColumn.LOGICALCOLUMNNAME == "All") {
            myDiagramModalInputTable.nodes.each(function (node) {
                if (node.data.category == "Column" && node.data.group == selectedColumn.group && node.data.LOGICALCOLUMNNAME != "All") {
                    inputModel.startTransaction("update checkbox");
                    if (selectedColumn.checked) inputModel.setDataProperty(node.data, "checked", true);
                    else inputModel.setDataProperty(node.data, "checked", false);
                    inputModel.commitTransaction("update checkbox");
                }
            });
        }
        else {
            var updateAllCheck = false;
            myDiagramModalInputTable.nodes.each(function (node) {
                if (node.data.group == selectedColumn.group && (node.data.checked == false || typeof node.data.checked === "undefined")) {
                    updateAllCheck = true;
                }
                myDiagramModalInputTable.nodes.each(function (node) {
                    if (node.data.category == "Column" && node.data.group == selectedColumn.group && node.data.LOGICALCOLUMNNAME == "All") {
                        inputModel.startTransaction("update checkbox");
                        inputModel.setDataProperty(node.data, "checked", !updateAllCheck);
                        inputModel.commitTransaction("update checkbox");
                    }
                });
            });

        }


        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.LOGICALTABLENAME == "Selected Column")
            { key = node.data.key; }
            if (typeof node.data.TableType !== "undefined" && node.data.TableType === TableTypeEnum.New)
            { key2 = node.data.key; }
        });

        //adding column
        myDiagramModalInputTable.nodes.each(function (n) {

            if (n.data.category == "Column" && n.data.LOGICALCOLUMNNAME != "All") {
                if (n.data.checked == true) {

                    var tableName = myDiagramModalInputTable.model.findNodeDataForKey(n.data.group).LOGICALTABLENAME;

                    var newNodeColumn = {};
                    var removeColumn = {};
                    newNodeColumn.group = key;
                    newNodeColumn.category = "Column";
                    newNodeColumn.LOGICALCOLUMNNAME = tableName + "." + n.data.LOGICALCOLUMNNAME;
                    newNodeColumn.columnid = n.data.columnid;
                    newNodeColumn.columntype = n.data.columntype;

                    var newNodeColumn2 = {};
                    var removeColumn2 = {};
                    if (typeof _.where(myDiagramModalOutputTable.model.nodeDataArray, { TableType: "New", category: "Table" })[0] === "undefined") {
                        key2 = undefined;
                    }
                    if (typeof key2 !== "undefined") {
                        var newTable = _.where(myDiagramModalOutputTable.model.nodeDataArray, { TableType: "New", category: "Table" });
                        newNodeColumn.group = key2;
                        newNodeColumn.category = "Column";
                        newNodeColumn.LOGICALCOLUMNNAME =n.data.LOGICALCOLUMNNAME;
                        newNodeColumn.COLUMNID = n.data.COLUMNID;
                        newNodeColumn.COLUMNTYPE = n.data.COLUMNTYPE;
                    }
                   
                   


                    var add = true;
                    var add1 = true;
                    myDiagramModalOutputTable.nodes.each(function (node) {
                        if (node.data.COLUMNID == n.data.COLUMNID && outputModel.findNodeDataForKey(node.data.group).LOGICALTABLENAME == "Selected Column") {
                            // depens on columnid if everycolumn in diagram has unique id  then modify here
                            add = false;
                            removeColumn = node.data;
                            newNodeColumn.key = node.data.key;
                        }
                    });


                    if (add) {
                        myDiagramModalOutputTable.startTransaction("make new node");
                        outputModel.addNodeData(newNodeColumn);
                        myDiagramModalOutputTable.commitTransaction("make new node");

                    } else {
                        myDiagramModalOutputTable.startTransaction("make new node");
                        outputModel.removeNodeData(removeColumn);
                        outputModel.addNodeData(newNodeColumn);
                        myDiagramModalOutputTable.commitTransaction("make new node");
                    }
                    if (typeof key2 !== "undefined") {
                        myDiagramModalOutputTable.nodes.each(function (node) {
                            if (node.data.columnid == n.data.columnid && node.data.group === key2 && outputModel.findNodeDataForKey(node.data.group).TableType === TableTypeEnum.New) {
                                add1 = false;
                                removeColumn2 = node.data;
                                // newNodeColumn.columnname = outputModel.findNodeDataForKey(node.data.group).WorkspaceTableName + "." + n.data.columnname;
                                newNodeColumn2.key = node.data.key;
                            }
                        });

                        //if (add1) {
                        //    myDiagramModalOutputTable.startTransaction("make new node");
                        //    outputModel.addNodeData(newNodeColumn2);
                        //    outputModel.addLinkData({
                        //        from: newNodeColumn.key,
                        //        to: newNodeColumn2.key

                        //    });
                        //    myDiagramModalOutputTable.commitTransaction("make new node");

                        //} else {
                        //    myDiagramModalOutputTable.startTransaction("make new node");
                        //    outputModel.removeNodeData(removeColumn2);
                        //    outputModel.addNodeData(newNodeColumn2);
                        //    myDiagramModalOutputTable.commitTransaction("make new node");
                        //}
                    }
                    
                } else {
                    var newNodeColumn = {};
                    var remove = false;
                    myDiagramModalOutputTable.nodes.each(function (node) {
                        if (node.data.COLUMNID == n.data.COLUMNID && outputModel.findNodeDataForKey(node.data.group).LOGICALTABLENAME == "Selected Column") {
                            newNodeColumn = node;
                            remove = true;
                        }
                    });

                    if (remove) {
                        var linkToRemove;
                        newNodeColumn.findLinksConnected().each(function (link) {
                            linkToRemove = link;
                        })
                        if (linkToRemove !== undefined) {
                            myDiagramModalOutputTable.startTransaction("make new node");
                            outputModel.removeLinkData(linkToRemove.data);
                            myDiagramModalOutputTable.commitTransaction("make new node");
                        }
                        myDiagramModalOutputTable.startTransaction("make new node");
                        outputModel.removeNodeData(newNodeColumn.data);
                        myDiagramModalOutputTable.commitTransaction("make new node");
                    }
                    if (typeof key2 !== "undefined") {
                        var remove = false;
                        myDiagramModalOutputTable.nodes.each(function (node) {
                            if (node.data.columnid == n.data.columnid && node.data.group === key2 && outputModel.findNodeDataForKey(node.data.group).TableType == TableTypeEnum.New) {
                                newNodeColumn = node;
                                remove = true;
                            }
                        });

                        if (remove) {
                            var linkToRemove;
                            newNodeColumn.findLinksConnected().each(function (link) {
                                linkToRemove = link;
                            })
                            if (linkToRemove !== undefined) {
                                myDiagramModalOutputTable.startTransaction("make new node");
                                outputModel.removeLinkData(linkToRemove.data);
                                myDiagramModalOutputTable.commitTransaction("make new node");
                            }
                            myDiagramModalOutputTable.startTransaction("make new node");
                            outputModel.removeNodeData(newNodeColumn.data);
                            myDiagramModalOutputTable.commitTransaction("make new node");
                        }
                    }
                    
                }
            }
        });


    }

    ns.nodeStyleForColumn = function () {
        return [
          // The Node.location comes from the "loc" property of the node data,
          // converted by the Point.parse static method.
          // If the Node.location is changed, it updates the "loc" property of the node data,
          // converting back using the Point.stringify static method.
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          {
              resizable: false,
              selectable: false,
              locationSpot: go.Spot.Center,
              //doubleClick: function () { $('#myModal').modal('show'); },
              // the Node.location is at the center of each node
              resizeObjectName: 'shape',
              locationSpot: go.Spot.Center,
              //isShadowed: true,
              //shadowColor: "#888",
              // handle mouse enter/leave events to show/hide the ports
              mouseEnter: function (e, obj) {
                  if (obj.part.data.LOGICALCOLUMNNAME === "All")
                      showPorts(obj.part, false);
                  else
                      showPorts(obj.part, true);
              },
              mouseLeave: function (e, obj) { showPorts(obj.part, false); }
          }
        ];
    }

    ns.getSourceForRelation = function (relationType) {
        if (relationType != "") {
            if (relationType.indexOf('http') > -1) {
                return relationType;
            }
            else {
                return CONFIG_APP_BASEURL + "/Areas/Process/Images/" + relationType.replace(' ', '') + ".png";
            }
        }
        else { return CONFIG_APP_BASEURL + "/Areas/Process/Images/InnerJoin.png"; }
    }

    ns.highlightGroup = function (e, grp, show) {
        if (!grp) return;
        e.handled = true;
        if (show) {
            // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
            // instead depend on the DraggingTool.draggedParts or .copiedParts
            var tool = grp.diagram.toolManager.draggingTool;
            var map = tool.draggedParts || tool.copiedParts;  // this is a Map
            // now we can check to see if the Group will accept membership of the dragged Parts
            if (grp.canAddMembers(map.toKeySet())) {
                grp.isHighlighted = true;
                return;
            }
        }
        grp.isHighlighted = false;
    }

    ns.getStringFromBool = function (bool) {
        if (typeof bool !== "undefined" && bool === true) {
            return "1";
        } else {
            return "0";
        }
    }
    ns.getRelationType = function (linkData) {

        var checkString = Ciel.Process.ProcessDesign.CreateJob.getStringFromBool(linkData.checked1)
            + Ciel.Process.ProcessDesign.CreateJob.getStringFromBool(linkData.checked2)
            + Ciel.Process.ProcessDesign.CreateJob.getStringFromBool(linkData.checked3);

        var relationType;
        if (checkString === "000" || checkString === "010") {
            return "INNER JOIN";
        }
        switch (checkString) {
            case "001":
                relationType = "RIGHTOUTER";
                break;
            case "101":
                relationType = "FULLOUTER";
                break;
            case "100":
                relationType = "LEFTOUTER";
                break;
            case "011":
                relationType = "RIGHT JOIN";
                break;
            case "110":
                relationType = "LEFT JOIN";
                break;
            case "111":
                relationType = "FULL JOIN";
                break;
                // add the default keyword here
        }
        return relationType;

    }
    // replace the default Link template in the linkTemplateMap
    ns.updateRelation = function (e, obj) {
        var contextmenu = obj.part;
        var selectedLinkData = contextmenu.data;
        var newSource = Ciel.Process.ProcessDesign.CreateJob.getRelationType(selectedLinkData);
        var model = e.diagram.model;
        var equalityCondition = $("#equalityCondition option:selected").text().trim();
        e.diagram.startTransaction("updateEquality");
        model.setDataProperty(selectedLinkData, "equalityCondition", equalityCondition);
        e.diagram.commitTransaction("updateEquality");
        if (newSource === "InnerJoin") {
            e.diagram.startTransaction("update check");
            model.setDataProperty(selectedLinkData, "checked2", true);
            e.diagram.commitTransaction("update check");
            $("#checkbox2").prop('checked', true);
        }

        $("#contextMenuImg").attr("src", (CONFIG_APP_BASEURL + "/Areas/Process/Images/" + newSource.replace(' ', '') + ".png"));

        var fromNodeGroup = e.diagram.findNodeForKey(selectedLinkData.from).data.group;
        var toNodeGroup = e.diagram.findNodeForKey(selectedLinkData.to).data.group;
        if (typeof currentStep.data.relationExpression[contextmenu.fromNode.containingGroup.data.LOGICALTABLENAME + contextmenu.toNode.containingGroup.data.LOGICALTABLENAME] !== "undefined") {
            currentStep.data.relationExpression[contextmenu.fromNode.containingGroup.data.LOGICALTABLENAME + contextmenu.toNode.containingGroup.data.LOGICALTABLENAME] = [];
        }

        e.diagram.links.each(function (link) {

            if (link.data !== null &&
                ((e.diagram.findNodeForKey(link.data.from).data.group === fromNodeGroup && e.diagram.findNodeForKey(link.data.to).data.group === toNodeGroup) ||
                (e.diagram.findNodeForKey(link.data.from).data.group === toNodeGroup && e.diagram.findNodeForKey(link.data.to).data.group === fromNodeGroup))) {
                var fromNode = model.findNodeDataForKey(link.data.from);
                var toNode = model.findNodeDataForKey(link.data.to);
                var fromNodeTable = model.findNodeDataForKey(fromNode.group);
                var toNodeTable = model.findNodeDataForKey(toNode.group);

                e.diagram.startTransaction("changed relation");
                model.setDataProperty(link.data, "relationType", newSource);
                model.setDataProperty(link.data, "checked1", selectedLinkData.checked1);
                model.setDataProperty(link.data, "checked2", selectedLinkData.checked2);
                model.setDataProperty(link.data, "checked3", selectedLinkData.checked3);
                model.setDataProperty(link.data, "toolTipText",
                  (newSource + ": " + fromNodeTable.LOGICALTABLENAME + "." + fromNode.LOGICALCOLUMNNAME + ((typeof link.data.equalityCondition === "undefined") ? "=" : link.data.equalityCondition) + toNodeTable.LOGICALTABLENAME + "." + toNode.LOGICALCOLUMNNAME));
                e.diagram.commitTransaction("changed relation");
                currentStep.data.relationExpression[link.fromNode.containingGroup.data.LOGICALTABLENAME + link.toNode.containingGroup.data.LOGICALTABLENAME].push(link.data);
            }
        });

    }


    ns.resetCanvas = function () {
        canvas.isModified = false;
        CielUtil.JumpTo('Process', 'ProcessDesign', 'Home');
    }

    ns.saveResetCanvas = function () {
        quickSave = true;
        clearCanvas = true;
        $('#new-job-confirm-modal').modal('hide');
        ns.saveJob(jobViewModel);
    }

    ns.isHasNode = function (array, node) {

        for (i = 0; i < array.length; i++) {
            if (array[i].key == node.key) {
                return i;
            }
        }
        return -1;
    }


    var showJobModal = function () {
        $('#save_job_config').text(quickSave ? 'Save' : 'Ok');
        $('#job-addedit-modal').modal('show');
    }

    var isNewJob = function () {
        return Ciel.Process.ProcessDesign.CreateJob.jobId == Ciel.Process.ProcessDesign.CreateJob.newJobId;
    }

    var isCanvasEmpty = function () {
        return !canvas.model.modelData.jobAttributes.hasOwnProperty('JOBID') && canvas.model.nodeDataArray.length == 0;
    }

    ns.createTableInGroupFormat = function (table) {
        var m = NewTableNodeModel();
        for (var prop in table) {
            m[prop] = table[prop];
        }
        m.isGroup = true;
        return m;
    }

    ns.getColumnsFromTable = function (table, index) {
        var columns = [];
        for (j = 0; j < table.Fields.length; j++) {
            var column = NewTableColumnModel();
            for (var prop in column) {
                column[prop] = table.Fields[j][prop];
            }
            column.category= "Column";
            column.group= table.key;
            columns.push(column);
                
        }

        return columns;
    }

    ns.getTablesInGroupFormat = function (TableInJson) {
        var tables = [];
        var numberOfTables = TableInJson.length;
        if ((typeof numberOfTables) !== "undefined") {
            for (i = 0; i < numberOfTables; i++) {
                tables.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(TableInJson[i]));
                var defaultColumn = NewTableColumnModel();
                defaultColumn.category= "Column";
                defaultColumn.LOGICALCOLUMNNAME= "All";                            //%%edit      text: TableInJson[i].columns[j].name,
                defaultColumn.COLUMNID= "00";    //%%edit             nothing remove this 
                defaultColumn.COLUMNTYPE= "";                                                 //%%edit             nothing remove this 
                defaultColumn.group= TableInJson[i].key;
                tables.push(defaultColumn);
                Array.prototype.push.apply(tables, Ciel.Process.ProcessDesign.CreateJob.getColumnsFromTable(TableInJson[i], i));
            }
        } else {
            tables.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(TableInJson));
            var defaultColumn = NewTableColumnModel();
            defaultColumn.category = "Column";
            defaultColumn.LOGICALCOLUMNNAME = "All";                            //%%edit      text: TableInJson[i].columns[j].name,
            defaultColumn.COLUMNID = "00";    //%%edit             nothing remove this 
            defaultColumn.COLUMNTYPE = "";                                                 //%%edit             nothing remove this 
            defaultColumn.group = TableInJson.key;
            tables.push(defaultColumn);
            Array.prototype.push.apply(tables, Ciel.Process.ProcessDesign.CreateJob.getColumnsFromTable(TableInJson, 100));
        }


        return tables;
    }

    // R is a Rect in document coordinates
    // NODE is the Node being moved -- ignore when looking for Parts intersecting the Rect
    function isUnoccupied(r, node) {
        var diagram = node.diagram;
        // debugger;
        // nested function used by Layer.findObjectsIn, below
        // only consider Parts, and ignore the given Node and any Links
        function navig(obj) {
            // debugger;
            var part;
            if (obj.part.data.category !== undefined && obj.part.data.category.toLowerCase() === 'column') {
                part = obj.part.containingGroup;
            }
            else {
                part = obj.part;
            }
            if (part === node) return null;
            if (part instanceof go.Link) return null;
            return part;
        }

        // only consider non-temporary Layers
        var lit = diagram.layers;
        while (lit.next()) {
            var lay = lit.value;
            if (lay.isTemporary) continue;
            if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
        }
        return true;
    }

    function avoidNodeOverlap(node, pt, gridpt) {
        // this assumes each node is fully rectangular
        var bnds = node.actualBounds;
        var loc = node.location;
        // see if the area at the proposed location is unoccupied
        // use PT instead of GRIDPT if you want to ignore any grid snapping behavior
        var x = gridpt.x - (loc.x - bnds.x);
        var y = gridpt.y - (loc.y - bnds.y);
        var r = new go.Rect(x, y, bnds.width, bnds.height);
        // maybe inflate R if you want some space between the node and any other nodes
        if (isUnoccupied(r, node)) {
            return pt;
        }// OK
        return loc;  // give up -- don't allow the node to be moved to the new location
    }

    function disableButtons() {
        if (isCanvasReadOnly) {

            $('.topButtonsBar').find('.btn').removeClass('button').addClass('buttonDisabled').prop("disabled", true);
        }
        else {
            $('.topButtonsBar').find('.btn').removeClass('buttonDisabled').addClass('button').prop("disabled", false);
            canvasModifiedHandler(canvas);
        }
    }

    function validateDateFormat(dateVal) {

        var dateVal = dateVal;

        if (dateVal == null)
            return false;

        var validatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;

        dateValues = dateVal.match(validatePattern);

        if (dateValues == null)
            return false;

        var dtYear = dateValues[1];
        dtMonth = dateValues[3];
        dtDay = dateValues[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }

        return true;
    }

    ns.GetDataType = function (dataTypeString) {
        var returnType = '';
        switch (dataTypeString) {
            case 'String - Fixed Length (Without Unicode)':
            case 'String - Fixed Length (With Unicode)':
            case 'String - Dynamic length (Without Unicode)':
            case 'String - Dynamic length (With Unicode)':
                returnType = 'string';
                break;
            case 'number':
                returnType = 'number';
                break;
            case 'date':
            case 'time':
                returnType = 'date';
                break;
        }
        return returnType;
    }

    ns.IsValidPurgeValue = function (value, type, size) {

        switch (Ciel.Process.ProcessDesign.CreateJob.GetDataType(type)) {
            case 'string':
                var expression = '^([^\.]){1,' + size + '}$';
                var regex = new RegExp(expression, 'g');
                if (!value.match(regex)) {
                    $('#help-icon-purge-file-modal1').tooltip('show');
                    return false;
                }
                break;
            case 'number':
                var res = size.split(',');
                var scale = parseInt(res[1].trim(), 10);
                var precision = parseInt(res[0].trim(), 10) - scale;
                var expression = '^[0-9]{1,' + precision + '}(?:\.[0-9]{1,' + scale + '})?$';
                var regex = new RegExp(expression, 'g');
                if (!value.match(regex)) {
                    $('#help-icon-purge-file-modal1').tooltip('show');
                    return false;
                }
                break;
            case 'date':
                var validDate = validateDateFormat(value);
                if (!validDate) {
                    $('#help-icon-purge-file-modal1').tooltip('show');
                    return false;
                }
                break;
        }
        return true;
    }

    ns.GetJsonString = function (obj) {
        // remove circular reference in a json object while stringifying it
        var cache = [];
        var jsonString = JSON.stringify(obj, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in collection
                cache.push(value);
            }
            return value;
        });
        cache = null;
        return jsonString;
    }

}(Ciel.Process.ProcessDesign.CreateJob));
