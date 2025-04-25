import React from 'react'
import { assets, footerLinks } from '../assets/assets'
import { Link } from 'react-router-dom'
import Groceezy from "../assets/Groceezy.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="w-full bg-primary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-5 border-b border-gray-500/30 text-gray-500">
          <div className="md:-ml-25">
            <img className="w-34 md:w-32" src={Groceezy} alt="Company Logo" />
            <p className="max-w-[410px] mt-6">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
          </div>
          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-10">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {section.title === 'Follow Us' ? (
                        <div className="flex gap-3 mt-2">
                          <a href={link.url} className="hover:text-primary transition">
                            {link.text === 'Facebook' && <FaFacebook size={20} />}
                            {link.text === 'Twitter' && <FaTwitter size={20} />}
                            {link.text === 'Instagram' && <FaInstagram size={20} />}
                            {link.text === 'LinkedIn' && <FaLinkedin size={20} />}
                          </a>
                        </div>
                      ) : (
                        <Link 
                          to={link.url} 
                          className="hover:underline transition"
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="py-4 text-center text-sm md:text-base text-gray-500/70">
          Copyright {new Date().getFullYear()} © Bijaya Tamang All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer