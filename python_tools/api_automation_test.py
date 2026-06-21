import unittest
import requests

BASE_URL = "http://localhost:3001/api"

class TestWeatherAPI(unittest.TestCase):
    def test_get_history(self):
        """Test retrieving search history"""
        response = requests.get(f"{BASE_URL}/history")
        
        # Check if the response is successful
        self.assertEqual(response.status_code, 200, "Expected status code 200")
        
        # Check if response is JSON and contains the 'data' key with a list
        data = response.json()
        self.assertIn("data", data, "Expected 'data' key in response")
        self.assertIsInstance(data["data"], list, "Expected history data to be a list")

    def test_save_search(self):
        """Test saving a new search to the database"""
        payload = {"location": "AutomatedTestCity"}
        response = requests.post(f"{BASE_URL}/history", json=payload)
        
        # Check if the response is successful (200 or 201)
        self.assertIn(response.status_code, [200, 201], "Expected status code 200 or 201 for saving search")
        
        # Verify the success details
        data = response.json()
        self.assertIn("id", data, "Expected an 'id' in the response")
        self.assertEqual(data["location"], "AutomatedTestCity")

    def test_get_weather_no_location(self):
        """Test retrieving weather without providing a location (Should fail/prompt)"""
        response = requests.get(f"{BASE_URL}/weather")
        
        # The API likely returns a 400 Bad Request or 500 when no query is provided
        # We ensure it doesn't return a successful 200 with empty data
        self.assertNotEqual(response.status_code, 200, "Expected error when no location is provided")

if __name__ == "__main__":
    print("---------------------------------------------------------")
    print("Running Automated API Integration Tests...")
    print("Make sure the backend is running on http://localhost:3001")
    print("---------------------------------------------------------")
    unittest.main(verbosity=2)
