package com.example.ibanapi.ibanvalidation.model;

public enum IbanValidationErrorEnum {
    INVALID_EMPTY("The IBAN value is empty."),
    INVALID_LENGTH("IBAN Length must be between 14 and 34 characters."),
    INVALID_FORMAT("IBAN must start with a country code followed by digits (e.g. DE89370400440532013000)."),;

    private final String message;

    IbanValidationErrorEnum(String message) {
        this.message = message;
    }

    public String getMessage(String... args) {
        return message;
    }
}
