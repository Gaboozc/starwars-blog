# ============================================================================
# Star Wars Blog Backend - Flask Application
# ============================================================================
# This is the main Flask application that serves as the backend for the
# Star Wars Blog frontend. It provides API endpoints for managing favorites,
# user data, and proxies requests to the SWAPI (Star Wars API).
# ============================================================================

# Import Flask framework for creating the web application
from flask import Flask, jsonify, request

# Import CORS (Cross-Origin Resource Sharing) to allow frontend requests
# This enables communication between the React frontend and Flask backend
from flask_cors import CORS

# Import Python's built-in OS module for environment variable management
import os

# Import dotenv to load environment variables from .env file
from dotenv import load_dotenv

# ============================================================================
# Configuration and Initialization
# ============================================================================

# Load environment variables from .env file into the application
load_dotenv()

# Create a Flask application instance
# __name__ is a special Python variable that holds the name of the current module
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) for all routes
# This allows the React frontend (usually on a different port) to communicate with Flask
# Without this, browser security policies would block cross-origin requests
CORS(app)

# ============================================================================
# Health Check Endpoint
# ============================================================================

# Define a simple GET route at the root URL ("/")
# This endpoint verifies that the backend server is running and accessible
@app.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint - Returns a simple JSON response to confirm the server is active
    
    Returns:
        dict: A JSON object with a success message and status
    """
    # Return a JSON response with HTTP status 200 (OK)
    return jsonify({
        "status": "success",
        "message": "Star Wars Blog Backend is running!"
    }), 200


# ============================================================================
# API Endpoints for Favorites Management
# ============================================================================

# In-memory storage for favorites (in production, use a database)
# This dictionary stores user favorites with user_id as key
favorites_db = {}


@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    """
    Get all saved favorites for a specific user
    
    Query Parameters:
        user_id (str): The ID of the user (optional, defaults to "default_user")
    
    Returns:
        dict: JSON object containing the list of favorites for the user
    """
    # Get the user_id from query parameters, default to "default_user" if not provided
    user_id = request.args.get("user_id", "default_user")
    
    # Return the favorites for the specified user (empty list if user doesn't exist)
    return jsonify({
        "user_id": user_id,
        # Use .get() to safely retrieve favorites, returning empty list if user not found
        "favorites": favorites_db.get(user_id, [])
    }), 200


@app.route("/api/favorites", methods=["POST"])
def add_favorite():
    """
    Add a new favorite item for a user
    
    Request Body:
        {
            "user_id": "string (optional)",
            "item": {
                "id": "string",
                "name": "string",
                "type": "string (characters|planets|species|starships|vehicles)"
            }
        }
    
    Returns:
        dict: Confirmation message with the updated favorites list
    """
    # Get JSON data from request body
    data = request.get_json()
    
    # Extract user_id from request body, default to "default_user"
    user_id = data.get("user_id", "default_user")
    
    # Extract the item object from request body
    item = data.get("item")
    
    # Validate that an item was provided
    if not item:
        # Return error response with HTTP 400 (Bad Request)
        return jsonify({
            "status": "error",
            "message": "Item is required"
        }), 400
    
    # Initialize favorites list for user if it doesn't exist yet
    if user_id not in favorites_db:
        favorites_db[user_id] = []
    
    # Check if item already exists in favorites to avoid duplicates
    item_exists = any(fav.get("id") == item.get("id") for fav in favorites_db[user_id])
    
    # Only add item if it doesn't already exist
    if not item_exists:
        # Add the new item to the user's favorites list
        favorites_db[user_id].append(item)
    
    # Return success response with updated favorites list
    return jsonify({
        "status": "success",
        "message": "Item added to favorites",
        "favorites": favorites_db[user_id]
    }), 201


@app.route("/api/favorites/<item_id>", methods=["DELETE"])
def remove_favorite(item_id):
    """
    Remove a favorite item for a user
    
    URL Parameters:
        item_id (str): The ID of the item to remove
    
    Query Parameters:
        user_id (str): The ID of the user (optional, defaults to "default_user")
    
    Returns:
        dict: Confirmation message with the updated favorites list
    """
    # Get the user_id from query parameters, default to "default_user"
    user_id = request.args.get("user_id", "default_user")
    
    # Check if user exists in favorites database
    if user_id not in favorites_db:
        # Return error if user not found
        return jsonify({
            "status": "error",
            "message": "User not found"
        }), 404
    
    # Filter out the item with matching ID from user's favorites
    # This creates a new list without the deleted item
    favorites_db[user_id] = [
        fav for fav in favorites_db[user_id] 
        if fav.get("id") != item_id
    ]
    
    # Return success response with updated favorites list
    return jsonify({
        "status": "success",
        "message": "Item removed from favorites",
        "favorites": favorites_db[user_id]
    }), 200


# ============================================================================
# Error Handling
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 Not Found errors
    
    Args:
        error: The error object from Flask
    
    Returns:
        dict: JSON error message with HTTP 404 status
    """
    # Return a user-friendly error message in JSON format
    return jsonify({
        "status": "error",
        "message": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 Internal Server errors
    
    Args:
        error: The error object from Flask
    
    Returns:
        dict: JSON error message with HTTP 500 status
    """
    # Return a generic error message (don't expose internal details in production)
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500


# ============================================================================
# Application Entry Point
# ============================================================================

# Check if this file is being run directly (not imported as a module)
if __name__ == "__main__":
    """
    Main entry point for the application
    Runs the Flask development server when this file is executed directly
    """
    # Get the debug mode from environment variable, default to True for development
    debug_mode = os.getenv("FLASK_DEBUG", "True").lower() == "true"
    
    # Start the Flask development server
    # host="0.0.0.0" allows connections from any IP address
    # port=3001 is the port configured for the backend server
    # debug=True enables auto-reload on code changes and better error messages
    app.run(
        host="0.0.0.0",
        port=3001,
        debug=debug_mode
    )
