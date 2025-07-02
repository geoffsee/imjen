# Imjen - AI Image Generator

Imjen is a command-line tool for generating AI-powered images using OpenAI's DALL-E 3 API. It's optimized for creating minimalistic flat vector icons and other images with customizable prompts and dimensions.

## Quick Start with npx

You can run Imjen directly without installation using npx:

```bash
npx imjen
```

## Prerequisites

- **OpenAI API Key**: You need an OpenAI API key to use this tool. Get one at [platform.openai.com](https://platform.openai.com)
- **Node.js**: Required for npx execution

## Setup

1. **Set your API key** (choose one method):
   - Environment variable: `export OPENAI_API_KEY=your_key_here`
   - Or add it to your configuration file (see Configuration section)

2. **Run the tool**:
   ```bash
   npx imjen
   ```

On first run, Imjen will automatically create a configuration file (`imjen.config.jsonc`) with example settings.

## Configuration

Imjen uses a `imjen.config.jsonc` file for configuration. Here's the structure:

```jsonc
{
  // Optional: Set API key in config instead of environment
  // "OPENAI_API_KEY": "your_key_here",

  // Default dimensions (optional)
  "width": 1024,
  "height": 1024,

  // Default prompt template (optional)
  "promptTemplate": "ui-icon",

  // Generate multiple images
  "images": [
    {
      "description": "Compass Rose for navigation",
      "promptArg": "minimal flat compass rose icon",
      "width": 512,
      "height": 512
    },
    {
      "description": "Wind Direction Arrow",
      "promptTemplate": "flat-icon",
      "width": 256,
      "height": 256
    }
  ]
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `OPENAI_API_KEY` | string | - | Your OpenAI API key |
| `width` | number | `1024` | Default image width in pixels |
| `height` | number | `1024` | Default image height in pixels |
| `promptTemplate` | string | `"realistic"` | Default prompt template to use |
| `description` | string | - | Description for the image |
| `promptArg` | string | - | Custom prompt (overrides template) |
| `images` | array | - | Array of image configurations for batch generation |

### Available Prompt Templates

| Template | Description |
|----------|-------------|
| `ui-icon` | Minimalist UI icon, clean design, simple shapes, flat style |
| `flat-icon` | Flat icon design, simple geometric shapes, solid colors |
| `outline-icon` | Outline icon, line art style, minimal design |
| `realistic` | Photorealistic image, high quality, detailed |
| `artistic` | Artistic interpretation, creative style, expressive |

## Usage Examples

### Single Image Generation

For single image generation, configure a single image in the images array:

```jsonc
{
  "width": 512,
  "height": 512,
  "images": [
    {
      "description": "My custom icon",
      "promptArg": "minimalist settings gear icon"
    }
  ]
}
```

### Multiple Images (Batch Generation)

Use the `images` array for generating multiple images:

```jsonc
{
  "width": 1024,
  "height": 1024,
  "promptTemplate": "ui-icon",
  "images": [
    {
      "description": "Home Icon",
      "promptTemplate": "flat-icon"
    },
    {
      "description": "User Profile Icon", 
      "promptArg": "minimal user profile icon",
      "width": 512,
      "height": 512
    },
    {
      "description": "Search Icon",
      "promptTemplate": "outline-icon"
    }
  ]
}
```

### Environment Variables

Set your API key as an environment variable:

```bash
# Linux/macOS
export OPENAI_API_KEY=your_key_here
npx imjen

# Windows
set OPENAI_API_KEY=your_key_here
npx imjen
```

## Prompt Templates

If no `promptArg` is specified, Imjen uses prompt templates to generate images. The default template is "realistic", but you can specify different templates:

- **ui-icon**: Creates minimalist UI icons with clean design and simple shapes
- **flat-icon**: Generates flat icon designs with geometric shapes and solid colors  
- **outline-icon**: Produces outline-style icons with line art and minimal design
- **realistic**: Creates photorealistic, high-quality, detailed images
- **artistic**: Generates artistic interpretations with creative and expressive styles

Templates automatically incorporate your description into optimized prompts for DALL-E 3.

## Output

- Generated images are saved as PNG files in the current directory
- Files are automatically named using the format: `01_description.png`, `02_description.png`, etc.
- Filenames are based on the image description, sanitized for filesystem compatibility
- Images are automatically resized to the specified dimensions using high-quality algorithms
- Success/error messages are displayed in the console

## Troubleshooting

### Common Issues

1. **"OPENAI_API_KEY is not set"**
   - Set the API key as an environment variable or in your config file
   - Get an API key from [platform.openai.com](https://platform.openai.com)

2. **"Error generating image"**
   - Check your internet connection
   - Verify your API key is valid and has sufficient credits
   - Ensure your OpenAI account has access to DALL-E 3

3. **Configuration file not found**
   - Run `npx imjen` once to auto-generate the example configuration
   - Manually create `imjen.config.jsonc` in your project directory

## Model

Imjen uses OpenAI's DALL-E 3 model for all image generation. DALL-E 3 provides:

- High-quality image generation with excellent prompt adherence
- Support for various artistic styles and photorealistic images
- Built-in safety features and content filtering
- Consistent results optimized for creative applications

## Contributing

This project is built with Deno and TypeScript. The source code is available on the project repository.

## License

See the project repository for license information.
