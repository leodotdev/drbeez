import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "@/lib/default-content";
import type { SiteContent } from "@/lib/default-content";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  try {
    // Try to read the custom content file
    const fileContent = await fs.readFile(CONTENT_FILE, "utf-8");
    const content = JSON.parse(fileContent) as SiteContent;
    return NextResponse.json(content);
  } catch (error) {
    // If file doesn't exist or can't be read, return default content
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const content = (await request.json()) as SiteContent;

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), "data");
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Save content to file
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save content" },
      { status: 500 }
    );
  }
}
