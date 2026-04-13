"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@parenthub/cms/sanity.config";
export default function StudioPage() { return <NextStudio config={config} />; }
