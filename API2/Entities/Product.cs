using System.ComponentModel.DataAnnotations;

namespace API2.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string PictureType { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}
