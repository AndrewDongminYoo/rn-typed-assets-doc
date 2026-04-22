"use client";

import { ArrowRight, FileCode, FileOutput, FolderTree, RefreshCw, Scan } from "lucide-react";

const steps = [
  {
    icon: FolderTree,
    label: "Asset Directory",
    description: "src/assets/",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Scan,
    label: "Scan",
    description: "Recursive file discovery",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: RefreshCw,
    label: "Normalize",
    description: "Generate camelCase keys",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileOutput,
    label: "Emit",
    description: "assets.gen.ts + manifest",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileCode,
    label: "Import",
    description: "Type-safe references",
    color: "bg-primary/10 text-primary",
  },
];

export function WorkflowDiagram() {
  return (
    <div className="w-full py-8">
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-2">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-2" key={step.label}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`h-16 w-16 rounded-xl ${step.color} mb-3 flex items-center justify-center transition-transform hover:scale-105`}
              >
                <step.icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
              <span className="mt-1 max-w-[120px] text-xs text-muted-foreground">
                {step.description}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="mx-2 hidden h-5 w-5 shrink-0 text-muted-foreground/50 lg:block" />
            )}
            {index < steps.length - 1 && <div className="h-8 w-px bg-border lg:hidden" />}
          </div>
        ))}
      </div>
    </div>
  );
}
