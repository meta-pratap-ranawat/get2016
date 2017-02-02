using Ciel.Application.Common;
using Ciel.Areas.Process.Models;
using Ciel.Areas.Process.Models.Enums;
using Ciel.Areas.Process.Models.JDL;
using Ciel.Areas.Process.Models.Nodes;
using Ciel.ProcessDesigner.Biz.Biz;
using Ciel.ProcessDesigner.Biz.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Web.Http;
using YamlDotNet.Serialization;

namespace Ciel.Areas.Process.Controllers.Api.Setting
{
    [Authorize]
    [RoutePrefix("api/process/setting/ftt")]
    public class FileToTableController : ProcessApiController
    {
        public FileToTableController()
        {
            this.Name = "/ftt";
        }

        //[HttpGet]
        //[Route("nodes")]
        //public List<Node> GetNodeTemplateArray()
        //{
        //    List<Node> NodeArray = new List<Node>();

        //    Node file = new Node("File", "File1", "File containing data");
        //    file.columns = new Column[4];
        //    file.columns[0] = new Column(1001, "File1Column1", 1);
        //    file.columns[1] = new Column(1002, "File1Column2", 2);
        //    file.columns[2] = new Column(1003, "File1Column3", 3);
        //    file.columns[3] = new Column(1004, "File1Column4", 4);
        //    NodeArray.Add(file);

        //    Node file2 = new Node("File", "File2", "File containing data");
        //    file2.columns = new Column[4];
        //    file2.columns[0] = new Column(2001, "File2Column1", 1);
        //    file2.columns[1] = new Column(2002, "File2Column2", 2);
        //    file2.columns[2] = new Column(2003, "File2Column3", 3);
        //    file2.columns[3] = new Column(2004, "File2Column4", 4);
        //    NodeArray.Add(file2);

        //    Node step = new Node("Step", "Step", "Write data to table from file");
        //    NodeArray.Add(step);


        //    Node table = new Node("Table", "Table1", "Table to write data to");
        //    table.columns = new Column[3];
        //    table.columns[0] = new Column(3001, "TableColumn1", 1);
        //    table.columns[1] = new Column(3002, "TableColumn2", 2);
        //    table.columns[2] = new Column(3003, "TableColumn3", 3);
        //    NodeArray.Add(table);

        //    return NodeArray;
        //}



        [HttpGet]
        [Route("nodes")]
        public List<Node> GetNodeTemplateArray()
        {
            List<Node> nodeArray = new List<Node>();

            List<Node> fileNodeArray = GetFileColumnsNodes();

            nodeArray.AddRange(fileNodeArray);

            StepNode step = new StepNode("Step", "File To Table Step", "Write data to table from file", "Step01", "File To Table StepName", StepType.FileToTable);
            nodeArray.Add(step);

            List<Node> tableNodeArray = GetTableFieldNodes();

            nodeArray.AddRange(tableNodeArray);

            return nodeArray;
        }

		    [HttpGet]
        [Route("filenodes")]
        public List<Node> GetFileNodeTemplateArray()
        {
            List<Node> nodeArray = new List<Node>();

            List<Node> fileNodeArray = GetFileColumnsNodes();

            nodeArray.AddRange(fileNodeArray);

            //Node step = new Node("Step", "Step", "Write data to table from file");
            //nodeArray.Add(step);

            //List<Node> tableNodeArray = GetTableFieldNodes();

            //nodeArray.AddRange(tableNodeArray);

            return nodeArray;
        }

        [HttpGet]
        [Route("stepnodes")]
        public List<Node> GetStepNodeTemplateArray()
        {
            List<Node> nodeArray = new List<Node>();

            //List<Node> fileNodeArray = GetFileColumnsNodes();

            //nodeArray.AddRange(fileNodeArray);

            StepNode step = new StepNode("Step", "File To Table Step", "Write data to table from file", "Step01", "File To Table StepName", StepType.FileToTable);
            nodeArray.Add(step);

            //List<Node> tableNodeArray = GetTableFieldNodes();

            //nodeArray.AddRange(tableNodeArray);

            return nodeArray;
        }

        [HttpGet]
        [Route("tablenodes")]
        public List<Node> GetTableNodeTemplateArray()
        {
            List<Node> nodeArray = new List<Node>();

            //List<Node> fileNodeArray = GetFileColumnsNodes();

            //nodeArray.AddRange(fileNodeArray);

            //Node step = new Node("Step", "Step", "Write data to table from file");
            //nodeArray.Add(step);

            List<Node> tableNodeArray = GetTableFieldNodes();

            nodeArray.AddRange(tableNodeArray);

            return nodeArray;
        }

        private List<Node> GetFileColumnsNodes()
        {
            List<Node> nodeArray = new List<Node>();

            string inputFileDirectory = ConfigurationManager.AppSettings["InputFileDirectory"];

            FileNode file;

            foreach (string file1 in Directory.EnumerateFiles(inputFileDirectory, "*.xlsx"))
            {
                FileInfo fileInfo = new FileInfo(file1);

                var fileName = Path.GetFileNameWithoutExtension(fileInfo.Name);

                List<string> headers = NPOIUtils.GetHeadersList(file1);

                file = new FileNode("File", fileName, "File containing data");

                file.columns = new Models.Column[headers.Count];

                for (int i = 0; i < headers.Count; i++)
                {
                    file.columns[i] = new Models.Column((1000 + i), headers[i], i);
                }

                file.Path.FilePath = fileInfo.FullName;

                file.FileFormat.Type = fileInfo.Extension;
                file.FileFormat.ColumnDelimiter = "','";
                file.FileFormat.RowDelimiter = ">2";

                nodeArray.Add(file);
            }

            return nodeArray;
        }

        private List<Node> GetTableFieldNodes()
        {
                        string[] outputTables = ConfigurationManager.AppSettings["OutputTables"].Split(",".ToCharArray());

            List<Node> nodeArray = new List<Node>();

            Node table;

            for (int i = 0; i < outputTables.Length; i++)
            {
                string tableName = outputTables[i];
                var biz = new CielJobBiz(this.Context);
                List<Dictionary<string, string>> list = biz.GetFieldsListByTable(tableName);

                table = new Node("Table", tableName, "Table to write data to");

                table.columns = new Models.Column[5]; /* list.Count */

                for (int j = 0; j <5 ; j++) /*list.Count*/
                {
                    table.columns[j] = new Models.Column((200+j),("column"+j),j);//new Models.Column((3000 + j), ((Dictionary<string, string>)list[j])["NAME"], j);
                }

                nodeArray.Add(table);
            }

            return nodeArray;
        }

        [HttpPost]
        [Route("saveYAML")]
        public String SaveYAML(SerializedJob serializedJob)
        {
            //var expConverter = new ExpandoObjectConverter();
            //dynamic deserializedObject = JsonConvert.DeserializeObject<ExpandoObject>(serializedJob.jobJSON, expConverter);
            dynamic deserializedObject = JsonConvert.DeserializeObject(serializedJob.jobJSON);


            Job job = new Job();
            job.JobName = deserializedObject.JobDetails.JobName;
            job.JobId = 1;
            job.JobState = "Ready"; // deserializedObject.JobDetails.JobState;
            job.Target = "Sql Server"; // deserializedObject.JobDetails.JobTarget;

            var nodeDataArray = ((Newtonsoft.Json.Linq.JArray)(deserializedObject.diagramData.nodeDataArray)).ToList();
            var linkDataArray = ((Newtonsoft.Json.Linq.JArray)(deserializedObject.diagramData.linkDataArray)).ToList();

            //Add tables to job object
            var tables = nodeDataArray.Cast<dynamic>().Where(node => node.category == "Table").ToList();
            tables.ForEach(table =>
            {
                job.WorkspaceTables.Add(new Table(table.text.ToString()));
            });


            //Add files to job object
            var files = nodeDataArray.Cast<dynamic>().Where(node => node.category == "File").ToList();
            files.ForEach(file =>
            {
                job.WorkspaceFiles.Add(new Models.JDL.JobFile(file.text.ToString(), file.FileFormat.Type.ToString(), file.FileFormat.ColumnDelimiter.ToString(), file.FileFormat.RowDelimiter.ToString(), file.Path.FilePath.ToString(), Convert.ToBoolean(file.Path.IsRelativePath)));
            });
            //job.WorkspaceFiles.Add(new Models.JDL.JobFile("File1", "CSV", "','", ">2", "", false));

            //Add steps to job object
            var steps = nodeDataArray.Cast<dynamic>().Where(node => node.category == "Step").ToList();
            steps.ForEach(step =>
            {
                FileToTableStep fileToTableStep = new FileToTableStep(step.StepDetails.StepID.ToString(), step.text.ToString(), (StepType)step.StepDetails.StepType);

                //Add InputData to step
                linkDataArray.Cast<dynamic>().Where(link => link.to == step.key).ToList().ForEach(link =>
                {
                    fileToTableStep.InputData.Add(files.FirstOrDefault(file => file.key == link.from).text.ToString());
                });

                //Add OutputData to step
                linkDataArray.Cast<dynamic>().Where(link => link.from == step.key).ToList().ForEach(link =>
                {
                    fileToTableStep.OutputData.Add(tables.FirstOrDefault(table => table.key == link.to).text.ToString());
                });

                //Add mappings to step
                var mappings = ((Newtonsoft.Json.Linq.JArray)(step.StepDetails.StepAttributes.ColumnMapping)).ToList();
                mappings.Cast<dynamic>().ToList().ForEach(mapping =>
                {
                    fileToTableStep.AddMapping(mapping.FieldIP.ToString(), mapping.FieldOP.ToString());
                });

                job.Steps.Add(fileToTableStep);
            });

            var serializer = new Serializer();
            string yamlstr = serializer.Serialize(job);

            //save yaml and json to database
            var bi = new CielJobBiz(base.Context);

            CielJobModel model = new CielJobModel { ENBLFG = "1", NewDefFlag = true, JOBCATID = "1", JOBNM = deserializedObject.JobDetails.JobName, LANGCD = "en", ActionType = "ADD", JOBJSON = serializedJob.jobJSON, JOBYAML = yamlstr };
            model.MultiLangs = new List<CielJobModel> { new CielJobModel { JOBNM = deserializedObject.JobDetails.JobName, LANGCD = "jp", LANGNM = "Japanese" } };

            CielJobModel retModel = bi.SaveJob(model);

            return retModel.JOBID.ToString();
        }

        [HttpPost]
        [Route("saveDiagrams")]
        public Boolean SaveDiagrams(Diagrams diagrams)
        {
            File.WriteAllText(HostingEnvironment.MapPath(@"~/Scripts/CanvasLib/diagrams.json"), diagrams.DiagramsJSON);

            return true;
        }

        [HttpGet]
        [Route("GetJobResults/{JOBID}")]
        public JobResultModel GetJobResults(string JOBID)
        {
            var bi = new CielJobBiz(this.Context);

            var job = bi.GetMLData(JOBID).ElementAt(0);
            
            dynamic deserializedObject = JsonConvert.DeserializeObject(job.JOBJSON);

            var nodeDataArray = ((Newtonsoft.Json.Linq.JArray)(deserializedObject.diagramData.nodeDataArray)).ToList();
            var linkDataArray = ((Newtonsoft.Json.Linq.JArray)(deserializedObject.diagramData.linkDataArray)).ToList();

            //Add tables to job object
            var table = nodeDataArray.Cast<dynamic>().Where(node => node.category == "Table").ToList().ElementAt(0);
            string tableName =  table.text.ToString();


            //Get columnNames
            var columnNames = new List<string>();

            var step = nodeDataArray.Cast<dynamic>().Where(node => node.category == "Step").ToList().ElementAt(0);
            var mappings = ((Newtonsoft.Json.Linq.JArray)(step.StepDetails.StepAttributes.ColumnMapping)).ToList();
            mappings.Cast<dynamic>().ToList().ForEach(mapping =>
            {
                columnNames.Add(mapping.FieldOP.ToString());
            });


            //string tableName = "[CIEL].[C_CIELJOB]";
            //var columnNames = new List<string>() { "JOBID", "CRTMNM" };

            var dataTable = bi.GetJobResults(columnNames, tableName);
            var jobResultModel = new JobResultModel();
            jobResultModel.ColumnsList = columnNames;
            jobResultModel.Rows = new List<string[]>();
            if (dataTable.Rows.Count > 0)
            {
                foreach (DataRow dr in dataTable.Rows)
                {
                    var arr = new string[columnNames.Count];
                    for (int i = 0; i < columnNames.Count; i++)
                    {
                        arr[i] = dr[i].ToString();
                    }

                    jobResultModel.Rows.Add(arr);
                }
            }

            var jobResultJason = Json(new { columnList = columnNames, rows = dataTable.Rows });
            return jobResultModel;
        }
    }
}
