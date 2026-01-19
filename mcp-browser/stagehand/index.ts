import "dotenv/config";
import { Stagehand } from "@browserbasehq/stagehand";

async function main() {
    const stagehand = new Stagehand({
        env: "LOCAL",
        modelName: "gpt-4o-mini",
        modelClientOptions: {
            baseURL: process.env.OPENAI_BASE_URL,
            apiKey: process.env.OPENAI_API_KEY,
        },
        localBrowserLaunchOptions: {
            cdpUrl: 'http://0.0.0.0:9223',
            recordVideo: { dir: './videos', size: { width: 1920, height: 1080 } },
        },
    });

    await stagehand.init();

    const page = stagehand.page;

    await page.goto("https://sledovanitv.cz");

    const agent = await stagehand.agent({
        instructions: "You're a helpful assistant that can control a web browser.",
    });

    const agentResult = await agent.execute("Extract packages from the homepage and order by price.");
    console.log(`Agent result:\n`, agentResult);

    await stagehand.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
