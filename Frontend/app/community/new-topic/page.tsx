"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const categories = [
  "Technical",
  "Legal",
  "Finance",
  "Healthcare",
  "Retail",
]

export default function NewTopicPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "",
    category: categories[0],
    tags: "",
    content: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-charcoal to-gray-900 py-12 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 shadow-xl rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-white mb-1">Create New Topic</CardTitle>
              <p className="text-gray-400 text-base font-normal">Start a discussion or ask a question in the Modela community.</p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-electric-blue mb-4">Topic Submitted!</h2>
                  <p className="text-gray-300 mb-6">Your topic has been created (demo only, not persisted).</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Title</label>
                    <Input name="title" value={form.title} onChange={handleChange} required className="bg-gray-900 border-gray-700 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/30 text-white rounded-lg transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 pr-10 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/30 transition appearance-none shadow-sm hover:border-electric-blue"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Tags <span className="text-gray-500 font-normal">(comma separated)</span></label>
                    <Input name="tags" value={form.tags} onChange={handleChange} className="bg-gray-900 border-gray-700 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/30 text-white rounded-lg transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-medium">Content</label>
                    <Textarea name="content" value={form.content} onChange={handleChange} rows={6} required className="bg-gray-900 border-gray-700 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/30 text-white rounded-lg transition" />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-electric-blue to-blue-600 hover:from-electric-blue/90 hover:to-blue-600/90 text-white font-semibold py-3 rounded-lg text-lg shadow-md w-full transition-all duration-200">
                    Submit
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
} 