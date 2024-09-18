namespace API2.DTO
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public string buyerId {  get; set; }
        public List<BasketItemsDTO> basketItems {  get; set; }
        
    }
}
