const TelegramBot = require('node-telegram-bot-api');
const User = require('./models/user');
const Listing = require('./models/listing');
const Review = require('./models/review');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

let userSessions = {};
let loggedInUsers = {};

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Mapbox configuration
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                [{ text: 'Browse Listings' }, { text: 'Sign Up' }],
                [{ text: 'Log In' }, { text: 'Create Listing' }],
                [{ text: 'Delete Listing' }, { text: 'Edit Listing' }],
                [{ text: 'Log Out' }, { text: 'Add Review' }],
                [{ text: 'Delete Review' }, { text: 'Show Listing' }]
            ],
            resize_keyboard: true
        }
    };
    bot.sendMessage(chatId, "Welcome to HostelHunt Bot! Choose an option:", options);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const photo = msg.photo;

    switch (text) {
        case 'Browse Listings':
            await showListings(chatId);
            break;
        case 'Sign Up':
            userSessions[chatId] = { stage: 'signup_username' };
            bot.sendMessage(chatId, "Please enter your desired username:");
            break;
        case 'Log In':
            userSessions[chatId] = { stage: 'login_username' };
            bot.sendMessage(chatId, "Please enter your username:");
            break;
        case 'Create Listing':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You need to log in to create a listing. Use Log In to log in.");
                return;
            }
            userSessions[chatId] = { stage: 'create_listing_title', userId: loggedInUsers[chatId].userId };
            bot.sendMessage(chatId, "Please enter the title of your listing:");
            break;
        case 'Delete Listing':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You need to log in to delete a listing. Use Log In to log in.");
                return;
            }
            userSessions[chatId] = { stage: 'delete_listing_title', userId: loggedInUsers[chatId].userId };
            bot.sendMessage(chatId, "Please enter the title of the listing you want to delete:");
            break;
        case 'Edit Listing':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You need to log in to edit a listing. Use Log In to log in.");
                return;
            }
            userSessions[chatId] = { stage: 'edit_listing_title', userId: loggedInUsers[chatId].userId };
            bot.sendMessage(chatId, "Please enter the title of the listing you want to edit:");
            break;
        case 'Log Out':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You are not logged in.");
            } else {
                delete loggedInUsers[chatId];
                bot.sendMessage(chatId, "You have been logged out successfully.");
            }
            break;
        case 'Add Review':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You need to log in to create a review. Use Log In to log in.");
                return;
            }
            userSessions[chatId] = { stage: 'create_review_listing', userId: loggedInUsers[chatId].userId };
            bot.sendMessage(chatId, "Please enter the title of the listing you want to review:");
            break;
        case 'Delete Review':
            if (!loggedInUsers[chatId]) {
                bot.sendMessage(chatId, "You need to log in to delete a review. Use Log In to log in.");
                return;
            }
            userSessions[chatId] = { stage: 'delete_review_listing', userId: loggedInUsers[chatId].userId };
            bot.sendMessage(chatId, "Please enter the title of the listing whose review you want to delete:");
            break;
        case 'Show Listing':
            userSessions[chatId] = { stage: 'show_listing_title' };
            bot.sendMessage(chatId, "Please enter the title of the listing you want to view:");
            break;
        default:
            handleSession(chatId, text, photo);
            break;
    }
});

async function handleSession(chatId, text, photo) {
    const session = userSessions[chatId];
    if (!session) return;

    if (session.stage === 'signup_username') {
        session.username = text;
        session.stage = 'signup_email';
        bot.sendMessage(chatId, "Please enter your email:");
    } else if (session.stage === 'signup_email') {
        session.email = text;
        session.stage = 'signup_password';
        bot.sendMessage(chatId, "Please enter your desired password:");
    } else if (session.stage === 'signup_password') {
        const { username, email } = session;
        try {
            const user = new User({ username, email });
            await User.register(user, text);
            bot.sendMessage(chatId, "Signup successful! You can now log in using Log In.");
        } catch (err) {
            bot.sendMessage(chatId, `Error during signup: ${err.message}`);
        }
        delete userSessions[chatId];
    } else if (session.stage === 'login_username') {
        session.username = text;
        session.stage = 'login_password';
        bot.sendMessage(chatId, "Please enter your password:");
    } else if (session.stage === 'login_password') {
        const { username } = session;
        try {
            const user = await User.findOne({ username });
            if (!user) {
                bot.sendMessage(chatId, "Invalid username. Please try again.");
                delete userSessions[chatId];
            } else {
                user.authenticate(text, (err, authUser, passwordErr) => {
                    if (err || passwordErr) {
                        bot.sendMessage(chatId, "Invalid password. Please try again.");
                    } else {
                        bot.sendMessage(chatId, "Login successful! You can now create listings using Create Listing.");
                        loggedInUsers[chatId] = { userId: user._id, username: user.username };
                    }
                    delete userSessions[chatId];
                });
            }
        } catch (err) {
            bot.sendMessage(chatId, `Error during login: ${err.message}`);
            delete userSessions[chatId];
        }
    } else if (session.stage === 'create_listing_title') {
        session.title = text;
        session.stage = 'create_listing_description';
        bot.sendMessage(chatId, "Please enter the description of your listing:");
    } else if (session.stage === 'create_listing_description') {
        session.description = text;
        session.stage = 'create_listing_price';
        bot.sendMessage(chatId, "Please enter the price of your listing:");
    } else if (session.stage === 'create_listing_price') {
        session.price = text;
        session.stage = 'create_listing_location';
        bot.sendMessage(chatId, "Please enter the location of your listing:");
    } else if (session.stage === 'create_listing_location') {
        session.location = text;
        session.stage = 'create_listing_image';
        bot.sendMessage(chatId, "Please upload an image for your listing:");
    } else if (session.stage === 'create_listing_image' && photo) {
        const fileId = photo[photo.length - 1].file_id;
        const fileUrl = await bot.getFileLink(fileId);

        try {
            const response = await axios({
                url: fileUrl,
                method: 'GET',
                responseType: 'arraybuffer',
            });

            const buffer = Buffer.from(response.data, 'binary');

            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'HostelHunt' }, async (error, result) => {
                if (error) {
                    bot.sendMessage(chatId, `Error uploading image: ${error.message}`);
                    delete userSessions[chatId];
                    return;
                }

                try {
                    const geoResponse = await geocodingClient.forwardGeocode({
                        query: session.location,
                        limit: 1
                    }).send();

                    const coordinates = geoResponse.body.features[0].geometry.coordinates;

                    const newListing = new Listing({
                        title: session.title,
                        description: session.description,
                        price: session.price,
                        location: session.location,
                        geometry: { type: 'Point', coordinates: coordinates },
                        owner: session.userId,
                        image: {
                            url: result.secure_url,
                            filename: result.public_id
                        }
                    });
                    await newListing.save();
                    bot.sendMessage(chatId, "Listing created successfully!");
                } catch (err) {
                    bot.sendMessage(chatId, `Error creating listing: ${err.message}`);
                }
                delete userSessions[chatId];
            }).end(buffer);

        } catch (err) {
            bot.sendMessage(chatId, `Error downloading image: ${err.message}`);
            delete userSessions[chatId];
        }
    } else if (session.stage === 'delete_listing_title') {
        const listingTitle = text;
        try {
            const listing = await Listing.findOne({ title: listingTitle });
            if (!listing) {
                bot.sendMessage(chatId, "Listing not found. Please check the title and try again.");
                delete userSessions[chatId];
                return;
            }
            if (listing.owner.toString() !== session.userId.toString()) {
                bot.sendMessage(chatId, "You are not authorized to delete this listing.");
                delete userSessions[chatId];
                return;
            }
            await Listing.deleteOne({ _id: listing._id });
            bot.sendMessage(chatId, "Listing deleted successfully!");
        } catch (err) {
            bot.sendMessage(chatId, `Error deleting listing: ${err.message}`);
        }
        delete userSessions[chatId];
    } else if (session.stage === 'edit_listing_title') {
        const listingTitle = text;
        try {
            const listing = await Listing.findOne({ title: listingTitle });
            if (!listing) {
                bot.sendMessage(chatId, "Listing not found. Please check the title and try again.");
                delete userSessions[chatId];
                return;
            }
            if (listing.owner.toString() !== session.userId.toString()) {
                bot.sendMessage(chatId, "You are not authorized to edit this listing.");
                delete userSessions[chatId];
                return;
            }
            session.listing = listing;
            session.stage = 'edit_listing_field';
            bot.sendMessage(chatId, "Which field do you want to edit? (title, description, price, location, image)");
        } catch (err) {
            bot.sendMessage(chatId, `Error finding listing: ${err.message}`);
            delete userSessions[chatId];
        }
    } else if (session.stage === 'edit_listing_field') {
        const field = text.toLowerCase();
        session.field = field;
        session.stage = 'edit_listing_value';
        bot.sendMessage(chatId, `Please enter the new value for ${field}:`);
    } else if (session.stage === 'edit_listing_value') {
        const newValue = text;
        const field = session.field;
        const listing = session.listing;

        if (field === 'image' && photo) {
            const fileId = photo[photo.length - 1].file_id;
            const fileUrl = await bot.getFileLink(fileId);

            try {
                const response = await axios({
                    url: fileUrl,
                    method: 'GET',
                    responseType: 'arraybuffer',
                });

                const buffer = Buffer.from(response.data, 'binary');

                cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'HostelHunt' }, async (error, result) => {
                    if (error) {
                        bot.sendMessage(chatId, `Error uploading image: ${error.message}`);
                        delete userSessions[chatId];
                        return;
                    }

                    listing.image = {
                        url: result.secure_url,
                        filename: result.public_id
                    };
                    await listing.save();
                    bot.sendMessage(chatId, "Listing image updated successfully!");
                    delete userSessions[chatId];
                }).end(buffer);

            } catch (err) {
                bot.sendMessage(chatId, `Error downloading image: ${err.message}`);
                delete userSessions[chatId];
            }
        } else {
            if (field === 'title' || field === 'description' || field === 'price' || field === 'location') {
                listing[field] = newValue;

                if (field === 'location') {
                    try {
                        const geoResponse = await geocodingClient.forwardGeocode({
                            query: newValue,
                            limit: 1
                        }).send();

                        const coordinates = geoResponse.body.features[0].geometry.coordinates;
                        listing.geometry = { type: 'Point', coordinates: coordinates };
                    } catch (err) {
                        bot.sendMessage(chatId, `Error updating location: ${err.message}`);
                        delete userSessions[chatId];
                        return;
                    }
                }

                await listing.save();
                bot.sendMessage(chatId, `Listing ${field} updated successfully!`);
            } else {
                bot.sendMessage(chatId, `Invalid field: ${field}.`);
            }
            delete userSessions[chatId];
        }
    } else if (session.stage === 'create_review_listing') {
        session.listingTitle = text;
        session.stage = 'create_review_comment';
        bot.sendMessage(chatId, "Please enter your review comment:");
    } else if (session.stage === 'create_review_comment') {
        session.comment = text;
        session.stage = 'create_review_rating';
        bot.sendMessage(chatId, "Please enter your rating (1-5):");
    } else if (session.stage === 'create_review_rating') {
        const rating = parseInt(text, 10);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            bot.sendMessage(chatId, "Invalid rating. Please enter a number between 1 and 5.");
            return;
        }
        session.rating = rating;
        try {
            const listing = await Listing.findOne({ title: session.listingTitle });
            if (!listing) {
                bot.sendMessage(chatId, "Listing not found. Please check the title and try again.");
                delete userSessions[chatId];
                return;
            }
            const newReview = new Review({
                comment: session.comment,
                rating: session.rating,
                author: session.userId
            });
            listing.reviews.push(newReview);

            await newReview.save();
            await listing.save();
            bot.sendMessage(chatId, "Review created successfully!");
        } catch (err) {
            bot.sendMessage(chatId, `Error creating review: ${err.message}`);
        }
        delete userSessions[chatId];
    } else if (session.stage === 'delete_review_listing') {
        session.listingTitle = text;
        session.stage = 'delete_review_author';
        bot.sendMessage(chatId, "Please enter the username of the review author:");
    } else if (session.stage === 'delete_review_author') {
        const reviewAuthorUsername = text;
        try {
            const listing = await Listing.findOne({ title: session.listingTitle }).populate({
                path: 'reviews',
                populate: { path: 'author', select: 'username' }
            });
            if (!listing) {
                bot.sendMessage(chatId, "Listing not found. Please check the title and try again.");
                delete userSessions[chatId];
                return;
            }
            const review = listing.reviews.find(r => r.author.username === reviewAuthorUsername);
            if (!review) {
                bot.sendMessage(chatId, "Review not found for the given author. Please check the username and try again.");
                delete userSessions[chatId];
                return;
            }
            if (review.author._id.toString() !== session.userId.toString()) {
                bot.sendMessage(chatId, "You are not authorized to delete this review.");
                delete userSessions[chatId];
                return;
            }
            await Listing.findByIdAndUpdate(listing._id, { $pull: { reviews: review._id } });
            await Review.findByIdAndDelete(review._id);
            bot.sendMessage(chatId, "Review deleted successfully!");
        } catch (err) {
            bot.sendMessage(chatId, `Error deleting review: ${err.message}`);
        }
        delete userSessions[chatId];
    } else if (session.stage === 'show_listing_title') {
        const listingTitle = text;
        try {
            const listing = await Listing.findOne({ title: listingTitle }).populate('owner').populate({
                path: 'reviews',
                populate: { path: 'author' }
            });
            if (!listing) {
                bot.sendMessage(chatId, "Listing not found. Please check the title and try again.");
            } else {
                const listingDetails = `
Listing: ${listing.title}
Location: ${listing.location}
Price: ${listing.price}
Description: ${listing.description}
Owner: ${listing.owner.username}
Reviews:
${listing.reviews.map(review => `- ${review.author.username}: ${review.comment} (${review.rating}/5)`).join('\n')}
                `;
                await bot.sendPhoto(chatId, listing.image.url, { caption: listingDetails });
            }
        } catch (err) {
            bot.sendMessage(chatId, `Error retrieving listing: ${err.message}`);
        }
        delete userSessions[chatId];
    }
}

async function showListings(chatId) {
    try {
        const listings = await Listing.find({});
        if (listings.length === 0) {
            bot.sendMessage(chatId, "No listings available at the moment.");
        } else {
            for (const l of listings) {
                await bot.sendPhoto(chatId, l.image.url, {
                    caption: `Listing: ${l.title}\nLocation: ${l.location}\nPrice: ${l.price}\nDescription: ${l.description}`
                });
            }
        }
    } catch (error) {
        bot.sendMessage(chatId, "Error retrieving listings. Please try again later.");
    }
}

module.exports = bot;
