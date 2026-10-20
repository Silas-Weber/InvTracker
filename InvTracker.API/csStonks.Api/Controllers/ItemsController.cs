using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using csStonks.Api.Services;


namespace csStonks.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {

        private readonly SkinportService _skinportService;
        private readonly SingleSpItemService _singleSpItemService;
        private readonly ILogger<ItemsController> _logger;
        public ItemsController(SkinportService skinportService, SingleSpItemService singleSpItemService, ILogger<ItemsController> logger)
        {
            _skinportService = skinportService;
            _singleSpItemService = singleSpItemService;
            _logger = logger;
        }


        [HttpGet]

        public async Task<ActionResult<List<SkinportItem>>> GetItemsAsync(decimal maxPrice = 300)
        {


            if (maxPrice < 1 || maxPrice > 10000)
            {
                return BadRequest("Preis muss zwischen 1 und 10000 liegen.");
            }

            try
            {
                var items = await _skinportService.GetItemsAsync();

                return Ok(items.Where(item => item.MinPrice <= maxPrice).ToList());

            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Fehler beim Abrufen der Skinport-Items.");
                return StatusCode(502, "Skinport konnte nicht erfolgreich abgefragt werden.");
            }
            catch (JsonException ex) {
                _logger.LogError(ex, "Fehler beim verarbeiten der JSON.");

                return StatusCode(502, "Die Antwort konnte nicht in deine Datenstruktur umgewandelt werdeen");
            }
            catch(OperationCanceledException ex)
            {
                _logger.LogError(ex, "Zeitüberschreitung beim Skinport-Aufruf");
                return StatusCode(504, "Skinport hat nicht geantwortet");
            }
        }

        [HttpGet("single")]
        public async Task<ActionResult<string>> GetSingle(string itemName)
        {

            if (string.IsNullOrWhiteSpace(itemName))
            {
                return BadRequest("Bitte einen Itemnamen angeben.");
            }


            var item = await _singleSpItemService.GetSingleSpItemAsync(itemName);

            if (item is null)
            {
                return NotFound("Item nicht gefunden.");
            }

            return Ok(item);

        }
    }
}
