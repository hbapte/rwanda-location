import LocationSelector  from "@/components/location-selector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
          Rwanda Location Selector
        </h1>
        <p className="text-center text-gray-600 mb-8">Select your location from province to village level</p>
        <LocationSelector />
      </div>
    </main>
  )
}
