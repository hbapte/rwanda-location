"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

// Define the form schema with Zod
const formSchema = z.object({
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  sector: z.string().min(1, "Sector is required"),
  cell: z.string().min(1, "Cell is required"),
  village: z.string().min(1, "Village is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function LocationSelector() {
  const { toast } = useToast()

  // Form setup with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
    },
  })

  // State for each administrative level
  const [provinces, setProvinces] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [cells, setCells] = useState<string[]>([])
  const [villages, setVillages] = useState<string[]>([])

  // Loading states
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true)
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false)
  const [isLoadingSectors, setIsLoadingSectors] = useState(false)
  const [isLoadingCells, setIsLoadingCells] = useState(false)
  const [isLoadingVillages, setIsLoadingVillages] = useState(false)

  // Get values from form
  const selectedProvince = form.watch("province")
  const selectedDistrict = form.watch("district")
  const selectedSector = form.watch("sector")
  const selectedCell = form.watch("cell")
  const selectedVillage = form.watch("village")

  // Load provinces on component mount
  useEffect(() => {
    const loadProvinces = async () => {
      setIsLoadingProvinces(true)
      try {
        const { Provinces } = await import("rwanda")
        const provincesList = Provinces() || []
        setProvinces(provincesList)
      } catch (error) {
        console.error("Failed to load provinces:", error)
        setProvinces([])
      } finally {
        setIsLoadingProvinces(false)
      }
    }

    loadProvinces()
  }, [])

  // Load districts when province changes
  useEffect(() => {
    const loadDistricts = async () => {
      if (!selectedProvince) {
        setDistricts([])
        return
      }

      setIsLoadingDistricts(true)
      try {
        const { Districts } = await import("rwanda")
        const districtsList = Districts(selectedProvince) || []
        setDistricts(districtsList)

        // Reset dependent fields
        form.setValue("district", "")
        form.setValue("sector", "")
        form.setValue("cell", "")
        form.setValue("village", "")
        setSectors([])
        setCells([])
        setVillages([])
      } catch (error) {
        console.error("Failed to load districts:", error)
        setDistricts([])
      } finally {
        setIsLoadingDistricts(false)
      }
    }

    loadDistricts()
  }, [selectedProvince, form])

  // Load sectors when district changes
  useEffect(() => {
    const loadSectors = async () => {
      if (!selectedProvince || !selectedDistrict) {
        setSectors([])
        return
      }

      setIsLoadingSectors(true)
      try {
        const { Sectors } = await import("rwanda")
        // Ensure both parameters are valid strings before calling the function
        if (typeof selectedProvince === "string" && typeof selectedDistrict === "string") {
          const sectorsList = Sectors(selectedProvince, selectedDistrict) || []
          setSectors(sectorsList)
        } else {
          setSectors([])
        }

        // Reset dependent fields
        form.setValue("sector", "")
        form.setValue("cell", "")
        form.setValue("village", "")
        setCells([])
        setVillages([])
      } catch (error) {
        console.error("Failed to load sectors:", error)
        setSectors([])
      } finally {
        setIsLoadingSectors(false)
      }
    }

    loadSectors()
  }, [selectedProvince, selectedDistrict, form])

  // Load cells when sector changes
  useEffect(() => {
    const loadCells = async () => {
      if (!selectedProvince || !selectedDistrict || !selectedSector) {
        setCells([])
        return
      }

      setIsLoadingCells(true)
      try {
        const { Cells } = await import("rwanda")
        // Ensure all parameters are valid strings
        if (
          typeof selectedProvince === "string" &&
          typeof selectedDistrict === "string" &&
          typeof selectedSector === "string"
        ) {
          const cellsList = Cells(selectedProvince, selectedDistrict, selectedSector) || []
          setCells(cellsList)
        } else {
          setCells([])
        }

        // Reset dependent fields
        form.setValue("cell", "")
        form.setValue("village", "")
        setVillages([])
      } catch (error) {
        console.error("Failed to load cells:", error)
        setCells([])
      } finally {
        setIsLoadingCells(false)
      }
    }

    loadCells()
  }, [selectedProvince, selectedDistrict, selectedSector, form])

  // Load villages when cell changes
  useEffect(() => {
    const loadVillages = async () => {
      if (!selectedProvince || !selectedDistrict || !selectedSector || !selectedCell) {
        setVillages([])
        return
      }

      setIsLoadingVillages(true)
      try {
        const { Villages } = await import("rwanda")
        // Ensure all parameters are valid strings
        if (
          typeof selectedProvince === "string" &&
          typeof selectedDistrict === "string" &&
          typeof selectedSector === "string" &&
          typeof selectedCell === "string"
        ) {
          const villagesList = Villages(selectedProvince, selectedDistrict, selectedSector, selectedCell) || []
          setVillages(villagesList)
        } else {
          setVillages([])
        }

        // Reset dependent field
        form.setValue("village", "")
      } catch (error) {
        console.error("Failed to load villages:", error)
        setVillages([])
      } finally {
        setIsLoadingVillages(false)
      }
    }

    loadVillages()
  }, [selectedProvince, selectedDistrict, selectedSector, selectedCell, form])

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Selected location:", data)

    // Show success toast with the submitted data
    toast({
      title: "Location Selected Successfully",
      description: (
        <div className="mt-2 space-y-2">
          <p className="font-medium">Selected Location:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Province:</span>
            <span className="font-medium">{data.province}</span>
            <span className="text-muted-foreground">District:</span>
            <span className="font-medium">{data.district}</span>
            <span className="text-muted-foreground">Sector:</span>
            <span className="font-medium">{data.sector}</span>
            <span className="text-muted-foreground">Cell:</span>
            <span className="font-medium">{data.cell}</span>
            <span className="text-muted-foreground">Village:</span>
            <span className="font-medium">{data.village}</span>
          </div>
        </div>
      ),
      duration: 5000,
    })

    // Here you would typically send this data to your backend
  }

  // Breadcrumb component to show selected location
  const LocationBreadcrumb = () => {
    const items = [
      { label: selectedProvince, color: "bg-blue-100 text-blue-800" },
      { label: selectedDistrict, color: "bg-green-100 text-green-800" },
      { label: selectedSector, color: "bg-purple-100 text-purple-800" },
      { label: selectedCell, color: "bg-amber-100 text-amber-800" },
      { label: selectedVillage, color: "bg-rose-100 text-rose-800" },
    ].filter((item) => item.label)

    if (items.length === 0) return null

    return (
      <motion.div
        className="flex flex-wrap gap-2 mt-6 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <Badge key={index} variant="outline" className={`${item.color} border-0`}>
            {item.label}
          </Badge>
        ))}
      </motion.div>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="h-6 w-6 text-emerald-500" />
          Rwanda Location Selector
        </CardTitle>
        <CardDescription>Select your location from province down to village level</CardDescription>
      </CardHeader>
      <CardContent>
        <LocationBreadcrumb />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
            {/* Province Field */}
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <div className="space-y-2">
                    {isLoadingProvinces ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <SelectTrigger className={cn("w-full", form.formState.errors.province && "border-red-500")}>
                              <SelectValue placeholder="Select a province" />
                            </SelectTrigger>
                            <SelectContent>
                              {provinces.length > 0 ? (
                                provinces.map((province) => (
                                  <SelectItem key={province} value={province}>
                                    {province}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-muted-foreground">
                                  No provinces available
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </>
                    )}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* District Field */}
            <AnimatePresence>
              {selectedProvince && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <div className="space-y-2">
                          {isLoadingDistricts ? (
                            <Skeleton className="h-10 w-full rounded-md" />
                          ) : (
                            <>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  value={field.value}
                                  disabled={!selectedProvince}
                                >
                                  <SelectTrigger
                                    className={cn("w-full", form.formState.errors.district && "border-red-500")}
                                  >
                                    <SelectValue placeholder="Select a district" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {districts.length > 0 ? (
                                      districts.map((district) => (
                                        <SelectItem key={district} value={district}>
                                          {district}
                                        </SelectItem>
                                      ))
                                    ) : (
                                      <div className="p-2 text-center text-sm text-muted-foreground">
                                        No districts available
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </>
                          )}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sector Field */}
            <AnimatePresence>
              {selectedDistrict && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <div className="space-y-2">
                          {isLoadingSectors ? (
                            <Skeleton className="h-10 w-full rounded-md" />
                          ) : (
                            <>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  value={field.value}
                                  disabled={!selectedDistrict}
                                >
                                  <SelectTrigger
                                    className={cn("w-full", form.formState.errors.sector && "border-red-500")}
                                  >
                                    <SelectValue placeholder="Select a sector" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {sectors.length > 0 ? (
                                      sectors.map((sector) => (
                                        <SelectItem key={sector} value={sector}>
                                          {sector}
                                        </SelectItem>
                                      ))
                                    ) : (
                                      <div className="p-2 text-center text-sm text-muted-foreground">
                                        No sectors available
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </>
                          )}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cell Field */}
            <AnimatePresence>
              {selectedSector && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="cell"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cell</FormLabel>
                        <div className="space-y-2">
                          {isLoadingCells ? (
                            <Skeleton className="h-10 w-full rounded-md" />
                          ) : (
                            <>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  value={field.value}
                                  disabled={!selectedSector}
                                >
                                  <SelectTrigger
                                    className={cn("w-full", form.formState.errors.cell && "border-red-500")}
                                  >
                                    <SelectValue placeholder="Select a cell" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {cells.length > 0 ? (
                                      cells.map((cell) => (
                                        <SelectItem key={cell} value={cell}>
                                          {cell}
                                        </SelectItem>
                                      ))
                                    ) : (
                                      <div className="p-2 text-center text-sm text-muted-foreground">
                                        No cells available
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </>
                          )}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Village Field */}
            <AnimatePresence>
              {selectedCell && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Village</FormLabel>
                        <div className="space-y-2">
                          {isLoadingVillages ? (
                            <Skeleton className="h-10 w-full rounded-md" />
                          ) : (
                            <>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  value={field.value}
                                  disabled={!selectedCell}
                                >
                                  <SelectTrigger
                                    className={cn("w-full", form.formState.errors.village && "border-red-500")}
                                  >
                                    <SelectValue placeholder="Select a village" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {villages.length > 0 ? (
                                      villages.map((village) => (
                                        <SelectItem key={village} value={village}>
                                          {village}
                                        </SelectItem>
                                      ))
                                    ) : (
                                      <div className="p-2 text-center text-sm text-muted-foreground">
                                        No villages available
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </>
                          )}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                disabled={
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  isLoadingProvinces ||
                  isLoadingDistricts ||
                  isLoadingSectors ||
                  isLoadingCells ||
                  isLoadingVillages
                }
              >
                {form.formState.isSubmitting ? (
                  "Saving..."
                ) : !form.formState.isValid ? (
                  "Complete Your Selection"
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Save Location
                  </span>
                )}
              </Button>
            </motion.div>

            {Object.keys(form.formState.errors).length > 0 && (
              <motion.div
                className="flex items-center gap-2 p-3 mt-2 bg-red-50 text-red-700 rounded-md text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-4 w-4" />
                <p>Please complete all required fields</p>
              </motion.div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>Rwanda is organized in 5 provinces, 30 districts, 416 sectors, 2,148 cells, and 14,837 villages.</p>
      </CardFooter>
    </Card>
  )
}
