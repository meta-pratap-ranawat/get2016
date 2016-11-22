using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookShop
{
    public class Book : IEquatable<Book>
    {
        public String Title { set; get; }
        public String Author { set; get; }
        public int Price { set; get; }
        public String Publisher { set; get; }
        public int StockPosition { set; get; }


        public bool Equals(Book otherBook)
        {
            if (otherBook == null)
            {
                return false;
            }
            else {
                return (
                  object.ReferenceEquals(this.Author, otherBook.Author) ||
                  this.Author != null &&
                  this.Author.Equals(otherBook.Author)
              ) &&
              (
                  object.ReferenceEquals(this.Title, otherBook.Title) ||
                  this.Title != null &&
                  this.Title.Equals(otherBook.Title)
              );
            }
        }
    }
}
