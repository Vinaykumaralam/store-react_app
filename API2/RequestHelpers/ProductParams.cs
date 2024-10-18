namespace API2.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Type { get; set; }
        public string Brands { get; set; }

    }
}
