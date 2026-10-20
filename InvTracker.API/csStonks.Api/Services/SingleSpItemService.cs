using Microsoft.Extensions.Caching.Memory;
using System.Data;

namespace csStonks.Api.Services
{
    public class SingleSpItemService
    {

        public readonly IMemoryCache _cache;
        public readonly SkinportService _skinportService;

        public SingleSpItemService(IMemoryCache cache, SkinportService skinportService)
        {
            _cache = cache;
            _skinportService = skinportService;
        }

        public async Task<SkinportItem?> GetSingleSpItemAsync(string itemName)
        {

            if (itemName == null) {
                throw new ArgumentNullException("name darf nicht leer sein");
            }

            var items = await _skinportService.GetItemsAsync();

            return items.FirstOrDefault(item => item.MarketHashName == itemName);

        }

    }
}
