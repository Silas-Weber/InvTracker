using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace csStonks.Api.Services
{
    public class SkinportService
    {

        private  readonly HttpClient _client;
        private readonly  IMemoryCache _cache;

        public SkinportService(HttpClient client, IMemoryCache cache)
        {
            _client = client;
            _cache = cache;
        }

        public async Task<List<SkinportItem>> GetItemsAsync()
        {

            if (_cache.TryGetValue<List<SkinportItem>>("skinport-items", out var cachedItems)
                && cachedItems is not null)
            {
                return cachedItems;
            }



            using HttpResponseMessage response = await _client.GetAsync("https://api.skinport.com/v1/items?app_id=730&currency=EUR");
            response.EnsureSuccessStatusCode();

               string json = await response.Content.ReadAsStringAsync();


            var items = JsonSerializer.Deserialize<List<SkinportItem>>(json);


            if (items == null)
            {
                throw new JsonException("Skinport hat null statt einer Item-Liste geliefert.");
            }
            _cache.Set("skinport-items", items, TimeSpan.FromMinutes(5));

                  return items;

        }

    }
}
