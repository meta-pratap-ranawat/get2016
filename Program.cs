using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;

using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Selectors;

namespace ClientCaller
{
    class Program
    {
        private static X509Certificate2 GetClientCertificate()
        {
            Console.WriteLine("InSideGetClientCertificate");
            X509Store userCaStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            try
            {
                
                userCaStore.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certificatesInStore = userCaStore.Certificates;
                X509Certificate2Collection findResult = certificatesInStore.Find(X509FindType.FindBySubjectName, "localtestclientcert", true);
                X509Certificate2 clientCertificate = null;
                Console.WriteLine("We have clientCertificate: ");
                if (findResult.Count == 1)
                {
                    clientCertificate = findResult[0]; Console.WriteLine("Yes Got it");
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
           
            try
            {
                
                X509Certificate2 clientCert = GetClientCertificate();
                
                WebRequestHandler requestHandler = new WebRequestHandler();
                requestHandler.ClientCertificates.Add(clientCert);
                Console.WriteLine("adding client certificate with requestHandler");
                HttpClient client = new HttpClient(requestHandler)
                {
                    BaseAddress = new Uri("https://localhost/")
                };
                Console.WriteLine("Hitting URL");
                HttpResponseMessage response = client.GetAsync("customers").Result; Console.WriteLine(" getting response");
                response.EnsureSuccessStatusCode(); 
                string responseContent = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine("debugtoCheck"+responseContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception while executing the test code: {0}", ex.Message);
            }
            Console.ReadKey(); 


        }
    }
}
