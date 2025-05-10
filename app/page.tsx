import  LocationSelector from "@/components/location-selector"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen  bg-gradient-to-b from-background to-muted py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <LocationSelector />
        </div>
      </main>
      <Footer />

    </>
  )
}
