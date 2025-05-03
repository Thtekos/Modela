import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/docs/code-block"

export function DocsContent() {
  return (
    <div className="space-y-12">
      <section id="introduction">
        <h1 className="text-3xl font-bold mb-6">Modela™ API Documentation</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to the Modela™ API documentation. This guide will help you get started with integrating our
          specialized AI models into your applications.
        </p>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Base URL</h2>
            <CodeBlock language="bash" code="https://api.modela.ai/v1" />
            <p className="mt-4 text-gray-300">
              All API requests should be made to this base URL, followed by the specific endpoint path.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="authentication" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
        <p className="text-gray-300 mb-6">
          To authenticate with the Modela™ API, you need to include your API key in the request headers. You can find
          your API key in the dashboard under API Keys.
        </p>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">API Key Authentication</h3>
            <CodeBlock
              language="bash"
              code={`curl -X POST https://api.modela.ai/v1/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "legal-doc-analyzer-pro", "prompt": "Analyze this contract..."}'`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="quickstart" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Quickstart</h2>
        <p className="text-gray-300 mb-6">
          Get started quickly with the Modela™ API by following these examples for common use cases.
        </p>

        <Tabs defaultValue="node">
          <TabsList className="mb-4">
            <TabsTrigger value="node">Node.js</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
          <TabsContent value="node">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Node.js Example</h3>
                <CodeBlock
                  language="javascript"
                  code={`import { ModelaAI } from '@modela/sdk';

// Initialize the client
const modela = new ModelaAI({
  apiKey: process.env.MODELA_API_KEY
});

async function main() {
  // Generate a completion
  const completion = await modela.completions.create({
    model: 'legal-doc-analyzer-pro',
    prompt: 'Analyze this contract for potential risks:',
    max_tokens: 500
  });

  console.log(completion.text);
}

main();`}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="python">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Python Example</h3>
                <CodeBlock
                  language="python"
                  code={`import os
from modela import ModelaAI

# Initialize the client
modela = ModelaAI(api_key=os.environ.get("MODELA_API_KEY"))

# Generate a completion
completion = modela.completions.create(
    model="legal-doc-analyzer-pro",
    prompt="Analyze this contract for potential risks:",
    max_tokens=500
)

print(completion.text)`}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="curl">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">cURL Example</h3>
                <CodeBlock
                  language="bash"
                  code={`curl -X POST https://api.modela.ai/v1/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "legal-doc-analyzer-pro",
    "prompt": "Analyze this contract for potential risks:",
    "max_tokens": 500
  }'`}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section id="sdks" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">SDKs & Libraries</h2>
        <p className="text-gray-300 mb-6">
          We provide official SDKs for several programming languages to make it easier to integrate with the Modela™
          API.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Node.js SDK</h3>
              <p className="text-gray-300 mb-4">Install via npm:</p>
              <CodeBlock language="bash" code="npm install @modela/sdk" />
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Python SDK</h3>
              <p className="text-gray-300 mb-4">Install via pip:</p>
              <CodeBlock language="bash" code="pip install modela" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="models" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Models</h2>
        <p className="text-gray-300 mb-6">
          Modela™ offers a variety of specialized AI models for different industries and use cases.
        </p>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">List Available Models</h3>
            <p className="text-gray-300 mb-4">Retrieve a list of all available models:</p>
            <CodeBlock
              language="bash"
              code={`curl -X GET https://api.modela.ai/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            />
            <h4 className="font-bold mt-6 mb-2">Response</h4>
            <CodeBlock
              language="json"
              code={`{
  "data": [
    {
      "id": "legal-doc-analyzer-pro",
      "name": "LegalDocAnalyzer Pro",
      "description": "Specialized model for legal document analysis",
      "category": "Legal",
      "version": "1.0",
      "capabilities": ["document-analysis", "contract-review", "clause-extraction"]
    },
    {
      "id": "financial-forecast-ai",
      "name": "FinancialForecastAI",
      "description": "Predict market trends and financial outcomes",
      "category": "Finance",
      "version": "2.1",
      "capabilities": ["market-prediction", "risk-assessment", "anomaly-detection"]
    }
  ]
}`}
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Get Model Details</h3>
            <p className="text-gray-300 mb-4">Retrieve detailed information about a specific model:</p>
            <CodeBlock
              language="bash"
              code={`curl -X GET https://api.modela.ai/v1/models/legal-doc-analyzer-pro \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="completions" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Completions</h2>
        <p className="text-gray-300 mb-6">
          The completions endpoint allows you to generate text based on a prompt using a specific model.
        </p>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Create Completion</h3>
            <p className="text-gray-300 mb-4">Generate a completion for a given prompt:</p>
            <CodeBlock
              language="bash"
              code={`curl -X POST https://api.modela.ai/v1/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "legal-doc-analyzer-pro",
    "prompt": "Analyze this contract for potential risks:",
    "max_tokens": 500,
    "temperature": 0.7,
    "top_p": 1.0,
    "n": 1,
    "stream": false
  }'`}
            />
            <h4 className="font-bold mt-6 mb-2">Parameters</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <strong>model</strong> (required): ID of the model to use
              </li>
              <li>
                <strong>prompt</strong> (required): The prompt to generate completions for
              </li>
              <li>
                <strong>max_tokens</strong> (optional): Maximum number of tokens to generate
              </li>
              <li>
                <strong>temperature</strong> (optional): Controls randomness (0-1)
              </li>
              <li>
                <strong>top_p</strong> (optional): Controls diversity via nucleus sampling
              </li>
              <li>
                <strong>n</strong> (optional): Number of completions to generate
              </li>
              <li>
                <strong>stream</strong> (optional): Whether to stream back partial progress
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="embeddings" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Embeddings</h2>
        <p className="text-gray-300 mb-6">
          The embeddings endpoint allows you to get vector representations of text that can be used for search,
          clustering, and other machine learning tasks.
        </p>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Create Embeddings</h3>
            <p className="text-gray-300 mb-4">Generate embeddings for a given input:</p>
            <CodeBlock
              language="bash"
              code={`curl -X POST https://api.modela.ai/v1/embeddings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-v1",
    "input": "The contract states that payment is due within 30 days of invoice."
  }'`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="fine-tuning" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Fine-tuning</h2>
        <p className="text-gray-300 mb-6">
          Fine-tuning allows you to customize our models for your specific use case by training them on your own data.
        </p>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Create Fine-tuning Job</h3>
            <p className="text-gray-300 mb-4">Start a fine-tuning job:</p>
            <CodeBlock
              language="bash"
              code={`curl -X POST https://api.modela.ai/v1/fine-tuning/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "legal-doc-analyzer-pro",
    "training_file": "file-abc123",
    "validation_file": "file-def456",
    "hyperparameters": {
      "epochs": 3,
      "learning_rate_multiplier": 0.1
    }
  }'`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="error-handling" className="pt-8">
        <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
        <p className="text-gray-300 mb-6">
          The Modela™ API uses conventional HTTP response codes to indicate the success or failure of an API request.
        </p>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">HTTP Status Codes</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong className="text-white">200 - OK</strong>: The request was successful.
              </li>
              <li>
                <strong className="text-white">400 - Bad Request</strong>: The request was invalid or cannot be
                otherwise served.
              </li>
              <li>
                <strong className="text-white">401 - Unauthorized</strong>: Authentication credentials were missing or
                incorrect.
              </li>
              <li>
                <strong className="text-white">403 - Forbidden</strong>: The request is understood, but it has been
                refused or access is not allowed.
              </li>
              <li>
                <strong className="text-white">404 - Not Found</strong>: The requested resource could not be found.
              </li>
              <li>
                <strong className="text-white">429 - Too Many Requests</strong>: You have exceeded the rate limit.
              </li>
              <li>
                <strong className="text-white">500, 502, 503, 504 - Server Errors</strong>: Something went wrong on our
                end.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
