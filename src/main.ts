import {ImjenApp} from "./imjen.ts";
import {existsSync} from "https://deno.land/std/fs/mod.ts";
import default_config from "./default_config.ts";

if (import.meta.main) {
  const app = new ImjenApp();

  if (!existsSync("imjen.config.jsonc")) {
    await Deno.writeTextFile("imjen.config.jsonc", default_config);
  }

  await app.run();
}