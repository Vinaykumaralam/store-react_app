using API2.Entities;
using API2.RequestHelpers;
using Azure;
using System.Text.Json;

namespace API2.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response,MetaData metaData)
        {
            var options=new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData,options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}
