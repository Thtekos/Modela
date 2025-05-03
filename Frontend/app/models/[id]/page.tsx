import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ModelDetail } from "@/components/model-detail"
import { getModelById } from "@/lib/models"

type Props = {
  params: Promise<{ id: string }> | { id: string }
}

/**
 * Generates metadata for the model page for SEO optimization
 * This function runs at build time and on-demand when the page is requested
 */
export async function generateMetadata({ 
  params 
}: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const model = await getModelById(resolvedParams.id)

  if (!model) {
    return {
      title: "Model Not Found | Modela™",
      description: "The requested AI model could not be found.",
    }
  }

  return {
    title: `${model.title} | Modela™`,
    description: model.description,
    openGraph: {
      title: model.title,
      description: model.description,
      images: [model.image],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  }
}

/**
 * The main page component for displaying individual model details
 * Fetches model data and renders the ModelDetail component
 */
export default async function ModelPage({ 
  params 
}: Props) {
  const resolvedParams = await Promise.resolve(params)
  const model = await getModelById(resolvedParams.id)

  if (!model) {
    notFound()
  }

  return <ModelDetail model={model} />
}
