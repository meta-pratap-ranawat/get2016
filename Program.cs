using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ClientCaller
{
    class Program
    {
        private static X509Certificate2 GetClientCertificate()
        {
            Console.WriteLine("debugtoCheck");
            X509Store userCaStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            try
            {
                Console.WriteLine("debugtoCheck");
                userCaStore.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certificatesInStore = userCaStore.Certificates;
                X509Certificate2Collection findResult = certificatesInStore.Find(X509FindType.FindBySubjectName, "localtestclientcert", true);
                X509Certificate2 clientCertificate = null;
                if (findResult.Count == 1)
                {
                    clientCertificate = findResult[0]; Console.WriteLine("got client");
                }
                else
                {
                    throw new Exception("Unable to locate the correct client certificate.");
                }
                return clientCertificate;
            }
            catch
            {
                throw;
            }
            finally
            {
                userCaStore.Close();
            }
        }

        static void Main(string[] args)
        {
            //HttpClient client = new HttpClient()
            //{
            //    BaseAddress = new Uri("http://localhost:56949/")
            //};

            //HttpResponseMessage response = client.GetAsync("customers").Result;
            //string responseContent = response.Content.ReadAsStringAsync().Result;
            //Console.WriteLine(responseContent);
            //Console.ReadKey();

            try
            {
                Console.WriteLine("debugtoCheck");
                X509Certificate2 clientCert = GetClientCertificate();
                Console.WriteLine("debug one"+ clientCert==null);
                WebRequestHandler requestHandler = new WebRequestHandler();
                requestHandler.ClientCertificates.Add(clientCert);

                HttpClient client = new HttpClient(requestHandler)
                {
                    BaseAddress = new Uri("http://localhost:3020/")
                };

                HttpResponseMessage response = client.GetAsync("customers").Result;
                response.EnsureSuccessStatusCode();
                string responseContent = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(responseContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception while executing the test helllo code: {0}", ex.Message);
            }
            Console.ReadKey();
        }
    }
}
