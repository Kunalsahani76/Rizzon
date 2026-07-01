"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ChevronDown } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './phone-input.css';

interface DatasheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  productModel: string;
  productTitle: string;
}

interface UserDetails {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
}

// List of countries for dropdown
const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GH', name: 'Ghana' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'KR', name: 'South Korea' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HU', name: 'Hungary' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'GR', name: 'Greece' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'RU', name: 'Russia' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'TR', name: 'Turkey' },
  { code: 'IL', name: 'Israel' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'QA', name: 'Qatar' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'PE', name: 'Peru' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'PA', name: 'Panama' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BZ', name: 'Belize' },
  { code: 'GY', name: 'Guyana' },
  { code: 'SR', name: 'Suriname' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'GF', name: 'French Guiana' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function DatasheetModal({
  isOpen,
  onClose,
  productModel,
  productTitle,
}: DatasheetModalProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UserDetails>>({});
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  // Regex patterns for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/; // Only letters and spaces, 2-50 characters
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const companyRegex = /^[a-zA-Z0-9\s&.,'-]{4,100}$/; // Letters, numbers, spaces, and common business characters, 4-100 characters
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International phone format

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};

    // Name validation
    if (!userDetails.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!nameRegex.test(userDetails.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces (2-50 characters)";
    }

    // Email validation
    if (!userDetails.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(userDetails.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Company validation
    if (!userDetails.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (!companyRegex.test(userDetails.company.trim())) {
      newErrors.company = "Company name must be at least 4 characters and contain valid business characters";
    }

    // Phone validation (now required)
    if (!userDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (userDetails.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Country validation (now required)
    if (!userDetails.country.trim()) {
      newErrors.country = "Country selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/download-datasheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userDetails, productModel }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Rizonn_Datasheet_${productModel}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        onClose();
        // Reset form
        setUserDetails({
          name: "",
          email: "",
          company: "",
          phone: "",
          country: "",
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to download datasheet. Please try again.");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download datasheet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border ${
      hasError 
        ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500" 
        : "border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500"
    } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`;

  const phoneInputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border ${
      hasError 
        ? "border-red-300 bg-red-50" 
        : "border-slate-300 bg-white"
    } text-slate-900 focus:outline-none focus:ring-2 ${
      hasError 
        ? "focus:ring-red-500 focus:border-red-500" 
        : "focus:ring-blue-500 focus:border-blue-500"
    } transition-colors`;

  const selectCountry = (country: { code: string; name: string }) => {
    setUserDetails({ ...userDetails, country: country.name });
    setIsCountryDropdownOpen(false);
    if (errors.country) setErrors({ ...errors, country: undefined });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 px-6 py-5 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Download Datasheet
                    </h2>
                    <p className="text-blue-100 text-sm">{productTitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-white"
            >
              <p className="text-sm text-slate-600" style={{ color: '#64748b' }}>
                Please fill in your details to download the datasheet for{" "}
                <span className="font-medium" style={{ color: '#0f172a' }}>
                  {productModel}
                </span>
                .
              </p>

              {/* Name Field */}
              <div>
                <input
                  placeholder="Full Name *"
                  value={userDetails.name}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={inputClass(!!errors.name)}
                  style={{ color: '#0f172a' }}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={inputClass(!!errors.email)}
                  style={{ color: '#0f172a' }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <input
                  placeholder="Company Name * (minimum 4 characters)"
                  value={userDetails.company}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, company: e.target.value });
                    if (errors.company) setErrors({ ...errors, company: undefined });
                  }}
                  className={inputClass(!!errors.company)}
                  style={{ color: '#0f172a' }}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.company}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <div className={phoneInputClass(!!errors.phone)}>
                  <PhoneInput
                    placeholder="Phone Number *"
                    value={userDetails.phone}
                    onChange={(value) => {
                      setUserDetails({ ...userDetails, phone: value || "" });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                    style={{
                      '--PhoneInputCountryFlag-height': '1em',
                      '--PhoneInputCountrySelectArrow-color': '#6b7280',
                      '--PhoneInput-color--focus': '#3b82f6',
                    } as any}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
                )}
              </div>

              {/* Country Dropdown Field */}
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className={`${inputClass(!!errors.country)} flex items-center justify-between text-left`}
                  style={{ color: userDetails.country ? '#0f172a' : '#94a3b8' }}
                >
                  <span>{userDetails.country || "Select Country *"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-xl shadow-lg max-h-48 overflow-y-auto z-10">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => selectCountry(country)}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        style={{ color: '#0f172a' }}
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
                
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.country}</p>
                )}
              </div>

              {/* Required Fields Notice */}
              <p className="text-xs text-slate-500 mt-4" style={{ color: '#64748b' }}>
                * All fields are required
              </p>

              {/* Sticky Footer Button */}
              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold transition-colors
                    ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    } text-white shadow-lg hover:shadow-xl`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Download Datasheet"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
