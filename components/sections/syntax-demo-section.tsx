"use client";

import { useState } from "react";

import { CodeBlock } from "@/components/code-block";
import { SUPPORTED_LANGUAGES, TOKEN_COLORS } from "@/lib/syntax-highlighter";
import { cn } from "@/lib/utils";

// Code examples for different languages
const CODE_EXAMPLES = {
  typescript: {
    name: "TypeScript",
    filename: "example.ts",
    code: `interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.status}\`);
  }
  
  return response.json();
}

// Usage with type safety
const user = await fetchUser(123);
console.log(\`Welcome, \${user.name}!\`);`,
  },
  javascript: {
    name: "JavaScript",
    filename: "app.js",
    code: `import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  const { method, url } = req;
  
  if (method === 'GET' && url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
  },
  python: {
    name: "Python",
    filename: "main.py",
    code: `from typing import List, Optional
from dataclasses import dataclass
import asyncio

@dataclass
class Task:
    id: int
    title: str
    completed: bool = False
    
class TaskManager:
    def __init__(self):
        self._tasks: List[Task] = []
    
    async def add_task(self, title: str) -> Task:
        task = Task(
            id=len(self._tasks) + 1,
            title=title
        )
        self._tasks.append(task)
        return task
    
    def get_pending(self) -> List[Task]:
        return [t for t in self._tasks if not t.completed]

# Usage example
async def main():
    manager = TaskManager()
    await manager.add_task("Learn Python")
    print(f"Pending: {len(manager.get_pending())}")`,
  },
  go: {
    name: "Go",
    filename: "main.go",
    code: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Response struct {
    Message string \`json:"message"\`
    Status  int    \`json:"status"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    resp := Response{
        Message: "Service is healthy",
        Status:  200,
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/health", healthHandler)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}`,
  },
  rust: {
    name: "Rust",
    filename: "lib.rs",
    code: `use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Cache<T> {
    data: HashMap<String, T>,
    max_size: usize,
}

impl<T: Clone> Cache<T> {
    pub fn new(max_size: usize) -> Self {
        Cache {
            data: HashMap::new(),
            max_size,
        }
    }
    
    pub fn get(&self, key: &str) -> Option<&T> {
        self.data.get(key)
    }
    
    pub fn set(&mut self, key: String, value: T) -> bool {
        if self.data.len() >= self.max_size {
            return false;
        }
        self.data.insert(key, value);
        true
    }
}

fn main() {
    let mut cache: Cache<String> = Cache::new(100);
    cache.set("key".to_string(), "value".to_string());
}`,
  },
  swift: {
    name: "Swift",
    filename: "ViewController.swift",
    code: `import UIKit

protocol DataFetching {
    func fetchData() async throws -> [Item]
}

struct Item: Codable, Identifiable {
    let id: UUID
    let title: String
    let isCompleted: Bool
}

class ViewController: UIViewController {
    private let fetcher: DataFetching
    private var items: [Item] = []
    
    init(fetcher: DataFetching) {
        self.fetcher = fetcher
        super.init(nibName: nil, bundle: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        Task {
            do {
                items = try await fetcher.fetchData()
                updateUI()
            } catch {
                showError(error)
            }
        }
    }
}`,
  },
  kotlin: {
    name: "Kotlin",
    filename: "MainActivity.kt",
    code: `package com.example.app

import kotlinx.coroutines.*
import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Long,
    val name: String,
    val email: String
)

class UserRepository(private val api: ApiService) {
    suspend fun getUser(id: Long): Result<User> = withContext(Dispatchers.IO) {
        try {
            val user = api.fetchUser(id)
            Result.success(user)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

fun main() = runBlocking {
    val repo = UserRepository(ApiService())
    
    repo.getUser(123).fold(
        onSuccess = { println("Found: \${it.name}") },
        onFailure = { println("Error: \${it.message}") }
    )
}`,
  },
  bash: {
    name: "Bash",
    filename: "deploy.sh",
    code: `#!/bin/bash
set -euo pipefail

# Configuration
readonly APP_NAME="my-app"
readonly DEPLOY_DIR="/var/www/$APP_NAME"
readonly BACKUP_DIR="/var/backups/$APP_NAME"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

create_backup() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/backup_$timestamp.tar.gz"
    
    log "Creating backup at $backup_path"
    tar -czf "$backup_path" -C "$DEPLOY_DIR" .
}

deploy() {
    log "Starting deployment for $APP_NAME"
    
    create_backup
    
    log "Pulling latest changes..."
    git -C "$DEPLOY_DIR" pull origin main
    
    log "Deployment complete!"
}

deploy "$@"`,
  },
  yaml: {
    name: "YAML",
    filename: "docker-compose.yml",
    code: `version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/app
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes

volumes:
  postgres_data:`,
  },
  sql: {
    name: "SQL",
    filename: "queries.sql",
    code: `-- Create users table with constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Insert sample data
INSERT INTO users (email, username) VALUES
    ('alice@example.com', 'alice'),
    ('bob@example.com', 'bob');

-- Query with aggregation
SELECT 
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS user_count
FROM users
WHERE created_at >= NOW() - INTERVAL '1 year'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;`,
  },
  json: {
    name: "JSON",
    filename: "package.json",
    code: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "lint": "eslint src --fix"
  },
  "dependencies": {
    "express": "^4.18.2",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}`,
  },
} as const;

type LanguageKey = keyof typeof CODE_EXAMPLES;

export function SyntaxDemoSection() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageKey>("typescript");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const languageKeys = Object.keys(CODE_EXAMPLES) as LanguageKey[];
  const currentExample = CODE_EXAMPLES[activeLanguage];

  return (
    <section className="bg-background py-20" id="syntax-highlighting">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Syntax Highlighting
          </span>
          <h2 className="mb-4 text-3xl font-bold text-balance text-foreground md:text-4xl">
            Beautiful Code Highlighting for Every Language
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
            Professional syntax highlighting powered by Shiki with support for 25+ programming
            languages. Optimized for readability and accessibility.
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-muted p-1">
            <button
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                theme === "dark"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setTheme("dark")}
            >
              Dark Theme
            </button>
            <button
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                theme === "light"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setTheme("light")}
            >
              Light Theme
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {languageKeys.map((lang) => (
              <button
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  activeLanguage === lang
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                key={lang}
                onClick={() => setActiveLanguage(lang)}
              >
                {CODE_EXAMPLES[lang].name}
              </button>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mx-auto mb-16 max-w-4xl">
          <CodeBlock
            code={currentExample.code}
            filename={currentExample.filename}
            language={activeLanguage}
            showLineNumbers
            theme={theme}
          />
        </div>

        {/* Token Colors Reference */}
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
            Token Color Reference
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(TOKEN_COLORS).map(([token, info]) => (
              <div className="rounded-lg border border-border bg-card p-4" key={token}>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div
                      className="h-5 w-5 rounded-md border border-border"
                      style={{ backgroundColor: info.darkColor }}
                      title="Dark theme"
                    />
                    <div
                      className="h-5 w-5 rounded-md border border-border"
                      style={{ backgroundColor: info.lightColor }}
                      title="Light theme"
                    />
                  </div>
                  <span className="font-mono text-sm font-medium text-foreground capitalize">
                    {token}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Languages */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
            Supported Languages ({Object.keys(SUPPORTED_LANGUAGES).length}+)
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, info]) => (
              <span
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                key={key}
              >
                {info.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
