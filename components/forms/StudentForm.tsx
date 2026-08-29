'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentFormSchema, type StudentFormData } from '@/lib/validators'

export default function StudentForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registrationId, setRegistrationId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
  })

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || 'Xəta baş verdi')
        return
      }

      const result = await response.json()
      setRegistrationId(result.registrationId)
      setSuccess(true)
      reset()
    } catch (error) {
      console.error('Error:', error)
      alert('Xəta baş verdi. Bir qədər sonra yenidən cəhd edin.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Qeydiyyatınız uğurla tamamlandı
          </h2>
          <p className="text-gray-600 mb-6">
            Sizin qeydiyyat nömrəsi:
          </p>
          <div className="bg-primary-100 text-primary-700 text-2xl font-bold p-4 rounded-lg mb-6">
            {registrationId}
          </div>
          <p className="text-sm text-gray-500">
            Bu nömrəni zəhmət olmasa yadda saxlayın
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white p-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tələbə Qeydiyyat Forması
          </h1>
          <p className="text-gray-600">
            Mərhələ {step} / 5
          </p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Şəxsi məlumatlar</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="Ad"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Soyad"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ata adı
                </label>
                <input
                  {...register('fatherName')}
                  type="text"
                  placeholder="Ata adı"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FİN kod
                </label>
                <input
                  {...register('fin')}
                  type="text"
                  placeholder="AA12345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.fin && (
                  <p className="text-red-500 text-sm mt-1">{errors.fin.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Əlaqə məlumatları</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şəxsi mobil nömrə *
                </label>
                <input
                  {...register('personalPhone')}
                  type="tel"
                  placeholder="+994 XX XXX XX XX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.personalPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalPhone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ata telefon nömrəsi
                </label>
                <input
                  {...register('fatherPhone')}
                  type="tel"
                  placeholder="+994 XX XXX XX XX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ana telefon nömrəsi
                </label>
                <input
                  {...register('motherPhone')}
                  type="tel"
                  placeholder="+994 XX XXX XX XX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ata işlədiyi yer
                </label>
                <input
                  {...register('fatherWorkplace')}
                  type="text"
                  placeholder="İş yeri"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ana işlədiyi yer
                </label>
                <input
                  {...register('motherWorkplace')}
                  type="text"
                  placeholder="İş yeri"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Education Information */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Təhsil məlumatları</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitirdiyi təhsil səviyyəsi *
                </label>
                <select
                  {...register('educationLevel')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Seçin</option>
                  <option value="tam_orta_məktəb">Tam orta məktəb</option>
                  <option value="ümumi_orta_məktəb">Ümumi orta məktəb</option>
                  <option value="kollec">Kollec</option>
                  <option value="peşə_məktəbi">Peşə məktəbi</option>
                  <option value="peşə_liseyi">Peşə liseyi</option>
                  <option value="peşə_təhsil_mərkəzi">Peşə təhsil mərkəzi</option>
                </select>
                {errors.educationLevel && (
                  <p className="text-red-500 text-sm mt-1">{errors.educationLevel.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitirdiyi il *
                </label>
                <select
                  {...register('graduationYear', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Seçin</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Təhsil müəssisəsi *
                </label>
                <input
                  {...register('educationInstitutionId')}
                  type="text"
                  placeholder="Müəssisə seçin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.educationInstitutionId && (
                  <p className="text-red-500 text-sm mt-1">{errors.educationInstitutionId.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Address Information */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ünvan məlumatları</h2>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Qeydiyyat ünvanı</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şəhər/rayon *
                  </label>
                  <select
                    {...register('registrationAddressRegion')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Seçin</option>
                    <option value="Bakı şəhəri">Bakı şəhəri</option>
                    <option value="Gəncə şəhəri">Gəncə şəhəri</option>
                    <option value="Sumqayıt şəhəri">Sumqayıt şəhəri</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Küçə/prospekt/qəsəbə/kənd *
                  </label>
                  <input
                    {...register('registrationAddressStreet')}
                    type="text"
                    placeholder="Küçə adı"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ev/bina/mənzil *
                  </label>
                  <input
                    {...register('registrationAddressBuilding')}
                    type="text"
                    placeholder="Ev nömrəsi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Faktiki ünvan</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şəhər/rayon *
                  </label>
                  <select
                    {...register('actualAddressRegion')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Seçin</option>
                    <option value="Bakı şəhəri">Bakı şəhəri</option>
                    <option value="Gəncə şəhəri">Gəncə şəhəri</option>
                    <option value="Sumqayıt şəhəri">Sumqayıt şəhəri</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Küçə/prospekt/qəsəbə/kənd *
                  </label>
                  <input
                    {...register('actualAddressStreet')}
                    type="text"
                    placeholder="Küçə adı"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ev/bina/mənzil *
                  </label>
                  <input
                    {...register('actualAddressBuilding')}
                    type="text"
                    placeholder="Ev nömrəsi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Consent */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Təsdiq</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Şəxsi məlumatlarımın universitet tərəfindən tələbə qeydiyyatı və inzibati məqsədlərlə emal edilməsinə razıyam.
                </p>
              </div>

              <label className="flex items-center">
                <input
                  {...register('consentGiven')}
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="ml-2 text-gray-700">Razılıq verilir</span>
              </label>
              {errors.consentGiven && (
                <p className="text-red-500 text-sm">{errors.consentGiven.message}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Geri qayıt
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Sonrakı
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? 'Göndərilir...' : 'Təsdiq et və göndər'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
