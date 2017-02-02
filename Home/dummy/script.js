
Ciel.Process.ProcessDesign.CreateJob = {};

Ciel.Process.ProcessDesign.CreateJob.newJobId = "00000" // fake jobId used to denote a new Job
Ciel.Process.ProcessDesign.CreateJob.jobId = Ciel.Process.ProcessDesign.CreateJob.newJobId;

var myDiagramModalInputTable;
var myDiagramModalOutputTable;
var canvas;
$(document).ready(function () {
    var docked = 0;

    $("#dock > li > ul").height($(window).height());

    $("#dock .heading").click(function () {
        if (docked > 0) {
            return;
        }

        $("#dock > li").find("ul").animate({ left: "22px" }, 200);
        Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();

        docked += 1;

        $("#content").css("margin-left", "240px");

        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });

    myDiagramModalInputTable = Ciel.Process.ProcessDesign.CreateJob.CreateCanvas("myDiagramForModalInputTableDiv");
    myDiagramModalOutputTable = Ciel.Process.ProcessDesign.CreateJob.CreateCanvas("myDiagramForModalOutputTableDiv");

    var tool = myDiagramModalInputTable.toolManager.linkingTool;
    tool.isValidFrom = function (fromnode, fromport) {

        if (fromnode.data.columnname === "All") {

            return false;
        }
        return true;

    }
    tool.isValidTo = function (tonode, toport) {

        if (tonode.data.columnname === "All") {

            return false;
        }
        return true;

    }

    $("#dock .undock").click(function () {
        $(this).find("ul.free").animate({ left: "-240px" }, 200);

        $(this).parent().parent().animate({ left: "-240px" }, 200);
        docked = docked - 1;

        $("#content").css("margin-left", "40px");

    });

    /*rightPanel collapse/expand*/
    $("#rightPanelButton").click(function () {
        $("body").addClass('showRight');
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#rightPanelData > h3 > .fa-toggle-right").click(function () {
        $("body").toggleClass('showRight');
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
    });
    $("#rightPanelData .readOnlyMode *").click(function () {
        $("#rightPanelData .readOnlyMode").hide();
        $("#rightPanelData .editMode").show();
        $("body").addClass('editingRight');
    });
    $("#content").click(function () {
        $("#rightPanelData .editMode").hide();
        $("#rightPanelData .readOnlyMode").show();
        $("body").removeClass('editingRight');
    });

    //Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();

    $('#file-modal').on('shown.bs.modal', function () {
        $('#file-general-tab').tab('show');
        $('#process-filemodal-general').removeClass('active').addClass('active');
        $('#process-filemodal-mapping').removeClass('active');
    });

    $('#file-modal').on('hide.bs.modal', function () {
        $('#file-general-tab').tab('show');
        $('#process-filemodal-general').removeClass('active').addClass('active');
        $('#process-filemodal-mapping').removeClass('active');
        $(".panel-scroll").scrollTop(0);
    });

    $('#file-modal').on('hidden.bs.modal', function () {
        go.Diagram.prototype.doFocus.call(Ciel.Process.ProcessDesign.CreateJob.globalCanvas);
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
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

    $("#existingTable").on('change', function () {

        var tableText = this.value;
        var columnsToRemoveByKey = [];
        var linksToRemove = [];
        var tableToRemoveByKey;

        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (node.data.WorkspaceTableName != "Selected Column") && (node.data.WorkspaceTableName != tableText)) {
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
            if (existingTable[i].WorkspaceTableName == tableText) {
                existingTable[i].isGroup = true;
                model.addNodeData(existingTable[i]);  // adding table
                for (j = 0; j < existingTable[i].Fields.length; j++) {         // adding columns
                    var newNodeColumn = [];
                    newNodeColumn.group = existingTable[i].key;
                    newNodeColumn.category = "Column";
                    newNodeColumn.columnname = existingTable[i].Fields[j].COLUMNNAME;
                    newNodeColumn.columnid = ("T" + i + "C" + j + "O" + existingTable[i].Fields[j].COLUMNID);
                    newNodeColumn.columntype = existingTable[i].Fields[j].COLUMNTYPE;
                    model.addNodeData(newNodeColumn);
                }
            }
        }

        myDiagramModalOutputTable.model = model;
        myDiagramModalOutputTable.commitTransaction("change table");
        //console.log("done edited");
    });

    $("#save_mappings").on('click', function () {
        currentStep.data["modalOutputTablesMapping"] = JSON.parse(JSON.stringify(myDiagramModalOutputTable.model));
        currentStep.data["modalInputTablesMapping"] = JSON.parse(JSON.stringify(myDiagramModalInputTable.model));
        var modalOutputTable = {};
        var currentStepOutputTable;
        currentStep.findNodesOutOf().each(function (n) {
            if (n.data.category == "Table") {
                currentStepOutputTable = n.data;
            }
        });

        // console.log(currentStep.data.key);
        //  console.log(outputTable);

        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Table" && (node.data.text != "Selected Column")) {
                modalOutputTable = node.data;
            }
        });
        var tableToSave = Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(JSON.parse(JSON.stringify(modalOutputTable)));
        tableToSave.isGroup = false;
        tableToSave.columns = [];
        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.category == "Column" && (node.data.group == tableToSave.key)) {
                tableToSave.columns.push({
                    name: node.data.columnname,
                    id: node.data.columnid,
                    seq: 200
                });
            }
        });


        canvas.startTransaction("save table");
        var model = canvas.model;
        if (currentStepOutputTable != "undefined" || ((typeof currentStepOutputTable) !== "undefined")) {
            var linkToRemove;
            canvas.links.each(function (link) {           //getting links to remove
                if (link.data.from == currentStep.data.key &&
                    link.data.to == currentStepOutputTable.key) {
                    linkToRemove = link.data;
                }
            });
            model.removeLinkData(linkToRemove);
            model.removeNodeData(currentStepOutputTable);
        }
        model.addNodeData(tableToSave);
        canvas.commitTransaction("save table");

        canvas.startTransaction("add link");
        model.addLinkData({
            from: currentStep.data.key,
            to: tableToSave.key
        });
        canvas.commitTransaction("add link");
        $('#stepModal').modal('hide');
    });
});

window.onload = function () {
    Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();
}

window.onresize = function () {
    Ciel.Process.ProcessDesign.CreateJob.setPaletteHeight();
}

(function (ns) {
    var filesPalette;
    var stepsPalette;
    var tablesPalette;
    var currentGroup;
    var executeDragOver = false;
    var lightText = 'whitesmoke';
    var goJs = go.GraphObject.make;  // for conciseness in defining templates   
    var objPropertiesViewModel;
    var modelData;
    var quickSave = false;
    var clearCanvas = false;

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
        var filesPaletteDiv = document.getElementById('filesPaletteDiv');
        var stepsPaletteDiv = document.getElementById('stepsPaletteDiv');
        var tablesPaletteDiv = document.getElementById('tablesPaletteDiv');
        if (filesPaletteDiv && stepsPaletteDiv && tablesPaletteDiv) {
            filesPaletteDiv.style.height = (getWindowHeight() - 230) + "px";
            stepsPaletteDiv.style.height = (getWindowHeight() - 230) + "px";
            tablesPaletteDiv.style.height = (getWindowHeight() - 230) + "px";
        }
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
              cursor: "pointer"
          }
        ];
    }

    var makePort = function (name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        return goJs(go.Shape, "Circle",
                 {
                     fill: "transparent",
                     stroke: null,  // this is changed to "white" in the showPorts function
                     desiredSize: new go.Size(8, 8),
                     alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                     portId: name,  // declare this object to be a "port"
                     fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                     cursor: "pointer",  // show a different cursor to indicate potential link point
                     fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                     toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                 });
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
            port.stroke = (show ? "#666666" : null);
        });
    }

    var fileNodeDoubleClicked = function (e, obj) {
        modelData.updateModel(obj, tablesPalette);
        //ko.applyBindings(fileNodeModel);
        $("#file-modal").modal('show');
    }

    var fileNodeClicked = function (e, obj) {
        $("body").addClass('showRight');
        Ciel.Process.ProcessDesign.CreateJob.updateDiagram();
        //obj.part.data.fileToTableObj = fileToTableObj;
    }

    var columnMapping = function (sourceColumnName, targetColumnName, targetColumnType, func) {
        var self = this;
        self.sourceColumnName = ko.observable(sourceColumnName);
        self.targetColumnName = ko.observable(targetColumnName);
        self.targetColumnType = ko.observable(targetColumnType);


        self.targetColumnName.subscribe(function (newValue) {
            var colsArr = func();
            if (colsArr != null) {

                var result = ko.utils.arrayFilter(colsArr, function (item) {
                    return item.columnName == newValue;
                });

                if (result && result.length > 0) {
                    self.targetColumnType(result[0].columnType);
                }
                else {
                    self.targetColumnType(undefined);
                }
            }
        });
    };

    var fileColumn = function (id, name, seqNo) {
        var self = this;
        self.id = id;
        self.columnName = name;
        self.seqNo = seqNo
    }

    var fileAttribute = function (attributeName, attributeType, attributeValue, isReadOnly) {
        var self = this;
        self.attributeName = attributeName;
        self.attributeType = attributeType;

        if (self.attributeType == "number") {
            self.attributeValue = ko.observable(attributeValue).extend({ numeric: 0 });
        }
        else if (self.attributeType == "boolean") {
            //If AttributeType is boolean then convert its value to boolean
            self.attributeValue = ko.observable(attributeValue === "1" || attributeValue === true);
        }
        else {
            self.attributeValue = ko.observable(attributeValue);
        }

        self.isReadOnly = isReadOnly;
    }

    var outputTableColumn = function (columnId, columnName, columnType, isUsed) {
        var self = this;
        self.columnId = columnId;
        self.columnName = columnName;
        self.columnType = columnType;
        self.isUsed = isUsed;
    }

    var outputTable = function (tableName, columns, isDisabled, isTemporary) {
        var self = this;
        self.tableName = tableName;
        self.columns = ko.observableArray(columns);
        self.disable = ko.observable(isDisabled);
        self.isTemporary = isTemporary;
    }

    var init = function () {

        canvas =
          goJs(go.Diagram, "canvasDiv",
            {
                initialDocumentSpot: go.Spot.Center,
                initialViewportSpot: go.Spot.Center,
                initialContentAlignment: go.Spot.Center,
                resizingTool: new laneResizingTool(),
                //layout: goJs(groupLayout),
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
                    });
                },
                allowDrop: true,
                mouseDrop: function (e) { finishDrop(e, null); },
                "animationManager.duration": 600,
                "undoManager.isEnabled": true,
                "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue", category: "OfNodes" },
                "linkingTool.isUnconnectedLinkValid": true,
                "relinkingTool.isUnconnectedLinkValid": true
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
                  reshapable: true,
                  locationSpot: go.Spot.Center,
                  //doubleClick: function () { $('#myModal').modal('show'); },
                  // the Node.location is at the center of each node
                  //resizeObjectName: 'shape',
                  //locationSpot: go.Spot.Center,
                  //isShadowed: true,
                  //shadowColor: "#888",
                  // handle mouse enter/leave events to show/hide the ports
                  //mouseEnter: function (e, obj) { showPorts(obj.part, true); },
                  //mouseLeave: function (e, obj) { showPorts(obj.part, false); }
              }
            ];
        }

        function fileCompareFunction(a, b) {
            var at = a.data.FileName.toLowerCase();
            var bt = b.data.FileName.toLowerCase();
            if (at < bt) return -1;
            if (at > bt) return 1;
            return 0;
        }

        function tableCompareFunction(a, b) {
            var at = a.data.WorkspaceTableName.toLowerCase();
            var bt = b.data.WorkspaceTableName.toLowerCase();
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
                               new go.Binding("text", "FileName"))),
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
                                       new go.Binding("text", "FileName"))
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
                               new go.Binding('text', "FilePath")), {
                                   toolTip:  // define a tooltip for each node that displays the color as text
                                   goJs(go.Adornment, "Auto",
                                     goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                                     goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                                       new go.Binding("text", "FilePath"))
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
                               new go.Binding("text", "WorkspaceTableName")),
                               {
                                   toolTip:  // define a tooltip for each node that displays the color as text
                                    goJs(go.Adornment, "Auto",
                                      goJs(go.Shape, "RoundedRectangle", { fill: "#FFFFCC" }),
                                      goJs(go.TextBlock, { margin: 6, maxSize: new go.Size(150, NaN) },
                                        new go.Binding("text", "WorkspaceTableName"))
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
                { click: fileNodeClicked, doubleClick: fileNodeDoubleClicked, selectionChanged: objPropertiesViewModel.updateAttributes },
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
                new go.Binding('height').makeTwoWay()),
                makePort("T", go.Spot.Top, true, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, true)
        ));



        canvas.nodeTemplateMap.add("FileWithTable",
            goJs(go.Node, "Auto", nodeStyle(),
            {
                click: fileNodeClicked,
                selectionChanged: objPropertiesViewModel.updateAttributes,
                doubleClick: fileNodeDoubleClicked,
                reshapable: true, resizable: true, stretch: go.GraphObject.Fill, desiredSize: new go.Size(120, 120), minSize: new go.Size(20, 20)
            },
            goJs(go.Picture, {
                source: CONFIG_APP_BASEURL + "/Areas/Process/Images/databasetable.png"
            }),
             new go.Binding('width').makeTwoWay(),
                new go.Binding('height').makeTwoWay()
        ));

        canvas.nodeTemplateMap.add("Table",
              goJs(go.Node, "Spot", {
                  click: fileNodeClicked, selectionChanged: objPropertiesViewModel.updateAttributes
              },
                 goJs(go.Shape, "DividedProcess", shapeStyle(),
                    { name: "shape", minSize: new go.Size(150, 100), fill: "#FFFFFF", stroke: "#6bb300", strokeWidth: 4, cursor: "move" }, //DC3C00
                     new go.Binding('width').makeTwoWay(),
                    new go.Binding('height').makeTwoWay()),
                goJs(go.Panel, "Table",

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
                        maxSize: new go.Size(120, NaN),
                        maxLines: 2,
                        cursor: "text",
                        textEditor: customText
                    },
                    new go.Binding('text', "description").makeTwoWay())
                ),
                //// three named ports, one on each side except the bottom, all input only:
                makePort("T", go.Spot.Top, true, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, true)
              ));
        canvas.nodeTemplateMap.add("Step",  // the default category
            goJs(go.Node, "Spot", nodeStyle(),
                  {
                      doubleClick: stepClicked
                  },
               goJs(go.Shape, "SquareArrow", shapeStyle(),
                  {
                      fill: "#FFFFFF", stroke: "#00A9C9", minSize: new go.Size(160, 70), cursor: "move", strokeWidth: 4
                  },
                  new go.Binding("figure", "figure"),
                  new go.Binding("minSize", "minSize")),
              // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
              goJs(go.Panel, "Table",

                goJs(go.TextBlock,
                  {
                      row: 0,
                      column: 0,
                      font: "bold 11pt Helvetica, Arial, sans-serif",
                      stroke: "#000000",
                      margin: 8,
                      maxSize: new go.Size(140, NaN),
                      wrap: go.TextBlock.WrapFit,
                      editable: false,
                      cursor: "move"
                  },
                  new go.Binding("text").makeTwoWay()),
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
              makePort("T", go.Spot.Top, false, true),
              makePort("L", go.Spot.Left, true, true),
              makePort("R", go.Spot.Right, true, true),
              makePort("B", go.Spot.Bottom, true, false),
                  new go.Binding('width').makeTwoWay(),
                  new go.Binding('height').makeTwoWay()
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

    var newFileModel = function () {
        var self = this;
        self.node = {};
        self.isNewOutputTable = ko.observable(false);
        self.newOutputTableName = ko.observable();
        self.isTempTable = ko.observable(false);
        self.modalLoaded = ko.observable();
        self.selectedOutputTableName = ko.observable();
        self.selectedOutputTableName.subscribe(function (newValue) {
            if (newValue === "New Table") {
                self.isNewOutputTable = true;
            }
            $.each(self.outputTables(), function (index, value) {
                if (value.tableName === newValue) {
                    self.isTempTable(value.isTemporary);
                }
            });
            self.removeAllMapppings();
        });
        self.fileName = ko.observable();
        self.columnSeparators = ko.observableArray([]);
        self.rowSeparators = ko.observableArray([]);
        self.fileColumns = ko.computed(function () {
            self.modalLoaded();
            var check;
            if (self.node.data != undefined) {
                ko.utils.arrayForEach(self.fileAttributes(), function (item) {
                    if (item.attributeName === 'Is Column Heading Present') {
                        check = item.attributeValue();
                    }
                });

                self.columnMappings.removeAll();

                self.fileColumn = [];
                if (check == true) {

                    for (var i = 0; i < self.node.data.Columns.length; i++) {
                        var obj = self.node.data.Columns[i];
                        self.fileColumn.push(new fileColumn(obj.id, obj.name, obj.seqNo));
                    }
                    return self.fileColumn;
                }
                else {
                    for (var i = 0; i < self.node.data.Columns.length; i++) {
                        var obj = self.node.data.Columns[i];
                        self.fileColumn.push(new fileColumn(obj.id, 'Column' + i, obj.seqNo));
                    }
                    return self.fileColumn;
                }
            }
            else {

                return null;
            }
        })
        self.fileAttributes = ko.observableArray([]);
        self.outputTables = ko.observableArray([]);

        self.columnMappings = ko.observableArray();

        self.removeMapping = function (columnMapping) {
            self.columnMappings.remove(columnMapping);
        };

        self.removeAllMapppings = function () {
            self.columnMappings.removeAll();
        };

        self.addMapping = function (data, event) {
            var match = ko.utils.arrayFirst(self.columnMappings(), function (item) {
                return data.columnName === item.sourceColumnName();
            });

            if (!match) {
                self.columnMappings.push(new columnMapping(data.columnName, '', '', self.getColumnsByTableName));
            }
        };

        self.getColumnsByTableName = ko.computed(function () {
            var result = ko.utils.arrayFilter(self.outputTables(), function (item) {
                return item.tableName == self.selectedOutputTableName();
            });

            if (result && result.length > 0 && result[0].columns().length > 0) {

                return result[0].columns();
            }
            return null;
        }, this);

        self.setOptionDisable = function (option, item) {
            if (item)
                ko.applyBindingsToNode(option, { disable: item.disable }, item);
        };

        self.setOptionDisableColumn = function (option, item) {
            if (item)
                ko.applyBindingsToNode(option, { disable: item.isUsed }, item);
        };

        self.saveProperties = function () {
            var vm = ko.dataFor($('#file-modal')[0]);
            var node = vm.node;

            if (self.selectedOutputTableName() && vm.columnMappings().length == 0) {
                alert("Column mappings must be defined to save the properties!");
                return false;
            }


            if (!(self.columnMappings == null)) {

                var valueArr = self.columnMappings().map(function (item) { return item.targetColumnName() });
                var isDuplicate = valueArr.some(function (item, idx) {
                    return valueArr.indexOf(item) != idx
                });

                if (isDuplicate) {
                    alert("One Destination Column cannot be mapped to multiple Source Columns!");
                    return false;
                }
            }

            var tempColumnMappings = [];
            var tempFileAttributes = JSON.parse(JSON.stringify(node.data.FileAttributes));
            node.diagram.model.startTransaction("set file properties");
            node.diagram.model.setDataProperty(node.diagram.model.findNodeDataForKey(node.data.key), "OutputTableName", self.selectedOutputTableName());
            node.diagram.model.setDataProperty(node.diagram.model.findNodeDataForKey(node.data.key), "IsOutputTableTemporary", self.isTempTable());

            self.node.data["ColumnMappings"] = [];
            if (!(self.columnMappings == null)) {
                $.each(self.columnMappings(), function (index, value) {
                    tempColumnMappings.push({ sourceColumnName: value.sourceColumnName(), targetColumnName: value.targetColumnName(), targetColumnType: value.targetColumnType(), getColumnsByTableName: self.getColumnsByTableName });
                });
            }
            node.diagram.model.setDataProperty(node.diagram.model.findNodeDataForKey(node.data.key), "ColumnMappings", tempColumnMappings);

            for (var i = 0; i < node.data.FileAttributes.length; i++) {
                tempFileAttributes[i].FILEATTRIBUTEVALUE = self.fileAttributes()[i + 3].attributeValue();
            }
            node.diagram.model.setDataProperty(node.diagram.model.findNodeDataForKey(node.data.key), "FileAttributes", tempFileAttributes);

            node.diagram.model.commitTransaction("set file properties");

            if (self.selectedOutputTableName() == null) {
                canvas.model.setCategoryForNodeData(node.data, "File");
            }
            else {
                canvas.model.setCategoryForNodeData(node.data, "FileWithTable");
            }
            objPropertiesViewModel.updateAttributes(node);
            $("#file-modal").modal('hide');

            delete vm.node;
        }

        self.updateModel = function (node, tablesPaletteIn) {
            var tables = tablesPaletteIn.model.nodeDataArray;
            self.node = node;

            self.modalLoaded.notifySubscribers();
            self.fileAttributes([]);
            self.fileAttributes.push(new fileAttribute('File Name', 'string', node.data.FileName, true));
            self.fileName(node.data.FileName);
            self.fileAttributes.push(new fileAttribute('File Path', 'string', node.data.FilePath, true));
            self.fileAttributes.push(new fileAttribute('File Type', 'string', node.data.FileType, true));

            //self.fileColumns([]);
            //for (var i = 0; i < node.data.Columns.length; i++) {
            //    var obj = node.data.Columns[i];
            //    self.fileColumns.push(new fileColumn(obj.id, obj.name, obj.seqNo));
            //}

            for (var i = 0; i < node.data.FileAttributes.length; i++) {
                if (node.data.FileAttributes[i].FILEATTRIBUTENAME === "Column Separator") {
                    self.columnSeparators(node.data.FileAttributes[i].FILEATTRIBUTEMASTERDATA);
                }

                if (node.data.FileAttributes[i].FILEATTRIBUTENAME === "Row Separator") {
                    self.rowSeparators(node.data.FileAttributes[i].FILEATTRIBUTEMASTERDATA);
                }

                self.fileAttributes.push(new fileAttribute(node.data.FileAttributes[i].FILEATTRIBUTENAME,
                        node.data.FileAttributes[i].FILEATTRIBUTETYPE, node.data.FileAttributes[i].FILEATTRIBUTEVALUE, false));
            }

            self.outputTables([]);
            self.outputTables.push(new outputTable("New Table", [new outputTableColumn(0, '', '', false)], true));
            for (var i = 0; i < tables.length; i++) {
                var columns = [];
                for (j = 0; j < tables[i].Fields.length; j++) {
                    columns.push(new outputTableColumn(tables[i].Fields[j].COLUMNID, tables[i].Fields[j].COLUMNNAME, tables[i].Fields[j].COLUMNTYPE, false));
                }
                self.outputTables.push(new outputTable(tables[i].WorkspaceTableName, columns, false, tables[i].TableType === "Temporary"));
            }
            self.selectedOutputTableName(node.data.OutputTableName);

            self.columnMappings([]);
            if (!(node.data.ColumnMappings == null)) {
                $.each(node.data.ColumnMappings, function () {
                    self.columnMappings.push(new columnMapping($(this)[0].sourceColumnName, $(this)[0].targetColumnName, $(this)[0].targetColumnType, self.getColumnsByTableName));
                });
            }
        }
    }

    //Model used for properties in the right panel
    function Attribute(node, container, updatableAttributeName, displayName, attributeValue, attributeType, additionalData) {
        var self = this;
        self.DisplayName = displayName;
        self.AttributeType = attributeType;

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

            var tempFileAttributes = JSON.parse(JSON.stringify(node.data.FileAttributes));
            var fileAttributeObj = tempFileAttributes.filter(function (item) { return item.FILEATTRIBUTEID == container.FILEATTRIBUTEID });

            fileAttributeObj[0]["FILEATTRIBUTEVALUE"] = newValue;

            node.diagram.model.startTransaction("properties pane");
            node.diagram.model.setDataProperty(node.data, "FileAttributes", tempFileAttributes);
            node.diagram.model.commitTransaction("properties pane");

            if (node) {
                if (self.DisplayName === "Is Column Heading Present") {
                    node.data.ColumnMappings = [];
                }
                node.updateTargetBindings();
            }
        });

        self.modalOpen = function (data, event) {
            if (data.AdditionalData === 'File') {
                modelData.updateModel(node, tablesPalette);
                $("#file-modal").modal('show');
            }
            else if (data.AdditionalData === 'Job') {
                quickSave = false;
                showJobProperties();
            }
        }
    }

    var showJobProperties = function () {
        canvas.clearSelection();
        showJobModal();
    }

    function PropertiesViewModel() {
        var self = this;
        // Editable data
        self.attributes = ko.observableArray([]);

        //updates the right panel when a node is selected
        self.updateAttributes = function (node) {
            self.attributes([]);
            if (node && node.diagram.selection.count === 1) {

                if (node.category === "File" || node.category === "FileWithTable") {
                    self.attributes.push(new Attribute(node, node.data, null, "File Name", node.data.FileName));
                    self.attributes.push(new Attribute(node, node.data, null, "File Type", node.data.FileType));
                    self.attributes.push(new Attribute(node, node.data, null, "File Path", node.data.FilePath));
                    $.each(node.data.FileAttributes, function () {
                        self.attributes.push(new Attribute(node, this, "FILEATTRIBUTEVALUE", this.FILEATTRIBUTENAME, this.FILEATTRIBUTEVALUE, this.FILEATTRIBUTETYPE, this.FILEATTRIBUTEMASTERDATA));
                    });
                    if (!(node.data.OutputTableName == null)) {
                        self.attributes.push(new Attribute(node, node.data, null, "Output Table", node.data.OutputTableName));
                        self.attributes.push(new Attribute(node, node.data, null, "Is Temporary", node.data.IsOutputTableTemporary, "boolean"));
                    }
                    self.attributes.push(new Attribute(node, node.data, null, null, "Show Detailed Configuration", "hyperlink", "File"));
                }
                else if (node.category === "Table") {
                    self.attributes.push(new Attribute(node, node.data, null, "TableName", node.data.WorkspaceTableName));
                    self.attributes.push(new Attribute(node, node.data, null, "TableType", node.data.TableType));
                }
            }
            else if (canvas.selection.count === 0) {
                self.attributes.push(new Attribute(null, jobViewModel, null, "Job Name", jobViewModel.JOBNM() === '' ? 'Untitled Job' : jobViewModel.JOBNM()));
                self.attributes.push(new Attribute(null, jobViewModel, null, "Job Description", jobViewModel.DESCNT()));
                self.attributes.push(new Attribute(null, jobViewModel, null, "DateTime Created", jobViewModel.CREATEDATE()));
                self.attributes.push(new Attribute(null, jobViewModel, null, "DateTime Modified", jobViewModel.MODIFIEDDATE()));
                self.attributes.push(new Attribute(null, jobViewModel, null, null, "Show Job's Detailed Configuration", "hyperlink", "Job"));
            }
        };
    }

    $(function () {
        ko.extenders.numeric = function (target, precision) {
            //create a writable computed observable to intercept writes to our observable
            var result = ko.pureComputed({
                read: target,  //always return the original observables value
                write: function (newValue) {
                    var current = target(),
                        roundingMultiplier = Math.pow(10, precision),
                        newValueAsNum = isNaN(newValue) ? 0 : +newValue,
                        valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                    //only write if it changed
                    if (valueToWrite !== current) {
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

        objPropertiesViewModel = new PropertiesViewModel();
        ko.applyBindings(objPropertiesViewModel, $('#propertyRead')[0]);
        ko.applyBindings(objPropertiesViewModel, $('#propertyWrite')[0]);

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
    }

    var jobViewModel;

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
                    if (model.MultiLangs[i].JOBID.toString() != "00000") {
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

            CielKoBind.BindSimple(jobViewModel, "job-addedit-modal");
            CielKoBind.BindSimple(jobViewModel, "job-settings-container");

            objPropertiesViewModel.updateAttributes();

            canvasModifiedHandler(canvas);
        });
    }

    ns.cancelJob = function (data) {
        quickSave = false;
        data.reset();
    }

    ns.okJob = function (data) {
        var newModelML = new JobViewModel(data.MultiLangs[0].JOBID.newValue(), data.MultiLangs[0].JOBNM.newValue(), data.MultiLangs[0].DESCNT.newValue(), data.MultiLangs[0].LANGCD.newValue(), data.MultiLangs[0].LANGNM.newValue(),
            data.MultiLangs[0].JOBJSON.newValue(), data.MultiLangs[0].CREATEDATE(), data.MultiLangs[0].MODIFIEDDATE(), data.MultiLangs[0].NewDefFlag, []);
        var newModel = new JobViewModel(data.JOBID.newValue(), data.JOBNM.newValue(), data.DESCNT.newValue(), data.LANGCD.newValue(), data.LANGNM.newValue(), data.JOBJSON.newValue(), data.CREATEDATE(), data.MODIFIEDDATE(), data.NewDefFlag, newModelML);

        if (validateJob(newModel)) {
            data.commit();
            $('#job-addedit-modal').modal('hide');
            canvas.clearSelection();
            objPropertiesViewModel.updateAttributes();

            canvas.model.startTransaction("set job attributes");
            canvas.model.setDataProperty(canvas.model.modelData, "jobAttributes", ko.toJS(data));
            canvas.model.commitTransaction("set job attributes");
            data.isCanvasDirty(true);

            if (quickSave) {
                ns.saveJob(newModel);
            }
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

    ns.saveJob = function (data) {
        var vmSave = new JobViewModelSimple(data.JOBID(), data.JOBNM(), data.DESCNT(), data.LANGCD(), data.LANGNM(), canvas.model.toJson(), data.CREATEDATE(), data.MODIFIEDDATE(), data.NewDefFlag(),
            new JobViewModelSimple(data.MultiLangs[0].JOBID(), data.MultiLangs[0].JOBNM(), data.MultiLangs[0].DESCNT(), data.MultiLangs[0].LANGCD(), data.MultiLangs[0].LANGNM(), data.MultiLangs[0].JOBJSON(),
            data.MultiLangs[0].CREATEDATE(), data.MultiLangs[0].MODIFIEDDATE(), data.MultiLangs[0].NewDefFlag(), []));

        vmSave.JOBID = Ciel.Process.ProcessDesign.CreateJob.jobId;
        vmSave.NewDefFlag = (vmSave.JOBID === Ciel.Process.ProcessDesign.CreateJob.newJobId);

        if (validateJob(vmSave, true)) {
            Ciel.Process.Api.PostJob(
            vmSave,
            function (newModel) {
                Ciel.Process.ProcessDesign.CreateJob.jobId = newModel.JOBID;
                jobViewModel.JOBID(newModel.JOBID);
                jobViewModel.CREATEDATE(newModel.CREATEDATE);
                jobViewModel.MODIFIEDDATE(newModel.MODIFIEDDATE);
                jobViewModel.isCanvasDirty(false);
                data.isCanvasDirty(false);
                objPropertiesViewModel.updateAttributes();
                quickSave = false;
                canvas.isModified = false;
                if (clearCanvas) {
                    ns.resetCanvas();
                }
            },
            validateJob.inputErrorFunc);
        }
        else {
            quickSave = true;
            showJobModal();
        }
    }

    var validateJob = function (data, isHideTooltip) {

        if (isHideTooltip == undefined || isHideTooltip == null) isHideTooltip = false;

        function inputErrorFunc(err) {
            for (var i in err) {
                var haselement = $('#input-' + err[i].PropertyName).length > 0;

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
            inputErrorFunc(err);
            canvas.clearSelection();
            return false;
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
        currentStep = obj.part;

        function addTemplateForDiagram(MyDiagram) {
            MyDiagram.groupTemplateMap.add("Table", Ciel.Process.ProcessDesign.CreateJob.groupTemplateForTable());  // end Group and call to add to template Map
            MyDiagram.nodeTemplateMap.add("Column", Ciel.Process.ProcessDesign.CreateJob.nodeTemplateForColumn());   //for Column       
        }

        if (typeof currentStep.data.modalInputTablesMapping !== "undefined") {
            myDiagramModalInputTable.model = go.Model.fromJson(JSON.parse(JSON.stringify(currentStep.data.modalInputTablesMapping)));
            myDiagramModalOutputTable.model = go.Model.fromJson(JSON.parse(JSON.stringify(currentStep.data.modalOutputTablesMapping)));
            console.log("i am in adding model from previous data");
        }
        else {

            /*input table start*/
            var tablesToCurrentStep = [];
            currentStep.findNodesInto().each(function (n) {
                if (n.data.category == "Table") {
                    tablesToCurrentStep.push(n.data);
                }
            });
            var TableInJson = [];
            var nodeDataArray = [];
            nodeDataArray = Ciel.Process.ProcessDesign.CreateJob.getTablesInGroupFormat(JSON.parse(JSON.stringify(tablesToCurrentStep)));

            var linkDataArray = [];

            addTemplateForDiagram(myDiagramModalInputTable);
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
            TableInJson = JSON.parse(JSON.stringify(tablesFromCurrentStep));
            if (TableInJson.length != 0) {
                nodeDataArray.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(TableInJson[0]));
                Array.prototype.push.apply(nodeDataArray, Ciel.Process.ProcessDesign.CreateJob.getColumnsFromTable(TableInJson[0]));
            }


            /* #ltmctooc end */
            nodeDataArray.push({
                category: "Table",
                WorkspaceTableName: "Selected Column",
                isGroup: true
            });

            linkDataArray = [];
            addTemplateForDiagram(myDiagramModalOutputTable);
            myDiagramModalOutputTable.linkTemplate = Ciel.Process.ProcessDesign.CreateJob.linkTemplateForMapping();
            myDiagramModalOutputTable.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

        }

        existingTable = JSON.parse(JSON.stringify(tablesPalette.model.nodeDataArray));
        console.log(existingTable);

        // temp location start # for loading/getting existingTable
        numberOfTables = existingTable.length;
        var select = document.getElementById("existingTable");
        select.options.length = 1;
        for (i = 0; i < numberOfTables; i++) {
            var option = document.createElement("option");
            option.text = existingTable[i].WorkspaceTableName;
            option.value = existingTable[i].WorkspaceTableName;
            select.appendChild(option);
        }
        // temp location end
        console.log(existingTable);
        numberOfTables = existingTable.length;
        $("#stepModal").modal('show');
    }

    ns.CreateCanvas = function (divID) {

        return goJs(go.Diagram, divID,  // must name or refer to the DIV HTML element
    {
        //doubleClick: showJobModal,
        initialContentAlignment: go.Spot.Center,
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
            console.log(from.findLinksBetween(to, null, null));
            if ( from.findLinksBetween(to, null, null).count==1 ) return false;
            return from.containingGroup !== to.containingGroup;
        }
    });
    }

    ns.groupTemplateForTable = function () {
        return goJs(go.Group, "Auto",
            {
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
                        cellSize: new go.Size(0, 0), spacing: new go.Size(0, 0)
                    })
            },
            new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
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
                  new go.Binding("text", "WorkspaceTableName").makeTwoWay())
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
                                      new go.Binding("text", "columnname").makeTwoWay()),

                                      goJs(go.TextBlock,
                                      {
                                          row: 0, column: 1,
                                          margin: 5,
                                          editable: true,
                                          wrap: go.TextBlock.WrapFit,
                                          font: "bold 10px sans-serif",
                                          opacity: 0.75,
                                          stroke: "#404040"
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

    ns.linkTemplateForRelationsMapping = function () {

        return goJs(go.Link,  // the whole link panel
        {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: false,
            relinkableTo: false,
            reshapable: false,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
        
            contextMenu:
                goJs(go.Adornment, "Vertical",
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("innerJoin"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("fullJoin"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("leftJoin"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("rightJoin"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("fullOuter"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("leftOuter"),
                     Ciel.Process.ProcessDesign.CreateJob.createContextMenuButton("rightOuter")
            )
        },
        new go.Binding("points").makeTwoWay(),
        goJs(go.Shape,  // the highlight shape, normally transparent
          { isPanelMain: true, strokeWidth: 2, stroke: "transparent", name: "HIGHLIGHT" }),
        goJs(go.Shape,  // the link path shape
          { isPanelMain: true, stroke: "gray", strokeWidth: 1 }),
        //goJs(go.Shape,  // the arrowhead
        //  { toArrow: "standard", stroke: "gray", strokeWidth: 3, fill: "gray" }),
        goJs(go.Panel, "Auto",  // the link label, normally not visible
          { visible: true, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
          new go.Binding("visible", "visible").makeTwoWay(),
          goJs(go.Shape, "RoundedRectangle",  // the label shape
            { fill: "#f4f2f2", stroke: null }),
             goJs(go.Picture,
                      {
                          name: 'Picture',
                          desiredSize: new go.Size(20, 20),
                          source: CONFIG_APP_BASEURL + "/Areas/Process/Images/innerJoin.png",
                          toolTip:  // define a tooltip for each node that displays the color as text
                            goJs(go.Adornment, "Auto",
                              goJs(go.Shape, { fill: "#FFFFCC" }),
                               goJs(go.TextBlock, new go.Binding("text", "", function (obj) {
                                   var relationType = "innerJoin";
                                   return ( relationType.toUpperCase() + ": "
                                       + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.from).data.group).data.WorkspaceTableName + "." +
                                       myDiagramModalInputTable.findNodeForKey(obj.from).data.columnname + " = " +
                                       myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.to).data.group).data.WorkspaceTableName +
                                       "." + myDiagramModalInputTable.findNodeForKey(obj.to).data.columnname );
                               }), { margin: 4 },
                              new go.Binding("text", "toolTipText"))
                            ),  // end of Adornment
                            
                      },
                       new go.Binding("source", "relationType", Ciel.Process.ProcessDesign.CreateJob.getSourceForRelation).makeTwoWay())
        )
      );
    }

   
    // get
    ns.createContextMenuButton = function (relationType) {
        return goJs("ContextMenuButton",
                      Ciel.Process.ProcessDesign.CreateJob.getImageForRelationType(relationType),
                     // goJs(go.TextBlock, "Select matching data from both tables."),
                      {
                          click: function (e, obj) {
                              Ciel.Process.ProcessDesign.CreateJob.updateRelation(e, obj, relationType);
                          }
                      });
    }
    //for picture in context menu
    ns.getImageForRelationType = function (relationType) {
       return goJs(go.Picture,
                      {
                          name: 'Picture',
                          desiredSize: new go.Size(20, 20),
                          source: CONFIG_APP_BASEURL + "/Areas/Process/Images/"+relationType+".png",
                          margin:3,
                          toolTip:  // define a tooltip for each node that displays the color as text
                            goJs(go.Adornment, "Auto",
                              goJs(go.Shape, { fill: "#FFFFCC" }),
                               goJs(go.TextBlock, new go.Binding("text", "", function (obj) {
                                   var toolTipText;
                                   switch (relationType) {
                                       case "rightOuter":
                                           toolTipText = "Select all data from: " + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.to).data.group).data.WorkspaceTableName + ' exclude matching data from ' +
                                      myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.from).data.group).data.WorkspaceTableName;
                                           break;
                                       case "fullOuter":
                                           toolTipText = "Select all data from both table exlude matching data from both.";
                                           break;
                                       case "leftOuter":
                                           toolTipText = "Select all data from: " + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.from).data.group).data.WorkspaceTableName + ' exclude matching data from ' +
                                               myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.to).data.group).data.WorkspaceTableName;
                                           break;
                                       case "rightJoin":
                                           toolTipText = "Select all data from: " + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.to).data.group).data.WorkspaceTableName;
                                           break;
                                       case "leftJoin":
                                           toolTipText = "Select all data from: " + myDiagramModalInputTable.findNodeForKey(myDiagramModalInputTable.findNodeForKey(obj.from).data.group).data.WorkspaceTableName;
                                           break;    
                                       case "fullJoin":
                                           toolTipText =  "Select all data from both tables";
                                           break;
                                       case "innerJoin":
                                           toolTipText = "Select matching data from both tables.";
                                           break;
                                               // add the default keyword here
                                   }
                                   return toolTipText;
                              }), { margin: 4 })
                           
                            ),  // end of Adornment

                      }//,
                       //new go.Binding("source", "relationType", Ciel.Process.ProcessDesign.CreateJob.getSourceForRelation).makeTwoWay()
                       )
    }

    // for output model only
    ns.linkTemplateForMapping = function () {
        return goJs(go.Link,  // the whole link panel
        {
            routing: go.Link.AvoidsNodes,
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
          { isPanelMain: true, stroke: "gray", strokeWidth: 1 })
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

                 })
    }

    ns.updatedColumnInTable = function (e, obj) {
        console.log("entered");

        var key;
        var outputModel = myDiagramModalOutputTable.model;
        if (e.diagram.model == outputModel) {
            return;
        }
        var inputModel = myDiagramModalInputTable.model;
        var selectedColumn = obj.part.data;
        if (selectedColumn.columnname == "All") {
            myDiagramModalInputTable.nodes.each(function (node) {
                if (node.data.category == "Column" && node.data.group == selectedColumn.group && node.data.columnname != "All") {
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
                    if (node.data.category == "Column" && node.data.group == selectedColumn.group && node.data.columnname == "All") {
                        inputModel.startTransaction("update checkbox");
                        inputModel.setDataProperty(node.data, "checked", !updateAllCheck);
                        inputModel.commitTransaction("update checkbox");
                    }
                });
            });

        }

        myDiagramModalOutputTable.startTransaction("make new node");
        myDiagramModalOutputTable.nodes.each(function (node) {
            if (node.data.WorkspaceTableName == "Selected Column")
            { key = node.data.key; }
        });
        console.log(key);
        //adding column
        myDiagramModalInputTable.nodes.each(function (n) {

            if (n.data.category == "Column" && n.data.columnname != "All") {
                if (n.data.checked == true) {

                    var tableName = myDiagramModalInputTable.model.findNodeDataForKey(n.data.group).WorkspaceTableName;

                    var newNodeColumn = {};
                    newNodeColumn.group = key;
                    newNodeColumn.category = "Column";
                    newNodeColumn.columnname = tableName + "." + n.data.columnname;
                    newNodeColumn.columnid = n.data.columnid;
                    newNodeColumn.columntype = n.data.columntype;
                    var add = true;
                    myDiagramModalOutputTable.nodes.each(function (node) {
                        if (node.data.columnid == n.data.columnid && outputModel.findNodeDataForKey(node.data.group).WorkspaceTableName == "Selected Column") { // depens on columnid if everycolumn in diagram has unique id  then modify here
                            add = false;
                        }
                    });
                    if (add) { outputModel.addNodeData(newNodeColumn); console.log("adding"); }

                } else {
                    var newNodeColumn = {};
                    var remove = false;
                    myDiagramModalOutputTable.nodes.each(function (node) {
                        if (node.data.columnid == n.data.columnid && outputModel.findNodeDataForKey(node.data.group).WorkspaceTableName == "Selected Column") {
                            newNodeColumn = node.data;
                            remove = true;
                        }
                    });

                    if (remove) { console.log("deleting" + outputModel.removeNodeData(newNodeColumn)); }
                }
            }
        });
        myDiagramModalOutputTable.model = outputModel;
        myDiagramModalOutputTable.commitTransaction("make new node");
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
                  if (obj.part.data.columnname === "All")
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
                return CONFIG_APP_BASEURL + "/Areas/Process/Images/" + relationType + ".png";
            }
        }
        else { return CONFIG_APP_BASEURL + "/Areas/Process/Images/innerJoin.png"; }
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

    // replace the default Link template in the linkTemplateMap
    ns.updateRelation = function (e, obj, newSource) {
        e.diagram.startTransaction("changed relation");
        // get the context menu that holds the button that was clicked
        var contextmenu = obj.part;
        // get the node data to which the Node is data bound
        var nodedata = contextmenu.data;
        var model = e.diagram.model;
        var fromNode = model.findNodeDataForKey(nodedata.from);
        var toNode = model.findNodeDataForKey(nodedata.to);
        var fromNodeTable = model.findNodeDataForKey(fromNode.group);
        var toNodeTable = model.findNodeDataForKey(toNode.group);
        // modify the node data
        // this evaluates data Bindings and records changes in the UndoManager
        model.setDataProperty(nodedata, "relationType", newSource);
        model.setDataProperty(nodedata, "toolTipText",
            (newSource.toUpperCase() + ": " + fromNodeTable.WorkspaceTableName + "." + fromNode.columnname + " = " + toNodeTable.WorkspaceTableName + "." + toNode.columnname));
        e.diagram.commitTransaction("changed relation");
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
        return {
            category: table.category,
            description: table.description,
            isGroup: true,
            key: table.key,
            WorkspaceTableName: table.WorkspaceTableName,
            columns: table.Fields
        };
    }

    ns.getColumnsFromTable = function (table) {
        var columns = [];
        for (j = 0; j < table.Fields.length; j++) {
            // var column =
            columns.push({
                category: "Column",
                columnname: table.Fields[j].COLUMNNAME,                              //%%edit      text: TableInJson[i].columns[j].name,
                columnid: ("T" + i + "C" + j + "I" + table.Fields[j].COLUMNID),     //%%edit             nothing remove this 
                columntype: table.Fields[j].COLUMNTYPE,                                                 //%%edit             nothing remove this 
                group: table.key
            });
        }

        return columns;
    }

    ns.getTablesInGroupFormat = function (TableInJson) {
        var tables = [];
        var numberOfTables = TableInJson.length;

        for (i = 0; i < numberOfTables; i++) {
            tables.push(Ciel.Process.ProcessDesign.CreateJob.createTableInGroupFormat(TableInJson[i]));
            var defaultColumn = {
                category: "Column",
                columnname: "All",                             //%%edit      text: TableInJson[i].columns[j].name,
                columnid: "00",     //%%edit             nothing remove this 
                columntype: "",                                                 //%%edit             nothing remove this 
                group: TableInJson[i].key
            };
            tables.push(defaultColumn);
            Array.prototype.push.apply(tables, Ciel.Process.ProcessDesign.CreateJob.getColumnsFromTable(TableInJson[i]));
        }

        return tables;
    }



}(Ciel.Process.ProcessDesign.CreateJob));
