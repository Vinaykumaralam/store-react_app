namespace API2.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.productId != product.Id))
            {
                Items.Add(new BasketItem { productId = product.Id, Quantity = quantity });
                return;
            }
            var existingItem = Items.FirstOrDefault(item => item.productId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.productId == product.Id);
            if (existingItem == null) return;
            existingItem.Quantity -= quantity;
            if (existingItem.Quantity == 0) Items.Remove(existingItem);
        }
    }
}
