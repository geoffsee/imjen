export default `
{
//  "REPLICATE_API_TOKEN": "your_token_here",
  "imageModel": "stability-ai/sdxl",
  "displayTarget": "browser",
  "width": 512,
  "height": 512,
  "promptTemplate": "ui-icon",
  "images": [
    {
      "description": "Compass Rose for the central navigation display",
      "promptTemplate": "ui-icon"
    },
    {
      "description": "Wind Direction Arrow",
      "promptTemplate": "flat-icon",
      "width": 256,
      "height": 256
    },
    {
      "description": "Settings gear icon",
      "promptTemplate": "outline-icon"
    },
    {
      "description": "Beautiful sunset landscape",
      "promptTemplate": "realistic",
      "width": 1024,
      "height": 768
    },
    {
      "description": "Abstract geometric pattern",
      "promptTemplate": "artistic"
    },
    {
      "description": "Custom prompt example",
      "promptArg": "futuristic neon-lit cyberpunk cityscape, high contrast, vibrant colors"
    }
    // Available templates: ui-icon, flat-icon, outline-icon, realistic, artistic, custom
    // Use "promptArg" for complete custom prompts (overrides templates)
    // Use "promptTemplate" + "description" for template-based generation
  ]
}
`
