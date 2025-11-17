'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Car } from '@/types'
import 'react-phone-input-2/lib/style.css'

// Next.js dynamic import type conflict with react-phone-input-2 component
const PhoneInput = dynamic(() => import('react-phone-input-2'), {
  ssr: false,
  loading: () => <div className="mt-1 block w-full h-[38px] rounded-md border-gray-300 shadow-sm animate-pulse bg-gray-100" />
})

interface ReservationFormProps {
  car: Car;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  customPickupLocation?: string;
  returnLocation: string;
  customReturnLocation?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  additionalNotes?: string;
}

const locations = [
  { code: 'FEZ', name: 'Aéroport de Fès-Saïs - Route Aïn Smen 6, 30040 Fès, Maroc' },
  { code: 'CFE', name: 'Fès-centre ville - Route Aïn Smen 6, 30040 Fès, Maroc' },
  { code: 'Autre', name: 'Autre lieu (à préciser)' }
];

const timeSlots = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export default function ReservationForm({ car, onClose }: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [reviewData, setReviewData] = React.useState<FormData | null>(null);

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // Calculate number of days between dates for display
  const calculateRentalDays = React.useCallback((start?: string, end?: string) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }, []);

  const numberOfDays = React.useMemo(
    () => calculateRentalDays(startDate, endDate),
    [startDate, endDate, calculateRentalDays]
  );

  const reviewNumberOfDays = React.useMemo(
    () => (reviewData ? calculateRentalDays(reviewData.startDate, reviewData.endDate) : 0),
    [reviewData, calculateRentalDays]
  );

  const selectedPickupLocation = watch('pickupLocation');
  const selectedReturnLocation = watch('returnLocation');
  const showCustomPickupLocation = selectedPickupLocation === 'Autre';
  const showCustomReturnLocation = selectedReturnLocation === 'Autre';

  const resolveLocationName = (code?: string, customValue?: string) => {
    if (!code) return 'Non spécifié';
    if (code === 'Autre') return customValue || 'Autre lieu';
    const location = locations.find((loc) => loc.code === code);
    return location ? location.name : code;
  };

  const formatTimeForMessage = (time: string) => {
    return time || 'Non spécifié';
  };

  const buildReservationMessage = (data: FormData) => {
    return (
      "*Nouvelle Réservation*\n\n" +
      `*Voiture:* ${car.name}\n` +
      `*Date de début:* ${new Date(data.startDate).toLocaleDateString('fr-FR')} à ${formatTimeForMessage(data.startTime)}\n` +
      `*Date de fin:* ${new Date(data.endDate).toLocaleDateString('fr-FR')} à ${formatTimeForMessage(data.endTime)}\n` +
      `*Nom:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Téléphone:* ${data.phone}\n` +
      `*Lieu de prise en charge:* ${resolveLocationName(data.pickupLocation, data.customPickupLocation)}\n` +
      `*Lieu de retour:* ${resolveLocationName(data.returnLocation, data.customReturnLocation)}\n` +
      `*Message:* ${data.additionalNotes ? data.additionalNotes : ''}\n` +
      `*Réservation envoyée via Y-S car*\n` +
      `*Service client:* +212 698-969770`
    );
  };

  const getLongTermDiscount = () => car.name.toLowerCase().includes('dacia') ? 20 : 50;

  const estimateTotalPrice = (days: number) => {
    if (!days) return 0;
    const discount = days >= 5 ? getLongTermDiscount() : 0;
    const dailyRate = car.price - discount;
    return dailyRate * days;
  };

  const onSubmit = async (data: FormData) => {
    setReviewData(data);
  };

  const handleConfirmReservation = () => {
    if (!reviewData) return;
    const message = buildReservationMessage(reviewData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212698969770?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };
  if (reviewData) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
          <div className="bg-primary/5 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary/60">Récapitulatif</p>
              <h2 className="text-2xl font-semibold text-gray-900">{car.name}</h2>
              <p className="text-sm text-gray-500">{car.version} • {car.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Prix total estimé</p>
              <p className="text-3xl font-bold text-primary">{estimateTotalPrice(reviewNumberOfDays)} MAD</p>
              <p className="text-xs text-gray-400">{reviewNumberOfDays || 1} jour(s) • {car.price} MAD/jour</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 p-6 border-t border-gray-100">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">Nom</p>
              <p className="text-base font-semibold text-gray-900">{reviewData.name}</p>
              <p className="text-sm text-gray-500">{reviewData.email || 'Email non renseigné'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">Téléphone</p>
              <p className="text-base font-semibold text-gray-900">{reviewData.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">Prise en charge</p>
              <p className="text-base font-semibold text-gray-900">{resolveLocationName(reviewData.pickupLocation, reviewData.customPickupLocation)}</p>
              <p className="text-sm text-gray-500">
                {new Date(reviewData.startDate).toLocaleDateString('fr-FR')} • {formatTimeForMessage(reviewData.startTime)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">Retour</p>
              <p className="text-base font-semibold text-gray-900">{resolveLocationName(reviewData.returnLocation, reviewData.customReturnLocation)}</p>
              <p className="text-sm text-gray-500">
                {new Date(reviewData.endDate).toLocaleDateString('fr-FR')} • {formatTimeForMessage(reviewData.endTime)}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 px-6 py-5">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Notes</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {reviewData.additionalNotes?.trim() || 'Aucune note additionnelle.'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la location</h3>
          <dl className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Durée</dt>
              <dd className="text-base font-semibold text-gray-900">{reviewNumberOfDays || '—'} jour(s)</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Tarif appliqué</dt>
              <dd className="text-base font-semibold text-gray-900">
                {reviewNumberOfDays >= 5
                  ? `${car.price - getLongTermDiscount()} MAD/jour (-${getLongTermDiscount()} MAD)`
                  : `${car.price} MAD/jour`}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Prix total estimé</dt>
              <dd className="text-base font-semibold text-primary">{estimateTotalPrice(reviewNumberOfDays)} MAD</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Canal de confirmation</dt>
              <dd className="text-base font-semibold text-gray-900">WhatsApp (+212 698-969770)</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full md:w-auto border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => setReviewData(null)}
          >
            Modifier les informations
          </Button>
          <Button
            type="button"
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full"
            onClick={handleConfirmReservation}
          >
            Confirmer et envoyer sur WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Réservation</p>
              <h2 className="text-2xl font-semibold text-gray-900">Réserver {car.name}</h2>
              <p className="text-sm text-gray-500">Version {car.version} • {car.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Tarif journalier</p>
              <p className="text-2xl font-bold text-primary">{car.price} MAD</p>
            </div>
          </div>

          {numberOfDays > 0 && (
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-sm text-blue-900 font-medium flex items-center justify-between">
                Durée de location
                <span className="text-base">{numberOfDays} jours</span>
              </p>
              <p className="mt-2 text-sm text-blue-900">
                Prix total estimé : <span className="font-semibold">
                  {estimateTotalPrice(numberOfDays).toFixed(0)} MAD
                </span>
                {numberOfDays >= 5 && (
                  <span className="ml-2 text-green-600 text-xs font-medium">
                    Réduction -{getLongTermDiscount()} MAD/jour
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Client Information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Étape 1</p>
            <h3 className="text-lg font-semibold text-gray-900">Vos informations</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                type="text"
                {...register('name', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm shadow-inner focus:border-primary focus:ring-primary"
                placeholder="Votre nom complet"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                {...register('email')}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm shadow-inner focus:border-primary focus:ring-primary"
                placeholder="votre.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <div className="mt-2 relative">
              <PhoneInput
                country={'ma'}
                value={watch('phone')}
                onChange={(phone: string) => {
                  const event = {
                    target: {
                      name: 'phone',
                      value: '+' + phone
                    }
                  };
                  register('phone').onChange(event);
                }}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                containerClass="phone-input-container"
                buttonClass="!border !border-gray-200 !rounded-l-xl !h-[42px] hover:!bg-gray-50"
                inputClass="!w-full !h-[42px] !text-sm !border-gray-200 !rounded-r-xl !pl-[54px] focus:!ring-primary focus:!border-primary"
                dropdownClass="!rounded-lg !shadow-lg !border-gray-200"
                searchClass="!p-2 !m-2 !border !border-gray-300 !rounded-md !text-sm"
                buttonStyle={{ 
                  backgroundColor: 'white',
                  borderRight: 'none',
                }}
                inputStyle={{
                  fontSize: '0.9rem',
                }}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </section>

        {/* Reservation Details */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Étape 2</p>
            <h3 className="text-lg font-semibold text-gray-900">Détails de votre trajet</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lieu de prise</label>
              <select
                {...register('pickupLocation', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Sélectionnez un lieu</option>
                {locations.map((location) => (
                  <option key={location.code} value={location.code}>
                    {location.name}
                  </option>
                ))}
              </select>
              {showCustomPickupLocation && (
                <input
                  type="text"
                  {...register('customPickupLocation', { required: true })}
                  placeholder="Entrez le lieu de prise"
                  className="mt-2 block w-full rounded-xl border-gray-200 bg-white text-sm focus:border-primary focus:ring-primary"
                />
              )}
              {errors.pickupLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pickupLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Lieu de retour</label>
              <select
                {...register('returnLocation', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Sélectionnez un lieu</option>
                {locations.map((location) => (
                  <option key={location.code} value={location.code}>
                    {location.name}
                  </option>
                ))}
              </select>
              {showCustomReturnLocation && (
                <input
                  type="text"
                  {...register('customReturnLocation', { required: true })}
                  placeholder="Entrez le lieu de retour"
                  className="mt-2 block w-full rounded-xl border-gray-200 bg-white text-sm focus:border-primary focus:ring-primary"
                />
              )}
              {errors.returnLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.returnLocation.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de début</label>
              <input
                type="date"
                {...register('startDate', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date de fin</label>
              <input
                type="date"
                {...register('endDate', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
                min={startDate}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Heure de début</label>
              <select
                {...register('startTime', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Sélectionnez l&apos;heure</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Heure de fin</label>
              <select
                {...register('endTime', { required: 'Ce champ est requis' })}
                className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Sélectionnez l&apos;heure</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes additionnelles</label>
            <textarea
              {...register('additionalNotes')}
              rows={4}
              className="mt-2 block w-full rounded-2xl border-gray-200 bg-gray-50/50 text-sm focus:border-primary focus:ring-primary"
              placeholder="Informations supplémentaires, demandes spécifiques..."
            />
          </div>
        </section>

        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5 md:p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Étape finale</p>
            <p className="text-base text-gray-700">Confirmez votre demande, nous vous répondons sous quelques minutes sur WhatsApp.</p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full"
          >
            Réserver maintenant
          </Button>
        </div>
      </form>
      <style jsx global>{`
        .phone-input-container {
          font-family: inherit;
        }
        .phone-input-container .selected-flag:hover,
        .phone-input-container .selected-flag:focus,
        .phone-input-container .selected-flag:active {
          background-color: #f9fafb !important;
        }
        .phone-input-container .country-list {
          max-height: 200px;
          overflow-y: auto;
          scrollbar-width: thin;
        }
        .phone-input-container .country-list::-webkit-scrollbar {
          width: 6px;
        }
        .phone-input-container .country-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .phone-input-container .country-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .phone-input-container .country-list .country:hover {
          background-color: #f3f4f6;
        }
        .phone-input-container .country-list .country.highlight {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
