import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Modela helped us find a specialized legal AI model that increased our contract review efficiency by 78%. The quality verification process gave us confidence in our selection.",
      author: "Sarah Johnson",
      role: "Legal Operations Director",
      company: "Global Legal Partners",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "We were spending months trying to build our own AI models for financial forecasting. With Modela, we found a pre-trained solution that saved us time and delivered better results.",
      author: "Michael Chen",
      role: "CFO",
      company: "FinTech Innovations",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a healthcare provider, we needed an AI solution that understood medical terminology. The specialized models on Modela were exactly what we needed for our patient care analytics.",
      author: "Dr. Emily Rodriguez",
      role: "Chief of Innovation",
      company: "MedTech Solutions",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="bg-charcoal py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-300">
            Businesses across industries are transforming their operations with specialized AI models from our
            marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-6 relative hover:border-electric-blue/50 transition-all duration-300">
      <Quote className="h-10 w-10 text-electric-blue/30 absolute top-6 right-6" />

      <p className="text-gray-300 mb-6 relative z-10">"{testimonial.quote}"</p>

      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4 border-2 border-electric-blue">
          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
          <AvatarFallback className="bg-gray-700">
            {testimonial.author
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-bold">{testimonial.author}</h4>
          <p className="text-sm text-gray-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </Card>
  )
}
