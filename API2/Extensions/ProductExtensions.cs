using API2.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API2.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query,string OrderBy)
        {
            if (OrderBy.IsNullOrEmpty()) return query.OrderBy(p => p.Name);
            query = OrderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };
            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query,string SearchBy)
        {
            if (SearchBy.IsNullOrEmpty()) return query;
            string lowerCaseSearchTerm = SearchBy.Trim().ToLower();
            return query.Where(p=>p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filters(this IQueryable<Product> query,string Brand,string Type)
        {
            var BrandList=new List<string>();
            var TypeList = new List<string>();

            if (!string.IsNullOrEmpty(Brand))
                BrandList.AddRange(Brand.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(Type))
                TypeList.AddRange(Type.ToLower().Split(",").ToList());

            query = query.Where(p => BrandList.Count == 0 || BrandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => TypeList.Count == 0 || TypeList.Contains(p.PictureType.ToLower()));

            return query;
        }
    }
}
