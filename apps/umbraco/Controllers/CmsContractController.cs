using Microsoft.AspNetCore.Mvc;

namespace CmsDemo.Umbraco.Controllers;

[ApiController]
[Route("api/cms-contract")]
public sealed class CmsContractController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            ok = true,
            source = "umbraco",
            adapter = "cms-contract"
        });
    }

    [HttpGet("model")]
    public IActionResult Model()
    {
        return Ok(new
        {
            contentTypes = new[]
            {
                "newsPost",
                "roadmapItem",
                "pageNotification",
                "componentDefinition",
                "contentPage",
                "formDefinition"
            },
            adapterContracts = new[]
            {
                "CmsSiteSlice",
                "NewsListItem",
                "NewsPost",
                "RoadmapItem"
            }
        });
    }
}
