import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Container from "../container/Container";

function Footer() {
  return (
    <footer className="relative py-14 bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bg-black/10 h-px"></div>
        <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-l from-indigo-500/20 to-transparent blur-3xl"></div>
      </div> */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bg-white/10 h-px"></div>
        <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-[100px]"></div>
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-l from-indigo-500/20 to-transparent blur-[100px]"></div>
      </div>
      <Container className="relative z-10">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <div className="mb-8">
                <Logo width="120px" colorClass="text-white" />
              </div>
              <p className="text-gray-300 mb-8 max-w-md">
                Your modern blogging platform. Share your thoughts, experiences,
                and insights with readers around the world.
              </p>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-white transition-colors"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-sm text-gray-300">
              &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
