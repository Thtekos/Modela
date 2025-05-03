"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard/header"
import { Key, Plus, Copy, Check, Trash2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function APIKeysPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([])

  // In a real app, you would fetch this data from an API
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "sk_prod_1234567890abcdef",
      created: "2024-02-15",
      lastUsed: "2 hours ago",
      enabled: true,
    },
    {
      id: "2",
      name: "Development API Key",
      key: "sk_dev_0987654321fedcba",
      created: "2024-02-10",
      lastUsed: "5 days ago",
      enabled: true,
    },
  ])

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newKey = `sk_${Math.random().toString(36).substring(7)}_${Math.random().toString(36).substring(7)}`
      const newKeyObj = {
        id: Math.random().toString(36).substring(7),
        name: newKeyName,
        key: newKey,
        created: new Date().toISOString().split("T")[0],
        lastUsed: "Just now",
        enabled: true,
      }

      setApiKeys((prev) => [...prev, newKeyObj])
      setNewKeyName("")
      setNewlyCreatedKey(newKey)
      setShowNewKeyDialog(true)
    } catch (error) {
      toast({
        title: "Error creating API key",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)

    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleToggleKey = (id: string) => {
    setApiKeys((prev) =>
      prev.map((key) => {
        if (key.id === id) {
          const newState = !key.enabled
          toast({
            title: `API key ${newState ? "enabled" : "disabled"}`,
            description: `The API key "${key.name}" has been ${newState ? "enabled" : "disabled"}.`,
          })
          return { ...key, enabled: newState }
        }
        return key
      })
    )
  }

  const handleDeleteKey = (id: string) => {
    const keyToDelete = apiKeys.find((k) => k.id === id)
    if (!keyToDelete) return

    setApiKeys((prev) => prev.filter((key) => key.id !== id))
    toast({
      title: "API key deleted",
      description: `The API key "${keyToDelete.name}" has been deleted.`,
    })
  }

  const toggleKeyVisibility = (keyId: string) => {
    setHiddenKeys((prev) => 
      prev.includes(keyId) 
        ? prev.filter(id => id !== keyId)
        : [...prev, keyId]
    )
  }

  const maskKey = (key: string) => {
    return "•".repeat(key.length)
  }

  return (
    <div>
      <DashboardHeader
        title="API Keys"
        description="Manage your API keys for accessing Modela's services"
      />

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create New API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateKey} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="keyName" className="sr-only">
                API Key Name
              </Label>
              <Input
                id="keyName"
                placeholder="Enter a name for your API key (e.g., Production, Development)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-electric-blue hover:bg-electric-blue/90"
              disabled={isCreating || !newKeyName.trim()}
            >
              {isCreating ? (
                <>
                  <Key className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center py-6">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No API Keys</h3>
                <p className="text-gray-400">You haven't created any API keys yet.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          apiKeys.map((apiKey) => (
            <Card key={apiKey.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{apiKey.name}</h3>
                      <div
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          apiKey.enabled
                            ? "bg-green-900/20 text-green-400 border border-green-800"
                            : "bg-gray-700/50 text-gray-400 border border-gray-600"
                        }`}
                      >
                        {apiKey.enabled ? "Active" : "Disabled"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <code className="text-sm bg-gray-900 px-2 py-1 rounded font-mono">
                        {hiddenKeys.includes(apiKey.id) ? maskKey(apiKey.key) : apiKey.key}
                      </code>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {hiddenKeys.includes(apiKey.id) ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => handleCopyKey(apiKey.key)}
                        >
                          {copiedKey === apiKey.key ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <div>Created: {apiKey.created}</div>
                      <div>Last used: {apiKey.lastUsed}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={apiKey.enabled}
                        onCheckedChange={() => handleToggleKey(apiKey.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400"
                        onClick={() => handleDeleteKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle>API Key Created Successfully</DialogTitle>
            <DialogDescription>
              Make sure to copy your API key now. You won't be able to see it again!
            </DialogDescription>
          </DialogHeader>
          {newlyCreatedKey && (
            <div className="bg-gray-900 p-4 rounded-md">
              <code className="text-sm font-mono break-all">{newlyCreatedKey}</code>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              className="w-full sm:w-auto bg-electric-blue hover:bg-electric-blue/90"
              onClick={() => newlyCreatedKey && handleCopyKey(newlyCreatedKey)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy API Key
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-600 hover:bg-gray-700"
              onClick={() => setShowNewKeyDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
