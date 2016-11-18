using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassLibrary1;


namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Hello WOrld");

            Class1 c = new Class1();
            Console.Write(c.getName("Pratap Singh Ranawat"));
        }
    }
}
