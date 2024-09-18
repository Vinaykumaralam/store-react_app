namespace API2.DTO
{
    public class BasketItemsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string pictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type {  get; set; }
        public long Price { get; set; }
        public int quantity { get; set; }

    }
}