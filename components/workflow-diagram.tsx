"use client"

import { ArrowRight, FileCode, FolderTree, Scan, FileOutput, RefreshCw } from "lucide-react"

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
]

export function WorkflowDiagram() {
  return (
    <div className="w-full py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mb-3 transition-transform hover:scale-105`}
              >
                <step.icon className="w-7 h-7" />
              </div>
              <span className="font-semibold text-foreground text-sm">{step.label}</span>
              <span className="text-xs text-muted-foreground mt-1 max-w-[120px]">{step.description}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-muted-foreground/50 hidden lg:block shrink-0 mx-2" />
            )}
            {index < steps.length - 1 && (
              <div className="w-px h-8 bg-border lg:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
