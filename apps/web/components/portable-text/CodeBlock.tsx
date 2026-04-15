"use client";

import React, { useState, useMemo } from "react";
import { Check, Copy, Terminal, Play, Code } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showPreview?: boolean;
  output?: string;
}

export function CodeBlock({ code, language = "text", filename, showPreview, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const isWebLanguage = ["html", "css", "javascript", "typescript"].includes(language.toLowerCase());
  const isConsoleLanguage = ["python", "bash", "json"].includes(language.toLowerCase());
  const canPreview = showPreview && (isWebLanguage || output);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // Generate iframe source for web previews
  const iframeSrcDoc = useMemo(() => {
    if (!isWebLanguage) return "";
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              padding: 20px;
              margin: 0;
              background: #fff;
              color: #0f172a;
            }
            ${language === 'css' ? code : ''}
          </style>
        </head>
        <body>
          ${language === 'html' ? code : ''}
          <script>
            ${language === 'javascript' || language === 'typescript' ? code : ''}
          </script>
        </body>
      </html>
    `;
  }, [code, language, isWebLanguage]);

  return (
    <div className="my-10 group relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl transition-all duration-300">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between px-6 py-2 bg-slate-900/80 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 pr-4 border-r border-white/10">
            <Terminal className="w-3.5 h-3.5 text-brand-orange/60" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {filename || language || "Snippet"}
            </span>
          </div>
          
          {canPreview && (
            <div className="flex gap-1 p-1 bg-black/40 rounded-lg border border-white/5">
              <button
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === "code" 
                    ? "bg-brand-navy text-white shadow-lg" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Code className="w-3 h-3" />
                Code
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === "preview" 
                    ? "bg-brand-orange text-white shadow-lg" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Play className="w-3 h-3" />
                Preview
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[200px] bg-slate-950/50">
        {/* Code View */}
        {activeTab === "code" && (
          <div className="p-6 md:p-8 overflow-x-auto custom-scrollbar animate-in fade-in duration-300">
            <pre className="font-mono text-sm md:text-base leading-relaxed text-slate-300 selection:bg-brand-orange/30">
              <code>{code}</code>
            </pre>
          </div>
        )}

        {/* Preview View */}
        {activeTab === "preview" && (
          <div className="p-0 animate-in zoom-in-95 fade-in duration-300">
            {isWebLanguage ? (
              <iframe
                srcDoc={iframeSrcDoc}
                title="Preview"
                sandbox="allow-scripts"
                className="w-full min-h-[300px] md:min-h-[400px] bg-white border-0"
              />
            ) : (
              <div className="p-8 font-mono bg-black text-emerald-400 text-sm md:text-base selection:bg-emerald-400/20">
                <div className="flex items-center gap-2 mb-4 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-[10px] uppercase tracking-widest">Interactive Terminal</span>
                </div>
                <div className="mb-2 flex items-start gap-2">
                  <span className="text-brand-orange select-none opacity-80">$</span>
                  <span className="text-white italic opacity-70 cursor-default">{language.toLowerCase()} main.{language.toLowerCase().slice(0, 2)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-brand-orange select-none opacity-80">&gt;</span>
                  <div className="whitespace-pre-wrap">{output || "No output provided."}</div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-4 bg-brand-orange/40" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange/20 via-brand-orange/40 to-brand-orange/20 opacity-30" />
    </div>
  );
}
