import Link from "next/link"
import { Globe } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { CiHeart } from "react-icons/ci";

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold text-lg">Rwanda Location Selector</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A simple tool to select locations in Rwanda from province down to village level. Built with Next.js,
              Tailwind CSS, and the rwanda npm package.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/hbapte/rwanda-location"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                >
                  <FaGithub className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.hbapte.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                >
                  <Globe className="h-4 w-4" />
                  <span>Developer Portfolio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/rwanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Rwanda NPM Package
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              Rwanda is organized in 5 provinces, 30 districts, 416 sectors, 2,148 cells, and 14,837 villages. This tool
              helps users easily navigate through these administrative divisions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Rwanda Location Selector. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <CiHeart className="h-4 w-4 text-green-500" /> by
            <Link
              href="https://www.hbapte.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              Ishimwe Jean Baptiste
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
