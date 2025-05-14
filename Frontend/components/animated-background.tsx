"use client"

import { useEffect, useRef } from "react"

/**
 * Animated background component that creates a neural network visualization
 * Uses HTML5 Canvas to draw connected nodes that represent AI/ML concepts
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match window size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial resize and setup
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Fallback: If canvas is not sized properly, force a resize after a short delay
    if (canvas.width === 0 || canvas.height === 0) {
      setTimeout(resizeCanvas, 50)
    }

    // Trigger a resize event after mount to ensure proper sizing
    window.dispatchEvent(new Event('resize'))

    // Node class to represent points in the network
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      glowRadius: number

      constructor(width: number, height: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = 2
        this.glowRadius = 8
      }

      update(width: number, height: number) {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowRadius
        )
        gradient.addColorStop(0, "rgba(0, 102, 255, 0.3)")
        gradient.addColorStop(1, "rgba(0, 102, 255, 0)")
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "#0066ff"
        ctx.fill()
      }
    }

    // Create nodes
    const nodes: Node[] = Array.from(
      { length: 75 }, 
      () => new Node(canvas.width, canvas.height)
    )

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height)
        node.draw(ctx)
      })

      // Draw connections between nearby nodes
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach(node2 => {
          const dx = node2.x - node1.x
          const dy = node2.y - node1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            ctx.lineTo(node2.x, node2.y)
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.8 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-950 to-black opacity-75"
    />
  )
} 