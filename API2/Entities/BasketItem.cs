using System.ComponentModel.DataAnnotations.Schema;

namespace API2.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int BasketId {  get; set; }
        public Basket Basket { get; set; }
    }
}
