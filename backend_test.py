#!/usr/bin/env python3
"""
Backend API Tests for DaliMoto Next.js App
Tests all API endpoints defined in /app/app/api/[[...path]]/route.js
"""

import requests
import json
import os
from datetime import datetime

# Load base URL from environment
BASE_URL = "https://auto-servis-premium.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(success, message):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_health_endpoint():
    """Test GET /api/health"""
    print_test_header("GET /api/health - Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check required fields
        if not data.get('ok'):
            print_result(False, "Missing or false 'ok' field")
            return False
        
        if data.get('service') != 'DaliMoto API':
            print_result(False, f"Expected service='DaliMoto API', got '{data.get('service')}'")
            return False
        
        if not data.get('time'):
            print_result(False, "Missing 'time' field")
            return False
        
        # Validate ISO timestamp
        try:
            datetime.fromisoformat(data['time'].replace('Z', '+00:00'))
        except:
            print_result(False, f"Invalid ISO timestamp: {data.get('time')}")
            return False
        
        print_result(True, "Health endpoint returns correct structure")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_root_endpoint():
    """Test GET /api/ (root)"""
    print_test_header("GET /api/ - Root Endpoint")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('ok'):
            print_result(False, "Missing or false 'ok' field")
            return False
        
        if data.get('service') != 'DaliMoto API':
            print_result(False, f"Expected service='DaliMoto API', got '{data.get('service')}'")
            return False
        
        print_result(True, "Root endpoint returns correct structure")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_valid():
    """Test POST /api/contact with valid data"""
    print_test_header("POST /api/contact - Valid Submission")
    try:
        payload = {
            "name": "Jan Novák",
            "phone": "+420 739 263 617",
            "email": "jan@example.cz",
            "service": "Přezutí",
            "message": "Zájem o termín na příští týden"
        }
        
        print(f"Payload: {json.dumps(payload, ensure_ascii=False)}")
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False, None
        
        data = response.json()
        
        if not data.get('ok'):
            print_result(False, "Missing or false 'ok' field")
            return False, None
        
        contact_id = data.get('id')
        if not contact_id:
            print_result(False, "Missing 'id' field in response")
            return False, None
        
        # Validate UUID format (basic check)
        if len(contact_id) < 32:
            print_result(False, f"Invalid UUID format: {contact_id}")
            return False, None
        
        print_result(True, f"Contact created successfully with id: {contact_id}")
        return True, contact_id
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False, None

def test_contact_missing_name():
    """Test POST /api/contact without name"""
    print_test_header("POST /api/contact - Missing Name (Validation)")
    try:
        payload = {
            "phone": "+420 739 263 617",
            "email": "test@example.cz",
            "service": "Servis",
            "message": "Test"
        }
        
        print(f"Payload: {json.dumps(payload, ensure_ascii=False)}")
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 400:
            print_result(False, f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('error'):
            print_result(False, "Missing 'error' field in response")
            return False
        
        print_result(True, f"Validation error returned: {data.get('error')}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_missing_phone():
    """Test POST /api/contact without phone"""
    print_test_header("POST /api/contact - Missing Phone (Validation)")
    try:
        payload = {
            "name": "Petr Svoboda",
            "email": "petr@example.cz",
            "service": "Diagnostika",
            "message": "Potřebuji diagnostiku"
        }
        
        print(f"Payload: {json.dumps(payload, ensure_ascii=False)}")
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 400:
            print_result(False, f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('error'):
            print_result(False, "Missing 'error' field in response")
            return False
        
        print_result(True, f"Validation error returned: {data.get('error')}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_get_contacts(expected_id=None):
    """Test GET /api/contacts"""
    print_test_header("GET /api/contacts - List Contacts")
    try:
        response = requests.get(f"{BASE_URL}/contacts", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # Truncate long responses
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if 'contacts' not in data:
            print_result(False, "Missing 'contacts' field")
            return False
        
        contacts = data['contacts']
        if not isinstance(contacts, list):
            print_result(False, "'contacts' is not a list")
            return False
        
        print(f"Found {len(contacts)} contacts")
        
        # Check that _id field is not leaked
        for contact in contacts:
            if '_id' in contact:
                print_result(False, "MongoDB _id field leaked in response")
                return False
        
        # If we have an expected_id, verify it's in the list
        if expected_id:
            found = any(c.get('id') == expected_id for c in contacts)
            if not found:
                print_result(False, f"Expected contact with id {expected_id} not found in list")
                return False
            print(f"✓ Found expected contact with id: {expected_id}")
        
        print_result(True, f"Contacts list returned successfully ({len(contacts)} contacts, no _id leaked)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_unknown_endpoint():
    """Test GET /api/unknown - 404 handling"""
    print_test_header("GET /api/unknown - 404 Handling")
    try:
        response = requests.get(f"{BASE_URL}/unknown", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 404:
            print_result(False, f"Expected 404, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('error'):
            print_result(False, "Missing 'error' field in 404 response")
            return False
        
        print_result(True, "404 handled correctly")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_cors_headers():
    """Test OPTIONS /api/contact - CORS preflight"""
    print_test_header("OPTIONS /api/contact - CORS Preflight")
    try:
        response = requests.options(f"{BASE_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code != 204:
            print_result(False, f"Expected 204, got {response.status_code}")
            return False
        
        # Check CORS headers
        required_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
        
        missing_headers = []
        for header, expected_value in required_headers.items():
            actual_value = response.headers.get(header)
            if not actual_value:
                missing_headers.append(header)
            elif actual_value != expected_value:
                print(f"⚠️  Header {header}: expected '{expected_value}', got '{actual_value}'")
        
        if missing_headers:
            print_result(False, f"Missing CORS headers: {', '.join(missing_headers)}")
            return False
        
        print_result(True, "CORS headers present and correct")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("DALIMOTO BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Time: {datetime.now().isoformat()}")
    
    results = {}
    
    # Test 1: Health endpoint
    results['health'] = test_health_endpoint()
    
    # Test 2: Root endpoint
    results['root'] = test_root_endpoint()
    
    # Test 3: Valid contact submission
    success, contact_id = test_contact_valid()
    results['contact_valid'] = success
    
    # Test 4: Missing name validation
    results['contact_no_name'] = test_contact_missing_name()
    
    # Test 5: Missing phone validation
    results['contact_no_phone'] = test_contact_missing_phone()
    
    # Test 6: Get contacts list (verify inserted contact)
    results['get_contacts'] = test_get_contacts(expected_id=contact_id if success else None)
    
    # Test 7: 404 handling
    results['not_found'] = test_unknown_endpoint()
    
    # Test 8: CORS headers
    results['cors'] = test_cors_headers()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} TEST(S) FAILED")
        return 1

if __name__ == "__main__":
    exit(main())
