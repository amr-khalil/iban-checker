package com.example.ibanapi.ibanvalidation;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class IbanValidator {
    // Country-specific IBAN lengths (can be extended)
    private static final Map<String, Integer> IBAN_LENGTHS = new HashMap<>();
    private static final Logger logger = LoggerFactory.getLogger(IbanValidator.class);

    static {
        IBAN_LENGTHS.put("AL", 28); // Albania
        IBAN_LENGTHS.put("AD", 24); // Andorra
        IBAN_LENGTHS.put("AT", 20); // Austria
        IBAN_LENGTHS.put("AZ", 28); // Azerbaijan
        IBAN_LENGTHS.put("BH", 22); // Bahrain
        IBAN_LENGTHS.put("BE", 16); // Belgium
        IBAN_LENGTHS.put("BA", 20); // Bosnia and Herzegovina
        IBAN_LENGTHS.put("BR", 29); // Brazil
        IBAN_LENGTHS.put("BG", 22); // Bulgaria
        IBAN_LENGTHS.put("CR", 22); // Costa Rica
        IBAN_LENGTHS.put("HR", 21); // Croatia
        IBAN_LENGTHS.put("CY", 28); // Cyprus
        IBAN_LENGTHS.put("CZ", 24); // Czech Republic
        IBAN_LENGTHS.put("DK", 18); // Denmark
        IBAN_LENGTHS.put("DO", 28); // Dominican Republic
        IBAN_LENGTHS.put("EE", 20); // Estonia
        IBAN_LENGTHS.put("EG", 29); // Egypt
        IBAN_LENGTHS.put("FI", 18); // Finland
        IBAN_LENGTHS.put("FR", 27); // France
        IBAN_LENGTHS.put("GE", 22); // Georgia
        IBAN_LENGTHS.put("DE", 22); // Germany
        IBAN_LENGTHS.put("GI", 23); // Gibraltar
        IBAN_LENGTHS.put("GR", 27); // Greece
        IBAN_LENGTHS.put("GL", 18); // Greenland
        IBAN_LENGTHS.put("GT", 28); // Guatemala
        IBAN_LENGTHS.put("HU", 28); // Hungary
        IBAN_LENGTHS.put("IS", 26); // Iceland
        IBAN_LENGTHS.put("IE", 22); // Ireland
        IBAN_LENGTHS.put("IT", 27); // Italy
        IBAN_LENGTHS.put("JO", 30); // Jordan
        IBAN_LENGTHS.put("KZ", 20); // Kazakhstan
        IBAN_LENGTHS.put("KW", 30); // Kuwait
        IBAN_LENGTHS.put("LV", 21); // Latvia
        IBAN_LENGTHS.put("LB", 28); // Lebanon
        IBAN_LENGTHS.put("LI", 21); // Liechtenstein
        IBAN_LENGTHS.put("LT", 20); // Lithuania
        IBAN_LENGTHS.put("LU", 20); // Luxembourg
        IBAN_LENGTHS.put("MT", 31); // Malta
        IBAN_LENGTHS.put("MR", 27); // Mauritania
        IBAN_LENGTHS.put("MU", 30); // Mauritius
        IBAN_LENGTHS.put("MC", 27); // Monaco
        IBAN_LENGTHS.put("MD", 24); // Moldova
        IBAN_LENGTHS.put("ME", 22); // Montenegro
        IBAN_LENGTHS.put("NL", 18); // Netherlands
        IBAN_LENGTHS.put("NO", 15); // Norway
        IBAN_LENGTHS.put("PK", 24); // Pakistan
        IBAN_LENGTHS.put("PS", 29); // Palestine
        IBAN_LENGTHS.put("PL", 28); // Poland
        IBAN_LENGTHS.put("PT", 25); // Portugal
        IBAN_LENGTHS.put("QA", 29); // Qatar
        IBAN_LENGTHS.put("RO", 24); // Romania
        IBAN_LENGTHS.put("SM", 27); // San Marino
        IBAN_LENGTHS.put("SA", 24); // Saudi Arabia
        IBAN_LENGTHS.put("RS", 22); // Serbia
        IBAN_LENGTHS.put("SK", 24); // Slovakia
        IBAN_LENGTHS.put("SI", 19); // Slovenia
        IBAN_LENGTHS.put("ES", 24); // Spain
        IBAN_LENGTHS.put("SE", 24); // Sweden
        IBAN_LENGTHS.put("CH", 21); // Switzerland
        IBAN_LENGTHS.put("TN", 24); // Tunisia
        IBAN_LENGTHS.put("TR", 26); // Turkey
        IBAN_LENGTHS.put("UA", 29); // Ukraine
        IBAN_LENGTHS.put("AE", 23); // United Arab Emirates
        IBAN_LENGTHS.put("GB", 22); // United Kingdom
        IBAN_LENGTHS.put("VG", 24); // Virgin Islands, British
        IBAN_LENGTHS.put("XK", 20); // Kosovo
        IBAN_LENGTHS.put("US", 24); // United States
        IBAN_LENGTHS.put("CA", 24); // Canada
        IBAN_LENGTHS.put("AU", 24); // Australia
        IBAN_LENGTHS.put("IN", 24); // India
        IBAN_LENGTHS.put("CN", 24); // China
        IBAN_LENGTHS.put("JP", 24); // Japan
        IBAN_LENGTHS.put("FO", 18); // Faroe Islands
        IBAN_LENGTHS.put("GL", 18); // Greenland
        IBAN_LENGTHS.put("MK", 19); // North Macedonia
        IBAN_LENGTHS.put("PT", 25); // Portugal
        IBAN_LENGTHS.put("SM", 27); // San Marino
        IBAN_LENGTHS.put("VA", 22); // Vatican City

    }

    public String normalizeIban(String iban) {
        try {
            return iban.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();
        } catch (Exception e) {
            logger.error("Failed to normalize IBAN {}: {}", iban, e.getMessage());
            return "";
        }
    }

    public boolean isValidIbanLength(String iban) {
        try {
            String countryCode = iban.substring(0, 2);
            return IBAN_LENGTHS.containsKey(countryCode) && iban.length() == IBAN_LENGTHS.get(countryCode);
        } catch (Exception e) {
            logger.error("Failed to validate IBAN {} length: {}", iban, e.getMessage());
            return false;
        }
    }

    public boolean isValidIbanFormat(String iban) {
        try {
            return iban.matches("^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$");
        } catch (Exception e) {
            logger.error("Failed to validate IBAN {} format: {}", iban, e.getMessage());
            return false;
        }
    }

    public boolean isValidIbanChecksum(String iban) {
        try {
            return getIbanChecksum(iban) == 1;
        } catch (Exception e) {
            logger.error("Failed to validate IBAN {} checksum: {}", iban, e.getMessage());
            return false;
        }
    }

    public boolean isValidCountryCode(String countryCode) {
        try {
            return IBAN_LENGTHS.containsKey(countryCode);
        } catch (Exception e) {
            logger.error("Failed to validate IBAN country code {}: {}", countryCode, e.getMessage());
            return false;
        }
    }

    public int getIbanChecksum(String iban) {
        try {
            String rearrangedIban = iban.substring(4) + iban.substring(0, 4);
            StringBuilder numericIban = new StringBuilder();
            for (char ch : rearrangedIban.toCharArray()) {
                if (Character.isLetter(ch)) {
                    numericIban.append((int) ch - 55);
                } else {
                    numericIban.append(ch);
                }
            }
            return new java.math.BigInteger(numericIban.toString()).mod(java.math.BigInteger.valueOf(97)).intValue();
        } catch (Exception e) {
            logger.error("Failed to calculate IBAN {} checksum: {}", iban, e.getMessage());
            return -1;
        }
    }

}
