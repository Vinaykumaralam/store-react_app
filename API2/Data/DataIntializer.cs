using API2.Entities;

namespace API2.Data
{
    public static class DataIntializer
    {
        public static void Intialize(StoreContext context)
        {
            if (context.Products.Any()) return;
            var products = new List<Product>
            {
                new Product{Name="Blue Boots",Description="Blue Leather Boots",Price=5000,
                PictureUrl="/images/products/boot1.png",PictureType="Boots",Brand="Puma",QuantityInStock=100},
                new Product{Name="Black Boots",Description="Black Leather Boots",Price=5000,
                PictureUrl="/images/products/boot2.png",PictureType="Boots",Brand="Puma",QuantityInStock=100},
                new Product{Name="Brown Boots",Description="Brown Leather Boots",Price=5000,
                PictureUrl="/images/products/boot3.png",PictureType="Boots",Brand="Puma",QuantityInStock=100}

            };
            foreach(var product in products)
            {
                context.Products.Add(product);
            }
            context.SaveChanges();
        }
    }
}
