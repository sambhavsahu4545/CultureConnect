// Booking model - stores all user bookings
// Handles flights, hotels, trains, car rentals, tour packages, and cruises

import mongoose from 'mongoose';

// Schema for passenger info (used in flights, trains, cruises)
// Each booking can have multiple passengers
const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    seatNumber: {
        type: String,
        default: '', // Seat will be assigned later
    },
    specialRequests: {
        type: String,
        default: '', // Dietary requirements, wheelchair, etc.
    },
}, { _id: false }); // Don't create separate IDs for passengers

// Main booking schema
const bookingSchema = new mongoose.Schema({
    // Which user made this booking
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // What type of booking is this?
    type: {
        type: String,
        enum: ['flight', 'hotel', 'train', 'car-rental', 'tour-package', 'cruise'],
        required: true,
    },

    // Current status of the booking
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
        default: 'pending', // Starts as pending until payment is confirmed
    },

    // Unique booking reference number (like "BK1234567890")
    // Users can use this to track their booking
    bookingReference: {
        type: String,
        required: true,
        unique: true,
    },

    // Booking-specific details (different for each booking type)
    // Only the relevant type will have data (e.g., flight bookings only use flight field)
    bookingDetails: {
        // Flight booking details
        flight: {
            airline: String,
            flightNumber: String,
            departure: {
                airport: String,
                city: String,
                date: Date,
                time: String,
            },
            arrival: {
                airport: String,
                city: String,
                date: Date,
                time: String,
            },
            class: {
                type: String,
                enum: ['economy', 'business', 'first'],
            },
            passengers: [passengerSchema], // List of passengers on this flight
        },

        // Hotel booking details
        hotel: {
            name: String,
            address: String,
            city: String,
            checkIn: Date,
            checkOut: Date,
            rooms: Number, // How many rooms
            guests: Number, // Total number of guests
            roomType: String, // Single, double, suite, etc.
        },

        // Train booking details
        train: {
            trainNumber: String,
            trainName: String,
            departure: {
                station: String,
                city: String,
                date: Date,
                time: String,
            },
            arrival: {
                station: String,
                city: String,
                date: Date,
                time: String,
            },
            class: {
                type: String,
                enum: ['sleeper', '3ac', '2ac', '1ac'], // AC = Air Conditioned
            },
            passengers: [passengerSchema],
        },

        // Car rental details
        carRental: {
            carType: String, // SUV, sedan, hatchback, etc.
            pickupLocation: String,
            dropoffLocation: String, // Can be different from pickup
            pickupDate: Date,
            dropoffDate: Date,
            driverName: String,
            driverLicense: String, // License number
        },

        // Tour package details
        tourPackage: {
            packageName: String,
            destination: String,
            startDate: Date,
            endDate: Date,
            travelers: Number, // Number of people
            packageDetails: mongoose.Schema.Types.Mixed, // Flexible structure for package info
        },

        // Cruise booking details
        cruise: {
            cruiseName: String,
            shipName: String,
            departurePort: String,
            arrivalPort: String,
            departureDate: Date,
            arrivalDate: Date,
            cabinType: String, // Interior, ocean view, balcony, suite
            passengers: [passengerSchema],
        },
    },

    // Price breakdown
    pricing: {
        basePrice: {
            type: Number,
            required: true, // Base price before taxes and fees
        },
        taxes: {
            type: Number,
            default: 0, // GST, service tax, etc.
        },
        fees: {
            type: Number,
            default: 0, // Booking fees, convenience charges
        },
        discount: {
            type: Number,
            default: 0, // Discount or coupon amount
        },
        totalPrice: {
            type: Number,
            required: true, // Final price user pays
        },
        currency: {
            type: String,
            default: 'INR', // Currency code
        },
    },

    // Payment information
    payment: {
        method: {
            type: String,
            enum: ['credit-card', 'debit-card', 'upi', 'net-banking', 'wallet', 'cash'],
        },
        transactionId: String, // Payment gateway transaction ID
        paidAt: Date, // When payment was made
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending', // Starts as pending
        },
    },

    // Cancellation info (only filled if booking is cancelled)
    cancellation: {
        cancelledAt: Date, // When was it cancelled
        cancellationReason: String, // Why was it cancelled
        refundAmount: Number, // How much money to refund
        refundStatus: {
            type: String,
            enum: ['pending', 'processed', 'completed'], // Refund processing status
        },
    },

    // Any additional notes about this booking
    notes: {
        type: String,
        default: '',
    },
}, {
    timestamps: true, // Automatically track when booking was created and updated
});

// Create indexes for faster database queries
// These make searching by user, reference, status, etc. much faster
bookingSchema.index({ user: 1 }); // Find all bookings for a user
bookingSchema.index({ bookingReference: 1 }); // Find booking by reference number
bookingSchema.index({ status: 1 }); // Find bookings by status
bookingSchema.index({ type: 1 }); // Find bookings by type (flight, hotel, etc.)
bookingSchema.index({ createdAt: -1 }); // Sort by newest first

// Generate a unique booking reference number
// Format: BK + timestamp + random string (e.g., BK123ABC456)
bookingSchema.statics.generateBookingReference = function () {
    const prefix = 'BK';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${timestamp}${random}`;
};

// Calculate the total price
// Formula: basePrice + taxes + fees - discount
bookingSchema.methods.calculateTotal = function () {
    this.pricing.totalPrice = 
        this.pricing.basePrice + 
        this.pricing.taxes + 
        this.pricing.fees - 
        this.pricing.discount;
    return this.pricing.totalPrice;
};

// Before saving a booking, make sure it has a reference number and calculate total
bookingSchema.pre('save', async function (next) {
    // If no reference number, generate one
    if (!this.bookingReference) {
        this.bookingReference = Booking.generateBookingReference();
    }
    
    // Always recalculate total price before saving
    this.calculateTotal();
    
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

