using System.Text.Json.Serialization;

namespace csStonks.Api
{
    public class SkinportItem
    {
        [JsonPropertyName("market_hash_name")]
        public string? MarketHashName { get; set; }

        [JsonPropertyName("min_price")]
        public decimal? MinPrice { get; set; }

    }
}
