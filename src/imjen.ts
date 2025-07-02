import OpenAI from "jsr:@openai/openai";
import {Jimp} from "jimp";


interface ImageConfig {
  description: string;
  promptTemplate?: string;
  promptArg?: string;
  width?: number;
  height?: number;
  displayTarget?: string;
}

interface Config {
  imageModel?: string;
  displayTarget?: string;
  width?: number;
  height?: number;
  promptTemplate?: string;
  images: ImageConfig[];
}

export class ImjenApp {
  private promptTemplates: Record<string, string> = {
    "ui-icon": "minimalist UI icon, clean design, simple shapes, flat style, {description}",
    "flat-icon": "flat icon design, simple geometric shapes, solid colors, {description}",
    "outline-icon": "outline icon, line art style, minimal design, {description}",
    "realistic": "photorealistic image, high quality, detailed, {description}",
    "artistic": "artistic interpretation, creative style, expressive, {description}",
  };

  async run() {
    console.log("🚀 Starting image generation...");

    try {
      const config = await this.loadConfig();
      console.log(`📋 Loaded configuration with ${config.images.length} images to generate`);

      const openai = new OpenAI({
        apiKey: Deno.env.get("OPENAI_API_KEY"),
      });

      for (let i = 0; i < config.images.length; i++) {
        const imageConfig = config.images[i];
        console.log(`\n🎨 Generating image ${i + 1}/${config.images.length}: ${imageConfig.description}`);

        try {
          await this.generateImage({ openai, config, imageConfig, index: i + 1 });
        } catch (error) {
          console.error(`❌ Failed to generate image ${i + 1}: ${error.message}`);
          continue; // Continue with next image
        }
      }

      console.log("\n✅ Image generation completed!");
    } catch (error) {
      console.error("❌ Error during image generation:", error.message);
      throw error;
    }
  }

  private async loadConfig(): Promise<Config> {
    try {
      const configText = await Deno.readTextFile("imjen.config.jsonc");
      // Simple JSONC parser - remove comments and parse
      const jsonText = configText
        .split('\n')
        .map(line => line.replace(/\/\/.*$/, '').trim())
        .filter(line => line.length > 0)
        .join('\n');

      return JSON.parse(jsonText);
    } catch (error) {
      throw new Error(`Failed to load config file: ${error.message}`);
    }
  }

  private buildPrompt(config: Config, imageConfig: ImageConfig): string {
    // Use custom prompt if provided
    if (imageConfig.promptArg) {
      return imageConfig.promptArg;
    }

    // Use template-based prompt
    const template = imageConfig.promptTemplate || config.promptTemplate || "realistic";
    const templateText = this.promptTemplates[template];

    if (!templateText) {
      throw new Error(`Unknown prompt template: ${template}`);
    }

    return templateText.replace("{description}", imageConfig.description);
  }

  private async generateImage({ openai, config, imageConfig, index }: {
    openai: OpenAI;
    config: Config;
    imageConfig: ImageConfig;
    index: number;
  }) {
    const prompt = this.buildPrompt(config, imageConfig);
    const width = imageConfig.width || config.width || 1024;
    const height = imageConfig.height || config.height || 1024;
    const size = `${width}x${height}` as "1024x1024" | "1792x1024" | "1024x1792";

    console.log(`   📝 Prompt: ${prompt}`);
    console.log(`   📐 Size: ${size}`);

    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
    });
    
    
    

    console.log(`   🔗 Generated URL: ${result.data[0].url}`);

    // Create filename from description
    const safeDescription = imageConfig.description
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);
    const filename = `${String(index).padStart(2, '0')}_${safeDescription}.png`;

    try {
      const imageResponse = await fetch(result.data[0].url!);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
      }

      const imageData = await imageResponse.arrayBuffer();
      await Deno.writeFile(filename, new Uint8Array(imageData));

      // open a file called "lenna.png"
      const image = await Jimp.read(filename);

      image.resize({
        w: width,
        h: height
      });

      await image.write(filename as any);
      console.log(`   💾 Image saved as: ${filename}`);
    } catch (error) {
      console.error(`   ❌ Error saving image: ${error.message}`);
      throw error;
    }
  }
}
