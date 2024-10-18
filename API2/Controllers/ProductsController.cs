using API2.Data;
using API2.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API2.Extensions;
using API2.RequestHelpers;

namespace API2.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly StoreContext _storeContext;
        public ProductsController(StoreContext storeContext)
        {
            this._storeContext = storeContext;
        }
        [HttpGet]
        [Route("/[action]")]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query=_storeContext.Products.Sort(productParams.OrderBy).Search(productParams.SearchTerm)
                                    .Filters(productParams.Brands, productParams.Type)
                                    .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }
        [HttpGet]
        [Route("/[action]/id/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands=await _storeContext.Products.Select(b=>b.Brand).Distinct().ToListAsync();
            var types = await _storeContext.Products.Select(b => b.PictureType).Distinct().ToListAsync();

            return Ok(new {brands,types});
        }
    }
}
