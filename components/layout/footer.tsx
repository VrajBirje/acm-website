import Link from "next/link"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-blue-600 text-white font-bold text-xs">
                ACM
              </div>
              <h3 className="font-bold text-lg">ACM Chapter</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building a community of technology enthusiasts driving innovation, research, and mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" className="text-gray-400 hover:text-accent transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-accent transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blogs" className="text-gray-400 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-accent transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Email" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-accent transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-accent transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-accent transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">&copy; 2025 ACM Chapter. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0 text-gray-500">
            <Link href="#" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
