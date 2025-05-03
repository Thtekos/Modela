"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Code, FileText, ImageIcon, MessageSquare } from "lucide-react"

export function InteractiveDemo() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeModel, setActiveModel] = useState("text")
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setLoadingProgress(0)
    setOutput("")

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate API response
    setTimeout(() => {
      clearInterval(interval)
      setIsLoading(false)
      setLoadingProgress(100)

      if (activeModel === "text") {
        setOutput(generateTextResponse(input))
      } else if (activeModel === "code") {
        setOutput(generateCodeResponse(input))
      } else if (activeModel === "image") {
        setOutput("https://via.placeholder.com/512x512.png?text=AI+Generated+Image")
      } else if (activeModel === "document") {
        setOutput(generateDocumentResponse(input))
      }
    }, 2000)
  }

  const generateTextResponse = (prompt: string) => {
    const responses = [
      `Based on your request about "${prompt}", I can provide the following insights: The key factors to consider are market trends, customer behavior, and competitive landscape. Recent data suggests a 15% growth in this sector, with increasing demand for personalized solutions.`,
      `Regarding "${prompt}", our analysis shows three main points: First, innovation is driving change at an unprecedented rate. Second, adaptation is crucial for survival in this evolving landscape. Third, companies that embrace these changes are seeing 30% higher growth rates.`,
      `In response to your query about "${prompt}", I'd highlight that successful strategies typically involve a combination of data-driven decision making, agile methodology, and customer-centric approaches. Organizations implementing these practices report 25% higher satisfaction rates.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateCodeResponse = (prompt: string) => {
    const responses = [
      `// Function to analyze data based on your request: "${prompt}"
function analyzeData(data) {
  // Initialize results object
  const results = {
    insights: [],
    metrics: {},
    recommendations: []
  };
  
  // Process the data
  data.forEach(item => {
    // Apply advanced analytics
    const score = calculateRelevanceScore(item);
    
    if (score > 0.8) {
      results.insights.push({
        id: item.id,
        relevance: score,
        summary: summarizeItem(item)
      });
    }
  });
  
  // Calculate aggregate metrics
  results.metrics = {
    totalProcessed: data.length,
    highRelevance: results.insights.length,
    averageScore: results.insights.reduce((acc, item) => acc + item.relevance, 0) / results.insights.length
  };
  
  // Generate recommendations
  results.recommendations = generateRecommendations(results.insights);
  
  return results;
}`,
      `// Smart contract for "${prompt}"
pragma solidity ^0.8.0;

contract DataVerification {
    struct Record {
        bytes32 dataHash;
        uint256 timestamp;
        address verifier;
        bool isVerified;
    }
    
    mapping(bytes32 => Record) public records;
    address public owner;
    
    event DataVerified(bytes32 indexed id, bytes32 dataHash, address verifier);
    
    constructor() {
        owner = msg.sender;
    }
    
    function verifyData(bytes32 id, bytes32 dataHash) public {
        require(records[id].dataHash == 0, "Record already exists");
        
        records[id] = Record({
            dataHash: dataHash,
            timestamp: block.timestamp,
            verifier: msg.sender,
            isVerified: true
        });
        
        emit DataVerified(id, dataHash, msg.sender);
    }
    
    function validateRecord(bytes32 id, bytes32 dataHash) public view returns (bool) {
        return records[id].isVerified && records[id].dataHash == dataHash;
    }
}`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateDocumentResponse = (prompt: string) => {
    return `# Analysis Report: ${prompt}

## Executive Summary
This report provides a comprehensive analysis of the topic based on the latest data and industry trends.

## Key Findings
1. Market growth is projected at 12.5% CAGR over the next five years
2. Customer acquisition costs have decreased by 18% through digital channels
3. Competitor analysis reveals opportunities in the mid-market segment

## Recommendations
- Increase investment in digital marketing channels
- Develop targeted solutions for the identified market segments
- Implement data-driven decision making processes across departments

## Conclusion
The analysis indicates significant potential for growth with the right strategic approach.`
  }

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Try Modela™ AI Models</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of our specialized AI models with this interactive demo
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-white">Interactive Demo</CardTitle>
                  <CardDescription className="text-gray-400">
                    Select a model type and enter a prompt to see it in action
                  </CardDescription>
                </div>
                <Tabs value={activeModel} onValueChange={setActiveModel} className="w-full sm:w-auto">
                  <TabsList className="bg-gray-700 w-full sm:w-auto">
                    <TabsTrigger value="text" className="text-white data-[state=active]:bg-electric-blue">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="code" className="text-white data-[state=active]:bg-electric-blue">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="document" className="text-white data-[state=active]:bg-electric-blue">
                      <FileText className="h-4 w-4 mr-2" />
                      Document
                    </TabsTrigger>
                    <TabsTrigger value="image" className="text-white data-[state=active]:bg-electric-blue">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Textarea
                    placeholder={`Enter a prompt for the ${
                      activeModel === "text"
                        ? "text generation"
                        : activeModel === "code"
                          ? "code generation"
                          : activeModel === "document"
                            ? "document analysis"
                            : "image generation"
                    } model...`}
                    className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                      {activeModel === "text"
                        ? "GPT-4o"
                        : activeModel === "code"
                          ? "CodeX"
                          : activeModel === "document"
                            ? "DocAnalyzer"
                            : "ImageGen"}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                      {activeModel === "image" ? "512x512" : "Max tokens: 1024"}
                    </Badge>
                  </div>
                  <Button
                    type="submit"
                    className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {isLoading && (
                <div className="mt-6">
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-electric-blue transition-all duration-300 ease-in-out"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Processing your request...</p>
                </div>
              )}

              {output && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2 text-white">Result</h3>
                  {activeModel === "image" ? (
                    <div className="bg-gray-700 rounded-lg p-4 flex justify-center">
                      <img
                        src={output || "/placeholder.svg"}
                        alt="AI Generated"
                        className="max-w-full h-auto rounded-lg border border-gray-600"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-lg p-4 overflow-auto">
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{output}</pre>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
