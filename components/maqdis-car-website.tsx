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
import ReservationForm, { ReservationFormData } from './ReservationForm'
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
    name: 'Dacia Logan ',
    version: 'Base',
    type: 'Économique',
    price: 250,
    image: '/1 (6).jpeg',
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
    id: 2,
    name: 'Citroen c4x automatique',
    version: 'Premium',
    type: 'Berline',
    price: 450,
    image: '/c4x.png',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  },
    {
    id: 4,
    name: 'Citroen c3',
    version: 'Premium',
    type: 'Berline',
    price: 300,
    image: '/1 (5).jpeg',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  },
  {
    id: 8,
    name: 'Renault Clio 5 automatique',
    version: 'Base',
    type: 'Économique',
    price: 350,
    image: '/1 (4).jpeg',
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
    id: 7,
    name: 'Peugeot 208',
    version: 'Premium',
    type: 'Berline',
    price: 300,
    image: '/1 (7).jpeg',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  },   
    {
    id: 5,
    name: 'Renault Clio 5 ',
    version: 'Base',
    type: 'Économique',
    price: 300,
    image: '/1 (4).jpeg',
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
    id: 8,
    name: 'Renault capture',
    version: 'Premium',
    type: 'Berline',
    price: 350,
    image: '/1 (1).jpeg',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  },
        {
    id: 7,
    name: 'Peugeot 208',
    version: 'Premium',
    type: 'Berline',
    price: 350,
    image: '/1 (3).jpeg',
    featured: false,
    transmission: 'Automatique',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    fuel: 'diesel',
    maxSpeed: 180,
    trunkSize: 620,
    colors: ['blanc', 'noir']
  }
];

const airports = [
  { code: 'CMN', name: 'Casablanca (CMN) – Aéroport Mohammed V' },
  { code: 'RAK', name: 'Marrakech (RAK) – Aéroport Marrakech-Ménara' },
  { code: 'RBA', name: 'Rabat (RBA) – Aéroport Rabat-Salé' },
  { code: 'TNG', name: 'Tanger (TNG) – Aéroport Ibn Battouta' },
  { code: 'FEZ', name: 'Fès (FEZ) – Aéroport Fès-Saïss' },
  { code: 'Autre', name: 'Autre lieu (à préciser)' }
]

type HeroFormSubmission = {
  departureAgency: string;
  customDepartureAgency: string;
  returnAgency: string;
  customReturnAgency: string;
  startDate: string;
  endDate: string;
}

const CarCard = ({ car, onReserve }: { car: Car; onReserve: (car: Car) => void }) => {
  const handleWhatsAppClick = (car: Car) => {
    const message = `Bonjour, je suis intéressé(e) par la location de ${car.name} à ${car.price}dh/jour.`
    const whatsappUrl = `https://wa.me/212698969770?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.name} ${car.version} - Voiture à louer à Fès - ${car.type}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={car.featured}
          />

          {/* Type badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-primary shadow-sm">
              {car.type}
            </span>
          </div>

          {/* Featured shimmer */}
          {car.featured && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-5 p-6">
          {/* Title & price */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">{car.name}</h3>
              <p className="text-xs uppercase tracking-wide text-gray-400">{car.version}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 px-3 py-2 text-right">
              <p className="text-base font-semibold text-primary leading-tight">{car.price} MAD</p>
              <p className="text-[11px] text-gray-500">/ jour</p>
            </div>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
              <Armchair className="h-4 w-4 text-primary" />
              <span className="text-gray-700">{car.seats} places</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-gray-700">{car.luggage} bagages</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
              <Gauge className="h-4 w-4 text-primary" />
              <span className="text-gray-700">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
              <Fuel className="h-4 w-4 text-primary" />
              <span className="text-gray-700 capitalize">{car.fuel}</span>
            </div>
          </div>

          {/* Equipment & colors */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">
                <CheckCircle2 className="h-3 w-3" /> Climatisation
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">
                <CheckCircle2 className="h-3 w-3" /> Bluetooth
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">
                <CheckCircle2 className="h-3 w-3" /> ABS & Airbags
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-700">
                <CheckCircle2 className="h-3 w-3" /> Direction assistée
              </span>
            </div>

            {car.colors && car.colors.length > 0 && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <span className="text-xs text-gray-500">Couleurs disponibles</span>
                </div>
                <div className="flex gap-1.5">
                  {car.colors.map((color) => (
                    <div
                      key={color}
                      className="h-5 w-5 rounded-full border border-gray-200 shadow-sm transition-transform duration-150 hover:scale-110"
                      style={{ backgroundColor: color === 'blanc' ? '#ffffff' : '#000000' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-primary/5 px-4 py-3">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-gray-700">À partir de</p>
                <p className="text-lg font-semibold text-primary">{car.price} MAD / jour</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleWhatsAppClick(car)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-primary/40 text-primary hover:bg-primary hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Button>
                <Button
                  onClick={() => onReserve(car)}
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Réserver
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
              <Badge className="border-primary/20 bg-white text-primary" variant="outline">
                Disponible maintenant
              </Badge>
              <Badge className="border-green-200 bg-green-50 text-green-700" variant="outline">
                +5jrs • Kilométrage illimité
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

const ReservationPage = ({
  car,
  language,
  onBack,
  initialData,
}: {
  car: Car;
  language: Language;
  onBack: () => void;
  initialData?: Partial<ReservationFormData>;
}) => {
  const t = translations[language]

  return (
    <section className="min-h-[calc(100vh-96px)] bg-slate-900/90 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto rounded-3xl bg-slate-900 shadow-2xl overflow-hidden border border-slate-800">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Car image and summary */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto">
            <Image
              src={car.image}
              alt={`${car.name} ${car.version} - Y-S car`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col gap-3 text-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">{t.cars?.title ?? 'Notre flotte'}</p>
                  <h2 className="text-xl sm:text-2xl font-semibold leading-snug">{car.name}</h2>
                  <p className="text-xs sm:text-sm text-white/60">{car.version} • {car.type}</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                  <p className="text-sm font-medium text-white">{car.price} MAD</p>
                  <p className="text-[11px] text-white/70">/ jour</p>
                </div>
              </div>

              <div className="mt-1 grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Armchair className="h-4 w-4 text-white" />
                  <span>{car.seats} places</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-white" />
                  <span>{car.luggage} bagages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-white" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-white" />
                  <span className="capitalize">{car.fuel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Reservation card */}
          <div className="lg:w-1/2 bg-white p-6 sm:p-8 md:p-10 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={onBack}
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                ← Retour aux véhicules
              </button>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-gray-400">Prix par jour</p>
                <p className="text-xl font-semibold text-primary">{car.price} MAD</p>
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">{car.name}</h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {car.version} • {car.type}
              </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                <CheckCircle2 className="h-3 w-3 text-primary" /> Climatisation
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                <CheckCircle2 className="h-3 w-3 text-primary" /> Bluetooth
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                <CheckCircle2 className="h-3 w-3 text-primary" /> Assistance 24/7
              </span>
            </div>

            <div className="mt-2 flex-1">
              <ReservationForm car={car} onClose={onBack} initialData={initialData} language={language} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
    const whatsappUrl = `https://wa.me/212698969770?text=${whatsappMessage}`
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
            <Image
              src='/air.jpg'
              alt="Vue aérienne de l'aéroport de Fès-Saïs"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
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
              <a href="tel:+212698969770" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+212 698-969770</span>
              </a>
              <a href="mailto:y.scarlocationdevoitures@gmail.com" className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>y.scarlocationdevoitures@gmail.com</span>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.517793595848!2d-5.020898804028333!3d34.01729746331834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b5549004277%3A0x35b1ff4b13fce7a4!2sY-S%20car!5e0!3m2!1sen!2sma!4v1763289357959!5m2!1sen!2sma"
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
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, switchLanguage } = useLanguageSwitch()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLang = () => setIsLangOpen(!isLangOpen)

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

  const handleLanguageChange = (lang: Language) => {
    switchLanguage(lang)
    setIsLangOpen(false)
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/30 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-36 h-16">
              <Image
                src="/yslogo.png"
                alt="Y-S car Logo"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <button
              onClick={() => onPageChange('home')}
              className={`relative px-2 py-2 transition-colors ${currentPage === 'home' ? 'text-primary' : 'hover:text-primary'}`}
            >
              Home
              {currentPage === 'home' && <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full" />}
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`relative px-2 py-2 transition-colors ${currentPage === 'about' ? 'text-primary' : 'hover:text-primary'}`}
            >
              About
              {currentPage === 'about' && <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full" />}
            </button>
          </div>

          {/* Right utilities */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+212698969770"
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-primary hover:text-primary"
            >
              <Phone className="w-4 h-4" />
              <span>+212 698-969770</span>
            </a>

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={toggleLang}
                aria-expanded={isLangOpen}
                aria-controls="language-menu"
                aria-label="Select language"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-primary hover:text-primary"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    id="language-menu"
                    role="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 rounded-2xl border border-gray-100 bg-white shadow-lg z-50"
                  >
                    {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                      <motion.button
                        key={lang}
                        role="menuitem"
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-primary/5 ${currentLanguage === lang ? 'text-primary font-semibold' : 'text-gray-700'}`}
                      >
                        <span>{languageNames[lang]}</span>
                        {currentLanguage === lang && <span>•</span>}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+212698969770"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 text-gray-600"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
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
            <div className="py-4 space-y-4">
              <button
                onClick={() => {
                  onPageChange('home')
                  setIsMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2 ${currentPage === 'home' ? 'text-primary font-semibold' : 'text-gray-700'}`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onPageChange('about')
                  setIsMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2 ${currentPage === 'about' ? 'text-primary font-semibold' : 'text-gray-700'}`}
              >
                About
              </button>

              {/* Language options in mobile menu */}
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500 mb-2">Language</p>
                <div className="flex flex-wrap gap-2">
                  {(['en', 'fr', 'ar'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        handleLanguageChange(lang)
                        setIsMenuOpen(false)
                      }}
                      className={`px-3 py-1 rounded-md text-sm ${currentLanguage === lang ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone number in mobile menu */}
              <div className="px-4 py-2">
                <a
                  href="tel:+212698969770"
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span>+212 698-969770</span>
                </a>
              </div>
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
            className="md:hidden absolute left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg border-t border-gray-100"
          >
            <div className="py-4 space-y-2">
              {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    // onLanguageChange(lang)
                    setIsLangOpen(false)
                  }}
                  className={`w-full flex justify-between items-center px-4 py-3 ${currentLanguage === lang ? 'text-primary font-semibold' : 'text-gray-700'}`}
                >
                  <span>{languageNames[lang]}</span>
                  {currentLanguage === lang && <span>•</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const HeroSection = ({ onPageChange, currentPage, language, onBookingRequest }: { onPageChange: (page: string) => void, currentPage: string, language: Language, onBookingRequest: (data: HeroFormSubmission) => void }) => {
  const [departureAgency, setDepartureAgency] = useState('')
  const [returnAgency, setReturnAgency] = useState('')
  const [customDepartureAgency, setCustomDepartureAgency] = useState('')
  const [customReturnAgency, setCustomReturnAgency] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [showMobileForm, setShowMobileForm] = useState(false)

  const handleBooking = () => {
    onBookingRequest({
      departureAgency,
      customDepartureAgency,
      returnAgency,
      customReturnAgency,
      startDate,
      endDate,
    })
    setShowMobileForm(false)
  }

  const t = translations[language]

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/yshero.jpg"
          alt="Flotte de voitures de location Y-S car à Fès - Large choix de véhicules"
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
        <div className="flex-1 flex items-center justify-center mb-auto pt-16 relative z-20">
          <div className="max-w-3xl mx-auto text-center text-white space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto"
            >
              <div className="relative w-96 h-40 sm:w-[32rem] sm:h-48 mx-auto">
                <Image
                  src="/yslogo.png"
                  alt="Y-S car logo"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
                <span className="sr-only">{t.hero.title}</span>
              </div>
            </motion.div>
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
          className="w-full max-w-5xl mx-auto mb-8 md:hidden relative z-20"
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
        
        {/* Dark square backdrop for booking form */}
        <div className="pointer-events-none absolute inset-x-4 top-16 bottom-0 flex justify-center z-10">
          <div
            className="w-full max-w-5xl h-full rounded-[42px] bg-slate-900/60 shadow-[0_45px_150px_rgba(0,0,0,0.55)]"
            style={{
              WebkitMaskImage: 'radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              maskImage: 'radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>
        
        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`relative z-30 w-full max-w-5xl mx-auto mb-16 ${showMobileForm ? 'block' : 'hidden md:block'}`}
        >
          <div className="bg-white/95 rounded-2xl p-6 shadow-[0_25px_70px_rgba(15,23,42,0.25)] border border-white/60 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure + Start Date */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-100 bg-slate-50/90 shadow-inner">
                <div>
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
                        className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
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
                        className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
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

                <div>
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
                      className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent 
                                text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Return + End Date */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-100 bg-slate-50/90 shadow-inner">
                <div>
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
                        className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
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
                        className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
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

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    {t.hero.endDate || 'End Date'}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full px-3 py-2.5 rounded-lg bg-white text-gray-900 
                                border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent 
                                text-sm transition-colors"
                    />
                  </div>
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
                  src="/yslogo.png"
                  alt="Y-S car Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Y-S car</h3>
            </div>
            <p className="text-gray-400">
              Votre partenaire de confiance pour la location de voitures à Fès
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
              <a href="tel:+212698969770" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Phone className="w-4 h-4" />
                <span>+212 698-969770</span>
              </a>
              <a href="mailto:y.scarlocationdevoitures@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
                <span>y.scarlocationdevoitures@gmail.com</span>
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
              <span>Route Aïn Smen 6, 30040 Fès, Maroc</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Y-S car. Tous droits réservés. Made by    

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
        href="https://wa.me/212698969770"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="tel:+212698969770"
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
  const t = translations[language]

  return (
    <div className="min-h-screen">
      <Navigation onPageChange={onPageChange} currentPage={currentPage} />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-white to-primary/5" />
          <div className="container mx-auto px-4 py-12 md:py-20 relative flex items-center">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6"
              >
                {t.about.title} <span className="text-primary italic">{t.about.highlight}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-sm"
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
            <div className="mx-auto max-w-6xl rounded-3xl bg-white shadow-lg border border-gray-100 px-4 py-8 md:px-10 md:py-10">
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-100">
                    <Image 
                      src="/cu.webp" 
                      alt="Y-S car - Location de voiture à Fès" 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105" 
                      priority
                    />
                  </div>
                </div>
                
                {/* Text Section */}
                <div className="w-full md:w-1/2 space-y-5">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-sm font-semibold tracking-[0.2em] text-primary mb-2 uppercase">Location voiture à Fès</h2>
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-4">
                      Louez votre véhicule au meilleur prix avec <span className="text-primary">Y-S car</span>
                    </p>
                    
                    <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                      <p>
                        Chez <span className="font-semibold">Y-S car</span>, nous vous proposons un service de location voiture à Fès simple, rapide et accessible dès 250dh/jour. Que vous recherchiez une citadine pratique pour circuler en ville, un SUV pour partir en aventure, ou un modèle compact pour plus de confort, nous avons le véhicule qu&#39;il vous faut.
                      </p>
                      <p>
                        Fès, des enseignes internationales telles que Hertz, Avis ou Sixt sont également présentes. Chez Y-S car, nous privilégions une approche locale fondée sur la proximité, la transparence et des tarifs accessibles.
                      </p>
                      <p>
                        Notre objectif est de devenir votre référence pour toute location de voiture à Fès avec une flotte diversifiée et un service client à l&#39;écoute. Profitez de la livraison gratuite à l&#39;aéroport de Fès et réservez facilement via WhatsApp, sans paiement en ligne.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button 
                        className="bg-primary text-white hover:bg-primary/90 px-7 py-3 rounded-full shadow-md"
                        onClick={() => window.open('https://wa.me/212698969770')}
                      >
                        Réserver votre véhicule
                      </Button>
                      <span className="text-xs md:text-sm text-gray-500">
                        Réponse rapide via WhatsApp • Confirmation en quelques minutes
                      </span>
                    </div>
                  </motion.div>
                </div>
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
                href="tel:+212698969770"
                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+212 698-969770</span>
              </a>
              <a 
                href="mailto:y.scarlocationdevoitures@gmail.com"
                className="flex items-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>y.scarlocationdevoitures@gmail.com</span>
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
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [heroFormData, setHeroFormData] = useState<Partial<ReservationFormData>>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const carsSectionRef = useRef<HTMLElement | null>(null)
  const { currentLanguage } = useLanguageSwitch()

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    setSelectedCar(null)
    window.scrollTo(0, 0)
  }

  const filteredCars = cars.filter(car => {
    if (selectedType === 'all') return true
    return car.type === selectedType
  })

  const t = translations[currentLanguage]

  const handleHeroBooking = (formValues: HeroFormSubmission) => {
    setHeroFormData({
      pickupLocation: formValues.departureAgency,
      customPickupLocation: formValues.departureAgency === 'Autre' ? formValues.customDepartureAgency : undefined,
      returnLocation: formValues.returnAgency,
      customReturnLocation: formValues.returnAgency === 'Autre' ? formValues.customReturnAgency : undefined,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
    })

    carsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleReserveCar = (car: Car) => {
    setSelectedCar(car)
    window.scrollTo(0, 0)
  }

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
            {selectedCar ? (
              <ReservationPage
                car={selectedCar}
                language={currentLanguage}
                onBack={() => setSelectedCar(null)}
                initialData={heroFormData}
              />
            ) : (
              <>
                <HeroSection onPageChange={handlePageChange} currentPage={currentPage} language={currentLanguage} onBookingRequest={handleHeroBooking} />
                <section id="cars-section" ref={carsSectionRef} className="py-24 px-4 md:px-8 bg-slate-900">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="max-w-7xl mx-auto mb-16">
                      <h2 className="text-4xl font-bold mb-6 text-center text-white relative">
                        <span className="relative inline-block">
                          {t.cars.title}
                          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-primary rounded-full"></span>
                        </span>
                      </h2>
                      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">Découvrez les véhicules les plus appréciés par nos clients : citadines agiles, compactes confortables ou SUV robustes, chacun sélectionné pour son excellent rapport qualité/prix</p>
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
                          <CarCard car={car} onReserve={handleReserveCar} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </section>

                <AirportShuttleSection language={currentLanguage} />
                <LocationSection language={currentLanguage} />
              </>
            )}
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
