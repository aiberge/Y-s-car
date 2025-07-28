'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Shield, 
  Users, 
  Sparkles, 
  Check, 
  Phone, 
  Mail, 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  Clock, 
  UserCheck, 
  MapPin,
  Armchair,
  Fuel,
  Gauge,
  Briefcase,
  CheckCircle2,
  Palette
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { translations } from '../translations/translations'
import Modal from './Modal'
import ReservationForm from './ReservationForm'
import { useLanguageSwitch, Language, languageNames } from '@/utils/language'

// Define the Car type ---------

type Car = {
  id: number;
  name: string;
  version: string;
  type: string;
  price: number;
  image: string;
  featured: boolean;
  transmission: string;
  seats: number;
  luggage: number;
  airConditioning: boolean;
  fuel: string;
  maxSpeed: number;
  trunkSize: number;
  colors: string[];
}

const cars: Car[] = [
  {
    id: 2,
    name: 'Dacia Logan diesel',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/dacia.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 170,
    trunkSize: 510,
    colors: ['blanc', 'noir']
  },
  {
    id: 3,
    name: 'Dacia Logan essence',
    version: 'Base',
    type: 'Économique',
    price: 250,
    image: '/dacia.jpg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'essence',
    maxSpeed: 170,
    trunkSize: 510,
    colors: ['blanc', 'noir']
  },
  {
    id: 5,
    name: 'Renault Clio 5 automatique',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/clio24.jpg',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'essence',
    maxSpeed: 180,
    trunkSize: 391,
    colors: ['blanc', 'noir']
  },
  {
    id: 17,
    name: 'Volkswagen T-Roc',
    version: 'Premium',
    type: 'SUV',
    price: 600,
    image: '/trok.jpg',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 200,
    trunkSize: 445,
    colors: ['blanc', 'noir']
  },
  {
    id: 18,
    name: 'Renault Clio 4 manuelle',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/clio4.jpeg',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 175,
    trunkSize: 300,
    colors: ['blanc', 'noir']
  },
  {
    id: 19,
    name: 'Hyundai Accent 2023',
    version: 'Base',
    type: 'Économique',
    price: 350,
    image: '/acc.avif',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'essence',
    maxSpeed: 180,
    trunkSize: 389,
    colors: ['blanc', 'noir']
  },
  {
    id: 22,
    name: 'Hyundai Accent ',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/acc.avif',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    fuel: 'essence',
    maxSpeed: 180,
    trunkSize: 389,
    colors: ['blanc', 'noir']
  },
  {
    id: 21,
    name: 'Kia Seltos',
    version: 'Premium',
    type: 'SUV',
    price: 600,
    image: '/seltos.avif',
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 200,
    trunkSize: 433,
    colors: ['blanc', 'noir']
  },
  {
    id: 25,
    name: 'Dacia Duster automatique',
    version: 'Premium',
    type: 'SUV',
    price: 400,
    image: '/daciaa.jpg',
    featured: true,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 190,
    trunkSize: 445,
    colors: ['blanc', 'noir']
  },
  {
    id: 24,
    name: 'Dacia Duster manuelle',
    version: 'Premium',
    type: 'SUV',
    price: 350,
    image: '/daciaa.jpg',
    featured: true,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 190,
    trunkSize: 445,
    colors: ['blanc', 'noir']
  },
  {
    id: 23,
    name: 'Renault Express',
    version: 'Premium',
    type: 'Berline',
    price: 300,
    image: '/express.png',
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  },
];

const airports = [
  { code: 'FEZ', name: 'Aéroport de Fès-Saïs - Route de Sefrou, Fès 30000' },
  { code: 'CFE', name: 'Fès-centre ville - 47 Rte de Sefrou, Fès 30000' },
  { code: 'Autre', name: 'Autre lieu (à préciser)' }
]

const CarCard = ({ car }: { car: Car }) => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const handleWhatsAppClick = (car: Car) => {
    const message = `Bonjour, je suis intéressé(e) par la location de ${car.name} à ${car.price}dh/jour.`
    const whatsappUrl = `https://wa.me/21266666666?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  };

  return (
    <>
      <Modal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      >
        <ReservationForm
          car={car}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </Modal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-64">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold">
              {car.type}
            </span>
          </div>
          <Image
            src={car.image}
            alt={`${car.name} ${car.version} - Voiture à louer à Fès - ${car.type}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={car.featured}
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h3>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Armchair className="w-5 h-5 text-primary" />
              <span className="text-gray-700 text-sm">{car.seats} places</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-primary" />
              <span className="text-gray-700 text-sm">{car.fuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="text-gray-700 text-sm">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-gray-700 text-sm">{car.luggage} bagages</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <div className="flex gap-1">
                {car.colors?.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color === 'blanc' ? '#fff' : '#000'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Équipements</h4>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">{car.seats} places</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Climatisation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Bluetooth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">ABS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Airbags</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 text-sm">Direction assistée</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-2xl font-bold text-primary">{car.price} MAD</span>
                <p className="text-xs text-gray-500">par jour</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleWhatsAppClick(car)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </Button>
                <Button
                  onClick={() => setIsReservationModalOpen(true)}
                  size="sm"
                >
                  Réserver
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge 
              className="bg-blue-100 text-blue-800"
              variant="outline" 
            >
              Disponible maintenant
            </Badge>
            <Badge
              className="bg-green-100 text-green-800"
              variant="outline"
            >
              +5jrs • Kilométrage illimité
            </Badge>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const FilterSection = ({ onFilterChange }: { onFilterChange: (type: string, value: string) => void }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value)
    onFilterChange('type', value)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
    >
      {['all', 'Économique', 'Berline', 'SUV'].map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleFilterClick(filter)}
          className={`px-8 py-3 rounded-full transition-all duration-300 text-base font-medium ${
            selectedFilter === filter
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
          } shadow`}
        >
          {filter === 'all' ? 'Tous' : filter}
        </motion.button>
      ))}
    </motion.div>
  )
}

const AirportShuttleSection = ({ language }: { language: Language }) => {
  const t = translations[language]
  
  const openWhatsApp = () => {
    const whatsappMessage = encodeURIComponent("Bonjour, je voudrais réserver un service de transport aéroport.")
    const whatsappUrl = `https://wa.me/212648985150?text=${whatsappMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.airport.title}</h2>
          <p className="text-xl text-gray-600">{t.airport.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 mb-6">{t.airport.description}</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{t.airport.service247}</h3>
                <p className="text-sm text-gray-600">{t.airport.available}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <UserCheck className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{t.airport.proChauffeur}</h3>
                <p className="text-sm text-gray-600">{t.airport.personalService}</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">{t.airport.startingFrom}</p>
                <p className="text-2xl font-bold text-primary">300 MAD</p>
              </div>
              <button 
                onClick={openWhatsApp}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <span>{t.airport.bookNow}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src='/air.jpg'
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

const LocationSection = ({ language }: { language: Language }) => {
  const t = translations[language]
  
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.location.title}</h2>
          <p className="text-xl text-gray-600">{t.location.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 mb-6">{t.location.description}</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{t.location.openHours}</h3>
                <p className="text-sm text-gray-600">{t.location.weekdays}</p>
                <p className="text-sm text-gray-600">{t.location.weekends}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{t.location.contactUs}</h3>
                <p className="text-sm text-gray-600">{t.location.address}</p>
              </div>
            </div>

            <div className="space-y-4">
              <a href="tel:+212648985150" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+212 666 666 666</span>
              </a>
              <a href="mailto:locationmaroc@gmail.com" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>locationmaroc@gmail.com</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative h-[450px] rounded-xl overflow-hidden shadow-lg"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6620.762637807761!2d-4.986539555953351!3d33.93131935879687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b6da90a7f4f%3A0x4a9f848151d96b0!2zQcOpcm9wb3J0IGRlIEbDqHMtU2HDr3Nz!5e0!3m2!1sfr!2sma!4v1753700107254!5m2!1sfr!2sma"
              width="800"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

const Navigation = ({ onPageChange, currentPage }: { 
  onPageChange: (page: string) => void, 
  currentPage: string
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, switchLanguage } = useLanguageSwitch()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLang = () => setIsLangOpen(!isLangOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menus when language changes rttj  -
  useEffect(() => {
    setIsLangOpen(false)
    setIsMenuOpen(false)
  }, [currentLanguage])

  const t = translations[currentLanguage]

  const handleLanguageChange = (lang: Language) => {
    switchLanguage(lang)
    setIsLangOpen(false)
  }

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-gray-100 shadow-sm">
      <div className="container-fluid mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo/Brand - Centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <div className="relative w-80 h-24">
              <Image
                src="/Gelogo.png"
                alt="Location Maroc Logo"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Phone Number - Mobile hidden, desktop shown */}
          <div className="hidden md:flex items-center mx-8">
            <a
              href="tel:+212648456180"
              className="flex items-center space-x-3 text-gray-700 font-medium text-base"
            >
              <Phone className="w-5 h-5 text-gray-600" />
              <span>+212648456180</span>
            </a>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => onPageChange('home')}
              className={`px-6 py-3 font-medium text-base transition-all duration-200 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`px-6 py-3 font-medium text-base transition-all duration-200 ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </button>

            {/* Language Switcher - Desktop */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={toggleLang}
                aria-expanded={isLangOpen}
                aria-controls="language-menu"
                aria-label="Select language"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{currentLanguage.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    id="language-menu"
                    role="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50"
                  >
                    {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                      <motion.button
                        key={lang}
                        role="menuitem"
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-all ${currentLanguage === lang ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                      >
                        <span className="font-medium">{languageNames[lang]}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 border-t border-gray-200"
            >
              <div className="py-2 divide-y divide-gray-100">
                <div>
                  <button
                    onClick={() => {
                      onPageChange('home')
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left px-6 py-3 ${currentPage === 'home' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                  >
                    Home
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      onPageChange('about')
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left px-6 py-3 ${currentPage === 'about' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                  >
                    About
                  </button>
                </div>
                
                {/* Language options in mobile menu */}
                <div className="px-6 py-3">
                  <p className="text-sm text-gray-500 mb-2">Language</p>
                  <div className="flex flex-wrap gap-2">
                    {(['en', 'fr', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          handleLanguageChange(lang)
                          setIsMenuOpen(false)
                        }}
                        className={`px-3 py-1 rounded-md text-sm ${currentLanguage === lang ? 'bg-blue-100 text-blue-600 font-medium' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Phone number in mobile menu */}
                <div className="px-6 py-3">
                  <a
                    href="tel:+212648456180"
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>+212648456180</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

const HeroSection = ({ onPageChange, currentPage, language }: { onPageChange: (page: string) => void, currentPage: string, language: Language }) => {
  const [departureAgency, setDepartureAgency] = useState('')
  const [returnAgency, setReturnAgency] = useState('')
  const [customDepartureAgency, setCustomDepartureAgency] = useState('')
  const [customReturnAgency, setCustomReturnAgency] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showMobileForm, setShowMobileForm] = useState(false)

  const handleBooking = () => {
    const message = `Bonjour, je souhaite réserver une voiture avec les détails suivants:

🛫 Départ: ${departureAgency === 'Autre' ? customDepartureAgency : airports.find(a => a.code === departureAgency)?.name || ''}
🛬 Retour: ${returnAgency === 'Autre' ? customReturnAgency : airports.find(a => a.code === returnAgency)?.name || ''}
📅 Date de début: ${startDate}
📅 Date de fin: ${endDate}`;

    const whatsappUrl = `https://wa.me/+212666666666?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const t = translations[language]

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/hiro.jpg"
          alt="Flotte de voitures de location Ouail Car à Fès - Large choix de véhicules"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <Navigation onPageChange={onPageChange} currentPage={currentPage} />
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-screen flex flex-col justify-end py-24">
        {/* Text Content */}
        <div className="flex-1 flex items-center justify-center mb-auto pt-16">
          <div className="max-w-3xl mx-auto text-center text-white space-y-4 sm:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              {t.hero.description}
            </motion.p>
          </div>
        </div>
        
        {/* Mobile Reserve Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-5xl mx-auto mb-8 md:hidden"
        >
          <Button
            onClick={() => setShowMobileForm(!showMobileForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3
                      rounded-md text-base font-medium transition-all shadow-md
                      duration-200 w-full"
          >
            {showMobileForm ? (t.hero.hideForm || 'Masquer le formulaire') : (t.hero.reserveNow || 'Réserver maintenant')}
          </Button>
        </motion.div>
        
        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`w-full max-w-5xl mx-auto mb-16 ${showMobileForm ? 'block' : 'hidden md:block'}`}
        >
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Departure Selection */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t.hero.departure || 'Departure'}
                </label>
                <div className="relative">
                  {departureAgency === 'Autre' ? (
                    <input
                      type="text"
                      value={customDepartureAgency}
                      onChange={(e) => setCustomDepartureAgency(e.target.value)}
                      placeholder={t.hero.enterDeparture}
                      className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                               border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               text-sm transition-colors"
                    />
                  ) : (
                    <select
                      value={departureAgency}
                      onChange={(e) => {
                        setDepartureAgency(e.target.value)
                        if (e.target.value === 'Autre') {
                          setCustomDepartureAgency('')
                        }
                      }}
                      className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                               border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               text-sm transition-colors appearance-none"
                    >
                      <option value="">{t.hero.selectDeparture}</option>
                      {airports.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                          {airport.name}
                        </option>
                      ))}
                      <option value="Autre">Autre</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Return Selection */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t.hero.return || 'Return'}
                </label>
                <div className="relative">
                  {returnAgency === 'Autre' ? (
                    <input
                      type="text"
                      value={customReturnAgency}
                      onChange={(e) => setCustomReturnAgency(e.target.value)}
                      placeholder={t.hero.enterReturn}
                      className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                               border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               text-sm transition-colors"
                    />
                  ) : (
                    <select
                      value={returnAgency}
                      onChange={(e) => {
                        setReturnAgency(e.target.value)
                        if (e.target.value === 'Autre') {
                          setCustomReturnAgency('')
                        }
                      }}
                      className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                               border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               text-sm transition-colors appearance-none"
                    >
                      <option value="">{t.hero.selectReturn}</option>
                      {airports.map((airport) => (
                        <option key={airport.code} value={airport.code}>
                          {airport.name}
                        </option>
                      ))}
                      <option value="Autre">Autre</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Start Date Selection */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t.hero.startDate || 'Start Date'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      if (new Date(e.target.value) > new Date(endDate)) {
                        setEndDate(e.target.value)
                      }
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                              text-sm transition-colors"
                  />
                </div>
              </div>
              
              {/* End Date Selection */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {t.hero.endDate || 'End Date'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full px-3 py-2 rounded-md bg-white text-gray-800 
                              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                              text-sm transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleBooking}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 
                          rounded-md text-sm font-medium transition-all shadow-md
                          duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                disabled={!departureAgency || !returnAgency || !startDate || !endDate}
              >
                {t.hero.bookNow || 'Book Now'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-300">{t.hero.discoverMore}</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/gelogo.png"
                  alt="Location Maroc Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Location Maroc</h3>
            </div>
            <p className="text-gray-400">
              Votre partenaire de confiance pour la location de voitures à Tiznit
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+212648985150" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Phone className="w-4 h-4" />
                <span>+212 666 666 666</span>
              </a>
              <a href="mailto:locationmaroc@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
                <span>locationmaroc@gmail.com</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Adresse</h3>
            <div className="flex items-start space-x-2 text-gray-400">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <span> 47 Rte de Sefrou, Fès 30070</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Location Maroc. Tous droits réservés. Made by    

            <a 
              href="https://wa.me/212666666666" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
               -Imad
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <a
        href="https://wa.me/212666666666"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="tel:+212648985150"
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  )
}

const AboutPage = ({ onPageChange, currentPage, language }: { 
  onPageChange: (page: string) => void,
  currentPage: string,
  language: Language,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleLang = () => setIsLangOpen(!isLangOpen)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const t = translations[language]

  return (
    <div className="min-h-screen">
      <nav className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onPageChange('home')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'home'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.navigation.home}
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'about'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.navigation.about}
              </button>

              <div className="relative">
                <button
                  onClick={toggleLang}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase font-medium">{language}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100"
                    >
                      {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                        <motion.button
                          key={lang}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // onLanguageChange(lang)
                            setIsLangOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-all ${
                            language === lang ? 'text-primary font-semibold bg-primary/5' : 'text-gray-700'
                          } ${lang === 'ar' ? 'text-right' : ''}`}
                        >
                          <span className="uppercase font-medium">{lang}</span>
                          {language === lang && (
                            <span className="ml-2 text-primary">✓</span>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLang}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <Globe className="w-6 h-6" />
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white shadow-lg rounded-b-xl"
              >
                <div className="py-4 space-y-4">
                  <button
                    onClick={() => {
                      onPageChange('home')
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 ${
                      currentPage === 'home'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t.navigation.home}
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('about')
                      setIsMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 ${
                      currentPage === 'about'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t.navigation.about}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Language Menu */}
          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden absolute left-0 right-0 bg-white shadow-lg rounded-b-xl"
              >
                <div className="py-4 space-y-2">
                  {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        // onLanguageChange(lang)
                        setIsLangOpen(false)
                      }}
                      className={`w-full flex justify-between items-center px-4 py-3 ${
                        language === lang ? 'text-primary font-semibold bg-primary/5' : 'text-gray-700'
                      } hover:bg-gray-50`}
                    >
                      <span className="uppercase font-medium">{lang}</span>
                      {language === lang && (
                        <span className="text-primary">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-gradient-to-r from-primary/10 to-primary/5 mb-16">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                {t.about.title} <span className="text-primary italic">{t.about.highlight}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                {t.about.description}
              </motion.p>
            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          {/* Location Maroc Section */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Image Section */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                  <Image 
                    src="/cu.webp" 
                    alt="Location Maroc - Location de voiture à Fès" 
                    fill 
                    className="object-cover" 
                    priority
                  />
                </div>
              </div>
              
              {/* Text Section */}
              <div className="w-full md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-4xl font-bold mb-6">
                    <span className="text-purple-600">LOCATION VOITURE À FÈS</span> : LOUEZ VOTRE <br/>
                    <span className="text-gray-700">VÉHICULE AU MEILLEUR PRIX</span>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    Chez <span className="font-semibold">Location Maroc</span>, nous vous proposons un service de location voiture à Fès simple, rapide et accessible dès 250dh/jour. Que vous recherchiez une citadine pratique pour circuler en ville, un SUV pour partir en aventure, ou un modèle compact pour plus de confort, nous avons le véhicule qu'il vous faut.
                  </p>
                  
                  <p className="text-gray-600 mb-6">
                    Fès, des enseignes internationales telles que Hertz, Avis ou Sixt sont également présentes. Chez Location Maroc, nous privilégions une approche locale fondée sur la proximité, la transparence et des tarifs accessibles.
                  </p>
                  
                  <p className="text-gray-600 mb-8">
                    Notre objectif est de devenir votre référence pour toute location de voiture à Fès avec une flotte diversifiée et un service client à l'écoute. Profitez de la livraison gratuite à l'aéroport de Fès et réservez facilement via WhatsApp, sans paiement en ligne.
                  </p>
                  
                  <Button 
                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-8 py-3 rounded-md shadow-sm font-medium"
                    onClick={() => window.open('https://wa.me/212648456180')}
                  >
                    Réserver votre véhicule
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fiabilité</h3>
              <p className="text-gray-600">
                Notre flotte de véhicules est régulièrement entretenue et inspectée pour garantir 
                votre sécurité et votre confort. Nous nous engageons à fournir des véhicules propres, 
                bien entretenus et en parfait état de fonctionnement.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Client</h3>
              <p className="text-gray-600">
                Notre équipe dévouée est disponible 24/7 pour répondre à vos besoins. Nous offrons 
                un service personnalisé et professionnel, de la réservation à la restitution du véhicule, 
                en passant par l&apos;assistance routière.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparence</h3>
              <p className="text-gray-600">
                Nous croyons en une tarification claire et transparente. Pas de frais cachés, 
                pas de surprises. Nos contrats sont clairs et nos prix sont compétitifs, avec 
                des options d&apos;assurance complètes pour votre tranquillité d&apos;esprit.
              </p>
            </motion.div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Services</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Location Flexible</h4>
                        <p className="text-gray-600">Location à court et long terme adaptée à vos besoins</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Service Aéroport</h4>
                        <p className="text-gray-600">Livraison et récupération dans tous les aéroports majeurs du Maroc</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Assistance 24/7</h4>
                        <p className="text-gray-600">Support technique et assistance routière disponibles à tout moment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/apr.jpg"
                    alt="Nos Services"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Contact CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Prêt à Prendre la Route ?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactez-nous dès maintenant pour réserver votre véhicule ou obtenir plus d&apos;informations 
              sur nos services de location.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+212648985150"
                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+212648985150</span>
              </a>
              <a 
                href="mailto:locationmaroc@gmail.com"
                className="flex items-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>locationmaroc@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const MaqdisCarWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedType, setSelectedType] = useState('all')
  const contentRef = useRef<HTMLDivElement>(null)
  const { currentLanguage } = useLanguageSwitch()

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const filteredCars = cars.filter(car => {
    if (selectedType === 'all') return true
    return car.type === selectedType
  })

  const t = translations[currentLanguage]

  return (
    <div ref={contentRef} className={`min-h-screen bg-white ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navigation 
        onPageChange={handlePageChange} 
        currentPage={currentPage}
      />
      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection onPageChange={handlePageChange} currentPage={currentPage} language={currentLanguage} />
            <section id="cars-section" className="py-24 px-4 md:px-8 bg-gray-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto mb-16">
                  <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 relative">
                    <span className="relative inline-block">
                      {t.cars.title}
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-primary rounded-full"></span>
                    </span>
                  </h2>
                  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Découvrez les véhicules les plus appréciés par nos clients : citadines agiles, compactes confortables ou SUV robustes, chacun sélectionné pour son excellent rapport qualité/prix</p>
                </div>
                
                <div className="mb-16">
                  <FilterSection onFilterChange={(type, value) => setSelectedType(value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {filteredCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            <AirportShuttleSection language={currentLanguage} />
            <LocationSection language={currentLanguage} />
          </motion.div>
        ) : (
          <AboutPage 
            onPageChange={handlePageChange} 
            currentPage={currentPage} 
            language={currentLanguage} 
          />
        )}
      </AnimatePresence>
      <Footer />
      <FloatingContactButtons />
    </div>
  )
}

export { MaqdisCarWebsite }
